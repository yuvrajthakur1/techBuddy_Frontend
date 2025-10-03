import { redirect } from "react-router-dom";
import api from "../axios/axios";


export default async function loginAction({request}) {
     const formData = await request.formData();
     const plainData = Object.fromEntries(formData);
     try {
       const res = await api.post('/auth/login',plainData);
       console.log(res.data.msg)
       return redirect('/profile');
     } catch (error) {
      console.log(error);
       return redirect("/signup");
     }

}