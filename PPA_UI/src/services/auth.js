import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://localhost:5001/api/users"
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