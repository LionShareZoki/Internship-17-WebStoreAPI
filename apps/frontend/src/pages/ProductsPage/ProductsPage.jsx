import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import heart from "./../../assets/heart.svg";

import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const searchQueryStr = searchQuery ? searchQuery.toLowerCase() : "";
        const filteredProducts = data.filter((product) =>
          product.name.toLowerCase().includes(searchQueryStr)
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [searchQuery, navigate]);

  const addToCart = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/cart-items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: 1,
        productId: productId,
        quantity: 1,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Product added to cart");
        } else {
          console.error("Failed to add product to cart:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const addToWishlist = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/wishlist-items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Product added to wishlist");
        } else {
          console.error("Failed to add product to wishlist:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleProductClick(product.id)}
          className={styles.productCard}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
          <h2 className={styles.productTitle}>{product.name}</h2>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => addToCart(product.id)}
            >
              Buy
            </button>
            <button
              className={styles.addToWishlistButton}
              onClick={() => addToWishlist(product.id)}
            >
              <img src={heart} alt="Add to wishlist" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
