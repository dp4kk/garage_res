import React from "react";
import "./App.css";
import FormicForm from "./components/FormicForm";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DataContext from "./contexts/DataContext";
import { Home } from "./pages/Home";
import Services from "./pages/Services";
import Register from './pages/Register'
import Login from "./pages/Login";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Footer from "./components/Footer";
import {PrivateRoute} from './contexts/PrivateRoute'
function App() {
  return (
    <React.Fragment>
      <Router>
        <DataContext>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <React.Fragment>
              <Navbar />
              <Sidebar />
              <Route exact path="/" component={Home} />
              <Route path="/services" component={Services} />
              <PrivateRoute path="/bookservice" component={FormicForm} />
            </React.Fragment>
          </Switch>
          <Footer />
        </DataContext>
      </Router>
    </React.Fragment>
  );
}

export default App;

