import { useState } from "react";
import styles from "./WishListPage.module.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 20 },
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className={styles.wishlistContainer}>
      <h2>Wishlist</h2>
      <ul>
        {wishlistItems.map((item) => (
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
