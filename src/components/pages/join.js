import React, { useState } from "react";
import "../style/Post.css";
import avatar from "../assets/5.webp";

const CreateCollection = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const playerData = { name, age, phoneNumber, gender , email };
    onSubmit(playerData); // Pass data to the parent component

    onClose();
  };

  return (
    <div className="create-collection-container">
      <h2 className="create-collection-heading">Join our team!</h2>
      <div className="avatar-container">
        <div className="avatar">
          <img className="avatar-img" src={avatar} alt="avatar" />
          <span className="name">Welcome!</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={name}
          placeholder="Write Full Name..."
          className="product-url-input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="number"
          value={age}
          placeholder="Age"
          className="product-url-input"
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          required
          className="product-url-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          required
          type="number"
          value={phoneNumber}
          placeholder="Phone Number"
          className="product-url-input"
          onChange={(e) => setNumber(e.target.value)}
        />   
         <input
    required
    type="email"
    value={email}
    placeholder="Email"
    className="product-url-input"
    onChange={(e) => setEmail(e.target.value)} // Add this for email state update
  />
    
        <button type="submit" className="submit-button">
          Join
        </button>
      </form>
    </div>
  );
};

export default CreateCollection;
