import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import {ClimbingBoxLoader,hash, RingLoader} from 'react-spinners';



const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


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
    <>
        <div className='flex flex-col bg-gray-950'>


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
      `}
      </style>
       <nav
        className={`p-4 transition-all  shadow-md glass-card shadow-gray-800 duration-300 fixed w-full z-20 top-0 ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}
      >
        <div className="container mx-auto  flex justify-between items-center">
          {/* Brand/Logo */}
          <div className="flex items-center w-40 h-12 space-x-2">
            <img src="/Logo1.png" alt="Brand Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
              <NavLink to="/about" className="text-md text-white font-md glass-card py-1 w-32 rounded-md text-center">About</NavLink>

              <NavLink to="#" className="text-md text-white font-md glass-card py-1  w-32 rounded-md text-center">Features</NavLink>

              <NavLink to="/" className="text-md text-white font-md glass-card py-1  w-32 rounded-md text-center">Home</NavLink>

           
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `py-1 px-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `py-1 px-4 border-2 border-blue-800 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 transform hover:scale-105 ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg::hidden bg-gray-950 bg-opacity-90 backdrop-filter backdrop-blur-md absolute top-16 left-0 w-full flex flex-col items-center space-y-4 py-4 transition-all duration-300 ease-in-out transform origin-top animate-fadeIn">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `w-full text-center py-2 px-4 glass-card rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-white ${
                  isActive ? 'nav-link-active' : 'text-gray-300'
                }`
              }
              onClick={toggleMobileMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `w-full text-center py-2 px-4 glass-card rounded-lg transition-all duration-300 hover:bg-gray-700 hover:text-white ${
                  isActive ? 'nav-link-active' : 'text-gray-300'
                }`
              }
              onClick={toggleMobileMenu}
            >
              Features
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `w-full text-center py-2 px-4 glass-card bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300 ${
                  isActive ? 'bg-blue-600' : ''
                }`
              }
              onClick={toggleMobileMenu}
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `w-full text-center py-2 px-4 glass-card border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ${
                  isActive ? 'bg-blue-500 text-white' : ''
                }`
              }
              onClick={toggleMobileMenu}
            >
              Sign Up
            </NavLink>
          </div>
        )}
        </nav>

        <main className='flex-1'>
          <Outlet/>
        </main>
     </div>
    </>
  );
};


export default AppLayout