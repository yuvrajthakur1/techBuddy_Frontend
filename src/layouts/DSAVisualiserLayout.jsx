import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon} from "lucide-react";
import { useLocation } from "react-router-dom";
import api from "../axios/axios";
import VisualiserSidebarItem from "../components/VisualiserSideBar";


export default function DSAVisualiserLayout(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useLoaderData();
  // const { user, logout } = useAuth(); // You would get user and logout function from context

  // Dummy user data for demonstration
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

   const handleLogout = async()=>{
     try {
      const res = await api.post("/auth/logout");
      console.log(res);
      return res;
     } catch (error) {
         console.log("Logout Error",error);
     }
    }
     
   useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [location]);

  return(
    <>
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

          <div className="h-screen overflow-hidden bg-gray-950 text-gray-200 flex flex-col">

            <nav className="h-20 py-2 pl-10 pr-10 justify-between items-center glass-card bg-gray-800 flex">
              
              <div>
                 {/* Brand/Logo */}
          <div className="flex items-center w-40 h-12 space-x-2">
            <img src="/Logo1.png" alt="Brand Logo" />
          </div>

              </div>
               
               <div className="lg:flex hidden gap-4">
                 <NavLink
                              to="/profile/practice"
                             className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                            >
                              Practice With AI
                            </NavLink>
                
                            <NavLink
                              to="/profile"
                             className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                            >
                              Analytics
                            </NavLink>
                
                            <NavLink
                              to="/dsavisualiser"
                              className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                              
                            >
                              DSA Visualise
                            </NavLink>

                             <button
                              onClick={handleLogout}
                              className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                              
                            >
                              LogOut
                            </button>
                            
               </div>
               <div className={`lg:hidden  ${isMobileMenuOpen?'hidden':'block'} `}>
                <button onClick={toggleMobileMenu}>
                  <MenuIcon/>
                </button>
               </div>
               
               {isMobileMenuOpen && (
                 <div className="lg:hidden p-4 items-center fixed z-50 top-0 right-0 w-full   bg-gray-950 flex flex-col gap-4">
                  <div>
                   <button onClick={toggleMobileMenu}>
                     <XIcon/>
                   </button>
                  </div>
                  <div className="flex flex-col gap-2">
                   <NavLink
                                to="/profile/practice"
                               className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                              >
                                Practice With AI
                              </NavLink>
                  
                              <NavLink
                                to="/profile"
                               className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                              >
                                Analytics
                              </NavLink>
                  
                              <NavLink
                                to="/dsavisualiser"
                                className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                                
                              >
                                DSA Visualise
                              </NavLink>
                              
                             <button
                              onClick={handleLogout}
                              className="text-sm font-bold glass-card py-2 w-40 rounded-md text-center"
                              
                            >
                              LogOut
                            </button>
                              
                  </div>
               </div>
               )
               
               }
                  
               

             
            </nav>
                  

            <div className="bg-pink-800 flex-1 flex overflow-hidden">

              <aside className="w-64 pr-3 lg:flex overflow-y-auto hidden flex-col start pt-3 pb-2  bg-gray-900">


                    <div className="flex flex-col justify-start pl-4  py-7">
                      <div>
                        <h1 className="text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse-light cursor-pointer ">Visualise DSA</h1>
                      </div>
                    </div> 

                     <div className="flex flex-col gap-4 justify-start pl-4  py-7">

                         <VisualiserSidebarItem title="Array" options={["Simple"]}/>
                         <VisualiserSidebarItem title="Stack" options={["Simple"]}/>
                         <VisualiserSidebarItem title="Queue" options={["Simple","Circular","Deque","Priority"]}/>
                         <VisualiserSidebarItem title="LinkedList" options={["Singly","Doubly","SinglyCircular","DoublyCircular"]}/>

                     </div>
          
              </aside>

              <div className="flex-1 overflow-y-auto  bg-gray-950">

                     <Outlet/>
              </div>

            </div>
            
          </div>
    </>
  )
}