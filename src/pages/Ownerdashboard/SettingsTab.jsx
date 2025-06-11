import { Settings, User, Lock, Bell, CreditCard, Shield ,MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import API_BASE_URL from '../../config'; // Adjust the path as necessary

// 🔧 Reusable Input Component
const Input = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
    />
  </div>
);

// 🔧 Reusable Textarea Component
const Textarea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gray-400 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 resize-vertical"
      rows={5}
      style={{ minHeight: '100px', maxHeight: '250px', overflowY: 'auto' }}
    />
  </div>
);

const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [gymData, setGymData] = useState(null);
  const gymCode = sessionStorage.getItem('gymCode');
  const [notifications, setNotifications] = useState({
    registartionmsg: `Hello User,
Thanks for joining MAX FITNESS. You are chosen One month membership. It will expires on Oct 18th 2024.

We just wanted to let you know that our timings are MORNING 5am to 10am and EVENING 5pm to 9pm and we have support ladies slot evening 3pm to 5pm. Every SUNDAY morning 6am to 9am. You can reach out to our TRAINERS for any support you need for exercise. 

We don't allow outside footwear so please rack your training shoes in outside shoe rack. So you don't have to carry everyday. We will lock it at nights. 

NOTE: we dont give any extensions in your membership when you are being absent. 

Please reach out to us at 7382888833, 7013779073 if you have any concerns or help you need. 

Have a great day ahead😊`,
    payreminder: `Dear client Oct 18th is Last Date of Your GYM Validity plz Pay GYM FEE With in The Date. Thank you😊 
MAX FITNESS GYM
AMALAPURAM`
  });

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        if (!gymCode) return console.error("No gym code found in sessionStorage");

        const response = await fetch(`${API_BASE_URL}/api/gym/gymdetails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gymCode),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGymData(data);
      } catch (error) {
        console.error('Failed to load gym details:', error);
      }
    };

    fetchGymDetails();
  }, []);

  const handleInputChange = (key, value) => {
    setGymData(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateGym = async () => {
    try {
      if (!gymCode) return console.error("No gym code found in sessionStorage");

      const response = await fetch(`${API_BASE_URL}/api/gym/gymdetailsupdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gymCode),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      alert('Gym details updated successfully');
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
        <h2 className="font-medium mb-4">Settings</h2>
        <nav className="space-y-1">
          {[
            { id: 'profile', icon: <User size={18} />, label: "Profile" },
            { id: 'gym', icon: <Shield size={18} />, label: "Gym Details" },
            { id: 'notifications', icon: <Bell size={18} />, label: "Notifications" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left ${activeSection === item.id ? 'bg-[#222] text-lime-400' : 'hover:bg-[#222]'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
        {gymData && activeSection === 'profile' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
            <div className="space-y-4 max-w-lg">
              <Input label="Gym Name" value={gymData.name} onChange={val => handleInputChange('Name', val)} />
              <Input label="Owner Name" value={gymData.ownerName} onChange={val => handleInputChange('OwnerName', val)} />
              <Input label="Contact Email" value={gymData.ownerEmail} onChange={val => handleInputChange('OwnerEmail', val)} />
              <Input label="Phone Number" value={gymData.phonenumber} onChange={val => handleInputChange('Phonenumber', val)} />
              <button onClick={handleUpdateGym} className="mt-4 bg-lime-400 hover:bg-lime-300 text-[#181f10] font-medium px-6 py-2 rounded-lg">Save Changes</button>
            </div>
          </div>
        )}

        {gymData && activeSection === 'gym' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Gym Details</h1>
            <div className="space-y-4 max-w-lg">
              <Input label="Gym Address" value={gymData.Address || ''} onChange={val => handleInputChange('Address', val)} />
              <Input label="Latitude" value={gymData.latitude || ''} onChange={val => handleInputChange('Latitude', val)} />
              <Input label="Longitude" value={gymData.longitude || ''} onChange={val => handleInputChange('Longitude', val)} />
              <Input label="Joining Date" type="date" value={gymData.joiningdate?.substring(0, 10)} onChange={val => handleInputChange('Joiningdate', val)} />
              <button onClick={handleUpdateGym} className="mt-4 bg-lime-400 hover:bg-lime-300 text-[#181f10] font-medium px-6 py-2 rounded-lg">Update Gym Details</button>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div>
            <h1 className="text-2xl font-bold mb-6"><MessageCircle  className="inline mr-2" /> Whatsapp Notification Details</h1>
            <div className="space-y-4 max-w-lg">
              <Textarea
                label="Registration Message"
                value={notifications.registartionmsg}
                onChange={val => handleNotificationChange('registartionmsg', val)}
              />
              <Textarea
                label="Pay Reminder Message"
                value={notifications.payreminder}
                onChange={val => handleNotificationChange('payreminder', val)}
              />
              <button onClick={handleUpdateGym} className="mt-4 bg-lime-400 hover:bg-lime-300 text-[#181f10] font-medium px-6 py-2 rounded-lg">Update Notifications</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTab;
