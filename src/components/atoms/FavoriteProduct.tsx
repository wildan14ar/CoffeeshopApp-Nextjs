"use client";

import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// HeartIcon Component with GET and PATCH requests
export default function FavoriteProduct({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the initial favorite status when the component mounts
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/review/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorite);
        } else {
          setError("Failed to load favorite status");
        }
      } catch (err) {
        setError("Error fetching favorite status");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [productId]);

  // Toggle favorite status and send PATCH request to update
  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const newFavorite = !isFavorite;
      const res = await fetch(`/api/product/review/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: newFavorite }),
      });

      if (res.ok) {
        setIsFavorite(newFavorite);
      } else {
        setError("Failed to update favorite status");
      }
    } catch (err) {
      setError("Error updating favorite status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      style={{ cursor: "pointer", fontSize: "24px", color: "red" }}
    >
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
}
