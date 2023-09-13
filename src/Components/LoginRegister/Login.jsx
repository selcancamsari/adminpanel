import "../../Components/LoginRegister.css";

//import AuthContext from "../Context/AuthProvider";
import { useRef, useState, useEffect } from "react"; //useContext
import useAuth from "../Hooks/UseAuth";
import { Link } from "react-router-dom";

import axios from "../Api/axios";

import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";

const LOGIN_URL = "/auth";

const Login = () => {
  //const { setAuth } = useContext(AuthContext);
  const { setAuth } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      //Eğer rol yapısı olsaydı bunu backendden gönderirdik
      //const roles = response?.data?.roles;
      //setAuth({ user, pwd, roles, accessToken });
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
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
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
            </div>
            <div className="inputs">
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
            </div>
            <div className="submit-container">
              <button className="submit">Sign In</button>
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
