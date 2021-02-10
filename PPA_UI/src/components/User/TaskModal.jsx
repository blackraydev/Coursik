import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskRequest, updateTaskRequest } from "../../services/taskServices";
import { DateIcon, RemoveIcon } from "../Common/Icons";
import DatePicker from "./DatePicker";
import { briefMonths, NODUEDATE, TODAY, TOMORROW, YESTERDAY } from "../../constants/dateConstants";
import { CREATE, UPDATE } from "../../constants/modalConstants";
import "../../styles/TaskModal.css";

const CreateModal = ({ task, closeModal, type }) => {
    const [taskName, setTaskName] = useState(task && task.name || "");
    const [description, setDescription] = useState(task && task.description || "");
    const [selectProject, setSelectProject] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState(task && task.due_Date && new Date(task.due_Date) || null);
    const [isDueDate, setIsDueDate] = useState(!!(task && task.due_Date));
    const [labelDueDate, setLabelDueDate] = useState(NODUEDATE);
    const taskNameInput = useRef();
    const dispatch = useDispatch();

    useEffect(() => type === CREATE ? taskNameInput.current.focus() : null, []);

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
        console.log(task);

        const updatedTask = {
            id: task.id,
            user_Id: getUserId(),
            name: taskName.trim(),
            description: description,
            due_Date: dueDate
        }

        return await updateTaskRequest(updatedTask, dispatch)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }

    const createTask = async () => {
        const newTask = {
            user_Id: getUserId(),
            name: taskName.trim(),
            description: description,
            assign_Date: new Date(),
            due_Date: dueDate
        }

        return await createTaskRequest(newTask, dispatch)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }

    const getUserId = () => sessionStorage.getItem("id");

    const removeDueDateHandler = () => {
        setDueDate(null);
        setIsDueDate(false);
    }

    const renderProjectSellector = () => {
        return(
            <select className="choose_project">
                <option>IT Project Plan</option>
                <option>IT Request</option>
            </select>
        )
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
                        <option>black2001ray@mail.ru</option>
                        <option>sagidullin-7900@mail.ru</option>
                    </select>
                    <span>in</span>
                    { selectProject ? renderProjectSellector() : null }
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

export default CreateModal;