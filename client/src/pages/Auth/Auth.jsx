import React from 'react';
import { useState } from 'react';
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import "./Auth.css";
import { registerUser, loginUser } from '../../store/slices/userSlice';

import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  console.log(user);

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const { name, email, password } = user;

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
        return;
      }

      try {
        // Dispatch the registerUser action
        await dispatch(registerUser({ name, email, password }));
        // After successful registration, you can navigate to a different page if needed
        
        if(auth.token){
          navigate("/");
        }
      } catch (error) {
        // Handle registration failure if needed
        console.log("Registration Error:", error);
      }
    } else {
      try {
        // Dispatch the loginUser action
        await dispatch(loginUser({ email, password }));
        // After successful login, you can navigate to a different page if needed
        if(auth.token){
          navigate("/");
        }
      } catch (error) {
        // Handle login failure if needed
        console.log("Login Error:", error);
      }
    }
  };


  return (
    <section className='auth-section'>
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && <img src={icon} alt='stackOverFlow' className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input type="text" name="name" id="name" onChange={(event) => setUser({ ...user, name: event.target.value })} />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(event) => setUser({ ...user, email: event.target.value })} />
          </label>
          <label htmlFor="password">
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && <p style={{ color: "#007ac6", fontSize: "16px" }}>Forgot Password</p>}
            </div>
            <input type="password" name='password' id='password' onChange={(event) => setUser({ ...user, password: event.target.value })} />
            {isSignup && <p>Passwords must have at least 8 characters <br /> and contain at least two of the following: <br /> uppercase letters, lowercase letters, numbers, and symbols.</p>}
          </label>
          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" name="check" id="check" />
              <p style={{ fontSize: "13px" }}>Opt-in to receive occasional product updates, user research invitations, company announcements, and digests.</p>
            </label>
          )}
          <button type="submit" className='auth-btn'>{isSignup ? "Sign Up" : "Login"}</button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>By clicking “Sign up”, you agree to our <span style={{ color: "#007ac6" }}>terms of <br /> service</span>, <span>privacy policy</span> and <span style={{ color: "#007ac6" }}>cookie policy </span></p>
          )}
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Login" : "Sign Up"}</button>
        </p>
      </div>
    </section>
  )
}

export default Auth;
