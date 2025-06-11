import { DollarSign, Filter, Download, Plus, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useState,useEffect } from 'react';
import RecordPaymentView from './RecordPaymentView';
import API_BASE_URL from '../../config'; 
import axios from 'axios'; // Ensure axios is installed



const PaymentsTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


    const fetchGymPayments = async () => {
      const gymCode = sessionStorage.getItem('gymCode');
      if (!gymCode) {
        console.error("No gym code found in sessionStorage");
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/payment/fetchdetails`, {
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
        const paymentdetails = data.map((u) => ({
          id: u.paymentId,
          member: `${u.firstName} ${u.lastName}`,
          plan: u.planId,
          amount: u.amount,
          status: u.paymentStatus,
          date: u.paidOn?.split('T')[0],
          paymentMethod: u.paymentMethod,
          transactionId: u.transactionId,
          notes: u.notes,
        }));
        setPayments(paymentdetails);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

  
    useEffect(() => {
        fetchGymPayments();
    }, []);

  

  const filteredPayments = payments.filter(payment => 
    activeFilter === 'all' || payment.status === activeFilter
  );

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign size={24} className="text-lime-400" />
            Payments Management
          </h1>
          <p className="text-gray-400 mt-1">
            Total revenue this month: <span className="text-lime-400 font-medium">${totalRevenue.toFixed(2)}</span>
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#222] border border-[#2b2b2b] hover:bg-[#2b2b2b] px-3 py-2 rounded-lg">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button 
              onClick={() => setShowRecordPayment(true)}
          className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-[#181f10] px-4 py-2 rounded-lg">
            <Plus size={18} />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'completed', 'pending', 'failed'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full capitalize whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-lime-400 text-[#181f10]' 
                : 'bg-[#222] hover:bg-[#2b2b2b]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

       {loading ? (
        <div className="text-center py-10 text-gray-400">Loading payments...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (

      <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-hidden">

          <div className="overflow-x-auto">
          
            <div className="min-w-[700px]">
              <div className="grid grid-cols-12 bg-[#222] p-4 font-medium">
                <div className="col-span-2">Payment ID</div>
                <div className="col-span-3">Member</div>
                <div className="col-span-2">Plan</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Status</div>
              </div>
        
              {filteredPayments.map((payment) => (  
                <div key={payment.id} className="grid grid-cols-12 p-4 border-b border-[#2b2b2b] hover:bg-[#222]">
                  <div className="col-span-2 font-mono">{payment.id}</div>
                  <div className="col-span-3">{payment.member}</div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.plan === 'Premium' ? 'bg-purple-400/10 text-purple-400' :
                      payment.plan === 'Basic' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-amber-400/10 text-amber-400'
                    }`}>
                      {payment.plan}
                    </span>
                  </div>
                  <div className="col-span-2">${payment.amount.toFixed(2)}</div>
                  <div className="col-span-2 text-gray-400">{payment.date}</div>
                  <div className="col-span-1">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      payment.status === 'completed' ? 'bg-lime-400/10 text-lime-400' :
                      payment.status === 'pending' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {payment.status === 'completed' ? <CheckCircle2 size={14} /> :
                      payment.status === 'pending' ? <Clock size={14} /> :
                      <XCircle size={14} />}
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
      )}

      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 text-gray-400 hover:text-lime-400">
          <Download size={16} />
          Export Payment History
        </button>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-[#222] border border-[#2b2b2b] rounded hover:bg-[#2b2b2b]">
            Previous
          </button>
          <button className="px-3 py-1 bg-lime-400 text-[#181f10] rounded hover:bg-lime-300">
            Next
          </button>
        </div>
        
      </div>

        {showRecordPayment && (
          <RecordPaymentView 
            onClose={() => setShowRecordPayment(false)}
            onRecordPayment={(paymentData) => {
              // Handle recording the new payment to your state
              console.log("New payment recorded:", paymentData);
              // In a real app, you would update your payments state here
              fetchGymPayments(); // auto-refresh the payment list
              setShowRecordPayment(false); // close modal after save
            }}
          />
        )}
    </div>
  );
};

export default PaymentsTab;