import { useState, useEffect } from 'react';
import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  ResponsiveContainer} from 'recharts';
import API_BASE_URL from '../../config'; 
import axios from 'axios'; // Ensure axios is installed



const colors = {
  weight: '#84cc16',
  neck: '#ef4444',
  shoulders: '#3b82f6',
  chest: '#f97316',
  biceps: '#6366f1',
  belly: '#10b981',
  waist: '#8b5cf6',
  hip: '#f43f5e',
  calf: '#14b8a6',
  thighs: '#facc15'
};

const AccordionSection = ({ title, isOpen, onToggle, children }) => (
  <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-6 py-4 font-medium text-left text-white hover:bg-[#2b2b2b] focus:outline-none"
      aria-expanded={isOpen}
    >
      <span>{title}</span>
      <svg
        className={`w-5 h-5 text-lime-400 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && <div className="px-6 pb-6 pt-0">{children}</div>}
  </div>
);

const WeightTrackingTab = () => {
  const [members, setMembers] = useState([]);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchGymUsers = async () => {
        const gymCode = sessionStorage.getItem('gymCode');
        if (!gymCode) {
          console.error("No gym code found in sessionStorage");
          return;
        }

        try {
          setLoading(true);

          const response = await fetch(`${API_BASE_URL}/api/FitnessTracking/Userslist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gymCode), // send raw string in body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
          

          const allUsers = data.allGymUsers.map((u, idx) => ({
            id: idx + 1,
            name: `${u.firstName} ${u.lastName}`,
            username: u.username
          }));
          setMembers(allUsers);
          setError('');
        } catch (err) {
          setError('Failed to load data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchGymUsers();
  
}, []);


const formatDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') {
    console.warn('Invalid dateStr:', dateStr);
    return '-';
  }
  
  // Support both '-' and '/' separators if needed
  let parts = [];
  if (dateStr.includes('-')) parts = dateStr.split('-');
  else if (dateStr.includes('/')) parts = dateStr.split('/');
  else {
    console.warn('Unexpected date format:', dateStr);
    return '-';
  }

  if (parts.length !== 3) {
    console.warn('Date parts length invalid:', parts);
    return '-';
  }

  const [year, month, day] = parts;
  if (!year || !month || !day) return '-';

  // Optional: pad day/month with zero if needed
  const dayPadded = day.length === 1 ? '0' + day : day;
  const monthPadded = month.length === 1 ? '0' + month : month;

  return `${dayPadded}/${monthPadded}/${year}`;
};



  const [selectedMember, setSelectedMember] = useState(null);
  const [newRecord, setNewRecord] = useState({
    weight: '',
    neck: '',
    shoulders: '',
    chest: '',
    biceps: '',
    belly: '',
    waist: '',
    hip: '',
    calf: '',
    thighs: ''
  });
  const fitscan_user = JSON.parse(localStorage.getItem('fitscan_user'));

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = async (section) => {
  if (section === 'progress' && selectedMember && !selectedMember.records) {
    try {
      const username = selectedMember.username;
      const res = await fetch(`${API_BASE_URL}/api/FitnessTracking/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(username),
      });

      const records = await res.json();
      const cleanedRecords = records.map((r) => {
        const cleaned = {};
        for (const k in r) {
            if (k === "date") {
              cleaned[k] = formatDate(r[k]);
            } else {
              cleaned[k] = typeof r[k] === 'number' ? r[k] : parseFloat(r[k]);
            }
        }
        return cleaned;
      });

      setSelectedMember(prev => ({ ...prev, records: cleanedRecords }));
    } catch (err) {
      console.error('Failed to fetch progress data:', err);
    }
  }

  setOpenSection((prev) => (prev === section ? null : section));
};


  const handleAddRecord = async() => {
    if (!selectedMember) return;

    const record = {
      ...Object.fromEntries(
        Object.entries(newRecord).map(([key, val]) => [key, parseFloat(val)])
      ),
      Username: selectedMember.username,
      EnteredBy: fitscan_user.username, // replace with logged-in trainer if needed
      Date: new Date().toISOString().split('T')[0], // 'yyyy-mm-dd'
      Active: true
    };

        try {
           const res = await fetch(`${API_BASE_URL}/api/FitnessTracking/AddFitnessTracking`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record)
            });

            const added = await res.json();
            const updated = { ...selectedMember, records: [...(selectedMember.records || []), added] };
            setSelectedMember(updated);
            setNewRecord({
              weight: '', neck: '', shoulders: '', chest: '', biceps: '',
              belly: '', waist: '', hip: '', calf: '', thighs: ''
            });
            setOpenSection('progress');
      } catch (err) {
        console.error(err);
      }

    
  };

  const handleMemberChange = async(e) => {
    const memberId = parseInt(e.target.value);
    const member = members.find(m => m.id === memberId);
    setSelectedMember(member);
    if (!member) return;
    try {
      const username = member.username;
      
      const res = await fetch(`${API_BASE_URL}/api/FitnessTracking/records`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(username),
        }
      );

      const records = await res.json();
      const cleanedRecords = records.map((r) => {
          const cleaned = {};
          for (const k in r) {
              if (k === "date") {
                cleaned[k] = r[k];  // You format here sometimes
              } else {
                cleaned[k] = typeof r[k] === 'number' ? r[k] : parseFloat(r[k]);
              }
          }
          return cleaned;
      });

      
      const finalRecords = cleanedRecords.map((r) => ({
       
          ...r,
          date: r.date,
        
      }));

        setSelectedMember({ ...member, records: finalRecords });
        setOpenSection('addRecord');
      } catch (err) {
        console.error(err);
      }
  };

  // Keys to track & display in graph and table (excluding 'date')
  const measurementKeys = selectedMember?.records?.length
    ? Object.keys(selectedMember.records[0] || {}).filter(k => k !== 'date')
    : [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Fitnesss Tracking</h1>

      <AccordionSection
        title="Member"
        isOpen={openSection === 'selectMember'}
        onToggle={() => toggleSection('selectMember')}
      >
        <select
          value={selectedMember?.id || ''}
          onChange={handleMemberChange}
          className="w-full bg-[#222] border border-[#2b2b2b] text-white rounded-lg px-4 py-2"
        >
          <option value="" disabled>--Select--</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </AccordionSection>

      <AccordionSection
        title={selectedMember ? `Add Measurements for ${selectedMember.name}` : 'Add Measurements'}
        isOpen={openSection === 'addRecord'}
        onToggle={() => toggleSection('addRecord')}
      >
        {selectedMember ? (
          <div className="space-y-4">
            {Object.keys(newRecord).map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-400 capitalize mb-1">{field}</label>
                <input
                  type="number"
                  value={newRecord[field]}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, [field]: e.target.value })
                  }
                  className="w-full bg-[#222] border border-[#2b2b2b] rounded-lg px-4 py-2"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <button
              onClick={handleAddRecord}
              className="bg-lime-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-lime-500 transition"
            >
              Record Entry
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Please select a member first.</p>
        )}
      </AccordionSection>

      <AccordionSection
        title={selectedMember ? `${selectedMember.name}'s Weight Progress` : 'Weight Progress'}
        isOpen={openSection === 'progress'}
        onToggle={() => toggleSection('progress')}
      >
        {selectedMember ? (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedMember.records}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2b2b2b" />
                  <XAxis dataKey="date"  tickFormatter={formatDate}  tick={{ fill: '#a1a1aa' }} stroke="#2b2b2b" />
                  <YAxis
                    tick={{ fill: '#a1a1aa' }}
                    stroke="#2b2b2b"
                    domain={['auto', 'auto']}
                    allowDataOverflow={true}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#181818', borderColor: '#2b2b2b', borderRadius: '0.5rem' }}
                  />
                  <Legend wrapperStyle={{ color: 'white' }} />
                  {measurementKeys.map(key => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={colors[key] || '#8884d8'}
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto rounded-lg border border-[#2b2b2b]">
              <table className="min-w-full divide-y divide-[#2b2b2b] text-white">
                <thead className="bg-[#222]">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                    {measurementKeys.map(key => (
                      <th
                        key={key}
                        className="px-4 py-2 text-left text-sm font-semibold capitalize"
                        style={{ color: colors[key] || 'white' }}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2b2b] bg-[#181818]">
                  {Array.isArray(selectedMember?.records) && selectedMember.records.map((record, idx) => (
                    <tr key={idx} className="hover:bg-[#2b2b2b]">
                      <td className="px-4 py-2 whitespace-nowrap">{formatDate(record.date)}</td>
                      {measurementKeys.map(key => (
                        <td key={key} className="px-4 py-2 whitespace-nowrap">
                          {record[key] != null && !isNaN(record[key]) ? record[key] : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Please select a member to view progress.</p>
        )}
      </AccordionSection>
    </div>
  );
};

export default WeightTrackingTab;
