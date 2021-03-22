import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/NavBar.css";

const NavBar = () => {
    return(
        <div className="navbar">
            <div className="logo"></div>
            <div className="buttons">
                <div className="logo">
                    <NavLink className="link" to="/">Coursik</NavLink>
                </div>
                <div className="auth_methods">
                    <NavLink className="link" to="/login"> Login </NavLink>
                    <NavLink className="link" to="/register"> Sign up </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar;