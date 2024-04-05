import { useState } from "react";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 20 },
  ]);

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li className={styles.cartItem} key={item.id}>
            <div>{item.name}</div>
            <div>${item.price}</div>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <button className={styles.paymentButton}>Proceed to payment</button>
      </div>
    </div>
  );
};

export default CartPage;
