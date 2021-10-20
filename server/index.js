require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { hash, compare } = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./tokens");
const { isAuth } = require("./auth");
const { verify } = require("jsonwebtoken");
const app = express();

const url =
  "mongodb+srv://deepak:mongodb797@cluster0.urwx4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const formSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    houseNumber: Number,
    streetName: String,
    pincode: Number,
    number: String,
    timing: String,
    date: { type: Date, default: Date.now },
    services: Array,
  },
  {
    collection: "garage_registration",
  }
);

const registerSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    token: String,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("user", registerSchema);

const Form = mongoose.model("form", formSchema);

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Checking if works");
});

//endpoint for getting the services and storing them in database
app.post("/mongo", async (req, res) => {
  const {
    name,
    email,
    houseNumber,
    streetName,
    pincode,
    number,
    timing,
    date,
    services,
  } = req.body;
  const myData = new Form({
    name,
    email,
    houseNumber,
    streetName,
    pincode,
    number,
    timing,
    date,
    services,
  });

  await myData
    .save()
    .then((item) => {
      res.send(`${item} saved to database`);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
//checking for duplicates middleware
checkDuplicateEmailUsername = (req, res, next) => {
  User.findOne({
    userName: req.body.userName,
  }).exec((err, user) => {
    try {
        if (err) {
          // res.status(500).send({ message: err });
          throw new Error({message:err})
          // return;
        } else if (user) {
          //  res.status(400).send({ message: "Username already exists" });
          throw new Error("Username already exists");
          // return;
        }
        User.findOne({
          email: req.body.email,
        }).exec((err, user) =>{
          try {
             if (err) {
               // res.send({ message: err });
               throw new Error({ message: err });
              //  return;
               //  throw Error(err);
             } else if (user) {
               // res.status(400).send({ message: "email already exists" });
               throw new Error("Email already exists");
              //  return;
               //  throw Error("User already exists");
             }
          } catch (error) {
            res.send({error:`${error.message}`})
            return
          }
         
          next();
        } 
        
        );
    } 
    
    catch (error) {
      res.status(400).send({error:`${error.message}`})
    }
    
  } );

  // next();
};

//endpoint for getting the registration information of the user
app.post("/register", [checkDuplicateEmailUsername], async (req, res) => {
  const { userName, email, password, token } = req.body;
  try {
    const hashedPassword = await hash(password, 12);

    const newUsers = new User({
      userName,
      email,
      password: hashedPassword,
      token,
    });

    await newUsers
      .save()
      .then(() => {
        res.status(200).send({ message: "Registered Successfully" });
      })
      .catch((err) => {
        res.status(400).send({ message: err });
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

//endpoint for logging in the user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User does not exist");

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Incorrect password");
    } else if (valid) {
      const refreshToken = createRefreshToken(user._id);
      const accessToken = createAccessToken(user._id);
      User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { token: refreshToken } },
        { new: true, useFindAndModify: false }
      ).then(() => {
        sendRefreshToken(res, refreshToken);
        sendAccessToken(req, res, accessToken);
      });
    }
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
});

//endpoint for logging out
app.post("/logout", (req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });
  return res.send({
    message: "Logged out",
  });
});

// endpoint for protected route
app.post("/protected", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({ message: "This is protected route" });
    }
  } catch (error) {
    res.send({
      error: `${error.message}`,
    });
  }
});

//Get new access token with a referesh token

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.send({ accesstoken: "" });
  let payload = null;
  try {
    payload = await verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.send({ accesstoken: "" });
  }
  //if token valid see user exists
  const user = await User.findOne({ _id: payload.userId });

  if (!user) return res.send({ accesstoken: "" });
  if (user.token !== token) {
    return res.send({ accesstoken: "" });
  }
  const accesstoken = createAccessToken(user._id);
  const refreshtoken = createRefreshToken(user._id);
  //update with new refresh token and send accesstoken and refreshtoken
  User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { token: refreshtoken } },
    { new: true, useFindAndModify: false }
  ).then(() => {
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening at port 5000");
});
