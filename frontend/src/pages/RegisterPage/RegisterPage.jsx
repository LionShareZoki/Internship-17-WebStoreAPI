import { useState } from "react";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with:", { name, email, password });
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.registerFormInput}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className={styles.registerFormInput}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className={styles.registerFormInput}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.registerFormButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
