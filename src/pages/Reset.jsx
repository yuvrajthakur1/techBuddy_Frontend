import React from 'react'
import {Form} from 'react-router-dom'

const Reset = () => {
  return (
    <div className='min-h-screen  bg-gray-900 text-gray-100 font-sans flex items-center justify-center p-4'>
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
              <div className='w-96 h-96 relative flex flex-col rounded-xl justify-center items-center gap-4 bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 p-8'>

                 <div className="flex items-center left-3 top-5 absolute justify-center w-40 h-12 space-x-2">
            <img src="/Logo1.png" alt="Brand Logo" />
          </div>
                <h2 className='font-bold text-center text-white mb-6 bg-clip-text  bg-gradient-to-r from-blue-400 to-purple-400' >Reset Password</h2>
                <Form method='post' className='flex flex-col w-full justify-between gap-4 items-center'>

                   <div className='flex flex-col gap-4 justify-between items-start w-full'>
                     <label htmlFor="password" className='font-semibold text-sm'>Enter Your New Password</label>

                    <input type="password" id='password' name="password" className='w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300'/>
                   </div>

                    <button className='p-2 font-semibold bg-blue-500 w-full rounded-md hover:text-blue-300 transition-colors' type='submit'>Change Password</button>

                </Form>
              </div>
         
    </div>
  )
}

export default Reset;