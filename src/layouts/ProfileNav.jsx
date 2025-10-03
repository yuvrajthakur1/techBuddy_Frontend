import { MenuIcon, XIcon,LogOut } from 'lucide-react';
import React, { useEffect, useState} from 'react';

import { useLocation, useNavigation } from 'react-router-dom';
import { NavLink} from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import api from '../axios/axios'
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader, RingLoader } from 'react-spinners';



const NavItem = ({path,field})=>{
     return  <NavLink
                              to={path}
                             className="text-sm font-semibold text-slate-200  py-2  rounded-md text-center
                               relative pb-1 hover:text-sky-300
                after:content-[''] after:absolute after:left-0 after:bottom-0
                after:h-[2px] after:w-0 after:bg-current
                after:transition-all after:duration-300
                hover:after:w-full   
                             "
                            >
                              {field}
                            </NavLink>
}

const ProfileNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  // const { user, logout } = useAuth(); // You would get user and logout function from context

  // Dummy user data for demonstration
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async()=>{
   try {
    await api.post("/auth/logout");
    navigate("/login");
   } catch (error) {
       console.log("Logout Error",error);
   }
  }

 
 useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);


  const navigation = useNavigation();

  if (navigation.state === "loading") {
    // pure page ka loader
    return (
      <div className="flex w-screen h-screen justify-center items-center bg-gray-950">
     <RingLoader
  color="#33d8dd"
  loading
/>
      </div>
    );
  }

  

  return (
    <div className='flex  flex-col h-screen  bg-gray-900'>
      <style>{`
        @keyframes pulse-light {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
        .navbar-scrolled {
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link-active {
          background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      `}{`
        @keyframes pulse-light {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
        .navbar-scrolled {
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link-active {
          background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      `} {`
        .glass-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.7);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-out forwards;
        }
        @keyframes glowing {
          0% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
          100% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
        }
      `}</style>

     <nav className="h-20 py-2 pl-6 text-white pr-6 justify-between items-center glass-card bg-gray-950 flex">
              
              <div>
                {/* Brand/Logo */}
          <div className="flex items-center w-40 h-12 space-x-2">
            <img src="/Logo1.png" alt="Brand Logo" />
          </div>

              </div>
               
               <div className="lg:flex hidden gap-8">
                   
                         <div className='flex gap-6' >                         
                            <NavItem path="/profile/practice" field="Practice"/>
                            <NavItem path="/profile" field="Analytics"/>
                            <NavItem path="/dsavisualiser" field="Visualise DSA"/>
                           {
                            user.role.toLowerCase() === "admin" && <NavItem path="/admin" field="Admin Panel"/>
                           }
                         </div>

                            <button
                              onClick={handleLogout}
                              className=" cursor-pointer text-sm flex justify-center items-center mt-1 font-semibold text-slate-200     rounded-md text-center"
                              
                            >
                              <LogOut/>
                            </button>
                            
               </div>

               <div className={`lg:hidden text-white ${isMobileMenuOpen?'hidden':'block'} `}>
                <button onClick={toggleMobileMenu}>
                  <MenuIcon/>
                </button>
               </div>
               
               {isMobileMenuOpen && (
                 <div className="lg:hidden  p-4 items-center fixed z-50 top-0 right-0 w-full   bg-gray-900 border-b-[1px] flex flex-col gap-4">
                  <div>
                   <button onClick={toggleMobileMenu}>
                     <XIcon/>
                   </button>
                  </div>
                  <div className="flex flex-col pb-1 gap-2">
                            <NavItem path="/profile/practice" field="Practice"/>
                            <NavItem path="/profile" field="Analytics"/>
                            <NavItem path="/dsavisualiser" field="Visualise DSA"/>
                           {
                            user.role.toLowerCase() === "admin" && <NavItem path="/admin" field="Admin Panel"/>
                           }

                              <button
                              onClick={handleLogout}
                              className="cursor-pointer  text-sm flex justify-center items-center  font-bold text-slate-200 py-2  rounded-md text-center" 
                            >
                              <LogOut/>
                            </button>
                            
                              
                  </div>
               </div>
               )
               
               }  
            </nav>

      <main className='flex-1 overflow-auto'>
        <Outlet context={{isMobileMenuOpen,setIsMobileMenuOpen}}/>
      </main>
    </div>
  );
};

export default ProfileNavbar;
