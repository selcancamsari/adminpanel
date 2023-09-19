import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../Services/Auth.service";

const AuthGuard = () => {
    const authUser = authService.getAuthUser();
    return authUser ? <Outlet /> : <Navigate to={'/'} replace />
}

export default AuthGuard