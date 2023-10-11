import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./signup.css";


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Basic password validation (at least 6 characters)
  if (!password || password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }
  
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (response.ok) {
        toast.success("User created successfully");
        navigate("/login");
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
  /*  <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <Toaster />
    </div>*/

    
<div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/max2.png"
          alt="code-connect-classroom-logo"
        />

        <form className="joinBox" onSubmit={handleSignup}>
          <div className="inputGroup">
            <h4 className="mainLabel">Email :</h4>
            <input
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="joinBoxInputWrapper">
            <h4 className="mainLabel">Username :</h4>
            <input
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="joinBoxInputWrapper">
            <h4 className="mainLabel">Password :</h4>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="joinBoxInputWrapper">
            <h4 className="mainLabel">Confirm Password :</h4>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Enter your Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn joinBtn" type="submit">
            SignUp
          </button>
          <p className="createInfo">
            Already have an account.{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#4aee88", fontWeight: "bold" }}
            onClick={() => navigate("/login")}>
              login
            </span>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
    
  );
};

export default Signup;
