import api from '../axios/axios'
import { redirect } from 'react-router-dom'

const resetAction = async({params,request})=>{
  const {token} = params;
  const formData = await request.formData();
  console.log(formData)
  const plainFormData = Object.fromEntries(formData);
 console.log(plainFormData);
  try{
    const res = await api.post(`/auth/reset-password/${token}`,plainFormData)
    alert(res.data.message);
    return redirect("/login");
  } catch(error) {
     alert(error.response.data.message);
     return redirect("/forgot-password");
  }
}

export default  resetAction;