import React, { useState} from "react";
import {yupResolver} from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import authService from "../../Services/Auth.service";

import {Link} from 'react-router-dom';
import "../../Components/LoginRegister.css";
import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/password.png";
import emailIcon from "../Assets/email.png";
//import { Alert, Button, Input } from "antd";

//kullanıcı adı ve parola için herhangi bir kısıtlama belirtilmediği için bu regexleri kullanmadım.
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const LoginRegister = () => {

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState();

const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm({
  mode: 'all',
  resolver: yupResolver(schema)
}) ;

const handleValidSubmit = async (data) => {

  setIsSubmitted(true);
  try {
    const result = await authService.register(data);
    if(result.data) {
      navigate('/');
    }
  }
  catch(error) {

  }
  setIsSubmitted(false);
}


  return (
    <div className="container">

          <div className="header">
            <div className="text"> Sign Up</div>
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

              { errors.username && <p className="myAlert"> {errors.username.message} </p> }
             
              <div className="input">
                <img src={passwordIcon} alt="" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register('password')}

                />
              </div>
              { errors.password && <p className="myAlert">{errors.password.message}</p> }
              <div className="input">
                <img src={emailIcon} alt="" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register('email')}

                />
              </div>
              { errors.email && <p className="myAlert">{errors.email.message}</p> }
            </div>

            <div className="submit-container">
              <button className="submit" disabled={isSubmitted || !isDirty || !isValid}>Sign Up</button>
              <p>
                Already registered?
                <br />
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </form>
        
      
    </div>
  );
};

export default LoginRegister;
