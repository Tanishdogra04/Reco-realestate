import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProperties, deleteProperty, getUsers, getEnquiries, getBookings, updateBookingStatus, updateUserStatus } from "../api/api";
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
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleApproveBooking = async (id) => {
    try {
      await updateBookingStatus(id, 'completed');
      alert("✅ Acquisition Approved! The property status has been synchronized.");
      loadAllData();
    } catch (err) {
      console.error("Failed to approve booking:", err);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await updateBookingStatus(id, 'cancelled');
      alert("⚠️ Acquisition Cancelled.");
      loadAllData();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

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
        <div className="relative group">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-white shadow-xl group-hover:scale-105 transition-all duration-500">
            <img src={`https://ui-avatars.com/api/?name=${adminName}&background=7C3AED&color=fff`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg" />
        </div>
        <div className="text-center">
          <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em] mb-1">Chief Administrator</p>
          <h2 className="font-black text-gray-900 text-lg tracking-tighter">{adminName}</h2>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {[
          { label: "Dashboard", icon: LayoutDashboard },
          { label: "Properties", icon: Building2 },
          { label: "Bookings", icon: Clock },
          { label: "Inquiries", icon: Mail },
          { label: "Users", icon: Users },
          { label: "Settings", icon: Settings },
        ].map((item, idx) => (
          <motion.button 
            key={item.label} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => { setActiveTab(item.label); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-[11px] transition-all group ${activeTab === item.label ? 'bg-[#7C3AED] text-white shadow-2xl shadow-purple-500/40 font-black' : 'text-gray-400 hover:text-gray-900 font-bold hover:bg-gray-50'}`}
          >
            <item.icon size={18} className={activeTab === item.label ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
            <span className="tracking-widest uppercase">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto space-y-3 pt-10 border-t border-gray-50">
        <button 
          onClick={() => navigate('/')} 
          className="w-full flex items-center gap-4 px-6 py-4 text-green-600 hover:bg-green-50 rounded-[24px] font-black text-[11px] uppercase tracking-widest transition-all border border-transparent hover:border-green-100"
        >
          <Globe size={18} /> Visit RECO
        </button>
        <button 
          onClick={() => { localStorage.clear(); navigate("/login"); }} 
          className="w-full flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-red-600 font-black text-[11px] uppercase tracking-widest transition-all"
        >
          <LogOut size={18} /> Exit System
        </button>
      </div>
    </>
  );

  const renderDashboard = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-12 gap-8 lg:gap-12"
    >
      <div className="col-span-12 lg:col-span-8 space-y-12">
         {/* Hero Promo */}
         <div className="bg-[#110D2C] rounded-[56px] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden group shadow-2xl">
            <div className="space-y-8 relative z-10 text-center lg:text-left">
               <div className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-md rounded-full border border-purple-500/30 text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Master Console v2.0</div>
               <h2 className="text-4xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter">Scale Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">Empire.</span></h2>
               <button onClick={() => navigate('/post-property')} className="bg-white text-[#110D2C] px-12 py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-green-400 hover:scale-105 transition-all shadow-2xl">Add Strategic Asset</button>
            </div>
            <div className="mt-12 lg:mt-0 w-full lg:w-1/2 h-64 lg:h-80 rounded-[48px] overflow-hidden border-[12px] border-white/5 relative z-10 shadow-3xl group-hover:rotate-2 transition-all duration-700">
               <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#110D2C] via-transparent to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <div className="md:col-span-4 space-y-8">
               <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-xl relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Revenue</div>
                    <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><DollarSign size={18} /></div>
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 tracking-tighter">₹{(bookings.reduce((acc, b) => b.status === 'completed' ? acc + b.amount : acc, 0)/10000000).toFixed(1)} Cr</h3>
                  <p className="text-[10px] text-green-500 font-black mt-3 flex items-center gap-2">Live Tracking <TrendingUp size={12}/></p>
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
               </motion.div>
               <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-xl relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Lead Velocity</div>
                    <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600"><TrendingUp size={18} /></div>
                  </div>
                  <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{((bookings.length / (enquiries.length || 1)) * 100).toFixed(1)}%</h3>
                  <p className="text-[10px] text-purple-500 font-black mt-3 uppercase tracking-widest">Conversion Index</p>
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
               </motion.div>
            </div>

            <div className="md:col-span-8 bg-[#110D2C] p-10 rounded-[56px] shadow-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[120px]" />
               <div className="flex justify-between items-end mb-12 relative z-10">
                  <div>
                    <h4 className="font-black text-lg text-white uppercase tracking-tighter mb-1">Portfolio Projection</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Institutional Data Flow</p>
                  </div>
                  <div className="bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest text-center">Sync Active</span>
                  </div>
               </div>
               <div className="h-56 w-full relative z-10 group-hover:scale-[1.02] transition-transform duration-700">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip 
                          contentStyle={{ borderRadius: '32px', border: 'none', background: '#fff', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', padding: '20px' }}
                          itemStyle={{ fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="income" stroke="#7C3AED" strokeWidth={6} fillOpacity={1} fill="url(#colorIncome)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[56px] border border-gray-100 shadow-2xl overflow-x-auto">
            <div className="flex justify-between items-center mb-12">
               <div>
                  <h3 className="font-black text-2xl text-gray-900 tracking-tighter">Strategic Liquidity</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Live Transaction Ledger</p>
               </div>
               <button onClick={() => setActiveTab("Bookings")} className="px-8 py-4 bg-gray-50 hover:bg-purple-600 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Audit Ledger</button>
            </div>
            <div className="min-w-[700px] space-y-4">
               {bookings.slice(0, 5).map((b, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-6 hover:bg-gray-50/80 rounded-[32px] transition-all border border-transparent hover:border-gray-100"
                  >
                     <div className="flex items-center gap-6 w-1/3">
                        <div className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0"><img src={`https://ui-avatars.com/api/?name=${b.user?.fullName}&background=7C3AED&color=fff`} alt="" /></div>
                        <div>
                           <p className="font-black text-sm text-gray-900 tracking-tight">{b.user?.fullName}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">verified Investor</p>
                        </div>
                     </div>
                     <div className="w-1/3">
                        <p className="text-[11px] font-black text-gray-800 truncate uppercase tracking-tight">{b.property?.title}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate">{b.property?.location}</p>
                     </div>
                     <div className="w-1/6 text-center">
                        <p className="font-black text-base text-green-600">₹{(b.amount/10000000).toFixed(2)}Cr</p>
                     </div>
                     <div className="w-1/6 text-right">
                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${b.status === 'completed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>{b.status}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-12">
         <div className="bg-white p-10 rounded-[56px] border border-gray-100 shadow-2xl flex flex-col h-full sticky top-10">
            <div className="flex justify-between items-center mb-12">
               <div>
                  <h3 className="font-black text-xl text-gray-900 tracking-tighter">Hot Inventory</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Interest</p>
               </div>
               <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><Filter size={18} /></div>
            </div>
            <div className="space-y-8 flex-1">
               {properties.slice(0, 5).map((p, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group cursor-pointer"
                  >
                     <div className="w-20 h-20 rounded-[32px] overflow-hidden shadow-2xl shadow-gray-200 group-hover:scale-110 transition-all flex-shrink-0 relative">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                     </div>
                     <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="font-black text-[13px] text-gray-900 mb-1 truncate uppercase tracking-tight group-hover:text-purple-600 transition-all">{p.title}</h4>
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                           <MapPin size={10} className="text-purple-600" />
                           <span className="text-[9px] font-black uppercase tracking-widest truncate">{p.location.split(',')[0]}</span>
                        </div>
                        <p className="text-sm font-black text-green-600 tracking-tighter">₹{(p.price/10000000).toFixed(1)} Cr</p>
                     </div>
                  </motion.div>
               ))}
            </div>
            <div className="mt-12 pt-12 border-t border-gray-50">
               <div className="bg-[#110D2C] p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-purple-500/40">{enquiries.length}</div>
                     <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-white leading-none">Unprocessed Leads</p>
                        <p className="text-[9px] font-bold text-purple-400 uppercase mt-1 tracking-widest">High Conversion Priority</p>
                     </div>
                  </div>
                  <button onClick={() => setActiveTab("Inquiries")} className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-[#110D2C] rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all relative z-10 backdrop-blur-md border border-white/10">Manage Funnel</button>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
               </div>
            </div>
         </div>
      </div>
    </motion.div>
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
                   <div className="bg-gray-50 p-6 rounded-3xl space-y-3">
                      <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{e.message}"</p>
                      {(e.city || e.propertyType || e.budget) && (
                        <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                           {e.city && <span className="text-[9px] font-black uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">📍 {e.city}</span>}
                           {e.propertyType && <span className="text-[9px] font-black uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">🏠 {e.propertyType}</span>}
                           {e.budget && <span className="text-[9px] font-black uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">💰 {e.budget}</span>}
                        </div>
                      )}
                   </div>
                   <div className="flex gap-4 pt-2">
                      <button className="flex-1 bg-[#110D2C] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"><Phone size={14} /> Contact</button>
                      <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-green-500 hover:text-white transition-all"><CheckCircle2 size={18} /></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      );
      case "Bookings": return (
        <div className="bg-white p-6 lg:p-10 rounded-[40px] border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-2xl text-gray-900 uppercase tracking-tighter">Acquisition Management</h3>
              <div className="px-5 py-2 bg-purple-50 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100">
                 {bookings.filter(b => b.status === 'pending').length} Pending Approvals
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                 <thead>
                    <tr className="border-b border-gray-50 pb-4">
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Investor</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Asset</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Transaction</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6">Status</th>
                       <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-6 text-right">Approval</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {bookings.map((b) => (
                       <tr key={b._id} className="group hover:bg-gray-50/30 transition-all">
                          <td className="py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden"><img src={`https://ui-avatars.com/api/?name=${b.user?.fullName}`} alt="" /></div>
                                <div>
                                   <p className="font-black text-xs text-gray-900">{b.user?.fullName || "Guest User"}</p>
                                   <p className="text-[9px] text-gray-400 font-bold uppercase">{b.user?.email || "No Email"}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-6">
                             <p className="font-black text-xs text-gray-900">{b.property?.title || "Property Details Pending"}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase">{b.property?.location || "Location N/A"}</p>
                          </td>
                          <td className="py-6">
                             <p className="font-black text-sm text-green-600">₹{(b.amount/10000000).toFixed(2)} Cr</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase">{b.paymentMethod || "Direct Transfer"}</p>
                          </td>
                          <td className="py-6">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${b.status === 'completed' ? 'bg-green-50 text-green-600' : b.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                                {b.status}
                             </span>
                          </td>
                          <td className="py-6 text-right">
                             {b.status === 'pending' ? (
                                <div className="flex justify-end gap-3">
                                   <button 
                                     onClick={() => handleApproveBooking(b._id)}
                                     className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all"
                                   >
                                     Approve
                                   </button>
                                   <button 
                                     onClick={() => handleCancelBooking(b._id)}
                                     className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                   >
                                     <X size={16} />
                                   </button>
                                </div>
                             ) : (
                                <div className="text-gray-300"><CheckCircle2 size={18} className="ml-auto" /></div>
                             )}
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
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
        fixed inset-y-0 left-0 z-40 w-[300px] bg-white border-r border-gray-100 flex flex-col py-12 px-10 transition-transform duration-500 lg:static lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0 shadow-3xl' : '-translate-x-full'}
      `}>
        <div className="lg:hidden absolute top-12 right-10">
           <button onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-gray-900 transition-all"><X size={24} /></button>
        </div>
        <SidebarContent />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto bg-[#FDFDFD] flex flex-col p-8 lg:p-14 pt-10 relative z-10 custom-scrollbar">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14 relative">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between w-full lg:w-auto">
             <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-4 bg-white shadow-xl rounded-3xl text-gray-400 hover:text-gray-900 transition-all lg:hidden mr-6"
             >
                <Menu size={24} />
             </button>
             <div>
                <h1 className="text-2xl lg:text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tighter uppercase">
                   Mission Control <span className="text-green-500">.</span>
                </h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">RECO India Administrative Node</p>
             </div>
          </motion.div>
          
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
