import React, { useState } from "react";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { HOME, LOGOUT, PROJECTS, PROFILE, MYTASKS } from "../../constants/tabConstants";
import UserBar from "./UserBar";
import Home from "./Home";
import { HomeIcon, LogoutIcon, ProfileIcon, ProjectIcon, TaskIcon } from "../Common/Icons";
import Tasks from "./Tasks";
import Projects from "./Projects";
import ProjectBoard from "./ProjectBoard";
import { BOARD } from "../../constants/projectConstants";
import Profile from "./Profile";
import "../../styles/UserApp.css";
import avatarPhoto from "../../img/avatar.jpg";

const UserApp = () => {
    const { id } = useParams();
    const [tab, setTab] = useState(getTab());
    const [mode, setMode] = useState(BOARD);
    const [avatar, setAvatar] = useState(avatarPhoto);

    function getTab() {
        let path = window.location.pathname;
        let index = path.indexOf(id);
        
        path = path.substr(index);
        
        switch (path) {
            case `${id}`: return HOME;
            case `${id}/tasks`: return MYTASKS;
            case `${id}/projects`: return PROJECTS;
            case `${id}/profile`: return PROFILE;
        }
    }

    const selectProjectMode = () => mode === BOARD ? "project_board" : "project_list";

    const clearStorage = () => {
        const token = "accessToken";
        const userId = "id";

        sessionStorage.removeItem(token)
        sessionStorage.removeItem(userId);
    }

    const getUserId = () => sessionStorage.getItem("id");

    const CustomLink = ({ tabName, url, icon, logout, className }) => {
        return(
            <NavLink onClick={() => logout ? clearStorage() : setTab(tabName)} 
                     className={tab === tabName ? `link focused ${className}` : `link ${className}`} 
                     to={`${url}`}>
                {icon}
                {tabName}
            </NavLink>
        )
    }

    return(
        <div className="user_app" onDragOver={e => e.preventDefault()}>
            <div className="container">
                <div className="navbar">
                    <div className="logo">
                        <h2 style={{ fontWeight: 500 }}>Coursik</h2>
                    </div>
                    <div className="tabs">
                        <CustomLink tabName={HOME} url={`/home/${id}`} icon={<HomeIcon/>} logout={false} className="home_link"/>
                        <CustomLink tabName={MYTASKS} url={`/home/${id}/tasks`} icon={<TaskIcon/>} logout={false} className="tasks_link"/>
                        <CustomLink tabName={PROJECTS} url={`/home/${id}/projects`} icon={<ProjectIcon/>} logout={false} className="projects_link"/>
                        <CustomLink tabName={PROFILE} url={`/home/${id}/profile`} icon={<ProfileIcon/>} logout={false} className="profile_link"/>
                    </div>
                    <div className="logout">
                        <CustomLink tabName={LOGOUT} url="/" icon={<LogoutIcon/>} logout={true}/>
                    </div>
                </div>
                <div className="content">
                    <UserBar setAvatar={setAvatar} avatar={avatar} 
                             setMode={setMode} mode={mode} 
                             setTab={setTab} tab={tab}
                    />
                    <Switch>
                        <Route exact path="/home/:id/tasks">
                            { id !== getUserId() ? <Redirect to={`/home/${getUserId()}/tasks`}/> : null }
                            { !getUserId() ? <Redirect to="/"/> : null }
                            <Tasks />
                        </Route>
                        <Route exact path="/home/:id/projects/:projectId">
                            { !getUserId() ? <Redirect to="/"/> : null }
                            <ProjectBoard selectProjectMode={selectProjectMode} setTab={setTab} />
                        </Route>
                        <Route exact path="/home/:id/projects">
                            { id !== getUserId() ? <Redirect to={`/home/${getUserId()}/projects`}/> : null}
                            { !getUserId() ? <Redirect to="/"/> : null }
                            <Projects setTab={setTab} />    
                        </Route>
                        <Route exact path="/home/:id/profile">
                            { id !== getUserId() ? <Redirect to={`/home/${getUserId()}/profile`}/> : null}
                            { !getUserId() ? <Redirect to="/"/> : null }
                            <Profile setAvatar={setAvatar} avatar={avatar}/>    
                        </Route>
                        <Route exact path="/home/:id">
                            { id !== getUserId() ? <Redirect to={`/home/${getUserId()}`}/> : null}
                            { !getUserId() ? <Redirect to="/"/> : null }
                            <Home setTab={setTab}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default UserApp;