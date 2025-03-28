import React, { useState } from "react";
import "../style/Login.css";
import googleLogo from "../assets/7123025_logo_google_g_icon.svg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false); 
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setError("");
      login();
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
      });

      console.log(response.data);
      setError("");
      alert("Signup successful! Please verify your email using the OTP sent to you.");
      setIsOtpVerification(true); // Move to OTP verification step
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });

      console.log(response.data);
      alert("Email verified successfully! You can now log in.");
      setError("");
      setIsOtpVerification(false); // Move to login step
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {isOtpVerification ? (
        <div className="login-form">
          <h1>VERIFY YOUR EMAIL</h1>
          <p>Please enter the OTP sent to your email.</p>
          <form onSubmit={handleVerifyOtp}>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="sign-in-button" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : isLogin ? (
        <div className="login-form">
          <h1>WELCOME BACK</h1>
          <p>Welcome back! Please enter your details.</p>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="options">
              <a href="#">Forgot password</a>
            </div>
            <button className="sign-in-button" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign in"}
            </button>
            <p className="signup-link">
              Don’t have an account?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                Sign up for free!
              </a>
            </p>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div className="login-form">
          <h1>WELCOME</h1>
          <p>Welcome! Please enter your details.</p>
          <form onSubmit={handleSignup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="*********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="sign-in-button" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign up"}
            </button>
            <p className="signup-link">
              Already have an account?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                Sign in for free!
              </a>
            </p>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
