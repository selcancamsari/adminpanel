import Login from "./Components/LoginRegister/Login";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Layout from "./Components/Layout";
import Menu from "./Components/Menu";
import BuildingCongiguration from "./Components/BuildingConfiguration";

function App() {
  return (
    <div>
      {/* Kayıt Olmadan Önce Burası Çalışmalı.  */}
      {/* <LoginRegister/> */}
      {/* Kayıt Olduktan Sonra Burası Çalışmalı. */}
      {/* <Login/> */}

      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<LoginRegister />} />
        <Route path="menu" element={<Menu/>}/>
        <Route path="buildConfiguration" element={<BuildingCongiguration/>}/>
      </Routes>
    </div>
  );
}

export default App;
