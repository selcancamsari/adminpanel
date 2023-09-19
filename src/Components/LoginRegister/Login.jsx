import "../../Components/LoginRegister.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import authService from "../../Services/Auth.service";
import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";
//import { Button, Input } from "antd";


const Login = () => {

  let navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  })

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {

    setIsSubmitted(true);
    try {
      const result = await authService.login(data);
      if (result.data) {
        navigate('/buildConfiguration');
      }
    }
    catch (error) {

    }
    setIsSubmitted(false);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Sign In</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <div className="inputs">
          <div className="input">
            <img src={userIcon} alt="" />
            <input
              type="text"
              id="username"
              placeholder="User Name"
              {...register('username')}
            />
          </div>

          {errors.username && <p className="myAlert"> {errors.username.message} </p>}

          <div className="input">
            <img src={passwordIcon} alt="" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password')}
            />
          </div>

          {errors.password && <p className="myAlert">{errors.password.message}</p>}
        </div>
        <div className="submit-container">
          <button className="submit" disabled={isSubmitted || !isDirty || !isValid}>Sign In</button>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </form>

    </div>
  );
};

export default Login;
