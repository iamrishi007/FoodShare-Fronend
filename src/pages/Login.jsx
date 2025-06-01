import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post("https://foodshare-backend-8wvx.onrender.com/user/login", { username, password });
      if (res.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.getItem("userId"); // store this on login

        setIsError(false);
        onLogin();
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login failed. Please try again.";
      setMessage(errMsg);
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>Log In</button>
      </form>
      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>{message}</p>
      )}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account? <Link to="/register" className={styles.link}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;