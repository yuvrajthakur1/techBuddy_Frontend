import axios from "axios"

const baseRemote ="https://techbuddy-backend-a95s.onrender.com";
const baseLocal = "http://localhost:4000"
export const api = axios.create({
  baseURL:`${baseRemote}/api`,
  withCredentials:true,
})

export default api;
