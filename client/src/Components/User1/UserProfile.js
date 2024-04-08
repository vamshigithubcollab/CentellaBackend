import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdModeEditOutline } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

function Profile({setAuth}) {

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
};
  const [editPassword, setEditPassword] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  let [stdPassword, setStdPassword] = useState('');
  let [stdEmail, setStdEmail] = useState('');
  const passwordForm = useForm();
  const emailForm = useForm();

  const handlePassword = async (data) => {
    data.field = 'user_password';
    try {
      const response = await fetch('http://localhost:5000/user/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update name');
      }
      setIsUpdated(!isUpdated);
      console.log('Password updated successfully');
    } catch (error) {
      console.log('Error updating name:', error.message);
    }
    setEditPassword(!editPassword);
  };

  const handleEmail = async (data) => {
    data.field = 'user_email';
    try {
      const response = await fetch('http://localhost:5000/user/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update email');
      }
      setIsUpdated(!isUpdated);
      console.log('Email updated successfully');
    } catch (error) {
      console.log('Error updating email:', error.message);
    }
    setEditEmail(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        try {
          const response = await fetch('http://localhost:5000/is-verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (!response.ok) {
            throw new Error('Failed to authenticate');
            
          }
          const data = await response.json();
          console.log(data);
          setStdPassword(data.user_password); // Adjust this line based on the response structure
          setStdEmail(data.user_email); // Adjust this line based on the response structure
        } catch (error) {
          console.log('Error fetching user data:', error.message);
        }
      })();
    }
  }, [isUpdated]);
  

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-6 mt-0 m-auto p-0">
          <h3 className="text-start mb-5">Personal Details</h3>
          <div className="row p-0 m-0">
            <div className="col-sm-4 text-start p-0 py-1 m-0">
              <label htmlFor="user_password" className="fw-bold">
                Password
              </label>
            </div>
            <form className="row col-sm-8" onSubmit={passwordForm.handleSubmit(handlePassword)}>
              <div className="col-sm-9 text-start p-0 py-1 m-0">
                <input
                  type="text"
                  name="user_password"
                  id="user_password"
                  defaultValue={stdPassword}
                  disabled={!editPassword}
                  className="border fw-bold text-dark rounded"
                  {...passwordForm.register('user_password', { required: true })}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start">
                {editPassword ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={'25px'} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditPassword(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={'25px'} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {passwordForm.formState.errors.user_password?.type === 'required' && <p className="text-danger">*This field shouldn't be empty</p>}
            <hr className="m-1 p-0" />
            
            {/* Email */}
            <div className="col-sm-4 text-start p-0 py-1 m-0">
              <label htmlFor="user_email" className="fw-bold">Email</label>
            </div>
            <form className="row col-sm-8" onSubmit={emailForm.handleSubmit(handleEmail)}>
              <div className="col-sm-9 text-start p-0 py-1 m-0">
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  defaultValue={stdEmail}
                  disabled={!editEmail}
                  className="border fw-bold text-dark rounded"
                  {...emailForm.register('user_email', { required: true })}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start">
                {editEmail ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={'25px'} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditEmail(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={'25px'} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {emailForm.formState.errors.mail?.type === 'required' && <p className="text-danger">This field shouldn't be empty</p>}
            <hr className="m-1 p-0" />


            <button onClick={logout} className="btn btn-danger mt-4">Log out</button>
                
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
