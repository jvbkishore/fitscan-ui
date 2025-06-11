import { Users,   Activity,   DollarSign,   QrCode,  Settings, LogOut,  BarChart2,  AlertCircle,  Shield,Scale , IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react'; 
import MembersTab from './Ownerdashboard/MembersTab'; 
import AttendanceTab from './Ownerdashboard/AttendanceTab'; 
import PaymentsTab from './Ownerdashboard/PaymentsTab';  
import EquipmentTab from './Ownerdashboard/EquipmentTab'; 
import AccessControlTab from './Ownerdashboard/AccessControlTab'; 
import SettingsTab from './Ownerdashboard/SettingsTab';     
import WeightTrackingTab from './Ownerdashboard/WeightTrackingTab'; 
import API_BASE_URL from '../config'; 
import { useNavigate } from 'react-router-dom';


const GymOwnerDashboard = () => {
   const navigate = useNavigate();
   const [gymDetails, setGymDetails] = useState(null);
   const [checkInDetails, setcheckInDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const fitscan_user = JSON.parse(localStorage.getItem('fitscan_user'));

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const requestBody = { email: fitscan_user.username };
        
        const response = await fetch(`${API_BASE_URL}/api/gym/dashboard`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setGymDetails(data);
        if (data && data.gymcode) {
          sessionStorage.setItem('gymCode', data.gymcode);
          fetchcheckInDetails();
          
        }
      } catch (error) {
        console.error("Error fetching gym details:", error);
      } finally {
        setLoading(false);
      }
    };

     const fetchcheckInDetails = async () => {
      try {
        const requestBody = sessionStorage.getItem('gymCode');
        
        const response = await fetch(`${API_BASE_URL}/api/qrcode/getcheckindetails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setcheckInDetails(data);
        
      } catch (error) {
        console.error("Error fetching CheckIn details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (fitscan_user  && fitscan_user.username && fitscan_user.role === 'Owner') {
      fetchGymDetails();
      
    }
  }, [fitscan_user.username]);



  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
    const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('fitscan_user'); 
    navigate('/'); 
  };

  // Close menu when clicking outside
  const handleBackdropClick = (e) => {
    // Only close if clicking directly on backdrop (not a child element)
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleClick = () => {
    setActiveTab('Members') // Update path as per your routing setup
  };

  // Mock data - replace with API calls
  const gymData = {
    members: gymDetails?.totalActiveUsers ?? 0,
    activeToday: gymDetails?.activeToday ?? 0,
    checkInPercentage: gymDetails?.checkInPercentage ?? 0,
    newThisMonth: gymDetails?.newThisMonth ?? 0,
    revenue: gymDetails?.monthlyRevenue ?? 0,
    revenueGrowth: gymDetails?.revenueGrowth ?? 0,
    expiringIn7DaysCount: gymDetails?.expiringIn7DaysCount ?? 0,
    checkins: checkInDetails?.checkinsBySlot || []
    // recentMembers: [
    //   { name: 'Kishore', joined: '2 days ago', plan: 'Premium' },
    //   { name: 'Sai', joined: '1 week ago', plan: 'Basic' },
    //   { name: 'James Wilson', joined: '1 week ago', plan: 'Student' },
    // ],
    // equipmentStatus: [
    //   { name: 'Treadmills', working: 8, maintenance: 2 },
    //   { name: 'Weight Machines', working: 12, maintenance: 1 },
    //   { name: 'Free Weights', working: 15, maintenance: 0 },
    // ]
  };

 

  const maxCount = gymData.checkins && gymData.checkins.length > 0
    ? Math.max(...gymData.checkins.map(h => h.count))
    : 1;

  return (
    <div className="flex h-screen bg-[#101010] text-gray-200">
      
      {/* Desktop Sidebar */}
      <div className="w-64 bg-[#181818] border-r border-[#2b2b2b] p-4 hidden md:block">
        <div className="flex items-center gap-3 mb-8 p-2">
          <span className="bg-lime-400 rounded-xl p-2">
            <svg width="24" height="24" viewBox="0 0 448 512">
              <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" fill="white"/>
            </svg>
          </span>
          <span className="text-xl font-bold">FitScan</span>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('Overview')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Overview' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <BarChart2 size={20} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('Members')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Members' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <Users size={20} />
            <span>Members</span>
          </button>

          <button
            onClick={() => setActiveTab('Attendance')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Attendance' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <Activity size={20} />
            <span>Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('FitnessTracking')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'FitnessTracking' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <Scale size={20} />
            <span>Fitness Tracking 🔒</span>
          </button>

          <button
            onClick={() => setActiveTab('Payments')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Payments' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <DollarSign size={20} />
            <span>Payments</span>
          </button>

          <button
            onClick={() => setActiveTab('Equipment')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Equipment' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <Shield size={20} />
            <span>Equipment 🔒</span>
          </button>

          <button
            onClick={() => setActiveTab('Access')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Access' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <QrCode size={20} />
            <span>Access Control 🔒</span>
          </button>

          <button
            onClick={() => setActiveTab('Profile')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${
              activeTab === 'Profile' ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left hover:bg-[#222] text-red-400 mt-4"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#181818] border-b border-[#2b2b2b] flex justify-between items-center p-4 z-10">
        <div className="flex items-center gap-3">
          <span className="bg-lime-400 rounded-xl p-1">
            <svg width="20" height="20" viewBox="0 0 448 512">
              <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" fill="white"/>
            </svg>
          </span>
          <span className="font-bold">FitScan</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-300 hover:text-white"
        >
          {/* {mobileMenuOpen ? <p size={24}>X</p> : <Menu size={24} />} */}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
       onClick={() => setMobileMenuOpen(false)}
        >
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute top-0 right-0 w-64 h-[calc(100%-4rem)] bg-[#181818] border-l border-[#2b2b2b] p-4 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1 mt-16">

                <div className="flex items-center gap-3 mb-8 p-2">
                  <span className="bg-lime-400 rounded-xl p-2">
                    <svg width="24" height="24" viewBox="0 0 448 512">
                      <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" fill="white"/>
                    </svg>
                  </span>
                  <span className="text-xl font-bold">FitScan</span>
                </div>
              {[
                { id: 'Overview', icon: <BarChart2 size={20} />, label: "Overview" },
                { id: 'Members', icon: <Users size={20} />, label: "Members" },
                { id: 'Attendance', icon: <Activity size={20} />, label: "Attendance" },
                { id: 'FitnessTracking', icon: <Scale size={20} />, label: "Fitness Tracking 🔒" },
                { id: 'Payments', icon: <DollarSign size={20} />, label: "Payments" },
                { id: 'Equipment', icon: <Shield size={20} />, label: "Equipment 🔒" },
                { id: 'Access', icon: <QrCode size={20} />, label: "Access 🔒" },
                { id: 'Profile', icon: <Settings size={20} />, label: "Profile" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                    activeTab === item.id ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-[#222] text-red-400 mt-4"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0 pb-16 md:pb-0">
        <div className="p-6">
          {/* Overview Tab */}
       

          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Gym Overview</h1>

              
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-blue-400" />
                    <h3 className="font-medium">Total Members</h3>
                  </div>
                  <p className="text-3xl font-bold mt-2">{gymData.members}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {gymData.newThisMonth} % this month
                  </p>
                </div>

                <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Activity size={20} className="text-lime-400" />
                    <h3 className="font-medium">Active Today</h3>
                  </div>
                  <p className="text-3xl font-bold mt-2">{gymData.activeToday}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {gymData.checkInPercentage} % of total members
                  </p>
                </div>

                <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <IndianRupee size={20} className="text-emerald-400" />
                    <h3 className="font-medium">Monthly Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold mt-2">₹ {gymData.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {gymData.revenueGrowth} % from last month
                  </p>
                </div>

                <div onClick={handleClick}
                className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="text-amber-400" />
                    <h3 className="font-medium">Users Expiries in 7 Days</h3>
                  </div>
                  <span className="flex items-end items-center  space-x-1 mt-2">
                    <p className="text-3xl font-bold">{gymData.expiringIn7DaysCount}</p>
                    {/* <p className="text-sm font-bold">&nbsp;members</p> */}
                  </span>
                  {/* <p className="text-sm text-gray-400 mt-1">
                    1 Premium, 1 Basic
                  </p> */}
                </div>
              </div>

              {/* Peak Hours Chart */}
              <div className="w-full h-64 mt-8 bg-[#1a1a1a] rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4 text-white">Check-ins by Time Slot</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gymData.checkins}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="hour" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#84cc16" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              
              {/* <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
                <h3 className="font-medium mb-4">Recent Members</h3> */}
                {/* <div className="space-y-4">
                  {gymData.recentMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-[#222] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400">
                          
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-400">{member.joined}</p>
                        </div>
                      </div>
                      <span className="bg-[#222] text-sm px-3 py-1 rounded-full">
                        {member.plan}
                      </span>
                    </div>
                  ))}
                </div> */}
                {/* <button className="mt-4 text-lime-400 hover:underline text-sm">
                  View All Members
                </button> */}
              {/* </div> */}
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'Members' && (
            <div>
              
              <MembersTab />
            </div>
          )}


          {/* Attendence Tab */}
          {activeTab === 'Attendance' && (
            <div>
              
              <AttendanceTab />
            </div>
          )}


           {/* Attendence Tab */}
          {activeTab === 'FitnessTracking' && (
            <div>
              
              <WeightTrackingTab />
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'Payments' && (
            <div>
              
              <PaymentsTab />
            </div>
          )}

          {/* Equipment Tab */}
          {activeTab === 'Equipment' && (
            <div>
              
              <EquipmentTab />
            </div>
          )}

             {/* AccessControl Tab */}
          {activeTab === 'Access' && (
            <div>
              
              <AccessControlTab />
            </div>
          )}


            {/* Setting Tab */}
          {activeTab === 'Profile' && (
            <div>
              
              <SettingsTab />
            </div>
          )}

          {/* Other tabs would have similar structures */}
          {/* {activeTab !== 'overview' && activeTab !== 'members' && (
            <div>
              <h1 className="text-2xl font-bold capitalize">{activeTab} Management</h1>
              <p className="text-gray-400 mt-2">
                {activeTab} features and data will be displayed here
              </p>
            </div>
          )} */}
        </div>
      </div>


             <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#2b2b2b] flex justify-around p-2 z-10">
        {[
          { id: 'Overview', icon: <BarChart2 size={20} />, label: "Overview" },
          { id: 'Members', icon: <Users size={20} />, label: "Members" },
          { id: 'Payments', icon: <DollarSign size={20} />, label: "Payments" },
          { id: 'FitnessTracking', icon: <Scale size={20} />, label: "Fitness Tracking 🔒" },
          { 
            id: 'more', 
            icon: <MoreHorizontal size={20} />, 
            label: "More",
            isMenuTrigger: true 
          }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.isMenuTrigger) {
                setMobileMenuOpen(!mobileMenuOpen); // Toggle menu
              } else {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }
            }}
            className={`flex flex-col items-center p-2 text-xs ${
              activeTab === item.id ? 'text-lime-400' : 'text-gray-400'
            } ${mobileMenuOpen && item.isMenuTrigger ? 'text-lime-400' : ''}`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GymOwnerDashboard;