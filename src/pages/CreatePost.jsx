import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css"; // You can create CSS similarly to Login.module.css

const CreatePost = () => {
  const [type, setType] = useState("Food");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to create a post.");
      setIsError(true);
      return;
    }

    // Prepare data
    const postData = {
      type,
      description,
      quantity: Number(quantity),
      pickupLocation,
      expiryDate: new Date(expiryDate).toISOString(),
    };

    try {
      const res = await axios.post(
        "https://foodshare-backend-8wvx.onrender.com/post/create",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setMessage("Post created successfully!");
        setIsError(false);
        // Redirect to feed or post details page if needed
        navigate("/feedpost");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to create post.";
      setMessage(errMsg);
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Type:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={styles.input}
          >
            <option value="Food">Food Donation</option>
            <option value="Request">Request</option>
          </select>
        </label>

        <input
          className={styles.input}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
        />

        <label>
          Expiry Date:
          <input
            className={styles.input}
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.button}>
          Create Post
        </button>
      </form>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePost;
