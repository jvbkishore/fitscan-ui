import { QrCode, Lock, UserPlus, Download } from 'lucide-react';
import { useState } from 'react';
import PremiumLock from '../PremiumLock'; // Assuming you have a PremiumLock component  

const AccessControlTab = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [isPremiumUser, setIsPremiumUser] = useState(false); 
  
  const accessDevices = [
    { id: 'D-001', name: 'Main Entrance', location: 'Front Door', status: 'online', lastActive: '2 mins ago' },
    { id: 'D-002', name: 'VIP Section', location: 'East Wing', status: 'offline', lastActive: '5 hours ago' },
    { id: 'D-003', name: 'Locker Room', location: 'North Side', status: 'online', lastActive: '1 min ago' },
  ];

  return (
    <div className="space-y-6">
      {!isPremiumUser && (
          <PremiumLock message="Export functionality requires Premium subscription" />
        )}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Lock size={24} className="text-lime-400" />
        Access Control
      </h1>

      <div className="flex gap-2 bg-[#222] border border-[#2b2b2b] p-1 rounded-lg">
        {['devices', 'permissions', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize ${
              activeTab === tab ? 'bg-lime-400 text-[#181f10]' : 'hover:bg-[#2b2b2b]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'devices' && (
        <div>
          <div className="flex justify-end gap-3 mb-4">
            <button className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] hover:bg-[#2b2b2b] px-3 py-2 rounded-lg">
              <Download size={16} />
              <span>Device Logs</span>
            </button>
            <button className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-[#181f10] px-4 py-2 rounded-lg">
              <UserPlus size={16} />
              <span>Add Device</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessDevices.map((device) => (
              <div key={device.id} className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-sm text-gray-400">{device.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    device.status === 'online' ? 'bg-lime-400/10 text-lime-400' : 'bg-red-400/10 text-red-400'
                  }`}>
                    {device.status}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#2b2b2b]">
                  <p className="text-sm text-gray-400">Last active: {device.lastActive}</p>
                  <p className="text-sm text-gray-400 mt-1">Device ID: {device.id}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-[#222] border border-[#2b2b2b] hover:bg-[#2b2b2b] px-3 py-2 rounded text-sm">
                    Configure
                  </button>
                  <button className="flex-1 bg-lime-400 hover:bg-lime-300 text-[#181f10] px-3 py-2 rounded text-sm">
                    Manage Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
          <h3 className="font-medium mb-4">Recent Access Logs</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Access logs would be displayed here
          </div>
        </div>
      )}

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
            <QrCode size={18} className="inline mr-2" />
            Generate Test QR Code
          </button>
          <button className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-4 py-2 rounded-lg">
            <Lock size={18} className="inline mr-2" />
            Emergency Lockdown
          </button>
          <button className="border border-purple-400 text-purple-400 hover:bg-purple-400/10 px-4 py-2 rounded-lg">
            <Download size={18} className="inline mr-2" />
            Export All Access Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControlTab;