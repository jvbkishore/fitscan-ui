import { Clock, MapPin, Calendar } from 'lucide-react';

const CheckinHistory = () => {
  const checkins = [
    { date: 'Today', time: '9:24 AM', location: 'Iron Peak Fitness', duration: '2h 18m' },
    { date: 'Oct 13', time: '7:15 PM', location: 'Iron Peak Fitness', duration: '1h 35m' },
    { date: 'Oct 12', time: '6:30 AM', location: 'Iron Peak Fitness', duration: '1h 42m' },
    { date: 'Oct 10', time: '5:45 PM', location: 'Iron Peak Fitness', duration: '1h 45m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Clock size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Check-in History</h1>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
          <div className="col-span-3">Date</div>
          <div className="col-span-3">Time</div>
          <div className="col-span-4">Location</div>
          <div className="col-span-2">Duration</div>
        </div>
        
        {checkins.map((checkin, index) => (
          <div key={index} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] last:border-0 hover:bg-[#222]">
            <div className="col-span-3 flex items-center gap-2">
              {/* <Calendar size={16} className="text-gray-400" /> */}
              {checkin.date}
            </div>
            <div className="col-span-3">{checkin.time}</div>
            <div className="col-span-4 flex items-center gap-2">
              <MapPin size={16} className="text-lime-400" />
              {checkin.location}
            </div>
            <div className="col-span-2">{checkin.duration}</div>
          </div>
        ))}
      </div>

      <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
        View Full History
      </button>
    </div>
  );
};

export default CheckinHistory;