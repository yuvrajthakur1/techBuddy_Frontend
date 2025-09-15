import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import  {useLoaderData} from 'react-router-dom'
import { useOutletContext } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {notifySuccess } from '../TOast/toast';
// This is the data we would get from the backend API.
// It reflects the structure of your Attempt model.

const ProfilePage = () => {

  // const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);

  const {user,attempts} = useLoaderData();
  
   
  
  // This effect simulates fetching data from your backend API





  const progressData = attempts.map(attempt => ({
  date: new Date(attempt.date).toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  }),
  score: attempt.score,
}));


  // In child route:



  const  {isMobileMenuOpen}  = useOutletContext();
 

  useEffect(()=>{
    notifySuccess("Welcome " + user.name)
  },[])
  
  return (
    <div className=" h-screen bg-gray-900  text-gray-100  p-6">
           
       
        <Toaster
                   position="top-center"
                   reverseOrder={false}
                   gutter={8}
                   toastOptions={{
                     // Define default options
                     className: 'glass-cards',
                     duration: 50000,
                     style: {
                       background: '#ffffff',
                       color: '#363636',
                     },
                     // Default options for specific types
                     success: {
                       duration: 3000,
                       theme: {
                         primary: 'green',
                         secondary: 'black',
                       },
                     },
                   }}
                 />

      
      <style>{`
        .glass-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.7);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
      `}</style>


      <div className="max-w-4xl  mx-auto flex flex-col justify-around pb-20 gap-4">
      


        {/* Profile Header */}
        <div className={`p-6 ${isMobileMenuOpen?'':'glass-card'} rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8`}>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400">
              {user.name.charAt(0)}
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
              <p className="text-blue-400 text-lg">{user.occupation}</p>
              <p className="text-sm text-gray-400">{user.college}, {user.city}</p>
            </div>
          </div>
          <button className="py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-full transition-colors shadow-md">
            Edit Profile
          </button>
        </div>

        {/* Analytics Dashboard - Now a single column */}
        <div className={`${isMobileMenuOpen?'':'glass-card'} p-6  rounded-2xl shadow-xl`}>
          <h2 className="text-2xl font-bold mb-4 text-white">Your Progress Over Time</h2>
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading data...</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#ffffff' }}
                    itemStyle={{ color: '#4b5563' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="url(#colorScore)" strokeWidth={3} dot={{ stroke: 'url(#colorScore)', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#3b82f6" />
                      <stop offset="95%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-white">Recent Attempts</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {attempts.map((attempt, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center text-sm">
                    <p className="text-gray-300 font-semibold">{attempt.question.length > 50 ? `${attempt.question.substring(0, 50)}...` : attempt.question}</p>
                    <span className="text-sm font-bold text-white px-3 py-1 rounded-full"
                          style={{ backgroundColor: attempt.score > 80 ? '#10B981' : attempt.score > 60 ? '#F59E0B' : '#EF4444' }}>
                      Score: {attempt.score}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>


      </div>




    </div>
  );
};

export default ProfilePage;
