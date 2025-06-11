// src/components/AuthModal.jsx
import { useState } from 'react';
import { X } from 'lucide-react'; // Or use your SVG icons
import { useContext } from 'react'; 
import { AuthContext } from '../context/AuthContext.js'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext); 
  const [message, setMessage] = useState({ type: '', text: '' });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#181818] rounded-xl border border-[#2b2b2b] w-full max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-[#2b2b2b]">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 font-medium ${isLogin ? 'text-lime-400 border-b-2 border-lime-400' : 'text-gray-400'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 font-medium ${!isLogin ? 'text-lime-400 border-b-2 border-lime-400' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6">
         {isLogin ? (<LoginForm onClose={onClose} setMessage={setMessage} message={message} />) : (
               <SignupForm setIsLogin={setIsLogin} setMessage={setMessage} message={message} />)}
          
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onClose,setMessage,message  }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Make sure this is uncommented and working


  const handleSubmit = async (e) => {
    e.preventDefault();
      setMessage('');
    
    try {
                // Replace with your actual API call
                  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(formData)
                        });
                
                  const data = await response.json();
                // const data = {
                //     user: { id: 1, role: 'User' }, // Mock user data
                //     message: 'Login successful'         
                // };
                
              if (response.ok ) {
              //if (true ) {
            
                    login(data); // Save user data to context
                    setMessage('');
                    if(data.user.role === 'Owner') {
                        navigate('/Odashboard');  
                      }
                    else if (data.user.role === 'User') { 
                        navigate('/customerdashboard');
                      }
                    onClose();
              } else {  
                setMessage({ type: 'error', text: data.message || 'Login failed'});
              }
        } catch (error) {
                    setMessage({ type: 'error', text: 'Network error'});
                   
                }
   
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-300 mb-1">
          Email / Phone Number
        </label>
        <input
          type="text"
          id="id"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent"
          required
        />
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
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-lime-400 focus:ring-lime-400 border-gray-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>

        <a href="#" className="text-sm text-lime-400 hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-lime-400 hover:bg-lime-300 text-[#181f10] font-semibold py-2 px-4 rounded-lg transition"
      >
        Sign in
      </button>

          {message.text && (
                <div className={`text-sm text-center ${message.type === 'success'? 'text-yellow-400': 'text-red-400'}`}>
                  {message.text}
                </div>
        )}  

    </form>
  );
};



// Signup Form Component (Multi-step)
const SignupForm = ({ setIsLogin,setMessage,message  }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    accountType: 'member', // 'member' or 'gym-owner'
    gymName: '',
    location: ''
  });

  const handleSubmit = async  (e) => {
    e.preventDefault();
     setMessage('');
  

      const payload = {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      firstName: formData.name.split(' ')[0] || '',
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      role: 'User', // or 'Admin' etc., if your form allows it
      gender: '',   // Optional: you can extend the form to include this
      photoUrl: '', // Optional
      joiningDate: null // Optional
    };


      try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        
        setMessage({ type: 'error', text: 'Registration failed' });
      
      } else {
        const result = await response.json();
        setMessage({ type: 'success', text: 'Registration successful. Please login.' });
        // Optionally redirect to login
        setIsLogin(true);
        
      }
    } catch (error) {
      console.error("Error during registration:", error);
      
      setMessage({ type: 'error', text: 'Error during registration.' });
    }
   
  };

  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     
      

     
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

           <div>
            <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="string"
              id="phonenumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
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
          
           <button
              type="submit"
              className="bg-lime-400 hover:bg-lime-300 text-[#181f10] font-semibold py-2 px-6 rounded-lg transition"
            >
              Complete Registration
            </button>
          
            {message.text && (
                <div className={`text-sm text-center ${message.type === 'success'? 'text-yellow-400': 'text-red-400'}`}>
                  {message.text}
                </div>
        )}  

        

      
    </form>
  );
};

export default AuthModal;