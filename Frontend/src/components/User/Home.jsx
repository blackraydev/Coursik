import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksRequest } from "../../services/taskServices";
import { HideTriangleIcon, ShowTriangleIcon } from "../Common/Icons";
import TaskItem from "./TaskItem";
import "../../styles/Home.css";
import ProjectHandler from "./ProjectHandler";
import { YOUR } from "../../constants/projectConstants";
import { getProjectsRequest } from "../../services/projectServices";

const Home = ({ setTab }) => {
    const [hideTasks, setHideTasks] = useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector(store => store.tasks);
    const userId = sessionStorage.getItem("id");

    useEffect(() => getTasksRequest(userId, dispatch), []);
    useEffect(() => getProjectsRequest(userId, dispatch), []);

    return(
        <div className="home_component">
            <div className="tasks_due_soon">
                <div className="title_handler">
                    <span onClick={() => setHideTasks(!hideTasks)} className="title_with_icon">
                        { hideTasks ? <HideTriangleIcon/> : <ShowTriangleIcon/> }
                        <span className="title">Tasks Due Soon</span>
                    </span>
                </div>
                <div className={ hideTasks ? "tasks tasks-hidden" : "tasks" }>
                    { 
                        tasks.sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate))
                             .map(task => { 
                                const currentDate = new Date();
                                const dueDate = new Date(task.dueDate);
                                const diff = Math.ceil((dueDate - currentDate) / (1000 * 3600 * 24));

                                if (task.dueDate && diff < 5) return <TaskItem key={task.id} task={task} />
                              })
                    }
                </div>
            </div>
            <ProjectHandler setTab={setTab} type={YOUR} title="Recent Projects" />
        </div>
    )
}

export default Home;