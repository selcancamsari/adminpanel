import React, { useState, useRef, useEffect } from "react";
import {Link} from 'react-router-dom';
//import {useAlert} from 'react-alert';
import "../../Components/LoginRegister.css";

import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";
import emailIcon from "../Assets/email.png";

import axios from '../Api/axios';

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
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //const [matchPwd, setMatchPwd] = useState("");
  //const [validMatch, setValidMatch] = useState(false);
  //const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
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

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // USER_REGEX.test(user);
    // PWD_REGEX.test(pwd);
    if (!user || !pwd || !email) {
      setErrMsg("Invalid Entry");
      return;
    }
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
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
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
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="header">
            <div className="text"> Sign Up</div>
            <div className="underline"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={userIcon} alt="" />
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="User Name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && !validName ? "instructions" : "offscreen"
                  }
                >
                   Required Field !
                </p>
              </div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  Required Field !
                </p>
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                <img src={emailIcon} alt="" />
                <input
                  required
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && !validEmail ? "instructions" : "offscreen"
                  }
                >
                   Required Field !
                </p>
              </div>
            </div>

            <div className="submit-container">
              <button className="submit">Sign Up</button>
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
