import { Lock, Shield, Bell, CreditCard } from 'lucide-react';
import { useState } from 'react';

const AccountSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 max-w-2xl space-y-6">
        {/* Password Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <Lock size={18} className="text-lime-400" />
              Password
            </h3>
            <button className="text-lime-400 hover:underline text-sm">
              Change Password
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Last changed: 3 months ago
          </p>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="font-medium flex items-center gap-2 mb-4">
            <Bell size={18} className="text-lime-400" />
            Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Marketing Emails</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={marketingEmails}
                  onChange={() => setMarketingEmails(!marketingEmails)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard size={18} className="text-lime-400" />
              Payment Methods
            </h3>
            <button className="text-lime-400 hover:underline text-sm">
              Add New
            </button>
          </div>
          <div className="bg-[#222] border border-[#2b2b2b] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <span>VISA •••• 4242</span>
              </div>
              <button className="text-red-400 hover:text-red-300 text-sm">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-[#2b2b2b]">
          <h3 className="font-medium text-red-400 mb-4">Danger Zone</h3>
          <button className="border border-red-400 text-red-400 hover:bg-red-400/10 px-4 py-2 rounded-lg">
            Delete Account
          </button>
          <p className="text-gray-400 text-xs mt-2">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;