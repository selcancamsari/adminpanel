import "../Components/LoginRegister.css";
import React, { useState } from "react";
import { Row, Col, Button, Select, Input } from "antd";

//import Select from "react-select";

const BuildingConfiguration = () => {
  const buildingTypeList = [
    { value: "1", label: "Farm" },
    { value: "2", label: "Academy" },
    { value: "3", label: "Headquarters" },
    { value: "4", label: "LumberMill" },
    { value: "5", label: "Barracks" },
  ];

  const dbList = [
    { buildingType: "Farm", buildingCost: "5", constructionTime: "35" },
    {
      buildingType: "Headquarters",
      buildingCost: "15",
      constructionTime: "500",
    },
  ];

  let resultList = [];

  const minCost = "1";

  const minCT = "30";
  const maxCT = "1800";

  const [buildingCost, setBuildingCost] = useState();
  const [constructionTime, setConstructionTime] = useState();

  const handleBuilding = (event) => {
    // const value = Math.max(minCost, Number(event.target.value));
    // setBuildingCost(value);
    const value = event.target.value;
    setBuildingCost(value);
  };
  const handleConstructionTime = (event) => {
    // const value = Math.max(minCT, Math.min(maxCT, Number(event.target.value)));
    // setConstructionTime(value);
    const value = event.target.value;
    setConstructionTime(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   resultList = [];

    dbList.forEach(r => {
        resultList.push({
            buildingType: r.buildingType,
            buildingCost: r.buildingCost,
            constructionTime: r.constructionTime,
          });
    });

    console.log(resultList);
  };

  const errorBuildingCost =
    buildingCost <= 0 ? "Building Cost Value must be > 0. " : "";
  const errorConstructionTime =
    constructionTime <= 30 || constructionTime >= 1800
      ? "Construction Time Value must be between 30 and 1800."
      : "";

  return (
    <div className="container">
      <div className="header">
        <div className="text"> Building Configuration</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <p
          className={errorBuildingCost ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorBuildingCost}
        </p>
        <p
          className={errorConstructionTime ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorConstructionTime}
        </p>
        <div className="inputs">
          <div className="input">
            <Select 
            className="selectStyle" 
            required
            options={buildingTypeList}
            >
            </Select>
          </div>
          <div className="input">
            <Input
              required
              type="number"
              id="buildingCost"
              placeholder="Building Cost"
              onChange={handleBuilding}
              value={buildingCost}
              min={minCost}
            />
          </div>

          <div className="input">
            <Input
              required
              type="number"
              id="constructionTime"
              placeholder="Construction Time"
              onChange={handleConstructionTime}
              value={constructionTime}
              min={minCT}
              max={maxCT}
            />
          </div>

          <div className="submit-container">
            <Button className="submit">OK</Button>
          </div>
        </div>
      </form>

      <div className="myGrid">
        <Row className="myGridTitles">
          <Col span={8}>Building Type</Col>
          <Col span={8}>Building Cost</Col>
          <Col span={8}>Construction Time</Col>
        </Row>

        <Row className="myGridContent">
          {resultList.map((item, index) => (
            <>
              <Col span={8}>{item.buildingType}</Col>
              <Col span={8}>{item.buildingCost}</Col>
              <Col span={8}>{item.constructionTime}</Col>
            </>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BuildingConfiguration;
