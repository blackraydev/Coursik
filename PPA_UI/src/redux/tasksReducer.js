import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, UPDATE_TASKS_STATUS } from "./constants";

const initialState = [];

export const tasksReducer = (state = initialState, action) => {
    let newState = [];

    switch (action.type) {
        case GET_TASKS:
            newState = [...action.payload];
            return newState;
        case CREATE_TASK:
            newState = [...state, action.payload];
            return newState;
        case UPDATE_TASK:
            newState = [...state];
            newState = newState.map(task => task.id === action.payload.id ? action.payload : task);
            return newState;
        case DELETE_TASK:
            newState = [...state].filter(task => task.id !== action.payload);
            return newState;
        case UPDATE_TASKS_STATUS:
            newState = [...state].map(task => {
                const payloadTask = action.payload.find(payloadTask => task.id === payloadTask.id);

                if (payloadTask) {
                    task.category = payloadTask.category;
                    task.priority = payloadTask.priority;
                }

                return task;
            });
            return newState;
        default:
            return state;
    }
}

export default tasksReducer;