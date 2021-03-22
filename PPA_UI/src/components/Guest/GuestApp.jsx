import React from "react";
import Description from "./Description";
import { Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import NavBar from "./NavBar";
import { LOGIN, REGISTER } from "../../constants/authConstants";
import "../../styles/GuestApp.css";

const GuestApp = () => {
    return(
        <div className="guest_app">
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Description}/>
                    <Route exact path="/login">
                        <Auth authMethod={LOGIN}/>
                    </Route>
                    <Route exact path="/register">
                        <Auth authMethod={REGISTER}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default GuestApp;