import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from '../Services/Auth.service';
import buildService from '../Services/Building.service';
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
// import shortid from 'shortid';
// import * as ReactDOM from 'react-dom';


const BuildingConfiguration = () => {
  const buildingTypeList = [
    { key: "1", value: "Farm" },
    { key: "2", value: "Academy" },
    { key: "3", value: "Headquarters" },
    { key: "4", value: "LumberMill" },
    { key: "5", value: "Barracks" },
  ];
  const btl = {
    "1":"Farm",
    "2":"Academy",
    "3":"Headquarters",
    "4":"LumberMill",
    "5":"Barracks"
  }


  const [buildingType, setBuildingType] = useState([]);
  const [showClick, setShowClick] = useState(false);

  const [grid, setGrid] = useState([]);
  const [closeClick, setCloseClick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (showClick === true) {
        try {
          const response = await buildService.getBuildingTypes();
          if (response.data !== undefined) {
            setBuildingType(response.data);
          } else {
            // Handle the case where response.data is undefined
            console.error('No data received from the service.');
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [showClick]);

  useEffect(() => {
    const fetchData = async () => {
      if (closeClick === true) {
        try {
          const response = await buildService.get();
          if (response.data !== undefined) {
            setGrid(response.data);
          } else {
            // Handle the case where response.data is undefined
            console.error('No data received from the service.');
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [closeClick]);


  let resultList = [];

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCloseClick(true);
  };

  const handleShow = () => {
    setShowClick(true);
    resultList = [];

    setShow(true);

  };

  const navigate = useNavigate();
  const authUser = authService.getAuthUser();

  const getActiveClass = ({ isActive }) => isActive ? 'nav-link-active' : 'nav-link';

  const handleLogout = async () => {
    try {
      await authService.logout;
      navigate('/');
    }
    catch (er) {
      console.log(er);
    }
  }


  const [isSubmitted, setIsSubmitted] = useState();

  const schema = Yup.object().shape({
    buildingType: Yup.string().required(),
    buildingCost: Yup.number().required().min(1),
    constructionTime: Yup.number().required().min(30).max(1800),
  })

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data) => {

    setIsSubmitted(true);
    try {

      console.log("add");
      const result = await buildService.add(data);

      if (result) {
        console.log("hahah", result);

        handleClose();
        setShowClick(false);
      }

    }
    catch (error) {
      console.log(error);
    }
    setIsSubmitted(false);


  }



  return (

    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleValidSubmit)}>

            <div className="form-group">
              <label className="col-form-label">Building Type:</label>
              <select className="form-control"
                {...register('buildingType')}
                id="buildingType"
              >
                {buildingType.map((s) => {
                  return <option key={s.id} value={s.buildingType}>{s.name}</option>
                })}

              </select>
            </div>
            <div className="form-group">
              <label className="col-form-label">Building Cost:</label>
              <input className="form-control"
                type="number"
                id="buildingCost"
                {...register('buildingCost')}
              />
            </div>
            {errors.buildingCost && <p className="myAlert"> {errors.buildingCost.message} </p>}

            <div className="form-group">
              <label className="col-form-label">Construction Time:</label>
              <input className="form-control"
                type="number"
                id="constructionTime"
                {...register('constructionTime')}

              />

              {errors.constructionTime && <p className="myAlert"> {errors.constructionTime.message} </p>}

            </div>
            <div className="form-group">
              <Button variant="primary" type="submit" disabled={isSubmitted || !isDirty || !isValid}>
                Save Changes
              </Button>
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <ul className="nav nav-pills">
          {
            authUser
              ?
              <div>
                <li className="nav-item">
                  <Link to={'/'} onClick={handleLogout} className="nav-link active">Logout</Link>
                </li>
              </div>
              :
              <>
                <li className="nav-item">
                  <NavLink to={'/'} end className={getActiveClass}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/register'} end className={getActiveClass}>Register</NavLink>
                </li>
              </>
          }
        </ul>
      </header>

      <div>
        <div> Building Configuration</div>
        <div></div>
      </div>
      <div>
        <Button onClick={handleShow}>
          Add
        </Button>        </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Building Type</th>
            <th scope="col">Building Cost</th>
            <th scope="col">Construction Time</th>
          </tr>
        </thead>
        <tbody>

          {grid.map((item) => (
            <tr>
              <th scope="col">{btl[item.buildingType]}</th>
              <th scope="col">{item.buildingCost}</th>
              <th scope="col">{item.constructionTime}</th>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  );
};

export default BuildingConfiguration;
