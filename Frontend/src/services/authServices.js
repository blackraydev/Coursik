import axios from "axios"
import { API_URL } from "../constants/api";

const axiosInstance = axios.create({
    baseURL: `${API_URL}/users`
})

export const loginRequest = async (user) => {
    return await axiosInstance.post("/login", user)
        .then(response => response.data)
        .catch(e => { throw e } );
}

export const registerRequest = async (user) => {
    return await axiosInstance.post("/register", user)
        .then(response => response.data)
        .catch(e => { throw e });
}

export const updateRequest = async (user) => {
    return await axiosInstance.post("/update", user)
        .then(response => response.data)
        .catch(e => { throw e })
}

export const getRequest = async (id) => {
    return await axiosInstance.get(`/${id}`)
        .then(response => response.data)
        .catch(e => { throw e })
}