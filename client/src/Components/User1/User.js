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
    const [role, setRole] = useState("");
    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
      };
    
      const isButtonSelected = (buttonRole) => {
        return buttonRole === role
          ? "btn-success select"
          : "btn-outline-success not-select";
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
            <div className="content mt-5">
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
                <div className="d-flex justify-content mt-5"> {/* Flexbox container */}
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p>A proper diet is more important to maintain a proper health and stay fit</p>
                    <img
                      src="https://graphicspedia.net/wp-content/uploads/2018/04/The-Key-to-Proper-Nutrition-A-Balanced-Diet-Infographic.jpg"
                      width={"200px"}
                      height={"150px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button
                      className={`btn ${isButtonSelected("student")}`}
                      onClick={() => handleRoleSelection("student")}
                    >
                      Diet
                    </button>
                  </div>
                </div>
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p>A proper diet is more important to maintain a proper health and stay fit</p>
                    <img
                      src="https://graphicspedia.net/wp-content/uploads/2018/04/The-Key-to-Proper-Nutrition-A-Balanced-Diet-Infographic.jpg"
                      width={"200px"}
                      height={"150px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button
                      className={`btn ${isButtonSelected("student")}`}
                      onClick={() => handleRoleSelection("student")}
                    >
                      Tracking
                    </button>
                  </div>
                </div>
                <div className="card logcard mx-3">
                <div className="card-body"> {/* New container for content */}
                    <p>A proper diet is more important to maintain a proper health and stay fit</p>
                    <img
                      src="https://graphicspedia.net/wp-content/uploads/2018/04/The-Key-to-Proper-Nutrition-A-Balanced-Diet-Infographic.jpg"
                      width={"200px"}
                      height={"150px"}
                      alt="Diet"
                    />
                  </div>
                  <div className="card-footer"> {/* New container for button */}
                    <button
                      className={`btn ${isButtonSelected("student")}`}
                      onClick={() => handleRoleSelection("student")}
                    >
                      Exercises
                    </button>
                  </div>
                </div>
                
              </div>
                </div>
                
                
            </div>
            
        </div>
        
    );
};

export default User;
