import React from "react";
import NavBar from "../../components/Navbar";
import { ButtonBase, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <NavBar />
      <div className="card-container">
        <ButtonBase component={Link} to="/joinroom" className="card-button">
          <Button
            variant="contained"
            color="primary"
            className="custom-button"
            sx={{ backgroundColor: "#4aed88" , borderRadius:'100px' , boxShadow: '0 10px 10px rgba(110, 161, 144, 0.3)' }}
          >
            <p style={{fontSize:'28px' ,
                         fontFamily:'Tommorow' , 
                         fontWeight:'bold' ,
                         borderRadius: '10px'}}>Go to Editor</p>
          </Button>
        </ButtonBase>
      </div>
    </div>
  );
}

export default Home;
