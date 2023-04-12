import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {};

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const res = await axios.post("api/login", {
  //       username,
  //       password,
  //     });

  //     dispatch(actions.setUser(res.data));
  //     setUsername("");
  //     setPassword("");
  //     window.localStorage.setItem(
  //       "loggedCodeNoteUser",
  //       JSON.stringify(res.data)
  //     );
  //     navigate("/");
  //   } catch (exception) {
  //     setErrorMessage("Wrong credentials");
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }
  // };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
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
