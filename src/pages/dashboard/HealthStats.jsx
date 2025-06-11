import { HeartPulse, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PremiumLock from '../PremiumLock'; // Assuming you have a PremiumLock component  
import { useState } from 'react';

const HealthStats = () => {
  const stats = [
    { name: 'Mon', workouts: 1, calories: 420, heartRate: 72 },
    { name: 'Tue', workouts: 0, calories: 180, heartRate: 75 },
    { name: 'Wed', workouts: 2, calories: 680, heartRate: 68 },
    { name: 'Thu', workouts: 1, calories: 520, heartRate: 70 },
    { name: 'Fri', workouts: 3, calories: 890, heartRate: 65 },
    { name: 'Sat', workouts: 1, calories: 380, heartRate: 73 },
    { name: 'Sun', workouts: 0, calories: 210, heartRate: 76 },
  ];
  const [isPremiumUser, setIsPremiumUser] = useState(false); 

  return (
    <div className="space-y-6">
       {!isPremiumUser && (
          <PremiumLock message="Export functionality requires Premium subscription" />
        )}
      <div className="flex items-center gap-3">
        <HeartPulse size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Health Stats</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Workouts Card */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-400">Weekly Workouts</h3>
            <Activity size={18} className="text-lime-400" />
          </div>
          <p className="text-3xl font-bold mt-2">8</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-sm text-green-400">+2 from last week</span>
          </div>
        </div>

        {/* Calories Card */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-400">Calories Burned</h3>
            <HeartPulse size={18} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold mt-2">3,280</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-sm text-green-400">+15% from last week</span>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-400">Avg. Heart Rate</h3>
            <HeartPulse size={18} className="text-purple-400" />
          </div>
          <p className="text-3xl font-bold mt-2">71 <span className="text-sm font-normal">bpm</span></p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown size={16} className="text-green-400" />
            <span className="text-sm text-green-400">-3% from last week</span>
          </div>
        </div>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2b2b" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#181818', borderColor: '#2b2b2b' }}
            />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#b4fa1d" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthStats;