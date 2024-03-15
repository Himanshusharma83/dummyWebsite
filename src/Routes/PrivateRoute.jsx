import React from "react";
import { Navigate, Outlet } from "react-router";
function PrivateRoute() {
    let auth = JSON.parse(localStorage.getItem("token"));
  
    return auth && auth.token ? <Outlet /> : <Navigate to="/" />;
  }
  

  export default PrivateRoute
