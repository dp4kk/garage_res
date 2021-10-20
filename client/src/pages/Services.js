import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useContext } from "react";
import ServiceData from "../services.json";
import BuildIcon from "@material-ui/icons/Build";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { AppContext } from "../contexts/DataContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    listStyleType: "none",
  },
  paper: {
    width: 700,
    justifyContent: "center",
  },
  list: {
    marginLeft: theme.spacing(2),
  },
}));
const Services = () => {
  const classes = useStyles();
  const { addService, serviceItems, removeService } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        {ServiceData.map((service) => {
          const isAdded = serviceItems.find((item) => item.id === service.id);
          return (
            <ListItem key={service.id} className={classes.list}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={service.name} />
              <ListItemSecondaryAction>
                {isAdded ? (
                  <IconButton onClick={() => removeService(service)}>
                    <RemoveCircleIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => addService(service)}>
                    <AddCircleIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </Paper>
    </div>
  );
};

export default Services;
