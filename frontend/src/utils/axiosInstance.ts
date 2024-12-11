import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://chat-app-firebase.onrender.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default axiosInstance;