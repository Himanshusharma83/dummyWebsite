import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import UserDetailsPage from "./components/pages/userDetails";


const App = () => {
 
  return (
    <>
      <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/user/:userId" element={<UserDetailsPage />} ></Route>
        </Route>
        <Route element={<Login/>} path="/"/>
        
      </Routes>
    </>
  );
};

export default App;
