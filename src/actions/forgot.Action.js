import api from '../axios/axios';
import {redirect} from 'react-router-dom';

const forgotAction = async({request})=>{
  console.log("Forgot KArne TO Agye");
  const formData = await request.formData();
  const plainFormData = Object.fromEntries(formData);

  try {
      await api.post("/auth/forgot-password",plainFormData);
      return redirect("/");
  } catch (error) {
      console.log("Some Reset Error",error);
      redirect("/forgot-password");
  }
}

export default forgotAction;