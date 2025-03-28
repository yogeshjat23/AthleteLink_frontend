// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router,  Routes,  Navigate } from 'react-router-dom';
import StickyNavbar from './components/pages/Home';
import  './App.css';
import Login from './components/pages/Login' ;
import Join_page from './components/pages/Join_page';
import { AuthProvider , useAuth } from './components/context/AuthContext';
import Main from  './components/pages/Main' 
import Chat from './components/pages/chat';
import About from './components/pages/about' ;
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => ( 

  <Routes  > 
    
     <Route  path="/"  element = {  <StickyNavbar/> } />
     <Route path ="/login" element ={ <Login/>} /> 
     
     <Route path = "/Join_page" element = {  <ProtectedRoute element ={<Join_page/>} /> } /> 
     <Route  path ="/main" element= { <ProtectedRoute element ={<Main/>} /> } />  
     <Route  path ="/chat" element ={<ProtectedRoute element ={<Chat/>} /> } />   
     <Route path ="/about" element ={ <About/>} />
         
  </Routes>
    
   
);

const App = () => ( 
 
  <Router basename="/" >  
  <AuthProvider>
      <AppRoutes />
      </AuthProvider>
  </Router>
);

export default App;
