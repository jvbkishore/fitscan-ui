import { useState, useEffect } from 'react';
import { DollarSign, User, CreditCard, Calendar, CheckCircle2, ChevronDown, X, IndianRupee } from 'lucide-react';
import API_BASE_URL from '../../config'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const gymCode = sessionStorage.getItem('gymCode');

const RecordPaymentView = ({ onClose, onRecordPayment }) => {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'credit_card',
    transactionId: '',
    notes: ''
  });
  const [members, setMembers] = useState([]);
  useEffect(() => {
      fetchGymUsers();
    }, []);

  const fetchGymUsers = async () => {
      
      if (!gymCode) {
        console.error("No gym code found in sessionStorage");
        return;
      }

      try {
        
        const response = await axios.post(`${API_BASE_URL}/api/gym/Gymuserdata`, null, {
          params: { gymCode },
        });

        const allUsers = response.data.allGymUsers.map((u, idx) => ({
          id: idx + 1,
          name: `${u.firstName} ${u.lastName}`,
          username: u.username
         
        }));
        setMembers(allUsers);
        
      } catch (err) {
        
        console.error(err);
      } finally {
        
      }
    };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "memberId" ? Number(value) : value
    }));
  };


  const fitscan_user = JSON.parse(localStorage.getItem('fitscan_user'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.memberId || !formData.amount) {
      alert("Please select a member and enter an amount");
      return;
    }
    
    const selectedMember = members.find(m => m.id === formData.memberId);
    const paymentData = {
      //...formData,
      //member: selectedMember.name,
      PaymentId: null, // or generate a UUID if required
      UserId: selectedMember?.username || '',
      PlanId: '', // or set appropriately
      Amount: parseFloat(formData.amount),
      PaymentStatus: 'Paid',
      Gymcode: gymCode,
      PaymentMethod: formData.paymentMethod,
      PaidOn: formData.paymentDate,
      TransactionId: formData.transactionId,
      Notes: formData.notes,
      UpdatedBy: fitscan_user?.username || ''  
    };


    try {
        const response = await axios.post(`${API_BASE_URL}/api/payment/add`, paymentData);
        alert("Payment recorded successfully");
        onRecordPayment(paymentData); // optional - update UI
        onClose();
    } catch (error) {
      console.error("Error recording payment:", error);
      alert("Failed to record payment. Please try again.");
    }
    
    
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-[#2b2b2b]">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <DollarSign className="text-lime-400" size={20} />
            Record Payment
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-[#2b2b2b] rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Member Selection */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Member</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none"
                >
                  <option value="">Select a member</option>
                  {members.map((member) => {
                  return (
                        <option key={member.id} value={member.id}>
                          {member.name} 
                        </option>
                      );
                  })}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-400">Amount (₹)</label>
                <div className="relative">
                  <IndianRupee size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Payment Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Payment Method</label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 appearance-none"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Transaction ID (Optional)</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="e.g. TXN123456"
                  className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional notes about this payment..."
                className="w-full px-4 py-2 bg-[#222] border border-[#2b2b2b] rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
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
                className="px-6 py-2 bg-lime-400 text-[#181f10] rounded-lg hover:bg-lime-300 font-medium flex items-center gap-2"
              >
                <CheckCircle2 size={18} />
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentView;