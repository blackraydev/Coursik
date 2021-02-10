import React, { useState } from "react";
import { NavLink, Route, Switch, useParams } from "react-router-dom";
import { HOME, LOGOUT, PROJECTS, PROFILE, MYTASKS } from "../../services/tabConstants";
import UserBar from "./UserBar";
import Home from "./Home";
import { HomeIcon, LogoutIcon, ProfileIcon, ProjectIcon, TaskIcon } from "../Common/Icons";
import Tasks from "./Tasks";
import "../../styles/UserApp.css";
import Projects from "./Projects";

const UserApp = () => {
    const { id } = useParams();
    const [tab, setTab] = useState(getTab());

    function getTab() {
        let path = window.location.pathname;
        let index = path.lastIndexOf("/");
        
        path = path.substr(index);
        
        switch (path) {
            case "/home": return HOME;
            case "/tasks": return MYTASKS;
            case "/projects": return PROJECTS;
            case "/profile": return PROFILE;
            default: return HOME;
        }
    }

    const clearStorage = () => {
        const token = "accessToken";
        const userId = "id";

        sessionStorage.removeItem(token)
        sessionStorage.removeItem(userId);
    }

    const CustomLink = ({ tabName, url, icon, logout }) => {
        return(
            <NavLink onClick={() => logout ? clearStorage() : setTab(tabName)} 
                     className={tab === tabName ? "link focused" : "link"} 
                     to={`${url}`}>
                {icon}
                {tabName}
            </NavLink>
        )
    }

    return(
        <div className="user_app">
            <div className="container">
                <div className="navbar">
                    <div className="logo">Logo</div>
                    <div className="tabs">
                        <CustomLink tabName={HOME} url={`/home/${id}`} icon={<HomeIcon/>} logout={false}/>
                        <CustomLink tabName={MYTASKS} url={`/home/${id}/tasks`} icon={<TaskIcon/>} logout={false}/>
                        <CustomLink tabName={PROJECTS} url={`/home/${id}/projects`} icon={<ProjectIcon/>} logout={false}/>
                        <CustomLink tabName={PROFILE} url={`/home/${id}/settings`} icon={<ProfileIcon/>} logout={false}/>
                    </div>
                    <div className="logout">
                        <CustomLink tabName={LOGOUT} url="/" icon={<LogoutIcon/>} logout={true}/>
                    </div>
                </div>
                <div className="content">
                    <UserBar tab={tab}/>
                    <Switch>
                        <Route exact path="/home/:id/tasks" component={Tasks} />
                        <Route exact path="/home/:id/projects" component={Projects}/>
                        <Route exact path="/home/:id" component={Home} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default UserApp;