## MERN Garage Reservation Application

### Functionalities
1.Service Selection 2.USER Authentication(JWT) 3.Form(Formik) 4.Database(MongoDB)

#### Service Selection
Among the different services that are listed user will be able to select/remove the service that is required which will authomatically reflect on the form to be submitted to book the service.

#### USER Authentication 
User Authentication and Authorization is done with the help of Javascript Web Token(JWT) implemented in the server side  which stores the email and hashed password in MongoDB database and generates access token and refresh token to use the application for the authentic user.

#### Form 
USERS will need to fillup the form with their details , service they required and date and time at which they want to book the service.Form is created using Formik(integrated along Material UI) which after submission stores the form data into the mongoDB database.

#### Database(MongoDB)
MongoDB database is used to store the user email,hash password along with the form submitted by the user for booking the service.MongoDB database is implemented in the server side using mongoose.
