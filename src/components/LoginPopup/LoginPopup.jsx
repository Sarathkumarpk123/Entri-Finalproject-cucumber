import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin, setToken }) => {
  const [currState, setCurrState] = useState("Login"); // Login or Sign Up state
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // Initialize the navigate hook

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
  
    try {
      let response;
      let result;
      if (currState === "Login") {
        // Try to login as a user
        response = await fetch('https://cucumber-backend-main.onrender.com/login/userlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
        result = await response.json();
  
        // If user login fails, try to login as an admin
        if (!response.ok) {
          response = await fetch('https://cucumber-backend-main.onrender.com/login/adminlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          });
          result = await response.json();
        }
      } else {
        // Sign up user (only happens if "Sign Up" state is selected)
        response = await fetch('https://cucumber-backend-main.onrender.com/usersignup/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });
        result = await response.json();
      }
  
      if (response.ok) {
        toast.success(`${currState} successful!`); // Use toast instead of alert
  
        // Set both token and name in localStorage and state
        setToken(result.token); 
        localStorage.setItem("token", result.token);      
        localStorage.setItem("name", result.name); 
        console.log("result.name puthiyath", result.name)
        localStorage.setItem("email",result.email)
        console.log("email veendum adichu", result.email)
        setShowLogin(false); // Close the popup
  
        // Navigate based on the role
        if (result.role === "admin") {
          navigate('/')
        } else {
          navigate('/userprofile', { state: { token: result.token, name: result.name } });
        }
      } else {
        toast.error(result.message || "An error occurred. Please try again."); // Use toast instead of alert
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred. Please try again."); // Use toast instead of alert
    }
  };
  
  return (
    <div className='login-popup'>
      <Toaster /> {/* Add Toaster here */}
      <form onSubmit={onLogin} className='login-popup-container'>
        <button onClick={() => setShowLogin(false)}>CLOSE</button>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <div className='current-state-button'>
          <button type='submit'>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
        </div>

        <div className='login-popup-conditions'>
          <div style={{ display: 'flex', gap: "10px" }}>
            <input type='checkbox' required style={{ width: '20px' }} />
            <p>
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
