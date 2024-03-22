import React, { useState, useEffect } from "react";
import videoplay from './video.mp4';
import './User.css';
// import { Outlet } from "react-router-dom";
// import UserSidebar from "./UserSidebar/UserSidebar";
const User = ({ setAuth }) => {
    const [userData, setUserData] = useState({});
    const [showUserData, setShowUserData] = useState(false);
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        setAuth(false);
    };

    const getUserData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            try {
                const response = await fetch("http://localhost:5000/getdata", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                });
                const data = await response.json();
                setUserData(data);
                setShowUserData(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            setUserData({});
            setShowUserData(false);
        }
    };
    
    const toggleUserData = () => {
        if (showUserData) {
            setUserData({});
            setShowUserData(false);
        } else {
            getUserData();
        }
    };

    return (
        
        <div className="video-background videoplay">
            <video src={videoplay} autoPlay loop muted type='video/mp4' />
            <div className="content">
                <div className="container text-center mt-5">
                <h1 style={{color:"black"}}>Logged into the application</h1>
                {localStorage.getItem("accessToken") && (
                    <>
                        
                        <button onClick={toggleUserData} className="btn btn-secondary mt-2">Click to get user details</button>
                        {showUserData && Object.keys(userData).length !== 0 && (
                            <>
                                <h4>User Name is {userData.login}</h4>
                                <img width="100px" height="100px" src={userData.avatar_url} alt="User avatar"></img>
                                <br />
                                <a href={userData.html_url}>Link to profile</a>
                            </>
                        )}
                        <br />
                        
                    </>
                )}
                {/* <button onClick={logout} className="btn btn-danger mt-4">Log out</button> */}
                {/* <UserSidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/> */}
                {/* <div id="page-wrap" >
                <Outlet />
                </div> */}
                </div>
            </div>
            
        </div>
        
    );
};

export default User;
