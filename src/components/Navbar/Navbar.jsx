import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo-min.png";
import Button from "../pages/Button";
import NavLinks from "./NavLinks";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
const Navbar = () => {
  const [open, setOpen] = useState(false);



  const logout  = useAuth(); 

  const handleLogout = () => {
    // Call the logout method when the logout button is clicked
    logout();
    // Redirect the user to the login page after logout
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#222] text-[#fff]">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <img src={Logo} alt="logo" className="md:cursor-pointer h-9" />
          <div
            className="text-3xl text-[#fff] md:hidden"
            onClick={() => setOpen(!open)}
          >
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <Link to="/home" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
        </ul>
        <div className="md:block hidden">
          {/* <Button /> */}
        </div>
          <LogoutOutlined style={{fontSize:'2rem',cursor:'pointer'}} onClick={handleLogout} />
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-[#222] text-[#fff] fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li>
            <Link to="/home" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="py-5">
            <Button />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
