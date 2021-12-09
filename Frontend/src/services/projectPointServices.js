import axios from "axios";
import { getProjectPoints, createProjectPoints, updateProjectPoints } from "../redux/projectPointsActions";
import { API_URL } from "../constants/api";

const axiosInstance = axios.create({
    baseURL: `${API_URL}/projectPoints`
})

export const getProjectPointsRequest = async (projectId, dispatch) => {
    return await axiosInstance.get(`/${projectId}`)
        .then(response => dispatch(getProjectPoints(response.data)))
        .catch(e => { throw e })
}

export const CreateProjectPointsRequest = async (projectPoints, dispatch) => {
    return await axiosInstance.post(`/create`, projectPoints)
        .then(response => dispatch(createProjectPoints(response.data)))
        .catch(e => { throw e })
}

export const UpdateProjectPointsRequest = async (projectPoints, dispatch) => {
    return await axiosInstance.post(`/update`, projectPoints)
        .then(response => dispatch(updateProjectPoints(response.data)))
        .catch(e => { throw e })
}