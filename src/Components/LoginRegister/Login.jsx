import "../../Components/LoginRegister.css";

//import AuthContext from "../Context/AuthProvider";
import { useRef, useState, useEffect } from "react"; //useContext
//import useAuth from "../Hooks/UseAuth";
import { Link, useNavigate } from "react-router-dom";

//import axios from "../Api/axios";

import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";
import { Button, Input } from "antd";

//const LOGIN_URL = "/auth";

const Login = () => {
  //const { setAuth } = useContext(AuthContext);
 // const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ha");

    try {
      //TODO 
      // const response = await axios.post(
      //   LOGIN_URL,
      //   JSON.stringify({ user, pwd }),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      // console.log(JSON.stringify(response?.data));

      // //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;

      // //Eğer rol yapısı olsaydı bunu backendden gönderirdik
      // //const roles = response?.data?.roles;
      // //setAuth({ user, pwd, roles, accessToken });
      // setAuth({ user, pwd, accessToken });

      // setTokenInCookie(accessToken);
      // setUser("");
      // setPwd("");
      //setSuccess(true);

      const accessToken = Math.random().toString(36).substring(2, 20);
      //setTokenInCookie(accessToken, user);

      console.log(accessToken);
      setSuccess(true);

      console.log("hhahah");
      navigate("/menu");

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();

      //TODO : Geçici Olarak True Yaptım
      setSuccess(true);
    }
  };

  // function setTokenInCookie(token, user) {
  //   const cookie = {
  //     userName: user,
  //     accessToken: token,
  //     expires: new Date(Date.now() + 3600 * 24), 
  //   };
  //   document.cookie = JSON.stringify(cookie);

  //   console.log("cookie", cookie);

  //   if (document.cookie.includes(token)) {
  //     console.log("success");
  //   }
  //   else 
  //   {
  //     console.log("error");
  //   }
  // }

  return (
    <div className="container">
      {success ? (
        <section>
          <div className="header">
            <div className="inputs">
              <div className="text"> You are logged in!</div>
              <br />
              <p>
                <a href="/menu">Go to Menu</a>
              </p>
            </div>
          </div>
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
            <div className="text"> Sign In</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <img src={userIcon} alt="" />
                <Input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className="input">
                <img src={passwordIcon} alt="" />
                <Input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
            </div>
            <div className="submit-container">
              <Button className="submit" onClick={handleSubmit}>Sign In</Button>
              <p>
                Need an Account?
                <br />
                <span className="line">
                  <Link to="/register">Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default Login;
