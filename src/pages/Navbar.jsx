import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      {/* Make logo clickable */}
      <div
        className={styles.logo}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        🍽️ FoodShare
      </div>
      <div className={styles.links}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.active : styles.link}
        >
          Home
        </Link>
        <Link
          to="/feedpost"
          className={location.pathname === "/feedpost" ? styles.active : styles.link}
        >
          FeedPost
        </Link>

        {!user.isLoggedIn ? (
          <>
            <Link
              to="/login"
              className={location.pathname === "/login" ? styles.active : styles.link}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={location.pathname === "/register" ? styles.active : styles.link}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className={styles.link} style={{ marginRight: "1rem" }}>
              Role: {user.role}
            </span>
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "1rem",
                padding: 0,
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
