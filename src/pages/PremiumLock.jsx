import { Lock } from 'lucide-react';

const PremiumLock = ({ message = "Upgrade to Premium to unlock this feature" }) => {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10 p-4">
      <div className="bg-[#181818] border border-lime-400/30 rounded-lg p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Lock className="text-lime-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
        <p className="text-gray-300 mb-4">{message}</p>
        <button className="px-6 py-2 bg-lime-400 hover:bg-lime-300 text-[#181f10] rounded-lg font-medium">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default PremiumLock;