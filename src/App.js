//import React, { useEffect, useState } from "react";
import Login from "./Components/LoginRegister/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
//import Layout from "./Components/Layout";
import Menu from "./Components/Menu";
import Navbar from './Components/Navbar'
import BuildingCongiguration from "./Components/BuildingConfiguration";

function App() {

  // const [LoggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('user_info'));
  //   if (userInfo && userInfo.id) {
  //     setLoggedIn(true);
  //   }

  //   const handleStorageChange = (e) => {
  //     if (e.key === 'user_info' && !e.newValue) {
  //      // toast.error("Your session will expire after a short while.")
  //       setLoggedIn(false);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<LoginRegister />} />
        <Route path="menu" element={<Menu/>}/>
        <Route path="buildConfiguration" element={<BuildingCongiguration/>}/>

        <Route
            path="/*"
            element={<Navigate to="/login" />}  
          />
      </Routes>
    </div>
  );
}

export default App;
