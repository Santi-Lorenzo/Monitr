import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("api/users", {
        username,
        password,
      });

      setUsername("");
      setPassword("");
      navigate("/login");
    } catch (err) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Register</h2>
      <div
        className="errorMessage"
        style={{ visibility: errorMessage ? "visible" : "hidden" }}
      >
        The username {username} is not available
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login">
        <button className="linkBtn">
          Already have an account? Login here.
        </button>
      </Link>
    </div>
  );
};

export default Register;
