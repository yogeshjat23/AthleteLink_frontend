import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
   import "../style/Nav.css" ;  
   import Logo from "../assets/logo.webp"; 
  import CreateCollection from "./Post" 
         
const Nav=( {filters, handleFilterChange, applyFilters, onSearch })=>{  
  const handleSearch = (event) => {
    const category = event.target.value; 
    onSearch(category);
  };
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleOverlayClick = (e) => {
      if (e.target.id === "modalOverlay") {
        closeModal();
      }
    };    
        

      const { isAuthenticated, logout } = useAuth();  
         const navigate = useNavigate() ;
   
return (    
  <div className="navbar">
  <div className="navbar-content">
    <div className="container1">
      <div className="navbar-collapse">
        <a href="/" className="navbar-brand">
          <img src={Logo} className="Logo" />
        </a>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* for new post */}
        <div className="page-container">
          <button onClick={openModal} className="post-button">
            Post
          </button>

          {isModalOpen && (
            <div
              id="modalOverlay"
              className="modal-overlay"
              onClick={handleOverlayClick}
            >
              <div className="modal-content">
                <CreateCollection onClose={closeModal}    />
              </div>
            </div>
          )}
        </div>
        {/* end */}

        <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/" >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/main" >
          Find
        </Link>
      </li>
      <li  className="nav-item">
        <Link className="nav-link" to="/about" >
          About
        </Link>
      </li>
      
      {isAuthenticated ? (
        <li className="nav-item">
          <button
            className="logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <li className="nav-item">
          <button
            className="login"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </li>
      )}
    </ul>
      </div>
    </div>
    
    <div className="filter-section"> 
        <div className ="filter-section-div"> 
      <select className ="filter-section-div-section" name="sport" onChange={handleFilterChange} value={filters.sport}>
        <option value="">Select Sport</option>
        <option value="Basketball">Basketball</option>
        <option value="Tennis">Tennis</option>
        <option value="Football">Football</option>
        <option value="Cricket">Cricket</option>  
        <option value="Table Tennis">Table Tennis</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Badminton">Badminton</option>
          <option value="Hockey">Hockey</option>  
          <option value="Kabaddi">Kabaddi</option>  

      </select> 
      </div>
           <div className ="filter-section-div"> 
      <select className ="filter-section-div-section" name="gender" onChange={handleFilterChange} value={filters.gender}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select> 
      </div>
  <div className ="filter-section-div" >
      <select className ="filter-section-div-section" name="ageRange" onChange={handleFilterChange} value={filters.ageRange}>
        <option value="">Select Age</option> 
        <option value="10-17">10-17</option>
        <option value="18-25">18-25</option>
        <option value="26-30">26-30</option>
        <option value="31-40">31-40</option> 
        <option value="41-50">41-50</option>
        <option value="51-60">51-60</option>
        <option value="61-80">61-80</option> 
        
      </select> 
      </div> 
      <div className ="filter-section-div" >

      <button className = "btn1" onClick={applyFilters}   >Apply Filters</button> 
      </div>
    </div> 
  </div>
</div> 



);

}
export default Nav ;


