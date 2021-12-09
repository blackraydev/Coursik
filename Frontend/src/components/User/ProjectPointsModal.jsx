import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TEXTBOX, TEXTAREA } from "../../constants/projectPointConstants";
import { UpdateProjectPointsRequest } from "../../services/projectPointServices";
import { deleteProjectRequest, updateProjectRequest } from "../../services/projectServices";
import SubmitModal from "./SubmitModal";
import "../../styles/ProjectPointsModal.css";

const ProjectPointsModal = ({ setTab, values, closeModal }) => {
    const [submitModalOpen, setSubmitModalOpen] = useState(false);
    const projects = useSelector(store => store.projects);
    const dispatch = useDispatch();
    const inputs = [];

    const TextBox = ({ projectPoint }) => {
        const [value, setValue] = useState(projectPoint.value);
        const ref = useRef();

        inputs.push(ref);

        return(
            <div className="textbox">
                <span className="title">{projectPoint.title}:</span>
                <input value={ value }
                       className="line"
                       onChange={e => setValue(e.target.value)}
                       ref={ref}
                />
            </div>
        )
    }

    const TextArea = ({ projectPoint }) => {
        const [value, setValue] = useState(projectPoint.value);
        const ref = useRef();

        inputs.push(ref);

        return(
            <div className="textarea">
                <span className="title">{projectPoint.title}:</span>
                <textarea value={ value }
                          className="box"
                          onChange={e => setValue(e.target.value)}
                          ref={ref}
                />
            </div>
        )
    }

    const submitUpdating = async () => {
        const result = inputs.filter(input => input.current);
        const projectPoints = [];

        values.forEach(value => {
            const projectPoint = {
                id: value.id,
                projectId: value.projectId,
                type: value.type,
                title: value.title,
                value: value.value
            }
            
            projectPoints.push(projectPoint);
        })

        for (let i = 0; i < values.length; i++) {
            projectPoints[i].value = result[i].current.value;
        }

        const project = projects.find(proj => proj.id === values[0].projectId);
        project.name = projectPoints[0].value;

        return await updateProjectRequest(project, dispatch)
            .then(async () => {
                return await UpdateProjectPointsRequest(projectPoints, dispatch)
                    .then(() => {
                        setTab(project.name);
                        closeModal();
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    const deleteProject = async () => {
        const projectId = values[0].projectId;
        return await deleteProjectRequest(projectId, dispatch)
            .then(res => {
                closeModal();
                redirectToProjects();
            })
            .catch(e => console.log(e))
    }

    const redirectToProjects = () => {
        const projectsTab = document.querySelector(".projects_link");
        projectsTab.click();
    };

    return(
        <div className="project_points_modal">
            { submitModalOpen ? <SubmitModal executeAction={deleteProject} closeModal={() => setSubmitModalOpen(false)}/> : null }
            <div className="modal_window">
                { 
                    values.map((value, index) => {
                        switch (value.type) {
                            case TEXTBOX:
                                return <TextBox key={index} projectPoint={value} />;
                            case TEXTAREA:
                                return <TextArea key={index} projectPoint={value} />;
                        }
                    }) 
                }
                <div className="submit_part">
                    <button onClick={() => setSubmitModalOpen(true)} className="delete_project">
                        Delete Project
                    </button>
                    <button onClick={submitUpdating} className="update_info">
                        Update Info
                    </button>
                </div>
            </div>
            <div onClick={ closeModal } className="overlay"></div>
        </div>
    )
}

export default ProjectPointsModal;