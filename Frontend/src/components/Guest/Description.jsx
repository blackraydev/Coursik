import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Description.css";

const Description = () => {
    return(
        <div className="description">
            <h1>Manage and organise team works simply</h1>
            <p>
                From the small stuff to the big picture, Coursik organizes work so
                teams are clear what to do, why it matters, and how to get it done.
            </p>
            <NavLink className="link" to="/register"> 
                <button className="create-project">
                    Start a new project 
                </button>
            </NavLink>
        </div>
    )
}

export default Description;