import { redirect } from "react-router-dom";
import api from "../axios/axios";
import { Toaster } from "react-hot-toast";
import { notifySuccess,notifyError } from "../TOast/toast";
export default async function loginAction({request}) {
     const formData = await request.formData();
     const plainData = Object.fromEntries(formData);
     try {
       const res = await api.post('/auth/login',plainData);
       console.log(res.data.msg)
       notifySuccess(res.data.msg);
       return redirect('/profile');
     } catch (error) {
       notifyError(error.response.message);
       return redirect("/signup");
     }

}