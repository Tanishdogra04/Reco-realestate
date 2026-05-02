import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProperties, deleteProperty, getUsers, getEnquiries, getBookings, updateUserStatus } from "../api/api";
import { 
  LayoutDashboard, Building2, Users, PieChart, Globe, LogOut, 
  Search, Plus, Filter, Trash2, Edit3, MapPin, IndianRupee, 
  Clock, CheckCircle2, Mail, Phone, MessageSquare, ShieldCheck, 
  UserPlus, ArrowRight, Bell, Settings, HelpCircle, TrendingUp, DollarSign,
  MoreHorizontal, X, Menu
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Omar Faruk");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([
    { id: 1, title: "New Lead", message: "John Doe interested in Skyline Residences", time: "2 mins ago", type: "enquiry" },
    { id: 2, title: "Sale Completed", message: "Bandra Office Unit 4B sold for ₹45Cr", time: "1 hour ago", type: "booking" },
    { id: 3, title: "Security Alert", message: "New login from unknown device in Mumbai", time: "3 hours ago", type: "security" }
  ]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("user"));
    if (!admin || admin.role !== "admin") {
      navigate("/login");
      return;
    }
    setAdminName(admin.fullName || "Omar Faruk");
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const fetchSet = [
        { fn: fetchProperties, setter: setProperties, name: "Properties" },
        { fn: getUsers, setter: setUsers, name: "Users" },
        { fn: getEnquiries, setter: setEnquiries, name: "Enquiries" },
        { fn: getBookings, setter: setBookings, name: "Bookings" }
      ];

      for (const item of fetchSet) {
        try {
          const data = await item.fn();
          item.setter(data || []);
        } catch (err) {
          console.error(`Error loading ${item.name}:`, err.message);
          item.setter([]);
        }
      }
    } catch (error) {
      console.error("Critical Data retrieval error", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = [
    { name: '2018', income: 4000, expense: 2400 },
    { name: '2019', income: 6000, expense: 1398 },
    { name: '2020', income: 4500, expense: 9800 },
    { name: '2021', income: 8000, expense: 3908 },
    { name: '2022', income: 7000, expense: 4800 },
    { name: '2023', income: 9000, expense: 3800 },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-gray-50 shadow-sm">
          <img src={`https://ui-avatars.com/api/?name=${adminName}&background=random`} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Welcome Back!</p>
        <h2 className="font-black text-gray-800 text-sm mt-1">{adminName}</h2>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {[
          { label: "Dashboard", icon: LayoutDashboard },
          { label: "Properties", icon: Building2 },
          { label: "Bookings", icon: Clock },
          { label: "Inquiries", icon: Mail },
          { label: "Users", icon: Users },
          { label: "Settings", icon: Settings },
        ].map((item) => (
          <button 
            key={item.label} 
            onClick={() => { setActiveTab(item.label); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs transition-all ${activeTab === item.label ? 'bg-white text-gray-900 border border-gray-100 shadow-sm font-black' : 'text-gray-400 hover:text-gray-900 font-bold'}`}
          >
            <div className={`p-2 rounded-xl ${activeTab === item.label ? 'bg-[#7C3AED] text-white' : 'bg-transparent text-gray-400'}`}>
              <item.icon size={18} />
            </div>
            {item.label}
          </button>
        ))}
      </nav>

      <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="mt-auto flex items-center gap-4 px-5 py-4 text-gray-400 hover:text-red-600 font-black text-xs transition-all">
        <LogOut size={20} /> Logout
      </button>
    </>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-12 gap-6 lg:gap-10">
      <div className="col-span-12 lg:col-span-8 space-y-10">
         {/* Hero Promo */}
         <div className="bg-gradient-to-r from-[#110D2C] to-[#1D164B] rounded-[40px] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden group">
            <div className="space-y-6 relative z-10 text-center lg:text-left">
               <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter">Your Platform <br /><span className="text-[#7C3AED]">Growth</span>.</h2>
               <button className="bg-[#7C3AED] text-white px-10 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-purple-500/20">Explore Now</button>
            </div>
            <div className="mt-8 lg:mt-0 w-full lg:w-1/2 h-48 lg:h-64 rounded-3xl overflow-hidden border-8 border-white/5 relative z-10 shadow-2xl group-hover:scale-105 transition-all duration-700">
               <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[120px] rounded-full" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
            <div className="md:col-span-5 space-y-6 lg:space-y-8">
               <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-1 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><Building2 size={12} /> Total Properties</div>
                    <MoreHorizontal size={18} className="text-gray-300" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{properties.length}</h3>
                  <p className="text-[10px] text-green-500 font-bold flex items-center gap-1 mt-2">+12% <span className="text-gray-300 font-medium lowercase">live assets</span></p>
               </div>
               <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-1 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2"><Users size={12} /> Total Agents</div>
                    <MoreHorizontal size={18} className="text-gray-300" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{users.filter(u => u.role === 'agent' || u.role === 'broker').length}</h3>
                  <p className="text-[10px] text-orange-500 font-bold flex items-center gap-1 mt-2">+5% <span className="text-gray-300 font-medium lowercase">onboarded this month</span></p>
               </div>
            </div>

            <div className="md:col-span-7 bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h4 className="font-black text-sm text-gray-900 uppercase tracking-widest">Sales Analytics</h4>
               </div>
               <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={4} dot={false} />
                        <Line type="monotone" dataKey="expense" stroke="#cbd5e1" strokeWidth={2} dot={false} />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm overflow-x-auto">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black text-lg text-gray-900">Recent Transactions</h3>
               <button onClick={() => setActiveTab("Bookings")} className="text-[10px] font-black uppercase text-purple-600">View All</button>
            </div>
            <div className="min-w-[600px] space-y-2">
               {bookings.slice(0, 5).map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all">
                     <div className="flex items-center gap-4 w-1/3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden"><img src={`https://ui-avatars.com/api/?name=${b.user?.fullName}`} alt="" /></div>
                        <p className="font-bold text-sm text-gray-800">{b.user?.fullName}</p>
                     </div>
                     <div className="w-1/3 text-xs font-medium text-gray-400 truncate">{b.property?.title}</div>
                     <div className="w-1/6 text-center font-black text-sm text-gray-900">₹{b.amount}</div>
                     <div className="w-1/6 text-right">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${b.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{b.status}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-10">
         <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col h-full min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black text-lg text-gray-900">Inventory</h3>
               <button onClick={() => setActiveTab("Properties")} className="text-[10px] font-black uppercase text-purple-600">Explore</button>
            </div>
            <div className="space-y-6">
               {properties.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                     <div className="w-14 h-14 rounded-3xl overflow-hidden shadow-lg shadow-gray-200 group-hover:scale-105 transition-all flex-shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-black text-xs text-gray-800 mb-1 truncate">{p.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1"><MapPin size={10} /> {p.location.split(',')[1] || p.location}</p>
                        <p className="mt-1 text-[10px] font-black text-purple-600 uppercase tracking-tighter">₹{(p.price/10000000).toFixed(1)} Cr</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="mt-10 pt-10 border-t border-gray-50">
               <div className="bg-purple-50 p-6 rounded-[30px] border border-purple-100/50">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-[10px]">{enquiries.length}+</div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-purple-900">Leads Pending</p>
                  </div>
                  <p className="text-xs text-purple-700 font-medium leading-relaxed">Action required on premium leads from Gurgaon sectors.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Properties": return (
        <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div>
                 <h3 className="font-black text-2xl text-gray-900">Asset Inventory</h3>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Live listings: {filteredProperties.length}</p>
              </div>
              <button className="w-full sm:w-auto bg-[#7C3AED] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-purple-500/20"><Plus size={16} /> New Property</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                 <thead>
                    <tr className="border-b border-gray-50 pb-4">
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Property Details</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Category</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Price</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Status</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {filteredProperties.map((p) => (
                       <tr key={p._id} className="group hover:bg-gray-50/50 transition-all">
                          <td className="py-8">
                             <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md"><img src={p.image} className="w-full h-full object-cover" /></div>
                                <div>
                                   <p className="font-black text-sm text-gray-900">{p.title}</p>
                                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1"><MapPin size={10} /> {p.location}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-8"><span className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[9px] font-black uppercase tracking-widest">{p.category}</span></td>
                          <td className="py-8 font-black text-sm text-gray-900">₹{(p.price/10000000).toFixed(2)} Cr</td>
                          <td className="py-8"><span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.availability === 'available' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{p.availability}</span></td>
                          <td className="py-8 text-right">
                             <div className="flex justify-end gap-3 opacity-0 lg:group-hover:opacity-100 transition-all">
                                <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#7C3AED] hover:shadow-lg transition-all"><Edit3 size={16} /></button>
                                <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:shadow-lg transition-all"><Trash2 size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      );
      case "Users": return (
        <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm">
           <h3 className="font-black text-2xl text-gray-900 mb-8">Stakeholder Directory</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredUsers.map((u) => (
                <div key={u._id} className="p-8 border border-gray-50 rounded-[40px] hover:shadow-xl transition-all relative overflow-hidden group">
                   <div className="flex items-center gap-5 mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-all flex-shrink-0"><img src={`https://ui-avatars.com/api/?name=${u.fullName}&background=random`} /></div>
                      <div className="min-w-0">
                         <h4 className="font-black text-gray-900 truncate">{u.fullName}</h4>
                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{u.role}</p>
                      </div>
                   </div>
                   <div className="space-y-4 mb-8 relative z-10">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-bold truncate"><Mail size={14} className="text-purple-600 flex-shrink-0" /> {u.email}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-bold"><Phone size={14} className="text-purple-600 flex-shrink-0" /> {u.phone}</div>
                   </div>
                   <div className="flex gap-4 relative z-10">
                      <button className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${u.status === 'active' ? 'bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                        {u.status === 'active' ? 'Block Account' : 'Activate User'}
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case "Inquiries": return (
        <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm">
           <h3 className="font-black text-2xl text-gray-900 mb-8">Global Lead Tracker</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {enquiries.map((e, i) => (
                <div key={i} className="border border-gray-100 p-6 lg:p-8 rounded-[40px] space-y-6 hover:shadow-xl transition-all">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-lg flex-shrink-0">{e.name?.[0]}</div>
                         <div className="min-w-0">
                            <h4 className="font-black text-gray-900 truncate">{e.name}</h4>
                            <p className="text-xs text-gray-400 truncate">{e.email}</p>
                         </div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 hidden sm:block">New Lead</span>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-3xl text-sm text-gray-600 font-medium leading-relaxed">"{e.message}"</div>
                   <div className="flex gap-4 pt-2">
                      <button className="flex-1 bg-[#110D2C] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"><Phone size={14} /> Contact</button>
                      <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-green-500 hover:text-white transition-all"><CheckCircle2 size={18} /></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case "Settings": return (
        <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-12">
           <div>
              <h3 className="font-black text-2xl text-gray-900 mb-2">Platform Configuration</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage Global RECO India Environment</p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <h4 className="font-black text-sm text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2"><UserPlus size={16} className="text-purple-600" /> Admin Identity</h4>
                 <div className="space-y-4">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                       <input type="text" defaultValue={adminName} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <button className="w-full bg-[#110D2C] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Update Identity</button>
                 </div>
              </div>
              <div className="space-y-6">
                 <h4 className="font-black text-sm text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2"><Globe size={16} className="text-purple-600" /> Regional & Fiscal</h4>
                 <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Default Currency</label>
                          <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900"><option>INR (₹)</option><option>USD ($)</option></select>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] font-inter overflow-hidden relative">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-[280px] bg-white border-r border-gray-100 flex flex-col py-10 px-8 transition-transform duration-300 lg:static lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="lg:hidden absolute top-10 right-8">
           <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gray-900 transition-all"><X size={24} /></button>
        </div>
        <SidebarContent />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto bg-white flex flex-col p-6 lg:p-10 pt-8 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 relative">
          <div className="flex items-center justify-between w-full lg:w-auto">
             <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all lg:hidden mr-4"
             >
                <Menu size={24} />
             </button>
             <h1 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center gap-2 tracking-tight">
                Hi {adminName.split(' ')[0]} 👋
             </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
             <div className="relative flex items-center flex-1 lg:flex-none">
                <Search className="absolute left-4 text-gray-300" size={18} />
                <input 
                   type="text" 
                   placeholder="Search..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-12 pr-6 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-purple-500 w-full lg:w-64 transition-all"
                />
             </div>
             
             <div className="relative">
                <button 
                   onClick={() => setShowNotifications(!showNotifications)}
                   className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-all relative"
                >
                   <Bell size={20} />
                   {unreadNotifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
                </button>

                {showNotifications && (
                   <div className="absolute right-0 mt-4 w-[280px] sm:w-80 bg-white rounded-[30px] border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                         <h4 className="font-black text-xs uppercase tracking-widest text-gray-900">Alert Center</h4>
                         <button onClick={() => setShowNotifications(false)} className="text-gray-300 hover:text-gray-900"><X size={16} /></button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                         {unreadNotifications.map((n) => (
                            <div key={n.id} className="p-6 hover:bg-gray-50 transition-all border-b border-gray-50 cursor-pointer">
                               <p className="font-black text-xs text-gray-900 mb-1">{n.title}</p>
                               <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{n.message}</p>
                               <p className="text-[9px] text-purple-600 font-black uppercase mt-2">{n.time}</p>
                            </div>
                         ))}
                      </div>
                      <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#7C3AED] transition-all bg-white">Clear All</button>
                   </div>
                )}
             </div>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
