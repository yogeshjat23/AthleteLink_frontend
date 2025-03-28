import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Nav from './Nav';
import usermale from '../assets/usermale.jpeg';
import userfemale from '../assets/userfemale.jpeg';
import photo from '../assets/1.jpg';
import photo1 from '../assets/2.jpeg';
import photo2 from '../assets/3..jpeg';
import photo3 from '../assets/4.jpeg';
import table_tennis from  '../assets/table-tennis.jpeg' ;
import hockey  from '../assets/hockey.jpeg' ;
import badmintion from '../assets/badminton.jpeg' ;
import volleyball from  '../assets/volleyball.png' ; 
import kabaddi from  '../assets/kabaddi.jpeg'


import '../style/Main.css';

const DealsPage = () => {
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([
    { name: "Football", logo: photo },
    { name: "Basketball", logo: photo1 },
    { name: "Tennis", logo: photo2 },
    { name: "Cricket", logo: photo3 },
    {name:"Table Tennis"  , logo: table_tennis } ,
    {name:"Volleyball" ,logo:volleyball} ,
    {name:"Badminton",logo: badmintion } ,
    {name:"Hockey",logo: hockey } , 
    {name:"Kabaddi"  , logo:kabaddi}

  ]);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sport: "",
    gender: "",
    ageRange: "",
  });
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://athletink-bak.onrender.com/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // Ensure UI updates immediately
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Refresh posts every 10 seconds
    const interval = setInterval(fetchPosts, 10000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Your current location:", position.coords);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const applyFilters = () => {
    const ageRanges = {
      "18-25": [18, 25],
      "26-30": [26, 30],
      "31-40": [31, 40],    
     "41-50":[41,50],
      "51-60":[51,60],
     "10-17":[10,17] ,
     "61-80":[61,80]
    };

    const filtered = posts.filter((post) => {
      const ageMatch =
        !filters.ageRange ||
        (post.age >= ageRanges[filters.ageRange][0] &&
          post.age <= ageRanges[filters.ageRange][1]);

      const distance =
        userLocation.lat && userLocation.lng
          ? calculateDistance(userLocation.lat, userLocation.lng, post.lat, post.lng)
          : Infinity;

      return (
        (!filters.sport || post.sport === filters.sport) &&
        (!filters.gender || post.gender === filters.gender) &&
        ageMatch &&
        distance <= 2
      );
    });

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, userLocation, posts]); // Reapply filters when posts update

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilter = (category) => {
    const filtered = posts.filter((post) => {
      const distance =
        userLocation.lat && userLocation.lng
          ? calculateDistance(userLocation.lat, userLocation.lng, post.lat, post.lng)
          : Infinity;

      return post.sport === category && distance <= 1;
    });

    setFilteredPosts(filtered);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Nav
        filters={filters}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        onSearch={applyFilter}
      /> 

      <div className="deals-page">
        <div className="category-slider">
          <div className="category-container">
            {categories.map((category, idx) => (
              <div className="category" key={idx}>
                <Link style={{ textDecoration: "none", color: "black" }}>
                  <img
                    src={category.logo}
                    alt={`${category.name} logo`}
                    onClick={() => applyFilter(category.name)}
                  />
                  <p>{category.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="deals-grid">
          {filteredPosts.map((post) => (
            <div className="deal-card" key={post.id}>
              <div className="info-container">
                <h3>{post.team_name}</h3>
                <p>Team Created by: {post.name}</p>
                <p>Sport: {post.sport}</p>
                <p>Age: {post.age}</p>
                <p>Location: {post.location}</p>
                <p>Gender: {post.gender}</p>

                <a href={`tel:${post.contact}`} className="contact-button">
                  <FaPhoneAlt /> {post.contact}
                </a>
                <p>Remaining: {post.player_need}</p>

                {post.player_need <= 0 ? (
                  <div style={{ display: "flex" }}>
                    <Link to="/Join_page" state={{ post }} style={{ textDecoration: "none" }}>
                      <button className="contact-button" style={{ backgroundColor: "red", width: "150px" }}>
                        Join
                      </button>
                    </Link>
                    <p style={{ margin: "20px", color: "red" }}>Team is full!</p>
                  </div>
                ) : (
                  <Link to="/Join_page" state={{ post }} style={{ textDecoration: "none" }}>
                    <button className="contact-button" style={{ width: "100px" }}>
                      Join
                    </button>
                  </Link>
                )}
              </div>
              <div className="image-container">
                <img src={post.gender === "Female" ? userfemale : usermale} alt={post.name} className="deal-image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DealsPage;

  
  
  
  
  {/* import React, { useEffect ,useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Nav from './Nav';
import usermale from '../assets/usermale.jpeg' ;
import userfemale from '../assets/userfemale.jpeg';
import photo from '../assets/1.jpg';
import photo1 from '../assets/2.jpeg';
import photo2 from '../assets/3..jpeg';
import photo3 from '../assets/4.jpeg';
import photo4 from '../assets/5.jpeg';

import '../style/Main.css';

const DealsPage = () => {   
  const navigate =useNavigate() ;
  
const [categories, setCategories] = useState([
  { name: "Football", logo: photo },
  { name: "Basketball", logo: photo1 },
  { name: "Tennis", logo: photo2 },
  { name: "Cricket", logo: photo3 }, 
  
  { name: "Rugby", logo: photo4 },
]);

const [posts, setPosts] = useState([]);  
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts"); 
      if (response.ok) {
        const data = await response.json();
        setPosts(data);

      } else {
        console.error("Failed to fetch posts");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

const [filters, setFilters] = useState({
  sport: "",
  gender: "",
  ageRange: "",
});

const [filteredPosts, setFilteredPosts] = useState(posts);
const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

useEffect(() => { 
  
  navigator.geolocation.getCurrentPosition(
    (position) => { 
      console.log("Your current location:", position.coords);
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
}, []);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const applyFilters = () => {
  const ageRanges = {
    "18-25": [18, 25],
    "26-30": [26, 30],
    "31-40": [31, 40],
  };

  const filtered = posts.filter((post) => {
    const ageMatch = 
      !filters.ageRange ||
      (post.age >= ageRanges[filters.ageRange][0] &&
        post.age <= ageRanges[filters.ageRange][1]);

    const distance =
      userLocation.lat && userLocation.lng
        ? calculateDistance(userLocation.lat, userLocation.lng, post.lat, post.lng)
        : Infinity;

    return (
      (!filters.sport || post.sport === filters.sport) &&
      (!filters.gender || post.gender === filters.gender) &&
      ageMatch &&
      distance <= 2 
    );
  });

  setFilteredPosts(filtered);
};
     
useEffect(() => {
  applyFilters();
}, [filters, userLocation]);

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
};


   const applyFilter = (category ) => {
  

  const filtered = posts.filter((post) => { 
    const distance =
      userLocation.lat && userLocation.lng
        ? calculateDistance(userLocation.lat, userLocation.lng, post.lat, post.lng)
        : Infinity; 


    return (
      ( post.sport === category)  && distance <= 1  

    
    );
  });

  setFilteredPosts(filtered);
}; 

if (loading) {
  return <div className="loading">Loading...</div>;
}
           


  return (
    <>
      <Nav  filters={filters}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        onSearch={applyFilter}  /> 

      <div className="deals-page">    
          
     <div className="category-slider">
  <div className="category-container">
    {categories.map((category, idx) => (
      <div className="category" key={idx}>
        <Link style={{ textDecoration: "none", color: "black" }}>
          <img
            src={category.logo}
            alt={`${category.name} logo`}
            onClick={() => applyFilter(category.name)}
          />
          <p>{category.name}</p> 
        
        </Link>
      </div>
    ))}
  </div>
</div>

        <div className="deals-grid">
          {filteredPosts.map((post) => (
            <div className="deal-card" key={post.id}>
              <div className="info-container"> 
                <h3>{post.team_name}</h3>
                <p>Admin:{post.name}</p>
                <p>Sport: {post.sport}</p>
                <p>Age: {post.age}</p>
                <p>Location: {post.location}</p>
                <p>Gender: {post.gender}</p> 
              
                <a href={`tel:${post.contact}`} className="contact-button">
  <FaPhoneAlt /> {post.contact}
                </a> 
                <p>Remaining: {post.player_need}</p> 
               {post.player_need<=0 ? < div  style ={{ "display":"flex" ,  }} >  
               <Link 
      to="/Join_page" 
      state={{ post }} 
      style={{ textDecoration: "none" }}
    >
       <button className ="contact-button" style ={{ "background-color":"red" ,"width": "150px"  }}    > 
                    Join
                </button> 
                </Link>
                <p  style ={{ "margin":"20px" , "color":"red" }} >Team is full!</p>
                </div>
                 :( 
                  <Link 
      to="/Join_page" 
      state={{ post }} 
      style={{ textDecoration: "none" }}
    >
      <button 
        className="contact-button" 
        style={{ width: "100px" }}
      >
        Join
      </button>
    </Link>


               )}
                
              </div>
              <div className="image-container">
                <img src={post.gender === 'Female' ? userfemale : usermale}alt={post.name} className="deal-image" />
              </div> 
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default  DealsPage ;   */}