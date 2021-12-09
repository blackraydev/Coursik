import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { briefMonths, TODAY, TOMORROW, YESTERDAY } from "../../constants/dateConstants";
import { deleteTaskRequest } from "../../services/taskServices";
import { TaskIcon } from "../Common/Icons";
import TaskModal from "./TaskModal";
import { UPDATE } from "../../constants/modalConstants";
import "../../styles/TaskItem.css";

const TaskItem = ({ task }) => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const currentDate = new Date();
    const taskDate = new Date(task.dueDate);

    const diff = Math.ceil((taskDate - currentDate) / (1000 * 3600 * 24));

    let dueDateLabel;
    let classNameDueDate;

    if (task.dueDate) {
        const taskDay = taskDate.getDate();
        const taskMonth = taskDate.getMonth();
        
        dueDateLabel = taskDay + " " + briefMonths[taskMonth];
        classNameDueDate = "future_date";
        
        if (diff < 0) {
            classNameDueDate = "past_date";
        }
        else if (diff == 0 || diff == 1) {
            classNameDueDate = "current_date";
        }
    
        switch (diff) {
            case -1: 
                dueDateLabel = YESTERDAY;
                break;
            case 0: 
                dueDateLabel = TODAY;
                break;
            case 1: 
                dueDateLabel = TOMORROW;
                break;
        }
    }

    return(
        <div className="task_item">
            <div onClick={() => deleteTaskRequest(task.id, dispatch)} className="icon_holder">
                <TaskIcon/>
            </div>
            <div onClick={() => setOpenModal(true)} className="content_holder">
                <div className="text_holder">
                    <span  className="text">{ task.name }</span>
                </div>
                <div className="date_holder">
                    <span className={ classNameDueDate }>{ dueDateLabel }</span>
                </div>
            </div>
            { openModal ? <TaskModal task={task} closeModal={() => setOpenModal(false)} type={UPDATE}/> : null }
        </div>
    );
}

export default TaskItem;