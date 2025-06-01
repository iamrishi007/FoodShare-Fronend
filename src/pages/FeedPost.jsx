import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FeedPost.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedPost = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  const fetchPosts = () => {
    axios
      .get("https://foodshare-backend-8wvx.onrender.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClaim = async (postId, ownerId) => {
    if (currentUserId === ownerId) {
      toast.error("You cannot claim your own donation post.");
      return;
    }

    try {
      await axios.patch(`https://foodshare-backend-8wvx.onrender.com/posts/claim/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post claimed successfully!");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to claim post.");
    }
  };

  const handlePickup = async (postId) => {
    try {
      await axios.patch(`https://foodshare-backend-8wvx.onrender.com/posts/pickup/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Marked as picked up!");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to mark as picked up.");
    }
  };

  const handleComplete = async (postId) => {
    try {
      await axios.patch(`https://foodshare-backend-8wvx.onrender.com/posts/complete/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Marked as completed!");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to mark as completed.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Community Posts</h2>
      <div className={styles.grid}>
        {posts.length === 0 ? (
          <p className={styles.noPosts}>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div className={styles.card} key={post._id}>
              <div className={styles.type}>{post.type?.toUpperCase()}</div>
              <p className={styles.description}>{post.description}</p>
              <p><strong>Quantity:</strong> {post.quantity}</p>
              <p><strong>Location:</strong> {post.pickupLocation}</p>
              <p><strong>Expiry:</strong> {new Date(post.expiryDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {post.status}</p>

              {post.status === "Posted" && (
                <button
                  className={styles.button}
                  onClick={() => handleClaim(post._id, post.owner)}
                >
                  Claim
                </button>
              )}

              {post.status === "Claimed" && post.claimer === currentUserId && (
                <button
                  className={styles.button}
                  onClick={() => handlePickup(post._id)}
                >
                  Mark as Picked Up
                </button>
              )}

              {post.status === "Picked Up" && post.owner === currentUserId && (
                <button
                  className={styles.button}
                  onClick={() => handleComplete(post._id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedPost;
