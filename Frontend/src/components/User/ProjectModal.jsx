import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CourseDiplomWork, Default } from "../../constants/metadata";
import { COURSE_DIPLOM_WORK, NO_TEMPLATE, PRIVATE_TO_ME, PUBLIC_TO_IT } from "../../constants/projectConstants";
import { CreateProjectPointsRequest } from "../../services/projectPointServices";
import { createProjectRequest } from "../../services/projectServices";
import "../../styles/ProjectModal.css";

const ProjectModal = ({ setTab, closeModal }) => {
    const history = useHistory();
    const userId = sessionStorage.getItem("id");
    const [projectName, setProjectName] = useState("");
    const [templateId, setTemplateId] = useState(1);
    const [privacy, setPrivacy] = useState(PUBLIC_TO_IT);
    const projectNameInput = useRef();
    const dispatch = useDispatch();

    const submitProjectHandler = async () => {
        await createProject()
            .then((data) => {
                redirectToProject(data.payload.id);
                closeModal();
            })
    }

    const redirectToProject = projectId => history.push(`/home/${userId}/projects/${projectId}`);

    const createProject = async () => {
        const newProject = {
            userId: getUserId(),
            templateId: templateId,
            name: projectName,
            privacy
        }

        return await createProjectRequest(newProject, dispatch)
            .then(async (data) => {
                await createProjectOptions(data.payload.id);
                return data;
            })
            .catch(e => console.log(e));
    }

    const createProjectOptions = async (projectId) => {
        const options = [];
        let Metadata;

        if (templateId == 1) {
            Metadata = Default;
        }
        else if (templateId == 2) {
            Metadata = CourseDiplomWork;
        }

        for (let i = 0; i < Metadata.length; i++) {
            let initialData = Metadata[i];
            let option = {};

            if (initialData.title == "Title") {
                option = {
                    ...initialData,
                    projectId: projectId,
                    value: projectName
                }
            }
            else {
                option = {
                    ...initialData,
                    projectId: projectId,
                }
            }

            options.push(option);
        }

        return CreateProjectPointsRequest(options, dispatch)
            .then(data => data)
            .catch(e => console.log(e))
    }

    const getUserId = () => sessionStorage.getItem("id");

    return(
        <div className="project_modal">
            <div className="modal_window">
                <input value={projectName} 
                       onChange={e => setProjectName(e.target.value)} 
                       className="project_name" 
                       placeholder="Project Name"
                       ref={projectNameInput}
                />
                <div className="holder template_holder">
                    <span>Template:</span>
                    <select className="template" onChange={e => setTemplateId(e.target.value)}>
                        <option value={1}>{ NO_TEMPLATE }</option>
                        <option value={2}>{ COURSE_DIPLOM_WORK }</option>
                    </select>
                </div>
                <div className="holder privacy_holder">
                    <span>Privacy:</span>
                    <select className="privacy" onChange={e => setPrivacy(e.target.value)}>
                        <option>{ PUBLIC_TO_IT }</option>
                        <option>{ PRIVATE_TO_ME }</option>
                    </select>
                </div>
                <div className="submit_part">
                    <button onClick={() => submitProjectHandler()} disabled={!projectName || !projectName.trim()} className="submit_project">
                        Create Project 
                    </button>
                </div>
            </div>
            <div onClick={ closeModal } className="overlay"></div>
        </div>
    )
}

export default ProjectModal;