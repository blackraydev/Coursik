import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTaskRequest, updateTaskRequest } from "../../services/taskServices";
import { DateIcon, RemoveIcon } from "../Common/Icons";
import DatePicker from "./DatePicker";
import { briefMonths, NODUEDATE, TODAY, TOMORROW, YESTERDAY } from "../../constants/dateConstants";
import { CREATE, UPDATE } from "../../constants/modalConstants";
import { getProjectsRequest } from "../../services/projectServices";
import { getRequest } from "../../services/authServices";
import { TO_DO } from "../../constants/taskConstants";
import "../../styles/TaskModal.css";

const TaskModal = ({ task, closeModal, type, category, currentProject, priority }) => {
    const projects = useSelector(store => store.projects);
    const tasks = useSelector(store => store.tasks);
    const [taskName, setTaskName] = useState(task && task.name || "");
    const [description, setDescription] = useState(task && task.description || "");
    const [projectId, setProjectId] = useState(currentProject && currentProject.id || task && task.projectId|| null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState(task && task.dueDate && new Date(task.dueDate) || null);
    const [isDueDate, setIsDueDate] = useState(!!(task && task.dueDate));
    const [labelDueDate, setLabelDueDate] = useState(NODUEDATE);
    const [user, setUser] = useState("");
    const taskNameInput = useRef();
    const dispatch = useDispatch();

    useEffect(() => type === CREATE ? taskNameInput.current.focus() : null, []);
    
    useEffect(async () => await getProjectsRequest(getUserId(), dispatch), []);

    useEffect(async () => await getRequest(getUserId()).then(usr => setUser(usr)), []);

    useEffect(() => {
        if (!isDueDate) {
            return setLabelDueDate(NODUEDATE);
        }

        const currentDate = new Date();
        const diff = Math.ceil((dueDate - currentDate) / (1000 * 3600 * 24));

        const taskDay = dueDate.getDate();
        const taskMonth = dueDate.getMonth();

        switch (diff) {
            case -1: return setLabelDueDate(YESTERDAY);
            case 0: return setLabelDueDate(TODAY);
            case 1: return setLabelDueDate(TOMORROW);
            default: return setLabelDueDate(taskDay + " " + briefMonths[taskMonth]);
        }
    }, [dueDate]);

    const setDueDateLabelColor = () => {
        const className = "date_picker_holder ";

        if (isDueDate) {
            const currentDate = new Date();
            const diff = Math.ceil((dueDate - currentDate) / (1000 * 3600 * 24));
            
            if (diff < 0) {
                return className + "past_due_date";
            }
            else if (diff === 0 || diff === 1) {
                return className + "current_due_date";
            }
            
            return className + "future_due_date";
        }

        return className;
    }

    const submitTaskHandler = () => {
        if (type === CREATE) createTask();
        if (type === UPDATE) updateTask();

        closeModal();
    }

    const updateTask = async () => {
        const updatedTask = {
            id: task.id,
            userId: getUserId(),
            projectId: projectId,
            category: task.category || category || TO_DO,
            priority: task.priority,
            name: taskName.trim(),
            description: description,
            dueDate: dueDate
        }

        return await updateTaskRequest(updatedTask, dispatch)
            .catch(e => console.log(e));
    }

    const createTask = async () => {
        const newPriority = tasks.filter(task => task.userId == getUserId() && 
                                                 task.projectId == projectId && 
                                                 task.category == TO_DO).length;

        const newTask = {
            userId: getUserId(),
            projectId: projectId != 0 ? projectId : null,
            category: category || TO_DO,
            priority: priority || newPriority || 0,
            name: taskName.trim(),
            description: description,
            assignDate: new Date(),
            dueDate: dueDate
        }

        return await createTaskRequest(newTask, dispatch)
            .catch(e => console.log(e));
    }

    const getUserId = () => sessionStorage.getItem("id");

    const removeDueDateHandler = () => {
        setDueDate(null);
        setIsDueDate(false);
    }

    return(
        <div className="task_modal">
            <div className="modal_window">
                <input value={taskName} 
                       onChange={e => setTaskName(e.target.value)} 
                       className="task_name" 
                       placeholder="Task Name"
                       ref={taskNameInput}
                />
                <div className="who_where">
                    <span>For</span>
                    <select className="assign">
                        <option>{user.login}</option>
                    </select>
                    <span>in</span>
                    <select onChange={e => setProjectId(e.target.value)} className="choose_project">
                        <option value={ 0 }>No Project</option>
                        { 
                            projects.map(project => 
                                <option value={ project.id } 
                                        selected={ currentProject ? project.name === currentProject.name 
                                                   : task ? task.projectId === project.id : false }
                                >{ project.name }</option>) 
                        }
                    </select>
                </div>
                <div className="date_picker_part">
                    <span className="due_date">Due date</span>
                    <div tabIndex={-1} onFocus={() => setShowDatePicker(true)} className={setDueDateLabelColor()}> 
                        <DateIcon/>
                        <span className="date">{ labelDueDate }</span>
                    </div>
                    { 
                        isDueDate ? 
                            <div className="remove_icon_holder" onClick={() => removeDueDateHandler()}> 
                                <RemoveIcon/> 
                            </div> : null 
                    }
                    { 
                        showDatePicker ? 
                            <DatePicker selectedDate={dueDate} 
                                        setDueDate={setDueDate} 
                                        setIsDueDate={setIsDueDate} 
                                        setShowDatePicker={setShowDatePicker} 
                            /> : null 
                    }
                </div>
                <textarea value={description} 
                          onChange={e => setDescription(e.target.value)} 
                          className="description_box" 
                          placeholder="Description"
                />
                <div className="submit_part">
                    <button onClick={() => submitTaskHandler()} disabled={!taskName || !taskName.trim()} className="submit_task">
                        { type } Task 
                    </button>
                </div>
            </div>
            <div onClick={closeModal} className="overlay"></div>
        </div>
    )
}

export default TaskModal;