import axios from "axios"


export const api = axios.create({
  baseURL:"https://techbuddy-backend-a95s.onrender.com/api",
  withCredentials:true,
})

export default api;
