import { User, Mail, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

const ProfileSettings = () => {
  const [user, setUser] = useState({
    name: 'Kishore P',
    email: 'Kishore@example.com',
    phone: '+91 7893018720',
    birthDate: '',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center text-2xl font-bold text-[#181f10]">
            {user.name.charAt(0)}
          </div>
          <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
            Change Photo
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Full Name</label>
            <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-lg px-4 py-2">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-lg px-4 py-2">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Phone</label>
            <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-lg px-4 py-2">
              <Phone size={18} className="text-gray-400" />
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Date of Birth</label>
            <div className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] rounded-lg px-4 py-2">
              <CalendarIcon size={18} className="text-gray-400" />
              <input
                type="date"
                value={user.birthDate}
                onChange={(e) => setUser({...user, birthDate: e.target.value})}
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button className="mt-6 bg-lime-400 hover:bg-lime-300 text-[#181f10] font-medium px-6 py-2 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;