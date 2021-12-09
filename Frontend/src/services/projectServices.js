import axios from "axios";
import { getProjects, createProject, deleteProject, updateProject } from "../redux/projectsActions";
import { API_URL } from "../constants/api";

const axiosInstance = axios.create({
    baseURL: `${API_URL}/projects`
})

export const getProjectsRequest = async (userId, dispatch) => {
    return await axiosInstance.get(`/${userId}`)
        .then((response) => {
            dispatch(getProjects(response.data))
        })
        .catch(e => { throw e })
}

export const createProjectRequest = async (project, dispatch) => {
    return await axiosInstance.post("/create", project)
        .then(response => dispatch(createProject(response.data)))
        .catch(e => { throw e } );
}

export const deleteProjectRequest = async (projectId, dispatch) => {
    return await axiosInstance.delete(`/${projectId}`)
        .then(response => dispatch(deleteProject(response.data)))
        .catch(e => { throw e } );
}

export const updateProjectRequest = async (project, dispatch) => {
    return await axiosInstance.post(`/update`, project)
        .then(response => dispatch(updateProject(response.data)))
        .catch(e => { throw e } );
}