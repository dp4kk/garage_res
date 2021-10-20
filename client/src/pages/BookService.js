import React, { useContext } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers'
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import {AppContext} from '../contexts/DataContext'

const useStyles=makeStyles(theme=>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    slot:{
        marginTop:theme.spacing(2)
    }
}))
const BookService = () => {
    const classes=useStyles()
    const { handleSlotChange, handleDateChange, selectedDate, slot } =useContext(AppContext);

      console.log(selectedDate)
      console.log(slot)

    const disableWeekend=(date)=>{
        return (date.getDay()===0 )
    }
    return (
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            shouldDisableDate={disableWeekend}
          />
        </MuiPickersUtilsProvider>
        <div className={classes.slot}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Slot</FormLabel>
          <RadioGroup value={slot} onChange={handleSlotChange}>
            <FormControlLabel
              value="9:00AM-1:00PM"
              control={<Radio />}
              label="9:00AM-1:00PM"
            />
            <FormControlLabel
              value="2:00PM-6:00PM"
              control={<Radio />}
              label="2:00PM-6:00PM"
            />
          </RadioGroup>
        </FormControl>
      </div>
      </div>
    );
}

export default BookService
