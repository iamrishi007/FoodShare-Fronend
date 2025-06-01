import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post("https://foodshare-backend-8wvx.onrender.com/user/register", {
        username,
        email,
        password,
      });

      if (res.status === 201 || res.status === 200) {
        setMessage("Registered successfully! You can now login.");
        setUsername("");
        setEmail("");
        setPassword("");
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || "Registration failed. Try again.";

      if (errMsg.toLowerCase().includes("already")) {
        setMessage(
          <>
            User already registered. Please{" "}
            <Link to="/login" className={styles.link}>
              Login here
            </Link>
            .
          </>
        );
        setIsError(true);
      } else {
        setMessage(errMsg);
        setIsError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
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
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>

      {message && (
        <div
          className={isError ? styles.errorMessage : styles.successMessage}
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          {message}
        </div>
      )}

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#3182ce", fontWeight: "bold" }}>
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
