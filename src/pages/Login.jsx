import React, { useRef } from 'react';
import { Form, NavLink, useActionData } from 'react-router-dom';

const Login = () => {
  const formRef = useRef(null);  
  return (
    <>
      <style>{`
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
        @keyframes glowing {
          0% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
          100% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-out forwards;
        }
        .hover-glowing:hover {
          animation: glowing 1.5s infinite;
        }
      `}</style>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl animate-fadeInSlideUp">
          <h2 className="text-3xl font-bold text-center text-white mb-6 bg-clip-text  bg-gradient-to-r from-blue-400 to-purple-400">Log In</h2>
          <Form method='post' className="space-y-4" ref={formRef}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-md transition-all hover:bg-blue-600 transform  hover:animate-bounce "
            >
              Log In
            </button>
          </Form>
          <div className="mt-4 text-center">
            <NavLink to='/signup' className="text-blue-400 hover:text-blue-300 transition-colors">
              Don't have an account? Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
