import React from 'react';
import NavBar from '../../components/Navbar';
import { Card, CardMedia, ButtonBase, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Home.css';
import LapBoy from '../../images/LapBoy.jpg'
import homeBg from '../../images/homeBg.jpg'

function Home() {
    return (
        <div className="home-container">
            <NavBar />
            <div className="card-container">
                <Card className="card">
                    <CardMedia
                        component="img"
                        alt="Image 1"
                        height="100%"
                        src={LapBoy}
                        className="card-image"
                    />
                </Card>
                <Card className="card card-with-overlay">
                    <CardMedia
                        component="img"
                        alt="Image 2"
                        height="100%"
                        src={homeBg}
                        className="card-image"
                    />
                    <div className="overlay"></div>
                    <div className="card-content">
                        <Typography variant="h5" color="white" className="card-text">
                            Revolutionize your coding experience with our collaborative tool! Seamlessly work together in real-time, enhance productivity, and unlock limitless potential. Embrace the power of teamwork in coding excellence today!
                        </Typography>
                        <ButtonBase
                            component={Link}
                            to="/joinroom"
                            className="card-button"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                className="custom-button"
                            >
                                Go to Editor
                            </Button>
                            <ArrowForwardIcon className="arrow-icon" />
                        </ButtonBase>
                    </div>
                </Card>
            </div>
        </div>
    )
};

export default Home;