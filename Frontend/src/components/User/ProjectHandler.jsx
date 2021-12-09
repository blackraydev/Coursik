import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { YOUR } from "../../constants/projectConstants";
import { HideTriangleIcon, ShowTriangleIcon } from "../Common/Icons";
import ProjectItem from "./ProjectItem";
import "../../styles/ProjectHandler.css";

const ProjectHandler = ({ setOpenModal, setTab, type, title }) => {
    const userId = sessionStorage.getItem("id");
    const [hideProjects, setHideProjects] = useState(false);
    const projects = useSelector(store => store.projects);

    return(
        <div className="project_handler">
            <div className="title_handler">
                <span onClick={() => setHideProjects(!hideProjects)} className="title">
                    { hideProjects ? <HideTriangleIcon/> : <ShowTriangleIcon/> }
                    { title }
                </span>
            </div>
            <div className={hideProjects ? "projects projects-hidden" : "projects"}>
                { 
                    type === YOUR ? projects.map(project => 
                        <NavLink onClick={() => setTab(project.name)} to={`/home/${userId}/projects/${project.id}`} className="project_item_holder" key={project.id}>
                            <ProjectItem className="project_item" title={project.name} project={project}/>
                        </NavLink>
                    )
                    : null
                }
                { 
                    setOpenModal ? 
                        <div onClick={() => setOpenModal(true)} className="create_project">
                            <ProjectItem className="project_create" title="Create Project"/>
                        </div>
                    : null
                }
            </div>
        </div>
    )
}

export default ProjectHandler;