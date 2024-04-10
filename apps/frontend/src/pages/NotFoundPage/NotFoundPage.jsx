import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <h2>Oops! Stranica nije pronađena.</h2>
      <p>
        Izgleda da stranica koju tražite ne postoji ili je možda premještena.
      </p>
      <Link to="/" className="home-link">
        Vrati se na početnu stranicu
      </Link>
    </div>
  );
};

export default NotFoundPage;
