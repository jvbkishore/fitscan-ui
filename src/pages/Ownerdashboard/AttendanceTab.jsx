import { Activity, Calendar, Clock, UserCheck, UserX } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config'; 

const AttendanceTab = () => {
  const [dateRange, setDateRange] = useState('today');

  const [todayData, setTodayData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

      useEffect(() => {
      const fetchData = async () => {
        const gymCode = sessionStorage.getItem('gymCode');
        if (!gymCode) {
          console.error("No gym code found in sessionStorage");
          return;
        }
        // Fetch today's attendance data
        try {
          if (dateRange === 'today') {
           
            const response = await fetch(`${API_BASE_URL}/api/attendance/today`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymCode), // send raw string in body
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            const data = await response.json();
            setTodayData(data);

          } else if (dateRange === 'week') {
           
            const response = await fetch(`${API_BASE_URL}/api/attendance/weekly-summary`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymCode), // send raw string in body
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

            const data = await response.json();
            setWeeklyData(data);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }, [dateRange]);
  
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Activity size={24} className="text-lime-400" />
          Attendance Tracking
        </h1>
        
        <div className="flex gap-2 bg-[#222] border border-[#2b2b2b] p-1 rounded-lg">
          {['today', 'week', 'month', 'custom'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                dateRange === range ? 'bg-lime-400 text-[#181f10]' : 'hover:bg-[#2b2b2b]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {dateRange === 'today' && (
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">

          <div className="overflow-x-auto max-w-full">
            <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
              <div className="col-span-1">ID</div>
              <div className="col-span-4">Member</div>
              <div className="col-span-3">Check-in</div>
              <div className="col-span-3">Check-out</div>
              <div className="col-span-1">Status</div>
            </div>
          
            {todayData.map((entry) => (
              <div key={entry.id} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] hover:bg-[#222]">
                <div className="col-span-1">#{entry.id}</div>
                <div className="col-span-4">{entry.name}</div>
                <div className="col-span-3 flex items-center gap-2">
                  <UserCheck size={16} className="text-lime-400" />
                  {entry.checkIn}
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  {entry.checkOut ? (
                    <>
                      <UserX size={16} className="text-red-400" />
                      {entry.checkOut}
                    </>
                  ) : (
                    <span className="text-gray-400">Still in gym</span>
                  )}
                </div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    entry.checkOut ? 'bg-gray-400/10 text-gray-400' : 'bg-lime-400/10 text-lime-400'
                  }`}>
                    {entry.checkOut ? 'Completed' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {dateRange === 'week' && (
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
          <h3 className="font-medium mb-4">Weekly Attendance Trend</h3>
          <div className="h-64">
            <div className="flex h-full items-end gap-2">
              {weeklyData.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex">
                    <div 
                      className="bg-lime-400 rounded-t-sm"
                      style={{ height: `${(day.present / 100) * 100}%`, flex: day.present }}
                    ></div>
                    <div 
                      className="bg-red-400 rounded-t-sm"
                      style={{ height: `${(day.absent / 20) * 100}%`, flex: day.absent }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{day.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lime-400 rounded-sm"></div>
              <span className="text-sm">Present ({weeklyData.reduce((sum, day) => sum + day.present, 0)})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
              <span className="text-sm">Absent ({weeklyData.reduce((sum, day) => sum + day.absent, 0)})</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
            Export Attendance Report
          </button>
          <button className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-4 py-2 rounded-lg">
            Send Reminders to Absentees
          </button>
          <button className="border border-purple-400 text-purple-400 hover:bg-purple-400/10 px-4 py-2 rounded-lg">
            View Peak Hours Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;