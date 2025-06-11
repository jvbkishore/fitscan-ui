import { Trophy, Flame, Calendar, Zap, TrendingUp } from 'lucide-react';

const ConsistencyScore = () => {
  // Mock data - replace with real user data
  const userStats = {
    currentStreak: 12, // days
    longestStreak: 18,
    weeklyAverage: 4.2, // visits per week
    monthlyVisits: 16,
    consistencyScore: 87, // out of 100
    lastVisit: 'yesterday',
    improvement: 12, // percentage
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-lime-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getMotivationalMessage = (score) => {
    if (score >= 90) return "You're a fitness machine! Keep dominating!";
    if (score >= 75) return "Great consistency! You're crushing your goals!";
    if (score >= 50) return "Good progress! Keep building momentum!";
    return "Let's get moving! Every workout counts!";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy size={24} className="text-lime-400" />
        <h1 className="text-2xl font-bold">Your Consistency Score</h1>
      </div>

      {/* Main Score Card */}
      <div className="bg-gradient-to-br from-[#181818] to-[#101010] border border-[#2b2b2b] rounded-xl p-6">
        <div className="flex flex-col items-center">
          {/* Circular Score Meter */}
          <div className="relative w-48 h-48 mb-6">
            <div className="absolute inset-0 rounded-full border-[12px] border-[#2b2b2b]"></div>
            <div 
              className={`absolute inset-0 rounded-full border-[12px] ${getScoreColor(userStats.consistencyScore)}`}
              style={{
                clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)`,
                transform: `rotate(${userStats.consistencyScore * 3.6}deg)`,
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(userStats.consistencyScore)}`}>
                {userStats.consistencyScore}
              </span>
              <span className="text-gray-400">out of 100</span>
            </div>
          </div>

          <h3 className={`text-xl font-semibold mb-2 ${getScoreColor(userStats.consistencyScore)}`}>
            {getMotivationalMessage(userStats.consistencyScore)}
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            You're more consistent than 78% of members at your gym. 
            {userStats.improvement > 0 && (
              <span className="text-lime-400 ml-1">
                <TrendingUp size={16} className="inline mr-1" />
                {userStats.improvement}% improvement this month!
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-red-400" />
            <h3 className="font-medium">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{userStats.currentStreak} days</p>
          <p className="text-sm text-gray-400 mt-1">
            Last visit: {userStats.lastVisit}
          </p>
        </div>

        {/* Longest Streak */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-amber-400" />
            <h3 className="font-medium">Longest Streak</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{userStats.longestStreak} days</p>
          <p className="text-sm text-gray-400 mt-1">
            Keep going to beat your record!
          </p>
        </div>

        {/* Weekly Average */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-blue-400" />
            <h3 className="font-medium">Weekly Average</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{userStats.weeklyAverage} visits</p>
          <p className="text-sm text-gray-400 mt-1">
            {userStats.weeklyAverage >= 3 ? "Great frequency!" : "Try for 3+ visits/week"}
          </p>
        </div>

        {/* Monthly Visits */}
        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-lime-400" />
            <h3 className="font-medium">Monthly Visits</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{userStats.monthlyVisits}</p>
          <p className="text-sm text-gray-400 mt-1">
            {userStats.monthlyVisits >= 12 ? "Excellent commitment!" : "On track for a great month!"}
          </p>
        </div>
      </div>

      {/* Tips to Improve */}
      <div className="bg-[#181818] border border-lime-400/30 rounded-xl p-4">
        <h3 className="font-medium text-lime-400 mb-3 flex items-center gap-2">
          <Zap size={18} />
          Tips to Improve Your Score
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-lime-400">•</span>
            Visit at least 3 times this week (+5 points)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lime-400">•</span>
            Extend your streak to 15 days (+10 points)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lime-400">•</span>
            Try a new class this month (+7 points)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-lime-400">•</span>
            Bring a friend (+3 points per referral)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConsistencyScore;