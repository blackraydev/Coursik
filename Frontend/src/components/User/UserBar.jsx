import React, { useEffect, useState } from "react";
import { AddIcon, InfoIcon, NotificationIcon, ProjectIcon, SwitchModeIcon, TaskIcon } from "../Common/Icons";
import TaskModal from "./TaskModal";
import { CREATE } from "../../constants/modalConstants";
import "../../styles/UserBar.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectPointsRequest } from "../../services/projectPointServices";
import ProjectPointsModal from "./ProjectPointsModal";
import ProjectModal from "./ProjectModal";
import { BOARD, LIST } from "../../constants/projectConstants";
import { getRequest } from "../../services/authServices";
import avatarDefault from "../../img/avatar.jpg";

const UserBar = ({ avatar, setAvatar, setMode, mode, setTab, tab }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = sessionStorage.getItem("id");
    const [canShowIcon, setCanShowIcon] = useState(false);
    const [showAddList, setShowAddList] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const [openProjectInfoModal, setOpenProjectInfoModal] = useState(false);
    const values = useSelector(store => store.projectPoints);
    const [projectId, setProjectId] = useState(0);

    useEffect(async () => await getProjectPointsRequest(projectId, dispatch), [projectId]);

    useEffect(() => renderIcon(), [history.location]);

    useEffect(() => getRequest(userId).then(user => setAvatar(user.avatar)), []);

    const taskClickHandler = () => {
        setOpenModal(true);
        setShowAddList(false);
    }

    const projectClickHandler = () => {
        setOpenProjectModal(true);
        setShowAddList(false);
    }

    const switchProjectMode = () => mode === BOARD ? setMode(LIST) : setMode(BOARD);

    const AddList = () => {
        return(
            <div className="add_list">
                <div onClick={() => taskClickHandler()} className="task_point">
                    <TaskIcon/> Task
                </div>
                <div onClick={() => projectClickHandler()} className="project_point">
                    <ProjectIcon/> Project
                </div>
            </div>
        )
    }

    const renderIcon = () => {
        const pathname = history.location.pathname;
        const string = "/projects/";
        const indexOfString = pathname.indexOf(string);

        if (indexOfString > 0) {
            const indexOfId = indexOfString + string.length;
            const projectId = pathname.substr(indexOfId);
    
            if (projectId >= 0) {
                setProjectId(projectId);
                return setCanShowIcon(true);
            }
        }

        return setCanShowIcon(false);
    }
    
    return(
        <div className="user_bar" onDragOver={e => e.preventDefault()}>
            { openModal ? <TaskModal closeModal={() => setOpenModal(false)} type={CREATE}/> : null }
            { openProjectModal ? <ProjectModal closeModal={() => setOpenProjectModal(false)} /> : null }
            { openProjectInfoModal ? <ProjectPointsModal setTab={setTab} values={values} closeModal={() => setOpenProjectInfoModal(false)}/> : null }
            <div className="tab_handler">
                Tab <span className="tab">{tab}</span>
            </div>
            <div className="icons">
                <div className="icon_holder">
                    <div onClick={() => switchProjectMode()} className="project_switch_mode_handler">
                        { canShowIcon ? <SwitchModeIcon/> : null }
                    </div>
                </div>
                <div className="icon_holder">
                    <div onClick={() => setOpenProjectInfoModal(true)} className="project_info_handler">
                        { canShowIcon ? <InfoIcon/> : null }
                    </div>
                </div>
                <div className="icon_holder">
                    <div tabIndex={-1} onFocus={() => setShowAddList(true)} onBlur={() => setShowAddList(false)} className="add_handler">
                        <AddIcon/>
                        { showAddList ? <AddList/> : null}
                    </div>
                </div>
                <div className="icon_holder">
                    <NotificationIcon/>
                </div>
                <div className="avatar_handler">
                    <img className="avatar" src={avatar ? avatar : avatarDefault}></img>
                </div>
            </div>
        </div>
    )
}

export default UserBar;