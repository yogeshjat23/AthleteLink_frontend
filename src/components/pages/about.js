import React from "react"  ; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import '../style/About.css'  ; 
import Logo from "../assets/logo.webp"; 
import profileImage from "../assets/progile.jpg";   
import photo from  "../assets/1000_F_513761212_i3z6vHUNV0bQ8pjkBGO3yrpLg8zs4mFK.jpg" 

import { FaInstagram, FaLinkedin } from "react-icons/fa"; 


const AboutMe = () => { 
    const { isAuthenticated, logout } = useAuth();  
    const navigate = useNavigate() ;
  return ( 
     <> 
      <div className="container3">
              <div className="navbar-collapse">
                <a href="/" className="navbar-brand">
                  <img src={Logo} className="Logo" alt="Logo" />
                </a>     

                <ul className="navbar-nav">
      <li className="navitem">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      
      <li className="navitem">
        <Link to="/main" className="nav-link">
          Find
        </Link>
      </li>
      
      <li className="navitem">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>

      {isAuthenticated ? (
        <li className="nav-item">
          <button 
            className="logout"
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior
              logout(); // Call the logout function
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <li className="nav-item">
          <button
            className="login"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>
        </li>
      )}
    </ul>



              </div>
            </div>
            <div className="about-container">
      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-text">
          <h1 className="mission-title">Our Mission</h1>
          <p>
            At <strong>Athletink</strong>, we aim to create a platform where sports
            enthusiasts can easily find players, form teams, and play together. Whether 
            you're looking for a casual game or a competitive match, we connect you with 
            the right people at the right time.
          </p>
          <p>
            Our goal is to build a strong, active sports community where skill 
            level, gender, and location no longer become barriers to playing the 
            game you love.
          </p>
        </div>
        <div className="mission-image">
          <img src={photo} alt="Mission" />
        </div>
      </div>

      
      <div className="profile-card">
        <img src={profileImage} alt="Profile" className="profile-img" />
        <h2>Yogesh Jat</h2>
        <p className="profile-role">Founder of Athletink</p>
        <p>
          Passionate about sports and technology, I built Athletink to make it 
          easier for people to connect and play together. Join us in creating a 
          more active and engaging sports community!
        </p> 
        <div className="social-links">
          <a href="https://www.instagram.com/yogesh_jat_rj?igsh=MWM3OG44bmUwZnVidw==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.linkedin.com/in/yogesh-jat-5b0898257/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutMe;
