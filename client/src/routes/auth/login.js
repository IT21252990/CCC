import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./login.css"
import "./signup.css";


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
        
        const userData = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(userData));

        toast.success("Login successful");
        navigate("/home"); 
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (




    <div className="signupPageBG">
      <div className="loginformWrapper">
        <img
          className="homePageLogo"
          src="/max2.png"
          alt="code-connect-classroom-logo"
        />

<h1>Login</h1>
        <form className="signUpBox" onSubmit={handleLogin}>
          <div className="inputGroup">
            <h4 className="mainLabel" style={{marginTop:"20px"}}>Email:</h4>
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
          
          
          <button className="btnsignupBtn" type="submit">
            Login
          </button>
          <p className="signUPcreateInfo">
            Dont have an account{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#4aee88", fontWeight: "bold" }}
            onClick={() => navigate("/")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
  
};

export default Login;
