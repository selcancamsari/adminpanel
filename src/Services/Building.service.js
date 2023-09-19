import http from "../Utils/http-client";

const add = (data) => {
    console.log("s", data);
    return http.post('/Build/BuildingAdd', data);
}

const get = () => {
    console.log("deneme buildings");
    return http.get('/Build/GetBuilding');
}

const getBuildingTypes = () => {
    console.log("deneme servis");
    return http.get('/Build/GetBuildingTypeList');
}
const methods = {
    add,
    get,
    getBuildingTypes
}

export default methods;