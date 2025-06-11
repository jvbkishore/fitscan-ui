import { 
  Home,   User,   Calendar,   QrCode,   Settings,   LogOut,  MoreHorizontal,  Activity,  Clock,  Shield,  HeartPulse,  UserPlus
} from 'lucide-react'; // Or use your preferred icon library

import QRCodeContent from './dashboard/QRCodeContent';
import WorkoutHistory from './dashboard/WorkoutHistory';
import AccountSettings from './dashboard/AccountSettings';
import ConsistencyScore from './dashboard/ConsistencyScore'; 
import CheckinHistory from './dashboard/CheckinHistory';
import HealthStats from './dashboard/HealthStats';
import ProfileSettings from './dashboard/ProfileSettings';
import ReferralScreen from './dashboard/ReferralScreen';
import { Trophy } from 'lucide-react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('qrcode'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
  // Clear localStorage/sessionStorage or any tokens
  localStorage.removeItem('accessToken'); // Replace with your key
  localStorage.removeItem('fitscan_user'); // Optional
  
  // Navigate to login screen
  navigate('/'); // Replace with your login route
};
  return (
    <div className="flex h-screen bg-[#101010] text-gray-200">
      {/* Sidebar Navigation */}
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
          {[
            // { icon: <Home size={20} />, label: "Dashboard", active: true,key: "dashboard" },
            { icon: <QrCode size={20} />, label: "My QR Code" ,key: "qrcode"},
            {icon: <Trophy size={20} />, label: "consistencyscore" ,key: "consistencyscore"},
            { icon: <Activity size={20} />, label: "Workout History 🔒",key:"workouts" },
            { icon: <HeartPulse size={20} />, label: "Health Stats 🔒",key:"healthstats"  },
            { icon: <Clock size={20} />, label: "Check-in History",key:"checkinhistory" },
             { icon: <UserPlus size={20} />, label: "Referral",key:"Referral" },
            { icon: <User size={20} />, label: "Profile", key : "profile" },
            // { icon: <LogOut size={20} />, label: "LogOut", key : "LogOut", onClick: handleLogout },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveMenu(item.key)}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${item.active ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'}`}
            >
              <span className="opacity-80">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}


           <button
                key="LogOut"
                onClick={() => { handleLogout(); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeMenu === "LogOut" ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
                }`}
              >
                <span className="opacity-80"><LogOut /></span>
                <span>LogOut</span>
              </button>

        </nav>
      </div>

      {/* Mobile Bottom Navigation (for small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#2b2b2b] flex justify-around p-2">
        {[
          
          { icon: <QrCode size={20} />, label: "QR",key: "qrcode" },
          // { icon: <Clock size={20} />, label: "Check-in History",key:"checkinhistory" },
          { icon: <UserPlus size={20} />, label: "Referral",key:"Referral" },
          {  icon: <Trophy size={28} strokeWidth={1.5} />, label: "Score",key: "consistencyscore" },
          
          // { icon: <Activity size={20} />, label: "Activity",key:"workouts" },
          { icon: <User size={20} />, label: "Profile", key : "profile"  },
          { 
            icon: <MoreHorizontal size={20} />, 
            label: "More",
            key: "More",
            isMenuTrigger: true 
          }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() =>{if (item.isMenuTrigger) {
                setMobileMenuOpen(!mobileMenuOpen);
              } else {
                setActiveMenu(item.key);
                setMobileMenuOpen(false);
              }}}
            href="#"
            className="flex flex-col items-center p-2 text-xs"
          >
            <span className="opacity-80">{item.icon}</span>
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-0 right-0 w-64 h-full bg-[#181818] border-l border-[#2b2b2b] p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {/* Logo Section */}
              <div className="flex items-center gap-3 mb-8 p-2">
                <span className="bg-lime-400 rounded-xl p-2">
                  <svg width="24" height="24" viewBox="0 0 448 512">
                    <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" fill="white"/>
                  </svg>
                </span>
                <span className="text-xl font-bold">FitScan</span>
              </div>

              {/* Menu Items */}
              {[
                { icon: <QrCode size={20} />, label: "My QR Code", key: "qrcode" },
                { icon: <Trophy size={20} />, label: "Consistency Score", key: "consistencyscore" },
                { icon: <Activity size={20} />, label: "Workout History 🔒", key: "workouts" },
                { icon: <HeartPulse size={20} />, label: "Health Stats 🔒", key: "healthstats" },

                { icon: <Clock size={20} />, label: "Check-in History", key: "checkinhistory" },
                { icon: <UserPlus size={20} />, label: "Referral",key:"Referral" },
                { icon: <User size={20} />, label: "Profile", key: "profile" },
                // { icon: <LogOut size={20} />,label: "LogOut", key: "logout", onClick: handleLogout,},
                 
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveMenu(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                    activeMenu === item.key ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}


              <button
                key="LogOut"
                onClick={() => { handleLogout(); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeMenu === "LogOut" ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'
                }`}
              >
                <span className="opacity-80"><LogOut /></span>
                <span>LogOut</span>
              </button>


              
            </nav>
          </div>
        </div>
      )}

      

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back, Kishore!</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-[#222] hover:bg-[#2b2b2b]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
                <User size={16} className="text-[#181f10]" />
              </div>
              <span className="hidden sm:inline">JVB Kishore</span>
            </div>
          </div>
        </header>

        {/* Quick Actions Card */}
        

        {/* Recent Activity Section */}
        <section className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 mb-8">
          {activeMenu === 'qrcode' && <QRCodeContent />}
          {activeMenu === 'consistencyscore' && <ConsistencyScore />}
          {activeMenu === 'workouts' && <WorkoutHistory />}
          
          {activeMenu === 'healthstats' && <HealthStats/>}
          {activeMenu === 'Referral' && <ReferralScreen/>}
         
          {activeMenu === 'checkinhistory' && <CheckinHistory />}
          {activeMenu === 'profile' && <ProfileSettings />}
          
        </section>
      </div>



    </div>
  );
};

export default CustomerDashboard;