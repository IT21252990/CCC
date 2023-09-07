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
