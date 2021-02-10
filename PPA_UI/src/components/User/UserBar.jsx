import React, { useState } from "react";
import { AddIcon, NotificationIcon, ProjectIcon, TaskIcon } from "../Common/Icons";
import CreateModal from "./TaskModal";
import "../../styles/UserBar.css";

import avatar from "../../img/avatar.jpg";
import { CREATE } from "../../constants/modalConstants";

const UserBar = ({ tab }) => {
    const [showAddList, setShowAddList] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const taskClickHandler = () => {
        setOpenModal(true);
        setShowAddList(false);
    }

    const AddList = () => {
        return(
            <div className="add_list">
                <div onClick={() => taskClickHandler()} className="task">
                    <TaskIcon/> 
                    Task
                </div>
                <div className="project">
                    <ProjectIcon/> Project
                </div>
            </div>
        )
    }
    
    return(
        <div className="user_bar">
            { openModal ? <CreateModal closeModal={() => setOpenModal(false)} type={CREATE}/> : null }
            <div className="tab_handler">
                Tab <span className="tab">{tab}</span>
            </div>
            <div className="icons">
                <div tabIndex={-1} onFocus={() => setShowAddList(true)} onBlur={() => setShowAddList(false)} className="add_handler">
                    <AddIcon/>
                    { showAddList ? <AddList/> : null}
                </div>
                <NotificationIcon/>
                <div className="avatar_handler">
                    <img className="avatar" src={avatar}></img>
                </div>
            </div>
        </div>
    )
}

export default UserBar;