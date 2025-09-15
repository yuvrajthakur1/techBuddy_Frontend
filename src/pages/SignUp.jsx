import React from 'react';
import { Form, NavLink} from 'react-router-dom';

const SignUp = () => {
  



  return (
    <div className="min-h-screen bg-gray-900  text-gray-100 font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 relative bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-xl animate-scaleIn">
        
                 <div className="flex items-center left-3 top-5 absolute justify-center w-40 h-12 space-x-2">
            <img src="/Logo1.png" alt="Brand Logo" />
          </div>
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-white mb-6 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sign Up</h2>
        <Form  method='post' className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
             
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="occupation"
              placeholder="Occupation (Optional)"
            
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="college"
              placeholder="College (Optional)"
             
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="City (Optional)"
            
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </Form>
        <div className="mt-4 text-center">
          <NavLink to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Already have an account? Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
