  import { Users, Search, Plus, Filter, UserCheck, UserX,Settings } from 'lucide-react';
  import { useState,useEffect } from 'react';
  import AddMemberView from './AddMemberView'; // Assuming you have this component
  import axios from 'axios'; // Ensure axios is installed
  import API_BASE_URL from '../../config'; 
  import { useNavigate } from 'react-router-dom';
import AddPlanView from './AddPlanView';

  const MembersTab = () => {
      const [searchQuery, setSearchQuery] = useState('');
      const [showAddMember, setShowAddMember] = useState(false);
      const [showAddPlan, setAddPlan] = useState(false);
      const [members, setMembers] = useState([]);
      const [expiringSoonMembers, setExpiringSoonMembers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
  
      //const gymcode = 'YOUR_GYMCODE';

      useEffect(() => {
          fetchGymUsers();
       }, []);

    const fetchGymUsers = async () => {
      const gymCode = sessionStorage.getItem('gymCode');
      if (!gymCode) {
        console.error("No gym code found in sessionStorage");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/api/gym/Gymuserdata`, null, {
          params: { gymCode },
        });

        const allUsers = response.data.allGymUsers.map((u, idx) => ({
          id: idx + 1,
          Firstname: u.firstName,
          Lastname: u.lastName,
          //plan: u.userplanname,
          joinDate: u.userPlanJoiningDate?.split('T')[0],
          ExpiryDate: u.userPlanExpiryDate?.split('T')[0]
          //status: 'active', // You can adjust this based on your data
          //lastVisit: 'Unknown', // Placeholder - add real field if needed
        }));

        const expiring = response.data.expiringSoon.map((u, idx) => ({
          id: idx + 1,
          Firstname: u.firstName,
          Lastname: u.lastName,
          //plan: u.userplanname,
          joinDate: u.userPlanJoiningDate?.split('T')[0],
          ExpiryDate: u.userPlanExpiryDate?.split('T')[0]
          //status: 'active',
          //lastVisit: 'Unknown',
        }));

        setMembers(allUsers);
        setExpiringSoonMembers(expiring);
        setError('');
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    




    const filteredMembers = members.filter(member =>
      member.Firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.Lastname.toLowerCase().includes(searchQuery.toLowerCase()) 
     // member.plan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    



    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users size={24} className="text-lime-400" />
            Member Management
          </h1>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>


            <button   onClick={() => setAddPlan(true)}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-[#181f10] px-4 py-2 rounded-lg">
              <Plus size={18} />
              <span className="hidden md:inline">Add Plan</span>
            </button>
            
            <button   onClick={() => setShowAddMember(true)}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-[#181f10] px-4 py-2 rounded-lg">
              <Plus size={18} />
              <span className="hidden md:inline">Add Member</span>
            </button>
            
            <button className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] hover:bg-[#2b2b2b] px-3 py-2 rounded-lg">
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">

          <div className="overflow-x-auto">
            
            <div className="min-w-[700px]">
              <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
                <div className="col-span-2">Firstname</div>
                <div className="col-span-2">Lastname</div>
                {/* <div className="col-span-2">Plan</div> */}
                <div className="col-span-2">Join Date</div>
                <div className="col-span-2">Expiry Date</div>
                {/* <div className="col-span-2">Status</div> */}
                <div className="col-span-2">Actions</div>
              </div>
          
              {filteredMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] hover:bg-[#222]">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{member.Firstname}</p>
                      {/* <p className="text-sm text-gray-400">Last visit: {member.lastVisit}</p> */}
                    </div>
                    
                  </div>

                   <div className="col-span-2 flex items-center gap-3">
                    {/* <div className="w-10 h-10 rounded-full bg-lime-400/10 flex items-center justify-center text-lime-400">
                      <UserCheck size={18} />
                    </div> */}
                    <div>
                      <p className="font-medium">{member.Lastname}</p>
                      {/* <p className="text-sm text-gray-400">Last visit: {member.lastVisit}</p> */}
                    </div>
                    
                  </div>



                  {/* <div className="col-span-2 flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.plan === 'Premium' ? 'bg-purple-400/10 text-purple-400' :
                      member.plan === 'Basic' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-amber-400/10 text-amber-400'
                    }`}>
                      {member.plan}
                    </span>
                  </div> */}
                  <div className="col-span-2 text-gray-400">{member.joinDate}</div>
                  <div className="col-span-2 text-gray-400">{member.ExpiryDate}</div>
                  {/* <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'active' ? 'bg-lime-400/10 text-lime-400' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {member.status}
                    </span>
                  </div> */}
                  <div className="col-span-2 flex items-center gap-2">
                    <button className="p-1.5 hover:bg-[#2b2b2b] rounded">
                      <Settings size={16} className="text-gray-400 hover:text-lime-400" />
                    </button>
                    <button className="p-1.5 hover:bg-[#2b2b2b] rounded">
                      <UserX size={16} className="text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-400">Showing {filteredMembers.length} of {members.length} members</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#222] border border-[#2b2b2b] rounded hover:bg-[#2b2b2b]">
              Previous
            </button>
            <button className="px-3 py-1 bg-lime-400 text-[#181f10] rounded hover:bg-lime-300">
              Next
            </button>
          </div>
        </div>


        {expiringSoonMembers.length > 0 && (
    <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">
      <h2 className="text-lg font-semibold p-4 text-yellow-400">Expiring in Next 7 Days</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
            <div className="col-span-2">FirstName</div>
            <div className="col-span-2">LastName</div>
            {/* <div className="col-span-2">Plan</div> */}
            <div className="col-span-2">Join Date</div>
            <div className="col-span-2">Expiry Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Actions</div>
          </div>

            {expiringSoonMembers.map((member) => (
              <div key={member.id} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] hover:bg-[#222]">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{member.Firstname}</p>
                    {/* <p className="text-sm text-gray-400">Last visit: {member.lastVisit}</p> */}
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-3">
                  {/* <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    <UserCheck size={18} />
                  </div> */}
                  <div>
                    <p className="font-medium">{member.Lastname}</p>
                    {/* <p className="text-sm text-gray-400">Last visit: {member.lastVisit}</p> */}
                  </div>
                </div>

                {/* <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.plan === 'Premium' ? 'bg-purple-400/10 text-purple-400' :
                    member.plan === 'Basic' ? 'bg-blue-400/10 text-blue-400' :
                    'bg-amber-400/10 text-amber-400'
                  }`}>
                    {member.plan}
                  </span>
                </div> */}
                <div className="col-span-2 text-gray-400">{member.joinDate}</div>
                <div className="col-span-2 text-gray-400">{member.ExpiryDate}</div>
                <div className="col-span-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-400/10 text-yellow-400">
                    Expiring
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button className="p-1.5 hover:bg-[#2b2b2b] rounded">
                    <Settings size={16} className="text-gray-400 hover:text-lime-400" />
                  </button>
                  <button className="p-1.5 hover:bg-[#2b2b2b] rounded">
                    <UserX size={16} className="text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}



          {showAddMember && (
            <AddMemberView 
              onClose={() => setShowAddMember(false)}
              onAddMember={fetchGymUsers }
            />
          )}


          {showAddPlan && (
            <AddPlanView 
              onClose={() => setAddPlan(false)}
              onAddMember={fetchGymUsers }
            />
          )}
      </div>
    );
  };

  export default MembersTab;  