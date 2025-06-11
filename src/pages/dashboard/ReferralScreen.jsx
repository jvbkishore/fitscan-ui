import React from 'react';
import { Copy } from 'lucide-react';

const referralCode = 'FITSCAN123'; // You can make this dynamic from props or API
const referralLink = `https://fitscan.app/referral/${referralCode}`;

const ReferralScreen = () => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy. Please try manually.');
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join FitScan with my referral!',
          text: 'Use my code for extra benefits!',
          url: referralLink,
        });
      } catch (err) {
        console.error('Sharing failed:', err);
      }
    } else {
      alert('Sharing not supported. Copy link manually.');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 mb-6">
        <p className="text-lg mb-2">Your Referral Code:</p>
        <div className="flex items-center justify-between bg-[#222] p-4 rounded-lg">
          <span className="font-mono text-xl text-lime-400">{referralCode}</span>
          <button onClick={copyToClipboard} className="text-lime-400 hover:text-lime-300">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-3">
          Share this with friends to invite them and get exclusive rewards!
        </p>

        <button
          onClick={shareLink}
          className="mt-6 bg-lime-400 text-black px-4 py-2 rounded-lg hover:bg-lime-500 transition"
        >
          Share Referral Link
        </button>
      </div>

      {/* Optional: Referral Status Table */}
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Your Referral Status</h2>
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead>
            <tr className="border-b border-[#2b2b2b]">
              <th className="px-4 py-2">Friend</th>
              <th className="px-4 py-2">Joined</th>
              <th className="px-4 py-2">Reward</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#2b2b2b] hover:bg-[#2b2b2b]">
              <td className="px-4 py-2">Srinivas</td>
              <td className="px-4 py-2">2025-05-15</td>
              <td className="px-4 py-2">1 Month Free</td>
            </tr>
            {/* Add more rows or map from data */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralScreen;
