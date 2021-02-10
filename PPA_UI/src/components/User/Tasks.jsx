import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideTriangleIcon, ShowTriangleIcon } from "../Common/Icons";
import { RECENTLYASSIGNED, TODAY, UPCOMING, LATER } from "../../constants/taskConstants";
import TaskItem from "./TaskItem";
import { getTasksRequest } from "../../services/taskServices";
import "../../styles/Tasks.css";

const Tasks = () => {
    const tasks = useSelector(store => store);
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();

    useEffect(() => {
        getTasksRequest(userId, dispatch);
    }, []);

    const TaskHandler = ({ type }) => {
        const [hideTaskHandler, setHideTaskHandler] = useState(false);

        const renderTasks = () => {
            if (type === RECENTLYASSIGNED) { 
                return tasks.sort((taskA, taskB) => new Date(taskB.assign_Date) - new Date(taskA.assign_Date))
                            .map(task => <TaskItem key={task.id} task={task} />);
            }

            if (type === TODAY) {
                return tasks.map(task => {
                    const currentDate = new Date();
                    const taskDate = new Date(task.due_Date);
                    const isToday = taskDate.getDate() === currentDate.getDate() && taskDate.getMonth() === currentDate.getMonth() && taskDate.getFullYear() === currentDate.getFullYear();

                    if (isToday) return <TaskItem key={task.id} task={task} />
                });
            }

            if (type === UPCOMING) {
                return tasks.sort((taskA, taskB) => new Date(taskA.due_Date) - new Date(taskB.due_Date))
                            .map(task => {
                    const currentDate = new Date();
                    const dueDate = new Date(task.due_Date);
                    const diff = Math.ceil((dueDate - currentDate) / (1000 * 3600 * 24));
                                
                    if (diff < 5) return <TaskItem key={task.id} task={task} />
                });
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
            <TaskHandler type={RECENTLYASSIGNED}/>
            <TaskHandler type={TODAY}/>
            <TaskHandler type={UPCOMING}/>
            <TaskHandler type={LATER}/>
        </div>
    )
}

export default Tasks;