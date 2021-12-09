import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getProjectsRequest } from "../../services/projectServices";
import { deleteTaskRequest, getTasksRequest, updateTasksStatusRequest } from "../../services/taskServices";
import { TO_DO, IN_PROGRESS, COMPLETED, TODAY } from "../../constants/taskConstants";
import TaskModal from "../User/TaskModal";
import { CREATE, UPDATE } from "../../constants/modalConstants";
import { TaskIcon } from "../Common/Icons";
import { briefMonths, TOMORROW, YESTERDAY } from "../../constants/dateConstants";
import "../../styles/ProjectBoard.css";
import { getRequest } from "../../services/authServices";

const ProjectBoard = ({ selectProjectMode, setTab }) => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [category, setCategory] = useState(TO_DO);
    const [priority, setPriority] = useState(0);
    const [openedTask, setOpenedTask] = useState(null);
    const { id, projectId } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector(store => store.tasks);
    const projects = useSelector(store => store.projects);
    const project = projects.find(proj => proj.id === Number(projectId));
    const currentTasks = tasks.length && tasks.filter(task => task.projectId === Number(projectId))
                                              .sort((taskA, taskB) => taskA.priority - taskB.priority);
    const [data, setData] = useState(updateData());
    const dragItem = useRef();
    const dragNode = useRef();
    const [dragging, setDragging] = useState(false);
    const [canExecuteQuery, setCanExecuteQuery] = useState(false);
    const [avatar, setAvatar] = useState();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        if (project) {
            setTab(project.name);
        }
    }, [project]);

    useEffect(async () => await getTasksRequest(id, dispatch), []);
    useEffect(async () => await getProjectsRequest(id, dispatch), []);

    useEffect(() => setData(updateData()), [tasks]);

    useEffect(async () => {
        if (canExecuteQuery) {
            await updateTasksStatus()
                .then(() => setData(updateData()))
        }
    }, [canExecuteQuery]);

    useEffect(async () => await getRequest(id).then(user => setAvatar(user.avatar)), []);

    function updateData () {
        const categories = [TO_DO, IN_PROGRESS, COMPLETED];
        const newData = categories.map(category => { return { title: category, tasks: [] } });

        if (currentTasks) {
            currentTasks.forEach(task => {
                switch (task.category) {
                    case TO_DO:
                        newData[0].tasks.push(task);
                        break;
                    case IN_PROGRESS:
                        newData[1].tasks.push(task);
                        break;
                    case COMPLETED:
                        newData[2].tasks.push(task);
                        break;
                }
            })
        }

        return newData;
    }

    const updateTasksStatus = async () => {
        const categories = [TO_DO, IN_PROGRESS, COMPLETED];
        const newTasks = [];

        data.forEach((board, boardId) => {
            board.tasks.forEach((task, taskId) => {
                const edittedTask = currentTasks.find(tempTask => tempTask.id == task.id);
                newTasks.push({
                    ...edittedTask,
                    category: categories[boardId],
                    priority: taskId + 1
                });
            })
        });

        return await updateTasksStatusRequest(newTasks, dispatch)
                        .then(data => data)
                        .catch(e => console.log(e));
    }

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", e => handleDragEnd(e));

        setTimeout(() => {
            setCanExecuteQuery(false);
            setDragging(true);
        }, 0);
    }

    const handleDragEnd = e => {
        e.preventDefault();
        
        setDragging(false);
        setCanExecuteQuery(true);

        dragNode.current.removeEventListener("dragend", e => handleDragEnd(e));
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        const targetRect = e.target.getBoundingClientRect();
        const tempX = targetRect.x;
        const tempY = targetRect.y;

        if (e.target.id !== dragNode.current.id && (tempX !== x || tempY !== y)) {
            setX(tempX);
            setY(tempY);
            setData(oldData => {
                let newList = JSON.parse(JSON.stringify(oldData));
                newList[params.boardId].tasks.splice(params.taskId, 0, newList[currentItem.boardId].tasks.splice(currentItem.taskId, 1)[0]);
                dragItem.current = params;
                return newList;
            })
        }
    }

    const handleDragOver = e => {
        e.preventDefault();
    }

    const changeStyle = ({ boardId, taskId }) => {
        const currentTask = dragItem.current;

        if (currentTask.boardId === boardId && currentTask.taskId === taskId) {
            return "dragging project_task_item";
        }

        return "project_task_item";
    }

    const ProjectTaskItem = ({ boardId, taskId, task }) => {
        const currentDate = new Date();

        let dueDateLabel;
        let classNameDueDate;

        if (task.dueDate) {
            const taskDate = new Date(task.dueDate);
            const diff = Math.ceil((taskDate - currentDate) / (1000 * 3600 * 24));
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
            <div className={dragging ? changeStyle({ boardId, taskId }) : "project_task_item"}
                 draggable={true}
                 onDragStart={e => handleDragStart(e, { boardId, taskId })}
                 onDragEnter={dragging ? e => handleDragEnter(e, { boardId, taskId }) : null}
                 onDragOver={handleDragOver}
                 id={task.id}
                 onClick={() => {
                     setOpenedTask(task);
                     setOpenUpdateModal(true);
                 }}
            >
                <div className="text_holder" onDragEnter={e => e.preventDefault()}>
                    <span onClick={() => { 
                            deleteTaskRequest(task.id, dispatch);
                            setTimeout(() => {
                                setOpenUpdateModal(false);
                            }, 0);
                          }}
                          className="icon_holder"
                    >
                        <TaskIcon/>
                    </span>
                    { task.name }
                </div>
                <div className="down_part">
                    <div className="avatar_holder">
                        <img className="avatar" src={avatar}/>
                    </div>
                    <div className="date_holder">
                        <span className={ classNameDueDate } onDragEnter={e => e.preventDefault()}>{ dueDateLabel }</span>
                    </div>
                </div>
            </div>
        )
    }

    const CreateProjectTaskItem = ({ category, priority }) => {
        const openModalHandler = () => {
            setPriority(priority);
            setOpenCreateModal(true);
            setCategory(category);
        }

        return(
            <div className="create_project_task_item">
                <span onClick={openModalHandler}>Add task</span>
            </div>
        )
    }

    const renderTaskModal = () => {
        return (
            openCreateModal ? <TaskModal closeModal={() => setOpenCreateModal(false)} 
                                   type={CREATE} 
                                   category={category}
                                   currentProject={project}
                                   priority={priority}
                              /> : null 
        )
    }

    const renderTaskUpdateModal = () => {
        return (
            openUpdateModal ? <TaskModal task={openedTask}
                                         closeModal={() => setOpenUpdateModal(false)} 
                                         type={UPDATE} 
                        /> : null 
        )
    }

    const renderBoards = () => {
        return (
            data.map((board, index) => 
                <div className="board" key={index}>
                    <div className="project_title">
                        <span>{ board.title }</span>
                    </div>
                    <div className="project_tasks"
                         id={"board-" + index}
                         onDragEnter={dragging && !board.tasks.length ? e => handleDragEnter(e, { boardId: index, taskId: 0 }) : null}
                         onDragOver={handleDragOver}
                    >
                        { board.tasks.map((task, taskIndex) => task && <ProjectTaskItem boardId={index} taskId={taskIndex} task={task} key={`${index}_${taskIndex}`} />) }
                        <CreateProjectTaskItem category={board.title} priority={board.tasks.length}/>
                    </div>
                </div>
            )
        )
    }

    return(
        <div className={ selectProjectMode() }
             onDragOver={handleDragOver}>
            { renderTaskModal() }
            { renderTaskUpdateModal() }
            { renderBoards() }
        </div>
    )
}

export default ProjectBoard;