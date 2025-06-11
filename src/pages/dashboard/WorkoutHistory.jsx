import { Activity, Calendar, Clock, Dumbbell } from 'lucide-react';

const WorkoutHistory = () => {
  const workouts = [
    { date: 'Today', type: 'Strength Training', duration: '1h 24m', exercises: 8 },
    { date: 'Yesterday', type: 'Cardio', duration: '45m', exercises: 3 },
    { date: 'Oct 12', type: 'HIIT', duration: '1h 05m', exercises: 12 },
    { date: 'Oct 10', type: 'Yoga', duration: '50m', exercises: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Workout History</h1>
      </div>

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
          <div className="col-span-3">Date</div>
          <div className="col-span-4">Workout</div>
          <div className="col-span-3">Duration</div>
          <div className="col-span-2">Exercises</div>
        </div>
        
        {workouts.map((workout, index) => (
          <div key={index} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] last:border-0 hover:bg-[#222]">
            <div className="col-span-3 flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              {workout.date}
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <Dumbbell size={16} className="text-lime-400" />
              {workout.type}
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              {workout.duration}
            </div>
            <div className="col-span-2">{workout.exercises}</div>
          </div>
        ))}
      </div>

      <button className="border border-lime-400 text-lime-400 hover:bg-lime-400/10 px-4 py-2 rounded-lg">
        View All Workouts
      </button>
    </div>
  );
};

export default WorkoutHistory;