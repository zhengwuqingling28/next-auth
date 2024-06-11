"use client";

import { useState } from "react";
import { register, login } from "@/action/authAction";
import styles from "./auth-form.module.css"; // Import CSS module

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form action={isLogin ? login : register}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={styles.actions}>
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
        </div>
      </form>
      <button onClick={switchAuthModeHandler} className={styles.toggle}>
        {isLogin ? "Create new account" : "Login with existing account"}
      </button>
    </div>
  );
};

export default AuthForm;
