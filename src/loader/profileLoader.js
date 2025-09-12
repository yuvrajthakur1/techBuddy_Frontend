import api from '../axios/axios'
import {redirect} from 'react-router-dom';

export default async function profileLoader(){

    try {
      const userRes = await api.get("/profile");
      const attemptRes = await api.get("/attempts/my-attempts");
      const attemptData = attemptRes.data;
      return {user:userRes.data.user,attempts:attemptData};
    } catch (error) {
        console.log("Access Denied From Loader",error?.response?.data);
        return redirect("/login");
    }
}