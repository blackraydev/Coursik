import React, { useState } from "react";
import "../../styles/Projects.css";
import { HideTriangleIcon, ShowTriangleIcon } from "../Common/Icons";

const Projects = () => {
    const ProjectHandler = ({ title }) => {
        const [hideProjects, setHideProjects] = useState(false);

        return(
            <div className="project_handler">
                <div className="title_handler">
                    <span onClick={() => setHideProjects(!hideProjects)} className="title">
                        { hideProjects ? <HideTriangleIcon/> : <ShowTriangleIcon/> }
                        { title }
                    </span>
                </div>
                <div className={hideProjects ? "projects projects-hidden" : "projects"}>
                    <ProjectItem title="IT Project Plan"/>
                    <ProjectItem title="IT Requests"/>
                </div>
            </div>
        )
    }

    const ProjectItem = ({ title }) => {
        return(
            <div className="project">
                <div className="img_holder"></div>
                <div className="project_title">{title}</div>
            </div>
        );
    }

    return(
        <div className="projects_component">
            <ProjectHandler title="Your projects"/>
            <ProjectHandler title="Colaborative projects"/>
        </div>
    )
}

export default Projects;