import React, { useEffect, useState } from "react";
import "../../styles/Projects.css";
import ProjectModal from "./ProjectModal";
import { useDispatch } from "react-redux";
import { getProjectsRequest } from "../../services/projectServices";
import { COLLABORATIVE, YOUR } from "../../constants/projectConstants";
import ProjectHandler from "./ProjectHandler";

const Projects = ({ setTab }) => {
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => getProjectsRequest(userId, dispatch), []);

    return(
        <div className="projects_component">
            { openModal ? <ProjectModal closeModal={() => setOpenModal(false)} /> : null }
            <ProjectHandler setOpenModal={setOpenModal} setTab={setTab} type={YOUR} title="Your projects"/>
            <ProjectHandler setOpenModal={setOpenModal} setTab={setTab} type={COLLABORATIVE} title="Collaborative projects"/>
        </div>
    )
}

export default Projects;