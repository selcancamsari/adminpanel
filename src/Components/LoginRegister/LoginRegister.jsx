import React, { useState } from "react";
import "./LoginRegister.css";

import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";

const LoginRegister = () => {

    const [action] = useState("SignUp");
//setAction
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={userIcon} alt="" />
          <input type="text" placeholder="UserName"/>
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={passwordIcon} alt="" />
          <input type="password" placeholder="Password"/>
        </div>
      </div>
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"}>
            Sign Up
        </div>
        <div className={action === "SignUp" ? "submit gray" : "submit"}>
            Sign In
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
