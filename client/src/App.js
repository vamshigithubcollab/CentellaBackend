import React,{Fragment,useState} from "react";
import './App.css';
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import User1 from "./Components/User1/User1";
import Register from "./Components/Register/Register";
import {Switch} from "react-router-dom";
import {Route,BrowserRouter as Router,Redirect} from "react-router-dom";


function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
    <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" render ={props =>!isAuthenticated ? (<Login {...props} setAuth={setAuth}/>):(<Redirect to="/user1" />)}></Route>
            <Route exact path="/register" render ={props=> !isAuthenticated ? (<Register {...props} setAuth={setAuth}/>):(<Redirect to="/" />)}></Route>
            <Route exact path="/admin" render ={props=><Admin />}></Route>
            <Route exact path="/user" render ={props=><User1 />}></Route>
            </Switch>
        </Router>
    </Fragment>
  );
}

export default App;
