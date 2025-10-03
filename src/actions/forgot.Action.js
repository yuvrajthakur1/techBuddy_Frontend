import api from '../axios/axios';
import {redirect} from 'react-router-dom';

const forgotAction = async({request})=>{
  console.log("Forgot KArne TO Agye");
  const formData = await request.formData();
  console.log(formData);
  const plainFormData = Object.fromEntries(formData);
  console.log("plain", plainFormData);
  try {
      const res = await api.post("/auth/forgot-password",plainFormData);
      console.log("Hey Here");
       console.log(res.data);
      return redirect("/");
  } catch (error) {
      console.log("Some Reset Error",error);
      redirect("/forgot-password");
  }
}

export default forgotAction;