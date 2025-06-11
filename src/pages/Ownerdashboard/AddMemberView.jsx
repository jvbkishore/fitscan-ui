import { useState,useEffect} from 'react';
import { UserPlus, User, Shield, Mail, Phone, Calendar, CreditCard, Lock, ChevronDown, X,Camera,UserCog ,Armchair, IndianRupee    } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const AddMemberView = ({ onClose, onAddMember }) => {
  const [memberType, setMemberType] = useState('customer');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender:'',
    joinDate: '',
    memberType: 'customer',
    duration: '',
    password: '',
   
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [tempFilePath, setTempFilePath] = useState(null);

  const handleFormSubmit = async (e) => {

        e.preventDefault();

       

        const registerDto = {
          email: formData.email,
          phoneNumber: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          role: memberType === 'employee' ? 'Trainer' : 'User',
          photoUrl: formData.photo,
          joiningDate: formData.joinDate,
          password: formData.password,
        };

        try {
          
              const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerDto),
              });

              if (!registerResponse.ok) {
                const error = await registerResponse.json();
                alert(`Registration failed: ${error?.message || 'Unknown error'}`);
                return;
              }

          if (memberType === 'customer') {
                const gymUserDto = {
                  Username: formData.email,
                  Gymcode: sessionStorage.getItem('gymCode'), // replace or get dynamically
                  Userplanname: String(formData.duration),
                  UserPlanJoiningDate: formData.joinDate,
                  UserPlanExpiryDate: formData.expiryDate,
                  Traineremail: formData.trainer,
                  Active: true,
                };

                const gymUserResponse = await fetch(`${API_BASE_URL}/api/gym/adduser`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(gymUserDto),
                });

                if (!gymUserResponse.ok) {
                  const error = await gymUserResponse.json();
                  alert(`Gym user creation failed: ${error?.message || 'Unknown error'}`);
                  return;
                }
          }
          

            alert("Member added successfully!");
            onAddMember(); // Notify parent component to refresh member list
            onClose();
        } catch (error) {
          console.error(error);
          alert("An error occurred while adding the member.");
        }
};

  const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload-photo", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    setPhotoUrl(data.photoUrl); // backend returns this
    setFormData(prev => ({ ...prev, photo: data.photoUrl }));
    setTempFilePath(data.photoUrl); // used for delete if cancelled
  } catch (err) {
    console.error("Photo upload error:", err);
    // Show error toast here
  }
};


const handleCancel = async () => {
  if (tempFilePath) {
    try {
      await fetch("/api/delete-photo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: tempFilePath })
      });
    } catch (err) {
      console.warn("Failed to delete photo:", err);
    }
  }

  // Clear form
  //setFormData(initialFormState);
  setPhotoUrl(null);
  setTempFilePath(null);
};


  const [trainers, setTrainers] = useState([]);

  
useEffect(() => {
  const fetchTrainers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gym/gettrainers`);
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
    }
  };

  fetchTrainers();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-[#2b2b2b]">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="text-lime-400" size={20} />
            Add New Member
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-[#2b2b2b] rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Member Type Toggle */}
          <div className="flex mb-6 bg-[#222] rounded-lg p-1">
            <button
              onClick={() => setMemberType('customer')}
              className={`flex-1 py-2 rounded-md ${memberType === 'customer' ? 'bg-lime-400 text-[#181f10]' : 'hover:bg-[#2b2b2b]'}`}
            >
              <User size={16} className="inline mr-2" />
              Customer
            </button>
            <button
              onClick={() => setMemberType('employee')}
              className={`flex-1 py-2 rounded-md ${memberType === 'employee' ? 'bg-lime-400 text-[#181f10]' : 'hover:bg-[#2b2b2b]'}`}
            >
              <Shield size={16} className="inline mr-2" />
              Employee
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Phone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Joining Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>
              
              {memberType === 'customer' && (               
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Membership / Plan name</label>
                  <div className="relative">
                    <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                      name="planname"
                      value={formData.planname}
                      onChange={(e) => {
                        const value = e.target.value; 
                          setFormData(prev => ({
                            ...prev,
                            Amount: value // or null
                          }));
                      }}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none"
                      >
                      <option value="0">--Select Plan--</option>
                      <option value="1500">Regular Plan</option>
                      <option value="1200">Special Summer Plan</option>
                      <option value="1000">Student Special Plan</option>
                    </select>
                    
                   

                  </div>
                   <div className="space-y-1">
                      <label className="text-sm text-gray-400">Amount</label>
                      <div className="relative">
                        <IndianRupee size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.Amount}
                          onChange={e =>
                            setFormData(prev => ({
                              ...prev,
                              Amount: e.target.value
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-[#2b2b2b] rounded-lg text-gray-400"
                        />
                      </div>
                    </div>
                </div>
              )}


                    {formData.expiryDate && (
                      <div className="space-y-1">
                        <label className="text-sm text-gray-400">Expiry Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.expiryDate}
                            readOnly
                            className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-[#2b2b2b] rounded-lg text-gray-400"
                          />
                        </div>
                      </div>
                    )}
                 



                    


            </div>

            {/* Gender Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Gender</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                   
                    <select
                        name="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none"
                    >
                        <option value="Male">♂  Male</option>
                        <option value="Female">♀  Female</option>
                        <option value="Others">⚧  Others</option>
                        
                    </select>
                </div>
              </div>

                            <div className="space-y-1">
                <label className="text-sm text-gray-400">Photo</label>

                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                  {/* Hidden File Input */}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedPhoto(URL.createObjectURL(file)); // preview
                        setFormData(prev => ({
                          ...prev,
                          photo: file // actual file if needed
                        }));
                        // TODO: call uploadPhoto(file) here if you upload immediately
                      }
                    }}
                    className="hidden"
                  />

                  {/* Styled Label that Triggers File Input */}
                  <label
                    htmlFor="photo-upload"
                    className="block w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-gray-400 cursor-pointer hover:bg-[#2a2a2a] transition"
                  >
                    {selectedPhoto ? "Change Photo" : "Choose Photo"}
                  </label>
                </div>
              </div>


              {memberType !== 'employee' && (
                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Trainer</label>
                    <div className="relative">
                    <UserCog size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                     <select
                        name="trainer"
                        value={formData.trainer}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none"
                      >
                        <option value="">Select Trainer</option>
                        {trainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.email}>
                            {trainer.firstName} {trainer.lastName}
                          </option>
                        ))}
                      </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>)}

              
            </div>

             <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
              minLength="8"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </div>

            {/* Additional Employee Fields (shown only for employee type) */}
            {memberType === 'employee' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="space-y-1">
                  <label className="text-sm text-gray-400">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div> */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Position</label>
                  <select
                    name="position"
                    value={formData.position}
                    className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    <option value="Trainer">Trainer</option>
                    {/* <option value="receptionist">Receptionist</option>
                    <option value="manager">Manager</option>
                    <option value="cleaner">Cleaner</option> */}
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg hover:bg-[#2b2b2b]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-lime-400 text-[#181f10] rounded-lg hover:bg-lime-300 font-medium"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemberView;