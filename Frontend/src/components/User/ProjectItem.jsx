import React from "react";
import { NoTemplateIcon, CourseWorkIcon, AddIcon } from "../Common/Icons";
import "../../styles/ProjectItem.css";

const ProjectItem = ({ className, project, title }) => {
    return(
        <div className={"project " + className}>
            <div className="img_holder">
                { project ? project.templateId == 1 ? <NoTemplateIcon/> : <CourseWorkIcon/> : <AddIcon/> }
            </div>
            <div className="project_title">{title}</div>
        </div>
    );
}

export default ProjectItem;