import { useState,useEffect} from 'react';
import { UserPlus, User, Shield, Mail, Phone, Calendar, CreditCard, Lock, ChevronDown, X,Camera,UserCog ,Armchair, Clock, IndianRupee    } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const AddPlanView = ({ onClose, onAddMember }) => {
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
            Add New Plan
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-[#2b2b2b] rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Member Type Toggle */}
          

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Plan Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.PlanName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              

              <div className="space-y-1">
                <label className="text-sm text-gray-400">No of days</label>
                <div className="relative">
                  <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Amount</label>
                <div className="relative">
                  <IndianRupee size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

             
            </div>

           
            

             

           

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
                Add Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlanView;