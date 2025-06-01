import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css"; // Create this CSS file

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome to the Dashboard</h2>
      <p className={styles.subtext}>You can request donations or create a post.</p>
      <div className={styles.links}>
        <Link to="/postform" className={styles.button}>Create Post</Link>
        <Link to="/feedpost" className={styles.button}>View All Posts</Link>
      </div>
    </div>
  );
};

export default Dashboard;
