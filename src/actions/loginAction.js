import { redirect } from "react-router-dom";
import api from "../axios/axios";
import Swal from 'sweetalert2';

export default async function loginAction({request}) {
     const formData = await request.formData();
     const plainData = Object.fromEntries(formData);
    
     
     try {
       const res = await api.post('/auth/login',plainData);
      //  console.log(res.data.msg)
       await Swal.fire({
          icon: 'success',
          title: res.data.msg,
          text: 'Welcome back!',
          timer: 2000, // Alert will close after 2 seconds
          showConfirmButton: false,
          background: '#1f2937', // Custom background for dark theme
          color: '#ffffff'      // Custom text color
        });
       return redirect('/profile');
     } catch (error) {
      await Swal.fire({
          icon: 'success',
          title: error,
          text: 'Welcome back!',
          timer: 5000, // Alert will close after 2 seconds
          showConfirmButton: false,
          background: '#1f2937', // Custom background for dark theme
          color: '#ffffff'      // Custom text color
        });
       return redirect("/signup");
     }

}




