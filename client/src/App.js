import React,{Fragment} from "react";
import './App.css';
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import User1 from "./Components/User1/User1";
import User2 from "./Components/User2/User2";
import {Switch} from "react-router-dom";
import {Route,BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" render ={props=><Login />}></Route>
            <Route exact path="/admin" render ={props=><Admin />}></Route>
            <Route exact path="/user1" render ={props=><User1 />}></Route>
            <Route exact path="/user2" render ={props=><User2 />}></Route>
          </Switch>
        </Router>
    </Fragment>
  );
}

export default App;
