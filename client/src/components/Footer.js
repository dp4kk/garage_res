import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles=makeStyles(theme=>({
box:{
    marginBottom:theme.spacing(4)
}
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Garage Booking"} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
    const classes = useStyles();
    return (
      <div className={classes.box}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    );
}

export default Footer
