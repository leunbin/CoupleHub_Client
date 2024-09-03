import React, { useState } from "react";
import "./LoginModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginModal = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log("로그인 시도:", { name, password });
  };

  return (
    <div className="LoginModalRoot">
      <div className="login__container">
        <h2>Login</h2>
        <div className="login__form">
          <div className="input__group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="input__group">
            <label htmlFor="password">Password</label>
            <div className="password__input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password__toggle"
              />
            </div>
          </div>

          <Link to="/dashboard">
            <button className="login__button" onClick={handleLogin}>
              LOGIN
            </button>
          </Link>
        </div>
        {/* <div className="login__footer">
          <span>Don't have an account?</span>
          <Link to="/signup" className="signup__link">Sign up</Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginModal;
