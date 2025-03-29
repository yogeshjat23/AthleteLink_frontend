import React, { useState } from "react"; 
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCollection from "./join";
import Logo from "../assets/logo.webp";

import usermale from "../assets/usermale.jpeg";
import Chat from "./chat";
import userfemale from "../assets/userfemale.jpeg";
import "../style/Join_page.css"; 
import photo from '../assets/1.jpg';
import photo1 from '../assets/2.jpeg';
import photo2 from '../assets/3..jpeg';
import photo3 from '../assets/4.jpeg';
import table_tennis from  '../assets/table-tennis.jpeg' ;
import hockey  from '../assets/hockey.jpeg' ;
import badmintion from '../assets/badminton.jpeg' ;
import volleyball from  '../assets/volleyball.png' ; 
import kabaddi from  '../assets/kabaddi.jpeg'


const AboutPage = () => { 

  const { isAuthenticated, logout } = useAuth();  
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || { post: {} };

  const [teamDetails, setTeamDetails] = useState(post.teamDetails || []);
  const [remainingPlayers, setRemainingPlayers] = useState(post.player_need);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  };

  const handleAddPlayer = async (playerData) => {
    try {
      if (remainingPlayers > 0) {
        const response = await axios.patch(
          `https://athletink-bak.onrender.com/api/post/${post._id}/add-player`,
          playerData
        );
        alert(response.data.message);

        setTeamDetails([...teamDetails, playerData]);
        setRemainingPlayers((prev) => prev - 1);
        closeModal();
      } else {
        alert("No more players needed!");
      }
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    }
  };

  if (!location.state) {
    return (
      <div>
        <h1>Invalid Access</h1>
        <button onClick={() => navigate("/main")}>Go Back to Home</button>
      </div>
    );
  }  


  const imageMap = {
    "Football": photo,
    "Basketball": photo1,
    "Tennis": photo2,
    "Cricket": photo3,
   "Table Tennis": table_tennis ,
   "Hockey": hockey  ,
   "Badminton": badmintion ,
   "Volleyball": volleyball ,
   "Kabaddi":kabaddi ,  
  
         
         
           
        
    

  };

  return (
    <>
      <div className="container3">
                   <div className="navbar-collapse">
                     <a href="/" className="navbar-brand">
                       <img src={Logo} className="Logo" alt="Logo" />
                     </a>
                     <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      
      <li className="nav-item">
        <Link to="/main" className="nav-link">
          Find
        </Link>
      </li>
      
      <li className="nav-item">
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

      <div className="about-page">
        <div className="game-detail">
          <div className="info">
            <h1>Team Details</h1>
            <p>Sport: {post.sport}</p>
            <p>Location: {post.location}</p>
            <p>Remaining Players Needed: {remainingPlayers}</p>
          </div>
          <div className="sport-icon">
            <img src={imageMap[post.sport]} className="img" alt="Profile" />
          </div>
        </div>

        <button onClick={openModal} className="post-button">Join</button>

        {isModalOpen && (
          <div id="modalOverlay" className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
              <CreateCollection onClose={closeModal} onSubmit={handleAddPlayer} />
            </div>
          </div>
        )}

        <div className="temp">
          <div className="left-container">
            <h2>Current Team Members</h2>
            <div className="players">
              {teamDetails.map((member, idx) => (
                <div key={idx} className="player">
                  <div className="info">
                    <p>Name: {member.name}</p>
                    <p>Age: {member.age} years</p>
                    <p>Gender: {member.gender}</p>
                    <p>Mail:{member.email}</p>
                  </div>
                  <div className="img-con">
                    <img src={member.gender === "Female" ? userfemale : usermale} alt={member.name} className="img" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right-container">
            <Chat teamId={post._id} teamMembers={teamDetails} />
          </div>
        </div>

        <button onClick={() => navigate("/main")}>Go Back</button>
      </div>
    </>
  );
};

export default AboutPage;

  
  
