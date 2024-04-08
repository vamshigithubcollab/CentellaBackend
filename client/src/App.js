import React,{Fragment,useState,useEffect} from "react";
import './App.css';
import Login from "./Components/Login/Login";
// import Clogin from "./Components/Login/Clogin";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User1/User";
import Register from "./Components/Register/Register";
import {Switch} from "react-router-dom";
import {Route,BrowserRouter as Router,Redirect} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import UserProfile from "./Components/User1/UserProfile";

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  const isAuth = async ()=>{
    try {
      const response=await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
      });
      // console.log(response)
      const parseRes=await response.json()
      // console.log(parseRes);
       parseRes === true ? setIsAuthenticated(true):
       setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(()=>{
    isAuth();
  },[]);
  
  
  const notify = message =>{
    toast.error(message);
  }
  

  return (
    <Router>
      <Fragment>
        <Navbar isAuthenticated={isAuthenticated} />
          <div className="container">
          <Switch>
            <Route exact path="/admin" render={props =>isAuthenticated ? (<Admin {...props} setAuth={setAuth} notify={notify}/>):(<Redirect to="/login" />)}/>
            <Route exact path="/user" render={props =>isAuthenticated ? (<User {...props} setAuth={setAuth} notify={notify}/>):(<Redirect to="/login" />)}/>
            <Route exact path="/login" render={props =>!isAuthenticated ? (<Login {...props} setAuth={setAuth} notify={notify}/>):(<Redirect to="/user" />)}/>
            <Route exact path="/register" render={props =>!isAuthenticated ? (<Register {...props} setAuth={setAuth} notify={notify} />):(<Redirect to="/login" />)}/>
            {/* <Route exact path="/user/profile" component={UserProfile} /> */}
            <Route exact path="/user/profile" render={props =>isAuthenticated ? (<UserProfile {...props} setAuth={setAuth} notify={notify}/>):(<Redirect to="/login" />)}/>
            
          </Switch>
          </div>
      </Fragment>
    </Router>     
  );
}

export default App;
