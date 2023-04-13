import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("api/auth/login", {
        username,
        password,
      });

      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBBUser", JSON.stringify(res.data));
      navigate("/expenses");
    } catch (err) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <div
        className="errorMessage"
        style={{ visibility: errorMessage ? "visible" : "hidden" }}
      >
        Invalid username or password
      </div>
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          id="username"
          name="username"
          placeholder="username"
        ></input>
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="*********"
        ></input>
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">
        <button className="linkBtn">
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
};

export default Login;
