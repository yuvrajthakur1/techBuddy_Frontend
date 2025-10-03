// import { redirect } from "react-router-dom";
// import api from "../axios/axios";
// import Swal from 'sweetalert2';

// export default async function loginAction({request}) {
//      const formData = await request.formData();
//      const plainData = Object.fromEntries(formData);
    
     
//      try {
//        const res = await api.post('/auth/login',plainData);
//       //  console.log(res.data.msg)
//        await Swal.fire({
//           icon: 'success',
//           title: res.data.msg,
//           text: 'Welcome back!',
//           timer: 2000, // Alert will close after 2 seconds
//           showConfirmButton: false,
//           background: '#1f2937', // Custom background for dark theme
//           color: '#ffffff'      // Custom text color
//         });
//        return redirect('/profile');
//      } catch (error) {
//       await Swal.fire({
//           icon: 'success',
//           title: error,
//           text: 'Welcome back!',
//           timer: 2000, // Alert will close after 2 seconds
//           showConfirmButton: false,
//           background: '#1f2937', // Custom background for dark theme
//           color: '#ffffff'      // Custom text color
//         });
//        return redirect("/signup");
//      }

// }




import { redirect } from "react-router-dom";
import api from "../axios/axios";
import Swal from "sweetalert2";

export default async function loginAction({ request }) {
  const formData = await request.formData();
  const plainData = Object.fromEntries(formData);

  try {
    const res = await api.post("/auth/login", plainData);

    await Swal.fire({
      icon: "success",
      title: "✅ " + res.data.msg,
      text: "Welcome back! We're glad to see you again.",
      timer: 2200,
      showConfirmButton: false,
      background: "#1e293b", // slate dark background
      color: "#f9fafb", // subtle white text
      backdrop: `
        rgba(0,0,0,0.6)
        url("https://i.gifer.com/ZZ5H.gif")
        center top
        no-repeat
      `,
      customClass: {
        popup: "rounded-2xl shadow-2xl p-6",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm opacity-90"
      }
    });

    return redirect("/profile");
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "⚠️ Login Failed",
      text:
        error.response?.data?.msg ||
        "Something went wrong. Please check your credentials.",
      confirmButtonText: "Try Again",
      confirmButtonColor: "#ef4444", // Tailwind red-500
      background: "#1e293b",
      color: "#f9fafb",
      customClass: {
        popup: "rounded-2xl shadow-2xl p-6",
        title: "text-lg font-semibold",
        confirmButton: "rounded-lg px-6 py-2"
      }
    });

    return redirect("/signup");
  }
}
