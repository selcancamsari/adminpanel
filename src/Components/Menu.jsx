import Layout from "antd/es/layout/layout";
import "../Components/LoginRegister.css";
import { Link } from "react-router-dom";

const Menu = () => {
  return (

    

    <div className="container">

<Layout/>


      <div className="header"> Welcome
        <div className="text"> The Menu</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <span className="line">
            <Link to="/buildConfiguration">Building Configuration</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
