import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/feedpost");
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to FoodShare</h1>
      <p>
        A community-driven platform to donate surplus food or request meals when in need. 
        Connect, share, and make a difference together.
      </p>
      <button className={styles.cta} onClick={handleExplore}>
        Explore Now
      </button>
    </div>
  );
};

export default Home;
