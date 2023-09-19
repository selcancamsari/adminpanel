import Login from "./Components/LoginRegister/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import BuildingConfiguration from "./Components/BuildingConfiguration";

function App() {

  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<LoginRegister />} />
        <Route path="buildConfiguration" element={<BuildingConfiguration/>}/>

        <Route
            path="/*"
            element={<Navigate to="/login" />}  
          />
      </Routes>
    </div>
  );
}

export default App;
