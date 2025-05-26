import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRef, useState } from "react";
import LogIn from "../login/Login";
import useTypingEffect from "./useTypingEffect";
import '../../css/HomePage.css'

const HomePage = () => {
  const [showLogIn, setShowLogIn] = useState(false);
  const typedText = useTypingEffect("Streamline Your Team Meetings", 150, 250, 100);
  const topRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 40 }} />,
      title: "Audio Transcription",
      description: "Automatically convert meeting recordings into searchable text"
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: "Team Collaboration",
      description: "Share meeting notes with your team members instantly"
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      title: "PDF Export",
      description: "Export transcriptions as PDF documents for easy sharing"
    }
  ];

  const handleLoginToggle = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowLogIn(prev => !prev);
  };

  return (
    <Box className="home-root">
      <div ref={topRef}></div>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" className="hero-section">
          <Grid item xs={12} md={6} className="hero-left">
            <Box className="typing-container">
              <Typography variant="h2" component="h1" className="typing-title">
                {typedText}
                <Box className="typing-underline" />
              </Typography>
            </Box>

            <Typography variant="h5" className="subtitle">
              The ultimate tool for managing and transcribing your development team meetings
            </Typography>

            {showLogIn && <LogIn onClick={handleLoginToggle} />}
          </Grid>

          <Grid item xs={12} md={6} className="hero-right" />
        </Grid>
      </Container>

      <Box className="features-section">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" className="features-title">
            Key Features
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper className="feature-card shadow-hover" elevation={0}>
                  <Box className="feature-icon">{feature.icon}</Box>
                  <Typography variant="h5" component="h3" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" className="feature-desc">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box className="cta-section">
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" className="cta-title">
            Ready to Transform Your Meetings?
          </Typography>

          <Typography variant="h6" component="p" className="cta-subtitle">
            Join thousands of development teams who use DevNote to streamline their meeting workflows
          </Typography>

          <Button variant="contained" size="large" onClick={handleLoginToggle} className="cta-button">
            Get Started Now
          </Button>
        </Container>
      </Box>

      <Box className="footer">
        <Container>
          <Typography variant="body2" className="footer-text">
            © {new Date().getFullYear()} DevNote. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;







