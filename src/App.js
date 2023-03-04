import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Login from "./components/Login";
import Contacts from "./components/Contacts";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthToken(token); 
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try { 
      const response = await axios.post("/login", { username, password });
      Cookies.set("token", response.data.token);
      console.log(response.data.token); 
      setAuthToken(response.data.token); 
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setAuthToken(""); 
    setLoggedIn(false);

  };

  return (
    <Router>
      <div className="container">
      {loggedIn ? <Contacts handleLogout={handleLogout} authToken={authToken} /> : <Login handleLogin={handleLogin} />}
      </div>
    </Router>
  );
}

export default App;
