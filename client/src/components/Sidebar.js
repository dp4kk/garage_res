import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../contexts/DataContext";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BuildIcon from "@material-ui/icons/Build";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));
const Sidebar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { drawerOpen, handleDrawerClose } = useContext(AppContext);

  const Itemlist = [
    {
      text: "Services",
      icon: <BuildIcon />,
      onClick: () => history.push("/services"),
    },
    {
      text: "Book Appointment",
      icon: <ShoppingCartIcon />,
      // onClick: () => history.push("/bookservice"),
      onClick: () => history.push("/bookservice"),
    },
  ];
  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </div>
        <Divider />
        {Itemlist.map((item) => {
          const { icon, onClick } = item;
          return (
            <List key={item.text}>
              <ListItem button onClick={onClick}>
                <ListItemText primary={item.text} />
                <ListItemIcon>{icon}</ListItemIcon>
              </ListItem>
            </List>
          );
        })}
      </Drawer>
    </div>
  );
};

export default Sidebar;
