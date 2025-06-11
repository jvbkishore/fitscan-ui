
import { useNavigate } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import AuthModal from '../components/AuthModal';


const LandingPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user } = { id: 1, name: 'John Doe' };//useContext(AuthContext);

    
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    
     

    <div className="App">
        <div className="min-h-screen bg-[#101010] w-full relative overflow-hidden">
        
            <header className="w-full flex justify-center pt-6 px-4 sm:px-6">
            <nav className="w-full max-w-6xl flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 select-none">
                <span className="bg-lime-400 rounded-xl p-2">
                    <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"/>
                    </svg>
                </span>
                <span className="text-white text-xl font-bold tracking-tight">FitScan</span>
                </a>

                {/* Desktop Navigation */}
                {!isMobile && (
                <div className="flex items-center gap-4 md:gap-8">
                    <a href="#" className="text-gray-200 font-medium hover:text-lime-400 transition">About</a>
                    <a href="#" className="text-gray-200 font-medium hover:text-lime-400 transition">Features</a>
                    <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setShowAuthModal(true);
                            }}
                            className="text-gray-200 font-medium hover:text-lime-400 transition">Login / Signup</a>
                    <a href="#" className="bg-lime-400 hover:bg-lime-300 transition text-[#181f10] font-semibold rounded-full px-4 py-2 md:px-6 md:py-2 shadow-lg">Contact Us</a>
                </div>
                )}

                {/* Mobile Hamburger Menu */}
                {isMobile && (
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-200 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                    </svg>
                </button>
                )}
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobile && menuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-[#181f10] z-50 py-4 px-6 shadow-lg rounded-b-lg">
                <div className="flex flex-col space-y-4">
                    <a href="#" className="text-gray-200 font-medium hover:text-lime-400 transition py-2">About</a>
                    <a href="#" className="text-gray-200 font-medium hover:text-lime-400 transition py-2">Features</a>
                    <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setShowAuthModal(true);
                            }}
                            className="text-gray-200 font-medium hover:text-lime-400 transition py-2">Login / Signup</a>
                    <a href="#" className="bg-lime-400 hover:bg-lime-300 transition text-[#181f10] font-semibold rounded-full px-6 py-2 text-center">Contact Us</a>
                </div>
                </div>
            )}
            </header>

            
            <main className="flex flex-col items-center justify-center mt-12 md:mt-24 px-4">
            {/* Label + Avatars */}
            <div className="flex items-center gap-2 mb-4 md:mb-5">
                <div className="flex -space-x-2 mr-2">
                <div className="w-5 h-5 md:w-7 md:h-7 bg-lime-400 rounded-full border-2 border-[#181f10]" />
                <div className="w-5 h-5 md:w-7 md:h-7 bg-lime-300 rounded-full border-2 border-[#181f10]" />
                <div className="w-5 h-5 md:w-7 md:h-7 bg-lime-200 rounded-full border-2 border-[#181f10]" />
                <div className="w-5 h-5 md:w-7 md:h-7 bg-lime-400 rounded-full border-2 border-[#181f10]" />
                </div>
                <span className="bg-[#222] text-xs text-gray-200 rounded-full px-3 py-1 font-medium">
                Access Made Easy, Management Made Smarter
                </span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-white text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                Empowering Your Gym <br className="hidden md:block" /> With Smart Access
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-center text-base sm:text-lg max-w-xl mb-6 md:mb-9 px-4">
                Simplify gym check-ins, track attendance in real time, and manage members—all with a powerful, QR-enabled platform.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4">
                <a href="#" className="flex items-center justify-center sm:justify-start space-x-2 bg-[#181f10] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow border-2 border-[#2b2b2b] hover:bg-neutral-800 transition">
                <span className="bg-gray-800 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-lime-400 mr-1">
                    <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
                    <path d="M8.5 2V15M8.5 15L4 10.5M8.5 15L13 10.5" stroke="#b4fa1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span>Book A Demo</span>
                </a>
                <a href="#"  onClick={(e) => {
                            e.preventDefault();
                            setShowAuthModal(true);
                            }}
                className="flex items-center justify-center sm:justify-start space-x-2 bg-lime-400 text-[#181f10] px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold">
                <span className="bg-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-lime-400 mr-1">
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M6 9H12M12 9L9.5 6.5M12 9L9.5 11.5" stroke="#b4fa1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
                <span>Get Started</span>
                </a>
            </div>
            </main>

            {/* Grid/Squares overlay effect */}
            <div className="pointer-events-none absolute inset-0 z-0">
            <svg className="w-full h-full opacity-10" width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 12 }).map((_, i) => (
                <rect
                    key={i}
                    x={(i % 6) * 200 + 20}
                    y={Math.floor(i / 6) * 400 + 40}
                    width="110" height="110"
                    rx="18"
                    fill="#1b1d24"
                />
                ))}
            </svg>
            </div>


                  {/* Features Grid */}
                <section className="w-full py-16 px-4 bg-[#101010]">
                    <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                        Everything You Need in One Platform
                    </h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                        Designed for modern gyms and fitness centers
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                        { 
                            icon: "🔐", 
                            title: "Secure QR Access", 
                            desc: "Time-limited codes prevent unauthorized entry" 
                        },
                        { 
                            icon: "📊", 
                            title: "Real-Time Analytics", 
                            desc: "Track attendance patterns and peak hours" 
                        },
                        { 
                            icon: "👥", 
                            title: "Member Management", 
                            desc: "Easily update plans and track expirations" 
                        },
                        { 
                            icon: "📱", 
                            title: "Mobile Integration", 
                            desc: "Members check in with their smartphones" 
                        },
                        { 
                            icon: "🔔", 
                            title: "Automated Alerts", 
                            desc: "Notify members about expiring memberships" 
                        },
                        { 
                            icon: "💰", 
                            title: "Revenue Tools", 
                            desc: "Ad spaces and premium feature upgrades" 
                        }
                        ].map((feature, i) => (
                        <div key={i} className="bg-[#181818] p-6 rounded-lg hover:bg-[#222] transition border border-[#252525]">
                            <span className="text-3xl mb-3 block">{feature.icon}</span>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </section>



                    {/* Testimonials Section */}
                <section className="w-full py-16 px-4 bg-[#181818]">
                    <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
                        Trusted by Gym Owners
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                        {
                            quote: "Fitscan reduced our check-in time by 70% and eliminated front-desk bottlenecks.",
                            name: "Kishore",
                            gym: "Iron Peak Fitness"
                        },
                        {
                            quote: "Members love the QR access - no more lost keycards! Attendance tracking is seamless.",
                            name: "Sai Kiran",
                            gym: "Urban Fit Club"
                        },
                        {
                            quote: "The admin dashboard gives me real-time insights into peak hours and member retention.",
                            name: "Varma",
                            gym: "Titan Gym Chain"
                        }
                        ].map((testimonial, index) => (
                        <div key={index} className="bg-[#222] p-6 rounded-xl border border-[#333]">
                            <svg className="w-8 h-8 text-lime-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                            <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                            <div>
                            <p className="font-semibold text-lime-400">{testimonial.name}</p>
                            <p className="text-sm text-gray-400">{testimonial.gym}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </section>


                      {/* Footer */}
                    <footer className="w-full py-12 px-4 bg-[#0a0a0a] border-t border-[#222]">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-lime-400 rounded-xl p-1">
                            <svg width="24" height="24" viewBox="0 0 448 512">
                                <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" fill="white"/>
                            </svg>
                            </span>
                            <span className="text-white text-xl font-bold">FitScan</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Smart access control and gym management solutions.
                        </p>
                        </div>
                        
                        <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">Pricing</a></li>
                        
                        </ul>
                        </div>
                        
                        <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">About</a></li>
                        
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">Careers</a></li>
                        </ul>
                        </div>
                        
                        <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">Privacy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-lime-400 text-sm">Terms</a></li>
                            <li><a href="https://www.linkedin.com/in/jvbkishore"  target="_blank" 
                                rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 text-sm">👨‍💻</a></li>
                    
                        </ul>
                        </div>
                    </div>
                    
                    <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-[#222] text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Fitscan. All rights reserved.
                    </div>
                    </footer>


             {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
    </div>
      
        
     

      
   
  );
};

export default LandingPage;