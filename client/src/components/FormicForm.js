import React,{useContext, useState,} from "react";
import { useFormik } from "formik";
import { Button, Chip, Dialog, DialogActions, DialogTitle, FormControlLabel, makeStyles, Paper, Radio, RadioGroup, Snackbar, TextField, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {AppContext} from '../contexts/DataContext'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),

  },
  errorText:{
      color:'red'
  },
  cancel:{
    marginRight:theme.spacing(1)
  },
  paper:{
    width:600,
    // justifyContent:'center',
    // alignItems:'center',
    // display:'flex',
    marginBottom:theme.spacing(3),
    paddingBottom:theme.spacing(3),
    paddingLeft:theme.spacing(3)
  },
  chip:{
    margin:theme.spacing(0.5)
  },
  serviceBox:{
    maxWidth:500,
    overflow:'hidden'
  },
  buttonSpacing:{
    marginBottom:theme.spacing(1)
  }
}));

const validate=(values)=>{
    const errors={};
    if(!values.name){
        errors.name='Required'
    }else if (values.name.length>20){
        errors.name='Must be 20 characters or less'
    }

    if (!values.email){
        errors.email='Required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email='Invalid email address'
    }

    if (!values.number){
        errors.number='Required'
    }else if(values.number.toString().length!==10){
        errors.number='Phone Number length should be 10'
    }

    if(!values.houseNumber){
        errors.houseNumber='Required'
    }
    if(!values.streetName){
        errors.streetName='Required'
    }
    else if(values.streetName.length>25){
        errors.streetName='Length can\'t exceed 25 characters'
    }
    if(!values.pincode){
        errors.pincode='Required'
    }
    else if(values.pincode.length>=6){
        errors.pincode='Pincode length should be 6'
    }
    if(!values.timing){
      errors.timing='Required'
    }
    return errors;
}


const FormicForm = () => {
  const { serviceItems, removeService } = useContext(AppContext);

  

  const nameServiceItems = serviceItems.map((item) => {
    return item.name;
  });
  //notification
  const[openNotification,setOpenNotification]=useState(false)
  //dialog
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const disableWeekend = (date) => {
    return date.getDay() === 0;
  };

  //post request

  const submitForms = (value) => {
    
    axios
      .post("https://garage-reservation.herokuapp.com/mongo", value)
      .then((res) => {
        console.log(res);
        setOpenNotification(true);
      })
      .catch((error) => console.log(error));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      houseNumber: "",
      streetName: "",
      pincode: "",
      number: "",
      timing: "",
      date: new Date(),
      services: nameServiceItems,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      submitForms(values);
      resetForm({});
    },
  });
  const formsubmissionhandler = () => {
    handleDialogClose();
  };
  
  const handleNotificationClose=()=>{
    setOpenNotification(false)
  }
  return (
    
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <form onSubmit={formik.handleSubmit} id="formik-form" method="POST">
          <TextField
            autoFocus
            margin="dense"
            label="name"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          {formik.errors.name ? (
            <div className={classes.errorText}>{formik.errors.name}</div>
          ) : (
            <div />
          )}
          <TextField
            margin="dense"
            label="email"
            name="email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            fullWidth
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className={classes.errorText}>{formik.errors.email}</div>
          ) : (
            <div />
          )}

          <TextField
            margin="dense"
            label="house number"
            name="houseNumber"
            type="number"
            id="houseNumber"
            onChange={formik.handleChange}
            value={formik.values.houseNumber}
          />
          {formik.errors.houseNumber ? (
            <div className={classes.errorText}>{formik.errors.houseNumber}</div>
          ) : (
            <div />
          )}
          <TextField
            margin="dense"
            label="street name"
            name="streetName"
            id="streetName"
            onChange={formik.handleChange}
            value={formik.values.streetName}
          />
          {formik.errors.streetName ? (
            <div className={classes.errorText}>{formik.errors.streetName}</div>
          ) : (
            <div />
          )}
          <TextField
            margin="dense"
            label="pincode"
            name="pincode"
            type="number"
            id="pincode"
            onChange={formik.handleChange}
            value={formik.values.pincode}
          />

          {formik.errors.pincode ? (
            <div className={classes.errorText}>{formik.errors.pincode}</div>
          ) : (
            <div />
          )}

          <TextField
            margin="dense"
            label="phone number"
            name="number"
            id="number"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />
          {formik.errors.number ? (
            <div className={classes.errorText}>{formik.errors.number}</div>
          ) : (
            <div />
          )}

          <Typography variant="subtitle1" color="textSecondary">
            Date:
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("date", value)}
              disablePast
              shouldDisableDate={disableWeekend}
            />
          </MuiPickersUtilsProvider>
          <Typography variant="subtitle1" color="textSecondary">
            Slot:
          </Typography>
          <RadioGroup
            aria-label="slot"
            value={formik.values.timing}
            onChange={formik.handleChange}
            name="timing"
          >
            <FormControlLabel
              value="9AM-1PM"
              control={<Radio />}
              label="9AM-1PM"
            />
            <FormControlLabel
              value="2PM-6PM"
              control={<Radio />}
              label="2PM-6PM"
            />
          </RadioGroup>
          {formik.errors.timing ? (
            <div className={classes.errorText}>{formik.errors.timing}</div>
          ) : (
            <div />
          )}
          <Typography variant="subtitle1" color="textSecondary">
            Services:
          </Typography>
          <div className={classes.serviceBox}>
            {serviceItems.map((item) => {
              return (
                <Chip
                  key={item.id}
                  label={item.name}
                  className={classes.chip}
                  onDelete={() => removeService(item)}
                />
              );
            })}
          </div>
          <div className={classes.buttonSpacing} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Book Slot
          </Button>

          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>
              Do you wish to go forward with your information and Confirm
              Booking ?
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                form="formik-form"
                onClick={formsubmissionhandler}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Paper>
      <Snackbar anchorOrigin={{vertical:'top',horizontal:'center'}} open={openNotification} autoHideDuration={5000} onClose={handleNotificationClose}><Alert severity='success'>Slot booked successfully!! You will be contacted shortly.</Alert></Snackbar>
    </div>
  );
};

export default FormicForm;
