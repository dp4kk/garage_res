import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import BuildIcon from "@material-ui/icons/Build";
import {AppContext} from '../contexts/DataContext'
import {useHistory} from 'react-router-dom'
const useStyles=makeStyles((theme)=>({
    root:{
        flexGrow:1,
        marginBottom:theme.spacing(4)
    },
     menu:{
         marginRight:theme.spacing(6)
     },
    title:{
        flexGrow:1
    },
    name:{
        marginRight:theme.spacing(1)
    },
    button:{
      textTransform:'none'
    }

}))

const Navbar = () => {
    const history=useHistory()
    const classes=useStyles()
    const {handleDrawerOpen,setUser,user}=useContext(AppContext)

    const handleLogout=async()=>{
        await fetch("https://garage-reservation.herokuapp.com/logout", {
          method: "POST",
          credentials: "include",
        });
        setUser('')
       
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <IconButton color="inherit" className={classes.menu} onClick={handleDrawerOpen}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Button className={classes.button} color='inherit' onClick={()=>history.push('/')}>
            <Typography variant="h6" className={classes.name}> Garage</Typography>
            <BuildIcon/>
            </Button>
            <div className={classes.title}/>
            {user ?
            (<Button color='inherit' variant="outlined" onClick={handleLogout}>logout</Button>)
            :(<Button color='inherit' variant='outlined' onClick={()=>history.push('/login')}>login</Button>)
            }
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar
