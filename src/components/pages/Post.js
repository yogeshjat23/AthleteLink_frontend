import React, { useState , useEffect } from "react";
import "../style/Post.css";
import avatar from '../assets/5.webp' ;
const CreateCollection = ({ onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState(""); 
const [location, setLocation] = useState(""); 
const [lat , setLat] =useState() ;
const [lng , setLng] = useState() ; 
const [team_name, setTeam_name] = useState() ;
const [player_need, setPlayer_need] = useState("");


useEffect(() => {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
      },
      (error) => {
          console.error("Error getting location:", error);
      }
  );
}, []);
  
              
    const handleTeam_nameChange = (e) => {
      setTeam_name(e.target.value);
    };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleSportsChange = (e) => {
    setSport(e.target.value);
  }; 
  const handlePlayer_needChange = (e) => {
    setPlayer_need(e.target.value);
  };  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !gender) {
      setError("Please fill all required fields");
      return;
  }
  setError(null);
    try {
        const response = await fetch("http://localhost:5000/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name,
                name,
                age,
                gender,
                contact: number,
                sport,
                location,
                lat,
                lng,
                player_need,
                teamDetails: [],
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        const data = await response.json();
        console.log("Post created:", data);
        alert("Post created successfully!");
        onClose();
    } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post");
    }
};



  return (
    <div className="create-collection-container">
      <h2 className="create-collection-heading">Create New Post</h2>
      <div className="avatar-container">
        <div className="avatar">
          <img className ="avatar-img" src ={avatar} />
          <span className="name">Welcome!</span>
        </div>
       
      </div>
      <form onSubmit={handleSubmit}> 
      <input
          required
          type="text"
          value={team_name} 
          placeholder="Team name..."
          className="product-url-input"
          onChange={handleTeam_nameChange}
        />
        <input
          required
          type="text"
          value={name}
          placeholder="Write Full name..."
          className="product-url-input"
          onChange={handleNameChange}
        /> 
        <input
    required
    type="text"
    value={location}
    placeholder="Location (City, State)"
    className="product-url-input"
    onChange={(e) => setLocation(e.target.value)}
/> 
        <input
          required
          type="number"
          value={age}
          placeholder="Age"
          className="product-url-input"
          onChange={handleAgeChange}
        />
        <select style={{color:""}} 
          required
          name="gender"
          className="product-url-input"
          value={gender}
          onChange={handleGenderChange}
          
        >
          <option value="" >Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          required
          type="number"
          value={number}
          placeholder="Number"
          className="product-url-input"
          onChange={handleNumberChange}
        />
        <select
          required
          name="sport"
          className="product-url-input"
          value={sport}
          onChange={handleSportsChange}
        >
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

        <input
          required
          type="number"
          value={player_need}
          placeholder="player_need"
          className="product-url-input"
          onChange={handlePlayer_needChange}
        />

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
