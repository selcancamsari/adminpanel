import React, { useState, useRef, useEffect } from "react";
//import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
//import {useAlert} from 'react-alert';
import "../../Components/LoginRegister.css";

import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";
import emailIcon from "../Assets/email.png";

import axios from '../Api/axios';
import { Alert, Button, Input } from "antd";

//kullanıcı adı ve parola için herhangi bir kısıtlama belirtilmediği için bu regexleri kullanmadım.
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

//backende buradan gidecek
const REGISTER_URL = "/loginRegister";

const LoginRegister = () => {
  //const [action, setAction] = useState("Login");

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  //const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  //const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  //const [emailFocus, setEmailFocus] = useState(false);

  //const [matchPwd, setMatchPwd] = useState("");
  //const [validMatch, setValidMatch] = useState(false);
  //const [matchFocus, setMatchFocus] = useState(false);

  //const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    //setValidName(USER_REGEX.test(user));
    setValidName(user);
  }, [user]);

  useEffect(() => {
    //setValidPwd(PWD_REGEX.test(pwd));
    setValidPwd(pwd);
  }, [pwd]);

  useEffect(() => {
    setValidEmail(email);
  }, [email]);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const navigate = useNavigate();
    console.log(user, pwd, email);
    // USER_REGEX.test(user);
    // PWD_REGEX.test(pwd);
    // if (!user || !pwd || !email) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);

      setUser("");
      setPwd("");
      setEmail("");

     // navigate('/')
    } catch (err) {
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 409) {
      //   setErrMsg("Username Taken");
      // } else {
      //   setErrMsg("Registration Failed");
      // }
      errRef.current?.focus();
    }
  };

  return (
    <div className="container">
      {success ? (
        <section>
          <h1>Success!</h1>
          <p><a href="/login">Sign In</a></p>
        </section>
      ) : (
        <section>

          <div className="header">
            <div className="text"> Sign Up</div>
            <div className="underline"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={userIcon} alt="" />
                <Input
                  required
                  type="text"
                  id="username"
                  placeholder="User Name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  aria-invalid={validName ? "false" : "true"}
                  // onFocus={() => setUserFocus(true)}
                  // onBlur={() => setUserFocus(false)}
                />
              </div>
              { !user ? <Alert className="myAlert" message="User Name" type="error" showIcon /> : " " }
              <div className="input">
                <img src={passwordIcon} alt="" />
                <Input
                  required
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  aria-invalid={validPwd ? "false" : "true"}
                  // onFocus={() => setPwdFocus(true)}
                  // onBlur={() => setPwdFocus(false)}
                />
              </div>
              { !pwd ? <Alert className="myAlert" message="Password is Required" type="error" showIcon /> : " " }
              <div className="input">
                <img src={emailIcon} alt="" />
                <Input
                  required
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  aria-invalid={validEmail ? "false" : "true"}
                  // onFocus={() => setEmailFocus(true)}
                  // onBlur={() => setEmailFocus(false)}
                />
              </div>
              { !email ? <Alert className="myAlert" message="Email is Required" type="error" showIcon /> : " " }
            </div>

            <div className="submit-container">
              <Button className="submit">Sign Up</Button>
              <p>
                Already registered?
                <br />
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default LoginRegister;
