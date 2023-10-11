import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Login successful");
        navigate("/home"); // Redirect to home or any other page after login
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    /*
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Toaster />
    </div>
    */



    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/max2.png"
          alt="code-connect-classroom-logo"
        />

        <form className="joinBox" onSubmit={handleLogin}>
          <div className="inputGroup">
            <h4 className="mainLabel">Email:</h4>
            <input
          type="email"
          placeholder="Enter your Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          </div>
          <div className="joinBoxInputWrapper">
            <h4 className="mainLabel">Password:</h4>
            <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>
          
          
          <button className="btn joinBtn" type="submit">
            LogIn
          </button>
          <p className="createInfo">
            Dont have an account{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#4aee88", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}>
              SignUp
            </span>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
  
};

export default Login;
