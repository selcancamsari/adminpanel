import http from "../Utils/http-client";

const register = (data) => {

    console.log("servis", data);
    try {
        return http.post('/User/Register', data);

    } catch (error) {
        console.log("deneme", error);
    }
}

const login = (data) => {

    console.log("servis login", data);

    return http.post('/User/Login', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const logout = () => {
    localStorage.removeItem('authUser');
}

const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
}

const methods = {
    login,
    register,
    logout,
    getAuthUser
}

export default methods;