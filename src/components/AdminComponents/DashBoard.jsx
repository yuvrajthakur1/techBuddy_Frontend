import CountUp from 'react-countup';
import {
  Users,
  FileQuestion,
  MessageSquareQuote,
  Activity
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useEffect, useState } from 'react';
import api from '../../axios/axios';
import { RingLoader } from 'react-spinners';






// --- Reusable UI Components ---

const StatCard = ({ title, value, IconComponent, colorClass }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
          <CountUp start={0} end={value} duration={2.5} separator="," />
        </div>
        <div className={`p-3 rounded-full ${colorClass.bg}`}>
            <IconComponent className={`w-6 h-6 ${colorClass.text}`} />
        </div>
    </div>
);



const AttemptsChart = ({last5Attempts}) => {


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Attempts Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={last5Attempts} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="_id" tick={{ fill: '#6b7280' }} fontSize={12} />
            <YAxis tick={{ fill: '#6b7280' }} fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="totalAttempts" 
              stroke="#3b82f6" 
              strokeWidth={2}
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};





// --- Page Components ---

const Dashboard = () => {

  const [loading,setLoading] = useState(true);
  const [totalUsers,setTotalUsers] = useState(0);
  const [totalAttemts,setTotalAttempts] = useState(0);
  const [totalQuestions,setTotalQuestions] = useState(0);
  const [last5Attempts,setLast5Attempts] = useState([]);



  // Fetching all stats  
  useEffect(()=>{
       const fetchStats = async()=>{
        const res = await api.get("/admin/stats");
        const data = res.data;
        // console.log(data);
        setTotalUsers(data.totalUsers);
        setTotalAttempts(data.totalAttempts);
        setTotalQuestions(data.totalQuestions);
        setLast5Attempts(data.last5DaysAttempts);
        setLoading(false);
       }
       fetchStats();
  },[]); 
  

  if(loading){
    return <div className="flex w-full h-screen relative bg-gray-900">
           <RingLoader className='left-[45%] top-[39%]'
      color="#33d8dd"
      loading
    />
          </div>
  }
  
  return (
    <div className="p-6 bg-gray-100 min-h-full">
        <h1 className="md:text-3xl sm:text-2xl text-xl font-bold mb-6">Dashboard</h1>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Users" value={totalUsers} IconComponent={Users} colorClass={{ bg: 'bg-blue-100', text: 'text-blue-500' }} />
            <StatCard title="Total Attempts" value={totalAttemts} IconComponent={MessageSquareQuote} colorClass={{ bg: 'bg-green-100', text: 'text-green-500' }} />
            <StatCard title="Total  Questions" value={totalQuestions} IconComponent={FileQuestion} colorClass={{ bg: 'bg-yellow-100', text: 'text-yellow-500' }} />
            <StatCard title="Attempts Today" value="124" IconComponent={Activity} colorClass={{ bg: 'bg-red-100', text: 'text-red-500' }} />
        </div>

        {/* Chart Section */}
        <div>
            <AttemptsChart last5Attempts={last5Attempts}/>
        </div>
    </div>
);
}



export default Dashboard;