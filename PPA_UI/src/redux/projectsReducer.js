import { GET_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "./constants";

const initialState = [];

export const projectsReducer = (state = initialState, action) => {
    let newState = [];

    switch (action.type) {
        case GET_PROJECTS:
            newState = [...action.payload];
            return newState;
        case CREATE_PROJECT:
            newState = [...state, action.payload];
            return newState;
        case UPDATE_PROJECT:
            newState = [...state].map(project => {
                if (project.id === action.payload.id)
                    return action.payload;
                return project;
            })
        case DELETE_PROJECT:
            newState = [...state].filter(project => project.id !== action.payload);
            return newState;
        default:
            return state;
    }
}

export default projectsReducer;