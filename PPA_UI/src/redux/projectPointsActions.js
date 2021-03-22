import { GET_PROJECT_POINTS, CREATE_PROJECT_POINTS, UPDATE_PROJECT_POINTS } from "./constants";

export const getProjectPoints = projectPoints => {
    return {
        type: GET_PROJECT_POINTS,
        payload: projectPoints
    }
}

export const createProjectPoints = projectPoints => {
    return {
        type: CREATE_PROJECT_POINTS,
        payload: projectPoints
    }
}

export const updateProjectPoints = projectPoints => {
    return {
        type: UPDATE_PROJECT_POINTS,
        payload: projectPoints
    }
}