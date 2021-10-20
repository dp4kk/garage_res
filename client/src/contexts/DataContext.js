import React, { createContext,useReducer,useState,useEffect } from 'react'
import {ADD_SERVICE,REMOVE} from './Actions'
import { totalServices,ServiceReducer } from './DataReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'

export const AppContext=createContext()

//style
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}));


//services
const Storage=localStorage.getItem('service')?JSON.parse(localStorage.getItem('service')):[]

const initialState={
    serviceItems:Storage,
    ...totalServices(Storage)
}
const DataContext = ({children}) => {
    const classes=useStyles()
  //user state
  const [user, setUser] = useState("");
    const [loading,setLoading]=useState(true)
  //drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [state, dispatch] = useReducer(ServiceReducer, initialState);

  const addService = (payload) => {
    dispatch({ type: ADD_SERVICE, payload });
  };

  const removeService = (payload) => {
    dispatch({ type: REMOVE, payload });
  };

  // slot
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slot, setSlot] = useState("");

  const handleSlotChange = (e) => {
    setSlot(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //for getting new access token if refresh token exists in cookie
  useEffect(() => {
    const checkRefreshToken = async () => {
      const result = await (
        await fetch("https://garage-reservation.herokuapp.com/refresh_token", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      setUser({
        accessToken: result.accesstoken,
      });
      setLoading(false);
    };
    checkRefreshToken();
  }, []);

  const contexts = {
    drawerOpen,
    handleDrawerOpen,
    handleDrawerClose,
    addService,
    removeService,
    handleSlotChange,
    handleDateChange,
    selectedDate,
    slot,
    user,
    setUser,
    ...state,
  };
  if(loading) return (<div className={classes.root}><CircularProgress color='primary'/></div>)
  return <AppContext.Provider value={contexts}>{children}</AppContext.Provider>;
}

export default DataContext
