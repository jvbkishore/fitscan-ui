import { Shield, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import PremiumLock from '../PremiumLock'; // Assuming you have a PremiumLock component

const EquipmentTab = () => {
  const equipment = [
    { id: 1, name: 'Treadmill X9', category: 'Cardio', status: 'operational', lastMaintenance: '2023-09-20' },
    { id: 2, name: 'Leg Press', category: 'Strength', status: 'maintenance', lastMaintenance: '2023-08-15' },
    { id: 3, name: 'Dumbbell Set', category: 'Free Weights', status: 'operational', lastMaintenance: '2023-10-01' },
    { id: 4, name: 'Rowing Machine', category: 'Cardio', status: 'needs_repair', lastMaintenance: '2023-07-10' },
  ];

  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const statusCounts = equipment.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* {!isPremiumUser && (
          <PremiumLock message="Export functionality requires Premium subscription" />
        )} */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Shield size={24} className="text-lime-400" />
        Equipment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-lime-400" />
            <h3 className="font-medium">Operational</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{statusCounts.operational || 0}</p>
          <p className="text-sm text-gray-400 mt-1">Ready for use</p>
        </div>

        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Wrench size={20} className="text-amber-400" />
            <h3 className="font-medium">Maintenance</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{statusCounts.maintenance || 0}</p>
          <p className="text-sm text-gray-400 mt-1">Scheduled service</p>
        </div>

        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400" />
            <h3 className="font-medium">Needs Repair</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{statusCounts.needs_repair || 0}</p>
          <p className="text-sm text-gray-400 mt-1">Urgent attention needed</p>
        </div>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">

        <div className="overflow-x-auto">
          
          <div className="min-w-[700px]">
            <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
              <div className="col-span-1">ID</div>
              <div className="col-span-3">Equipment</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Last Maintenance</div>
              <div className="col-span-2">Actions</div>
            </div>
            
            {equipment.map((item) => (
              <div key={item.id} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] hover:bg-[#222]">
                <div className="col-span-1">#{item.id}</div>
                <div className="col-span-3 font-medium">{item.name}</div>
                <div className="col-span-2 text-gray-400">{item.category}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'operational' ? 'bg-lime-400/10 text-lime-400' :
                    item.status === 'maintenance' ? 'bg-amber-400/10 text-amber-400' :
                    'bg-red-400/10 text-red-400'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="col-span-2 text-gray-400">{item.lastMaintenance}</div>
                <div className="col-span-2 flex gap-2">
                 
                  <button className="text-xs bg-[#222] border border-[#2b2b2b] hover:bg-[#2b2b2b] px-3 py-1 rounded">
                    Log Repair
                  </button>
                  <button className="text-xs bg-lime-400 hover:bg-lime-300 text-[#181f10] px-3 py-1 rounded">
                    Mark Fixed
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div className="bg-[#181818] border border-lime-400/30 rounded-xl p-4">
        <h3 className="font-medium text-lime-400 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
            Schedule Maintenance
          </button>
          <button className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-4 py-2 rounded-lg">
            Request New Equipment
          </button>
          <button className="border border-purple-400 text-purple-400 hover:bg-purple-400/10 px-4 py-2 rounded-lg">
            View Maintenance History
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentTab;