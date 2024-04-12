import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const related = data.filter(
            (item) => item.id.toString() !== productId
          );
          const shuffledRelated = related
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setRelatedProducts(shuffledRelated);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [productId]);

  const addToCart = () => {
    console.log("Product added to cart:", product);
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated. Unable to add to wishlist.");
        return;
      }

      const response = await fetch("http://localhost:3000/wishlist-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          wishlistId: 2,
          productId: parseInt(productId),
        }),
      });

      if (response.ok) {
        console.log("Product added to wishlist successfully");
      } else {
        console.error(
          "Failed to add product to wishlist:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  if (!product) return <div>Učitavanje...</div>;

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.img} />
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Cijena: ${product.price}</p>
      <div className={styles.buttonsContainer}>
        <button className={styles.addToCartButton} onClick={addToCart}>
          Add to Cart
        </button>
        <button className={styles.addToWishlistButton} onClick={addToWishlist}>
          Add to Wishlist
        </button>
      </div>
      <div className={styles.relatedProductsSection}>
        <h2>Možda će vam se svidjeti</h2>
        <div className={styles.relatedProducts}>
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className={styles.relatedProductCard}
            >
              <img
                src={item.image}
                alt={item.title}
                className={styles.relatedProductImage}
              />
              <h3 className={styles.relatedProductTitle}>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
