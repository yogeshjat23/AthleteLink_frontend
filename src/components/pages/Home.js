import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import { useAuth } from "../context/AuthContext";
import bgLandingPage from '../assets/123.jpg' 
import { FaLocationDot } from "react-icons/fa6"; 
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdOutlineSportsKabaddi } from "react-icons/md"; 
import { IoMdContact } from "react-icons/io"; 
import { FiMail } from "react-icons/fi"; 
import { IoMdCall } from "react-icons/io"; 
import { FaInstagramSquare } from "react-icons/fa";


const Navbar = () => {
  const [active, setActive] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleNavbar = () => {
    setActive(!active);
  };

  return (
    <div className={`container ${active ? "active" : ""}`}>
      <div className="navbar">
        <div className="menu">
          <h3 className="logo"> 
            AthleteLink
          </h3>
          <div className="hamburger-menu" onClick={toggleNavbar}>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="main">
          <header>
            <div className="overlay">    
            <div className="hero-container" style={{ backgroundImage: `url(${bgLandingPage})` }}>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">AthleteLink</h1>
        <p className="hero-text">Hey Champs! Find players, build teams, and play.</p>
       
          

        <div className="floating-stats-container">
  <div className="floating-stats">
    <div className="stats-item">
      <div className="stats-number"><FaLocationDot /></div>
      <div className="stats-label">Find nearby buddy</div>
    </div>
    <div className="stats-item"> 
    <p>Discover nearby players or teams and find the perfect match to play your favorite sport together.</p>  

      
    </div>
   
  </div>

  <div className="floating-stats">
    <div className="stats-item">
      <div className="stats-number">< IoChatbubbleEllipsesSharp /></div>
      <div className="stats-label">Chat with team</div>   
    </div>
    <div className="stats-item">
    <p>Stay connected with your team through seamless chat and coordinate your game plans effortlessly.</p> 
    </div>
   
  </div>

  <div className="floating-stats">
    <div className="stats-item">
      <div className="stats-number"><MdOutlineSportsKabaddi /></div>
      <div className="stats-label">Make team</div>
    </div>
   
    <div className="stats-item">
    <p>Create your own team, make a post, and let players join you based on gender, age, and skill level to enjoy a great game on the field.</p>
    </div>
  </div> 
</div>   



<div className="contect_contaner">
    <div className="stats-item"> 
    <div className="stats-label">Contact Us</div>
      <div className="stats-number"> < IoMdContact /></div>   
      <div className = " contect_section " >
      <p> <  FiMail />:- jatyogesh325@gmail.com</p>
      <p> <   IoMdCall  />:- 9460332955</p>  
      <p> <  FaLocationDot  />:- NIT Hamirpur , H.P</p>    
      <p>
      <a className="insta" href = "https://www.instagram.com/yogesh_jat_rj?igsh=MWM3OG44bmUwZnVidw==" > <  FaInstagramSquare  />:- Yogehs Jat </a>   
      </p>

      </div>
      
    </div>
   
   
  </div>



      </div>

   
      
    </div>


              <div className="inner"></div>
            </div>
          </header>
        </div>

        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>

      <div className="links">
        <ul>
          <li>
            <Link to="/" style={{ "--i": "0.05s" }}>
              Home
            </Link>
          </li>

      

          <li>
            <Link to="/main" style={{ "--i": "0.15s" }}>
                Find
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ "--i": "0.25s" }}>
           About
            </Link>
          </li> 
          {isAuthenticated ? (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  logout(); // Call logout function from AuthContext
                }}
                style={{ "--i": "0.1s" }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li>
              <Link to="/login" style={{ "--i": "0.1s" }}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
