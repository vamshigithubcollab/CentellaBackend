import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
const Login=({setAuth })=>{
    const [inputs,setInputs]=useState({
        email:"",
        password:"",
    })
    const {email,password}=inputs;
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
        : e.target.value});
    }
    const onSubmitForm= async e=>{
        e.preventDefault();
        try {
            const user_email=email;
            const user_password=password;
            const body={user_email,user_password};
            const response=await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{"content-Type":"application/json"}
                ,
                body:JSON.stringify(body)
            });
            console.log(body);
            const parseRes=await response.json();
            const role=parseRes.role;
            localStorage.setItem("token",parseRes.token)
            if(role === 'ADMIN'){
              window.location.href="/admin";
            }
            else{
              window.location.href="/user";
            }

            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }
     return(
        <Fragment>
            <div className="container">
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    className="form-control my-3"
                    value={email}
                    onChange={e=>onChange(e)}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    className="form-control my-3"
                    value={password}
                    onChange={e=>onChange(e)}
                    required
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <div className="mt-5 text-center">
                <Link to="/">New User ..? then Login</Link>
            </div>
            </div>
        </Fragment>
     );
};

export default Login;