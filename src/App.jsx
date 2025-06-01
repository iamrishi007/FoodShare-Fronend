import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FeedPost from "./pages/FeedPost";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null,
  });

  const handleLogin = (role) => {
    setUser({
      isLoggedIn: true,
      role,
    });
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      role: null,
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedpost" element={<FeedPost />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={user.isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>

      
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
