import React from "react";
import NavBar from "../../components/Navbar";
import { Card, CardMedia, ButtonBase, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Home.css";
import LapBoy from "../../images/LabBoy.png";
import homeBg from "../../images/homeBg.jpg";

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
            sx={{ backgroundColor: "#4aed88" }}
          >
            Go to Editor
          </Button>
          <ArrowForwardIcon className="arrow-icon" />
        </ButtonBase>
      </div>
    </div>
  );
}

export default Home;
