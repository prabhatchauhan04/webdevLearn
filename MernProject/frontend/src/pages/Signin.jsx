import React, { useState } from "react";
import useAuth from "../context/authContext";
import auth from "../lib/auth";
import { useNavigate } from "react-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth(); 
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await signin({ email, password });
      auth.token = token;
      auth.user = user;
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Enter Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Enter Password"
        required
      />

      <button type="submit">Sign In</button>
    </form>
  );
};

export default Signin;
