import { QrCode, RefreshCw, Clock,Shield } from 'lucide-react';
import { useState,useEffect, useDa } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import API_BASE_URL from '../../config';





const QRCodeContent = () => {
  const [qrToken, setQrToken] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateQRCode = async () => {
  try {
    setIsRefreshing(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User Location:", latitude, longitude);
        const user = JSON.parse(localStorage.getItem('fitscan_user'));
        

        if (!user) {
          console.error('No user found in localStorage');
          alert('User not found. Please log in again.');
          setIsRefreshing(false);
          return;
        }


        const response = await fetch(`${API_BASE_URL}/api/qrcode/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')?.replace(/^"|"$/g, '')}`,
          },
          body: JSON.stringify({
            username: user.username,
            lat: latitude,
            lon: longitude
          })
        });

        let data = null;
        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok || !data || !data.success) {
          console.error('QR Generation Error:', data?.message || 'Unexpected error or no data returned');
          alert(data?.message || 'Failed to generate QR code. Please try again.');
          setQrToken(null);
        } else {
          setQrToken(data.jwtToken);
        }
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        alert('Please enable location services to generate a QR code.');
        setIsRefreshing(false);
      }
    );
  } catch (error) {
    console.error('QR Code generation failed:', error);
    alert('An unexpected error occurred while generating the QR code.');
  } finally {
    setIsRefreshing(false);
  }
};


useEffect(() => {
    generateQRCode();
  }, []);


  return (
    <div className="space-y-6">
      <div class ="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className=" flex-col  items-center ">
        <div className="flex items-center gap-3 padding-4 mb-4">
          <QrCode size={24} className="text-lime-400" />
          <h1 className="text-2xl font-bold">My QR Code</h1>
        </div>
     

        <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-3 max-w-md mx-auto h-[350px]">
          <div className="flex justify-between items-center  justify-center mb-4">
            <h2 className="font-medium">Gym Access Code</h2>
            <button 
              onClick={generateQRCode}
              disabled={isRefreshing}
              className="flex items-center gap-1 text-sm text-lime-400 hover:text-lime-300"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg flex justify-center h-[200px]">
            {qrToken ? (
              <div className="w-498 h-168 bg-gray-100 flex items-center justify-center">
                {/* In a real app, use a QR code library like qrcode.react */}
                <div className="text-center ">
                  <QRCodeCanvas  value={qrToken} size={170} 
                    // style={{ width: '10px', height: '100px' }}
                  className="mx-auto text-gray-800" />
                  {/* <p className="mt-2 text-xs text-gray-600 font-mono">{qrToken}</p> */}
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-gray-400">
                <button 
                  onClick={generateQRCode}
                  className="bg-lime-400 text-[#181f10] px-4 py-2 rounded-lg font-medium"
                >
                  Generate QR Code
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>• Code refreshes every 30 seconds</p>
            <p>• Scan this code at your gym entrance</p>
            <p>• Valid only for your registered gym</p>
          </div>
 
        </div>
        
          <div className="space-y-4">
          <div className="flex items-center  bg-[#181818] border border-[#2b2b2b] gap-6 rounded-xl p-6 h-[200px]">
           
            
              <div>
                <p className="text-gray-400 text-sm">Advertisement</p>
              </div>
              
              
            </div>
          </div>

      </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">

          
          
          <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Clock size={24} className="text-blue-400" />
              </div>
              <h3 className="font-semibold">Last Check-in</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="font-medium">Iron Peak Fitness</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="font-medium">Today, 9:24 AM</p>
              </div>
              <button className="w-full mt-6 border border-lime-400 text-lime-400 hover:bg-lime-400/10 py-2 rounded-lg font-medium">
                Check-in Now
              </button>
            </div>
          </div>
         

          {/* Membership Status */}
          <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Shield size={24} className="text-purple-400" />
              </div>
              <h3 className="font-semibold">Membership</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Plan</p>
                <p className="font-medium">Premium (6 months)</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Expires</p>
                <p className="font-medium">Dec 15, 2023</p>
              </div>
              <div className="pt-2">
                <div className="h-2 bg-[#2b2b2b] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-lime-400 rounded-full" 
                    style={{ width: '30%' }} // Dynamic based on expiry
                  />
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">30% time remaining</p>
              </div>
            </div>
          </div>

          
        </div>

      </div>


        


    </div>
    
  );
};

export default QRCodeContent;