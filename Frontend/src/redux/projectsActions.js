import { GET_PROJECTS, CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "./constants";

export const getProjects = projects => {
    return {
        type: GET_PROJECTS,
        payload: projects
    }
}

export const createProject = project => {
    return {
        type: CREATE_PROJECT,
        payload: project
    }
}

export const deleteProject = projectId => {
    return {
        type: DELETE_PROJECT,
        payload: projectId
    }
}

export const updateProject = project => { 
    return {
        type: UPDATE_PROJECT,
        payload: project
    }
}