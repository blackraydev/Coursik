import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideTriangleIcon, ShowTriangleIcon } from "../Common/Icons";
import { TODAY, UPCOMING, LATER, NODATE, OVERDUE } from "../../constants/taskConstants";
import TaskItem from "./TaskItem";
import { getTasksRequest } from "../../services/taskServices";
import "../../styles/Tasks.css";

const Tasks = () => {
    const tasks = useSelector(store => store.tasks);
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();

    useEffect(() => getTasksRequest(userId, dispatch), []);

    const TaskHandler = ({ type }) => {
        const [hideTaskHandler, setHideTaskHandler] = useState(false);

        const renderTasks = () => {
            const currentDate = new Date();

            if (type === OVERDUE) {
                return tasks.sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate))
                            .map(task => {
                    const taskDate = new Date(task.dueDate);
                    const diff = Math.ceil((taskDate - currentDate) / (1000 * 3600 * 24));
                    
                    if (task.dueDate && diff < 0) return <TaskItem key={task.id} task={task} />
                });
            }

            if (type === TODAY) {
                return tasks.map(task => {
                    const taskDate = new Date(task.dueDate);
                    const isToday = taskDate.getDate() === currentDate.getDate() && taskDate.getMonth() === currentDate.getMonth() && taskDate.getFullYear() === currentDate.getFullYear();

                    if (isToday) return <TaskItem key={task.id} task={task} />
                });
            }

            if (type === UPCOMING) {
                return tasks.sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate))
                            .map(task => {
                    const taskDate = new Date(task.dueDate);
                    const diff = Math.ceil((taskDate - currentDate) / (1000 * 3600 * 24));
                    
                    if (diff > 0 && diff < 7) return <TaskItem key={task.id} task={task} />
                });
            }

            if (type == LATER) {
                return tasks.sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate))
                            .map(task => {
                    const taskDate = new Date(task.dueDate);
                    const diff = Math.ceil((taskDate - currentDate) / (1000 * 3600 * 24));
                    
                    if (diff >= 7) return <TaskItem key={task.id} task={task} />
                });
            }

            if (type === NODATE) { 
                return tasks.map(task => !task.dueDate ? <TaskItem key={task.id} task={task} /> : null);
            }
        }

        return(
            <div className="task_handler">
                <div className="title_handler">
                    <span onClick={() => setHideTaskHandler(!hideTaskHandler)} className="title">
                        { hideTaskHandler ? <HideTriangleIcon/> : <ShowTriangleIcon/> }
                        { type }
                    </span>
                </div>
                <div className={hideTaskHandler ? "tasks tasks-hidden" : "tasks"}>
                    { renderTasks() }
                </div>
            </div>
        );
    }

    return(
        <div className="tasks_component">
            <TaskHandler type={OVERDUE}/>
            <TaskHandler type={TODAY}/>
            <TaskHandler type={UPCOMING}/>
            <TaskHandler type={LATER}/>
            <TaskHandler type={NODATE}/>
        </div>
    )
}

export default Tasks;