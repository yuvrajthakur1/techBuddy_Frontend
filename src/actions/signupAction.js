import { redirect } from "react-router-dom";
import api from "../axios/axios";

export default async function signupAction({request}){

  const formData = await  request.formData();
  //Data is in multipart format not in a plain json so we woud have to convert it into plain ojb or get data one by one
  //Convrtininto plain obj
  
  const plainFormData =  Object.fromEntries(formData); 
  console.log(plainFormData);
  // Making Api Requess
  try {
     const res = await api.post("/auth/register",plainFormData);
     const data = res.data;
     alert(data.msg);
     return redirect('/login');
  } catch (error) {
    alert(error?.response.data.msg);
    return {failure:error?.response.data.msg}
  }
}