import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_TASKS_STATUS } from "./constants";

export const getTasks = (tasks) => {
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export const createTask = task => {
    return {
        type: CREATE_TASK,
        payload: task
    }
}

export const updateTask = task => {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}

export const deleteTask = taskId => {
    return {
        type: DELETE_TASK,
        payload: taskId
    }
}

export const updateTasksStatus = tasks => {
    return {
        type: UPDATE_TASKS_STATUS,
        payload: tasks
    }
}