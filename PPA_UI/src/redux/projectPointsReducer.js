import { GET_PROJECT_POINTS, CREATE_PROJECT_POINTS, UPDATE_PROJECT_POINTS } from "./constants";

const initialState = [];

export const projectPointsReducer = (state = initialState, action) => {
    let newState = [];

    switch (action.type) {
        case GET_PROJECT_POINTS:
            newState = [...action.payload];
            return newState;
        case CREATE_PROJECT_POINTS:
            newState = [...state, ...action.payload];
            return newState;
        case UPDATE_PROJECT_POINTS:
            newState = [...state];
            newState = newState.map(point => {
                return action.payload.find(value => value.id === point.id);
            });
            return newState;
        default:
            return state;
    }
}

export default projectPointsReducer;