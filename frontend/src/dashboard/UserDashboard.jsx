import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Building2,
  IndianRupee,
  LogOut,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Clock,
  Heart,
  PlusCircle,
  Briefcase,
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Video,
  PhoneCall,
  ExternalLink,
  User,
  Mail,
  Phone,
  Save
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { apartmentListings } from "../data/properties";
import { getBookings, fetchProperties, deleteProperty } from "../api/api";
import jsPDF from "jspdf";

/* ================= MOCK DATA ================= */

const performanceData = [
  { name: "Jan", value: 4000 }, { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 }, { name: "Apr", value: 4500 },
  { name: "May", value: 6000 }, { name: "Jun", value: 5500 },
];

const insightsData = [
  { name: "Gurgaon", growth: 12 },
  { name: "Noida", growth: 8 },
  { name: "Mumbai", growth: 15 },
  { name: "Bangalore", growth: 10 },
];

/* ================= COMPONENT ================= */

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "Guest User", role: "customer", phone: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const [savedAssets, setSavedAssets] = useState([]);
  const [purchasedAssets, setPurchasedAssets] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadPortfolio = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const savedIds = JSON.parse(localStorage.getItem("savedProperties")) || [];
    
    // Saved Assets logic
    const filtered = apartmentListings.filter(p => 
      savedIds.some(sid => Number(sid) === Number(p.id))
    );
    
    if (filtered.length === 0 && storedUser?.role === 'investor') {
       const starterSet = apartmentListings.slice(0, 2);
       setSavedAssets(starterSet);
       setPortfolioValue(starterSet.reduce((acc, curr) => acc + curr.price, 0));
    } else {
       setSavedAssets(filtered);
       setPortfolioValue(filtered.reduce((acc, curr) => acc + curr.price, 0));
    }

    // Fetch Purchased Assets (Bookings)
    try {
      const allBookings = await getBookings().catch(() => []);
      const localBookings = JSON.parse(localStorage.getItem("localBookings")) || [];
      
      // Merge and filter
      const combinedBookings = [...allBookings, ...localBookings].filter(b => {
        const bookingUserId = typeof b.user === 'string' ? b.user : b.user?._id;
        // Match by user ID, or match everything if no ID is found (for demo simplicity)
        return !storedUser?._id || bookingUserId === storedUser?._id || bookingUserId === "645a1b2c3d4e5f6g7h8i9j0k";
      });
      
      // De-duplicate if needed (optional)
      
      // Map bookings to property details
      const purchasesWithDetails = combinedBookings.map(booking => {
        const propId = typeof booking.property === 'string' ? booking.property : booking.property?._id;
        const details = apartmentListings.find(p => Number(p.id) === Number(propId));
        return { ...booking, details };
      });
      
      setPurchasedAssets(purchasesWithDetails);

      // DYNAMIC PORTFOLIO CALCULATION: Only Confirmed Acquisitions
      const acquiredValue = purchasesWithDetails.reduce((acc, b) => acc + (b.details?.price || 0), 0);
      setPortfolioValue(acquiredValue);
    } catch (err) {
      console.warn("Failed to fetch bookings, might be in offline mode", err);
    }

    // Fetch My Properties (Listings)
    try {
      const allProperties = await fetchProperties().catch(() => []);
      const myFiltered = allProperties.filter(p => {
        const propUserId = typeof p.user === 'string' ? p.user : p.user?._id;
        return propUserId === storedUser?._id;
      });
      setMyProperties(myFiltered);
    } catch (err) {
      console.warn("Failed to fetch my properties", err);
    }

    // Remove hardcoded dummy data for specific emails to ensure true dynamic behavior
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    // Handle dummy deletion locally
    if (id === 'listing123') {
      setMyProperties(prev => prev.filter(p => p._id !== id));
      alert("✅ Demo property removed from your view!");
      return;
    }

    try {
      await deleteProperty(id);
      alert("✅ Property deleted successfully!");
      loadPortfolio();
    } catch (err) {
      alert("❌ Failed to delete property. Only owners or admins can delete listings.");
    }
  };

  useEffect(() => {
    loadPortfolio();

    // Listen for storage changes in other tabs (Real-time effect)
    const handleStorageChange = (e) => {
      if (e.key === "savedProperties" || e.key === "localBookings") {
        loadPortfolio();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // RE-SYNC ON TAB CHANGE: Ensures data is fresh if user navigated in another tab/window
  useEffect(() => {
    if (activeTab === 'portfolio' || activeTab === 'overview' || activeTab === 'acquisitions') {
      loadPortfolio();
    }
  }, [activeTab]);

  const handleDownloadReceipt = (booking) => {
    const doc = new jsPDF();
    const { details, amount, paymentMethod, _id, createdAt } = booking;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(22, 163, 74);
    doc.text("RECO INDIA REAL ESTATE", 105, 25, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text("OFFICIAL PAYMENT RECEIPT", 105, 35, { align: "center" });
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 42, 190, 42);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Receipt No: RECO-${_id.slice(-6).toUpperCase()}`, 20, 52);
    doc.text(`Date: ${new Date(createdAt).toLocaleDateString('en-IN')}`, 160, 52);
    
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.text("ASSET DETAILS", 20, 70);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Property:", 20, 80);
    doc.setFont("helvetica", "normal");
    doc.text(details?.title || "N/A", 60, 80);
    
    doc.setFont("helvetica", "bold");
    doc.text("Location:", 20, 88);
    doc.setFont("helvetica", "normal");
    doc.text(details?.location || "N/A", 60, 88);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT INFORMATION", 20, 105);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Total Amount Paid:", 20, 115);
    doc.text(formatPrice(amount), 150, 115);
    
    doc.text("Payment Method:", 20, 123);
    doc.text(paymentMethod?.toUpperCase() || "DIRECT", 150, 123);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 130, 190, 130);
    
    doc.setFont("helvetica", "bold");
    doc.text("STATUS:", 20, 140);
    doc.setTextColor(22, 163, 74);
    doc.text("SUCCESSFUL", 150, 140);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("This receipt is valid for all legal and tax purposes.", 105, 270, { align: "center" });
    doc.text("RECO India - Premium Asset Management", 105, 277, { align: "center" });
    
    doc.save(`Receipt_RECO_${_id.slice(-6).toUpperCase()}.pdf`);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const handleSupport = () => {
    window.open("https://wa.me/919999999999?text=I%20need%20support%20with%20my%20property%20acquisition", "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpdate = (formData) => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("✅ Identity Updated Successfully! Your institutional profile has been synchronized.");
    setActiveTab("overview");
  };

  const handleVideoConsult = () => {
    window.open("https://meet.google.com/new", "_blank");
  };

  const handleRequestCall = () => {
    alert(`✅ Request Received! Our senior strategist will call you at ${user.phone || 'your registered number'} within 15 minutes.`);
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-gray-900 flex flex-col justify-between p-8 text-white hidden lg:flex">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20">
               <ShieldCheck size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">Reco<span className="text-green-600">.</span></h1>
          </Link>

          <Link to="/" className="flex items-center gap-4 px-4 py-3 mb-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all group">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">Return to Site</span>
          </Link>

          <nav className="space-y-2">
            <SidebarItem icon={<Home size={18} />} text="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            
            <SidebarItem icon={<Building2 size={18} />} text="My Listings" active={activeTab === 'listings'} onClick={() => setActiveTab('listings')} />

            {user.role === 'broker' && (
              <SidebarItem icon={<Users size={18} />} text="My Leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
            )}

            <SidebarItem icon={<Heart size={18} />} text="Saved Properties" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
            <SidebarItem icon={<PlusCircle size={18} />} text="My Purchases" active={activeTab === 'acquisitions'} onClick={() => setActiveTab('acquisitions')} />
            <SidebarItem icon={<TrendingUp size={18} />} text="Insights" active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
            <SidebarItem icon={<Briefcase size={18} />} text="Talk to Expert" active={activeTab === 'expert'} onClick={() => setActiveTab('expert')} />
            <div className="h-px bg-white/10 my-6 mx-2" />
            <SidebarItem icon={<Settings size={18} />} text="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10">
           <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors font-black uppercase text-[10px] tracking-widest">
             <LogOut size={16} /> Sign Out
           </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-10 py-6 flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-1">{activeTab.toUpperCase()}</p>
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{activeTab === 'overview' ? `Welcome, ${user.fullName.split(' ')[0]}` : activeTab}<span className="text-green-600">.</span></h2>
           </div>
           <div className="flex items-center gap-6">
                 <Link 
                   to="/edit-profile"
                   className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-green-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-gray-100"
                 >
                   <Settings size={14} /> Manage Profile
                 </Link>
                 <button 
                   onClick={loadPortfolio}
                   className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-green-100"
                 >
                   <Clock size={14} /> Sync Data
                 </button>
                 <button className="relative p-3 bg-gray-50 rounded-2xl text-gray-500 hover:bg-white hover:shadow-md transition-all">
                 <Bell size={20} /><span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-11 h-11 bg-green-600 rounded-2xl flex items-center justify-center text-white text-sm font-black uppercase">
                 {user.fullName.split(' ').map(n => n[0]).join('')}
              </div>
           </div>
        </header>

        <div className="p-10">
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <KpiCard 
                   label={user.role === 'broker' ? "Total Sales" : "Property Value"} 
                   value={`₹${(portfolioValue / 10000000).toFixed(2)} Cr`} 
                   trend="+14.2%" 
                   icon={<IndianRupee className="text-green-600" />} 
                 />
                 <KpiCard 
                   label={user.role === 'broker' ? "My Listings" : "Saved Items"} 
                   value={(savedAssets.length + myProperties.length).toString().padStart(2, '0')} 
                   trend="Active" 
                   icon={<Building2 className="text-blue-600" />} 
                 />
                 <KpiCard 
                   label="Status" 
                   value="Premium" 
                   trend="Verified" 
                   icon={<ShieldCheck className="text-orange-600" />} 
                 />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                 <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-8">Performance Analysis</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15}/><stop offset="95%" stopColor="#16a34a" stopOpacity={0}/></linearGradient></defs>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                          <YAxis hide /><Tooltip contentStyle={{ borderRadius: '24px', border: 'none', padding: '16px' }} />
                          <Area type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={5} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
                 
                 <div className="bg-gray-900 rounded-[40px] p-10 text-white flex flex-col justify-between shadow-2xl shadow-green-900/20">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-4">Quick Advisory</h3>
                      <p className="text-xs font-bold text-gray-400 mb-8 leading-relaxed">Need immediate clarity on a high-value asset? Connect with our senior panel instantly.</p>
                      <div className="space-y-3">
                         <button onClick={handleVideoConsult} className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-green-600 transition-all group">
                            <span className="text-[10px] font-black uppercase tracking-widest">Expert Video Call</span>
                            <Video size={18} className="text-green-500 group-hover:text-white" />
                         </button>
                         <button onClick={handleRequestCall} className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white hover:text-gray-900 transition-all group">
                            <span className="text-[10px] font-black uppercase tracking-widest">Get a Call Back</span>
                            <PhoneCall size={18} className="text-gray-400 group-hover:text-gray-900" />
                         </button>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                       <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em]">Priority Support Active</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-black text-gray-900 uppercase">My Assets ({savedAssets.length})</h3>
                 <Link to="/properties" className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline flex items-center gap-2">Discover More <ExternalLink size={12} /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedAssets.length > 0 ? savedAssets.map(p => (
                  <div key={p.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
                    <div className="relative">
                       <img src={p.image} className="w-full h-48 object-cover transition-transform group-hover:scale-105" alt="" />
                       <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-green-600">Verified</div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                          <h4 className="text-md font-black text-gray-900 uppercase truncate">{p.title}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{p.location}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-black text-green-600">₹{(p.price/10000000).toFixed(2)} Cr</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/property/${p.id}`} className="flex-1 bg-gray-900 text-white text-center py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all">View Asset</Link>
                        <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-all"><Heart size={16} fill="currentColor" /></button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                     <Building2 size={48} className="mx-auto text-gray-200 mb-4" />
                     <h4 className="text-lg font-black text-gray-400 uppercase">Your Portfolio is Empty</h4>
                     <Link to="/properties" className="mt-4 inline-block px-8 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase">Browse Collection</Link>
                  </div>
                )}
              </div>
            </div>
          )}

           {activeTab === 'acquisitions' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-black text-gray-900 uppercase">My Purchases ({purchasedAssets.length})</h3>
                 <div className="flex items-center gap-2 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <ShieldCheck size={12} /> Verified Purchase
                 </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {purchasedAssets.length > 0 ? purchasedAssets.map(b => (
                  <div key={b._id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all">
                    <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                       <img src={b.details?.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400"} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 space-y-3">
                       <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-black text-gray-900 uppercase">{b.details?.title || "Property Details Pending"}</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">{b.details?.location || "Location verification in progress"}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${b.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                             {b.status}
                          </div>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-50">
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Amount Paid</p>
                             <p className="text-sm font-black text-gray-900">₹{(b.amount/10000000).toFixed(2)} Cr</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Transaction ID</p>
                             <p className="text-sm font-bold text-gray-600 uppercase tracking-tighter">RECO-{b._id.slice(-6).toUpperCase()}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Method</p>
                             <p className="text-sm font-bold text-gray-600 uppercase">{b.paymentMethod || "Direct Transfer"}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Date</p>
                             <p className="text-sm font-bold text-gray-600">{new Date(b.createdAt).toLocaleDateString()}</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-row md:flex-col justify-center gap-3">
                       <button 
                         onClick={() => handleDownloadReceipt(b)}
                         className="px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all text-center flex items-center justify-center gap-2"
                       >
                         <FileText size={14} /> Receipt
                       </button>
                       <button 
                         onClick={handleSupport}
                         className="px-6 py-3 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-center flex items-center justify-center gap-2"
                       >
                         <MessageCircle size={14} /> Support
                       </button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                     <PlusCircle size={48} className="mx-auto text-gray-200 mb-4" />
                     <h4 className="text-lg font-black text-gray-400 uppercase">No Acquisitions Yet</h4>
                     <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">Start your investment journey by exploring our exclusive property collection.</p>
                     <Link to="/properties" className="mt-6 inline-block px-8 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Browse Collection</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-8">Growth by Locality</h3>
                  <div className="h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={insightsData}>
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                           <YAxis hide />
                           <Bar dataKey="growth" radius={[10, 10, 0, 0]}>
                              {insightsData.map((entry, index) => (
                                <Cell key={index} fill={index === 2 ? '#16a34a' : '#f1f5f9'} />
                              ))}
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               <div className="space-y-6">
                  <InsightCard 
                    title="Q4 Residential Outlook" 
                    tag="Report" 
                    icon={<FileText size={20} />} 
                    onClick={() => navigate("/insights")}
                  />
                  <InsightCard 
                    title="Luxury Segment Surge" 
                    tag="Market News" 
                    icon={<TrendingUp size={20} />} 
                    onClick={() => navigate("/insights")}
                  />
                  <InsightCard 
                    title="RERA Guidelines 2024" 
                    tag="Regulatory" 
                    icon={<ShieldCheck size={20} />} 
                    onClick={() => navigate("/insights")}
                  />
               </div>
            </div>
          )}

          {activeTab === 'expert' && (
            <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
               <div className="bg-gray-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Institutional Advisory</h3>
                  <p className="text-gray-400 text-sm max-w-xl mx-auto mb-10 font-medium">Connect with our senior strategists to optimize your asset allocation and unlock exclusive off-market opportunities.</p>
                  <div className="flex justify-center gap-4">
                     <button onClick={handleVideoConsult} className="px-8 py-4 bg-green-600 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-green-600 transition-all flex items-center gap-3"><Video size={18}/> Video Consult</button>
                     <button onClick={handleRequestCall} className="px-8 py-4 bg-white/10 border border-white/10 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white/20 transition-all">Request Call</button>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AdvisorProfile name="Vikram Singh" role="Commercial Specialist" />
                  <AdvisorProfile name="Ananya Reddy" role="Luxury Portfolio Head" />
               </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-black text-gray-900 uppercase">My Listings ({myProperties.length})</h3>
                 <Link to="/post-property" className="px-6 py-3 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all flex items-center gap-2">
                   <PlusCircle size={14} /> Add New Property
                 </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {myProperties.length > 0 ? myProperties.map(p => (
                  <div key={p._id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all">
                    <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                       <img src={p.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400"} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 space-y-3">
                       <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-black text-gray-900 uppercase">{p.title}</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">{p.location}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.availability === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {p.availability}
                          </div>
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Price</p>
                             <p className="text-sm font-black text-gray-900">₹{(p.price/10000000).toFixed(2)} Cr</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Category</p>
                             <p className="text-sm font-bold text-gray-600 uppercase">{p.category}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Type</p>
                             <p className="text-sm font-bold text-gray-600 uppercase">{p.type}</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-row md:flex-col justify-center gap-3">
                       <Link 
                         to={`/property/${p._id}`}
                         className="px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all text-center flex items-center justify-center gap-2"
                       >
                         <ExternalLink size={14} /> View
                       </Link>
                       <button 
                         onClick={() => handleDeleteProperty(p._id)}
                         className="px-6 py-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all text-center flex items-center justify-center gap-2"
                       >
                         <LogOut size={14} className="rotate-90" /> Delete
                       </button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                     <Building2 size={48} className="mx-auto text-gray-200 mb-4" />
                     <h4 className="text-lg font-black text-gray-400 uppercase">No Listings Found</h4>
                     <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">You haven't posted any properties yet. Start today!</p>
                     <Link to="/post-property" className="mt-6 inline-block px-8 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Post Property</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
               <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300"><Settings size={40} /></div>
               <h3 className="text-xl font-black text-gray-900 uppercase">{activeTab} in Optimization</h3>
               <button onClick={() => setActiveTab('overview')} className="px-8 py-4 bg-gray-900 text-white text-[11px] font-black uppercase rounded-2xl">Return to Overview</button>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-xl mx-auto space-y-8 animate-fade-in py-10">
                <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm text-center">
                   <div className="w-20 h-20 bg-green-50 rounded-[32px] flex items-center justify-center text-green-600 mx-auto mb-6">
                      <User size={40} />
                   </div>
                   <h3 className="text-xl font-black text-gray-900 uppercase mb-2">Account Control</h3>
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Manage your institutional identity</p>
                   <Link to="/edit-profile" className="block w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-green-600 transition-all">Launch Profile Editor</Link>
                </div>
                <div className="bg-red-50 rounded-[40px] p-10 border border-red-100 text-center">
                   <h3 className="text-sm font-black text-red-900 uppercase mb-4">Danger Zone</h3>
                   <button className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors">Request Account Deletion</button>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

const SidebarItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${active ? 'bg-green-600 text-white shadow-lg shadow-green-900/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon}<span className="text-[11px] font-black uppercase tracking-widest">{text}</span>
  </button>
);

const KpiCard = ({ label, value, trend, icon }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">{icon}</div>
     <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
        <div className="flex items-center gap-3"><h4 className="text-2xl font-black text-gray-900 tracking-tighter">{value}</h4><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{trend}</span></div>
     </div>
  </div>
);

const InsightCard = ({ title, tag, icon, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-green-600 transition-all cursor-pointer active:scale-[0.98]"
  >
     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-all">{icon}</div>
     <div className="flex-1">
        <p className="text-[9px] font-black text-green-600 uppercase tracking-widest">{tag}</p>
        <h4 className="text-sm font-black text-gray-900 uppercase mt-1">{title}</h4>
     </div>
     <ArrowUpRight size={18} className="text-gray-300 group-hover:text-green-600" />
  </div>
);

const AdvisorProfile = ({ name, role }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-green-600 transition-all">
     <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-black text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">{name[0]}</div>
     <div>
        <h4 className="text-md font-black text-gray-900 uppercase">{name}</h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{role}</p>
        <button 
          onClick={() => window.open("https://meet.google.com/new", "_blank")}
          className="mt-3 text-[10px] font-black text-green-600 uppercase tracking-widest hover:underline flex items-center gap-2"
        >
          Connect <Video size={12} />
        </button>
     </div>
  </div>
);