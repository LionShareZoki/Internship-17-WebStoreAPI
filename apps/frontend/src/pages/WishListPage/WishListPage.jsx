import { useState, useEffect } from "react";
import styles from "./WishListPage.module.css";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:3000/wishlist-items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWishlistItems(data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, []);

  const removeFromWishlist = (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch(`http://localhost:3000/wishlist-items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          // Filter out the removed item from the wishlistItems state
          setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
          console.log("Item removed from wishlist successfully");
        } else {
          console.error("Failed to remove item from wishlist:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  return (
    <div className={styles.wishlistContainer}>
      <h2>Wishlist</h2>
      <ul>
        {Array.isArray(wishlistItems) &&
          wishlistItems.map((item) => (
            <li className={styles.wishlistItem} key={item.id}>
              <div>{item.name}</div>
              <div>${item.price}</div>
              <button
                className={styles.removeButton}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
