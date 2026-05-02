import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Briefcase, 
  ShieldCheck, 
  Building2, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import signupImage from "/images/luxury4.jpg";
const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    agency: "",
    license: "",
    budget: "",
    preferredCategory: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.length < 3) newErrors.fullName = "Full Name required (min 3 chars).";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "10-digit mobile required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid corporate email required.";
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) newErrors.password = "8+ chars, 1 uppercase, 1 number.";
    
    if (role === "broker") {
      if (!formData.agency.trim()) newErrors.agency = "Agency name is mandatory.";
      if (!formData.license.trim()) newErrors.license = "License ID is mandatory.";
    }

    if (role === "customer") {
      if (!formData.budget) newErrors.budget = "Please select an investment budget.";
      if (!formData.preferredCategory) newErrors.preferredCategory = "Please select a category.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await registerUser({ ...formData, role });
        if (response.success) {
          alert(`✅ Registration successful! Welcome to RECO.`);
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          navigate("/");
        }
      } catch (error) {
        alert(`❌ Registration failed: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen flex items-center justify-center p-4 md:p-10">
      <div className="max-w-7xl w-full bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        
        {/* Left Side: Brand Story */}
        <div className="w-full lg:w-5/12 hidden lg:block relative overflow-hidden">
          <img
            src={signupImage}
            alt="Real Estate Success"
            className="h-full w-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-black/40 to-transparent" />
          
          <div className="absolute top-10 left-10">
            <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Platform</span>
            </Link>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-white">
            <div className="flex gap-2 mb-8">
               {[1,2,3].map(i => <div key={i} className={`h-1.5 rounded-full ${i===1 ? 'w-8 bg-green-500' : 'w-2 bg-white/20'}`}></div>)}
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tighter leading-none uppercase">
              The Future of <br /> Real Estate <br /> <span className="text-green-500">Starts Here.</span>
            </h2>
            <div className="space-y-4">
               {[
                 "Verified Listings Only",
                 "Institutional Grade Security",
                 "Exclusive Investment Off-Markets"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-yellow-500" />
                    <span className="text-xs font-bold text-white/90">{text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Side: Onboarding Form */}
        <div className="w-full lg:w-7/12 p-8 md:p-16 flex flex-col bg-white">
          <div className="mb-10 flex justify-between items-start">
            <div>
              <span className="text-green-600 font-black uppercase tracking-widest text-[10px] block mb-2">Onboarding Process</span>
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Create Account<span className="text-green-600">.</span></h1>
            </div>
            <Link to="/login" className="px-5 py-2.5 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Sign In</Link>
          </div>

          {/* Role Selection Cluster */}
          <div className="mb-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">Select your account profile</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`flex flex-col gap-3 p-5 rounded-3xl border-2 transition-all duration-300 text-left ${
                  role === "customer"
                    ? "border-green-600 bg-green-50/50 shadow-lg shadow-green-100"
                    : "border-gray-50 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'customer' ? 'bg-green-600 text-white' : 'bg-white text-gray-400'}`}>
                   <User size={20} />
                </div>
                <div>
                  <p className={`text-sm font-black uppercase tracking-tight ${role === 'customer' ? 'text-gray-900' : 'text-gray-500'}`}>Investor</p>
                  <p className="text-[10px] text-gray-400 font-bold">Discover & Invest</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("client")}
                className={`flex flex-col gap-3 p-5 rounded-3xl border-2 transition-all duration-300 text-left ${
                  role === "client"
                    ? "border-green-600 bg-green-50/50 shadow-lg shadow-green-100"
                    : "border-gray-50 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'client' ? 'bg-green-600 text-white' : 'bg-white text-gray-400'}`}>
                   <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className={`text-sm font-black uppercase tracking-tight ${role === 'client' ? 'text-gray-900' : 'text-gray-500'}`}>Client</p>
                  <p className="text-[10px] text-gray-400 font-bold">Buy or Sell</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("broker")}
                className={`flex flex-col gap-3 p-5 rounded-3xl border-2 transition-all duration-300 text-left ${
                  role === "broker"
                    ? "border-green-600 bg-green-50/50 shadow-lg shadow-green-100"
                    : "border-gray-50 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'broker' ? 'bg-green-600 text-white' : 'bg-white text-gray-400'}`}>
                   <Briefcase size={20} />
                </div>
                <div>
                  <p className={`text-sm font-black uppercase tracking-tight ${role === 'broker' ? 'text-gray-900' : 'text-gray-500'}`}>Broker</p>
                  <p className="text-[10px] text-gray-400 font-bold">Post & Manage</p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Legal Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Tanish Dogra" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                {errors.fullName && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Corporate Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                {errors.email && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mobile Identity</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-gray-400">+91</span>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="00000 00000" 
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Secure Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                {errors.password && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.password}</p>}
              </div>
            </div>

            {role === "broker" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Agency Name</label>
                  <input type="text" name="agency" value={formData.agency} onChange={handleChange} placeholder="Homeland Realty" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  {errors.agency && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.agency}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">RERA License ID</label>
                  <input type="text" name="license" value={formData.license} onChange={handleChange} placeholder="REG-123456" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                  {errors.license && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.license}</p>}
                </div>
              </div>
            )}
            
            {role === "customer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Investment Capacity</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none">
                    <option value="" disabled>Select Budget Range</option>
                    <option value="Under 1Cr">Under ₹1 Crore</option>
                    <option value="1Cr - 5Cr">₹1 Cr - ₹5 Cr</option>
                    <option value="5Cr - 10Cr">₹5 Cr - ₹10 Cr</option>
                    <option value="Above 10Cr">Above ₹10 Cr</option>
                  </select>
                  {errors.budget && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.budget}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Primary Interest</label>
                  <select name="preferredCategory" value={formData.preferredCategory} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none">
                    <option value="" disabled>Select Category</option>
                    <option value="residential">Residential Luxury</option>
                    <option value="commercial">Commercial/Retail</option>
                    <option value="industrial">Industrial/Warehouse</option>
                    <option value="investment">Strategic Land</option>
                  </select>
                  {errors.preferredCategory && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 ml-4">{errors.preferredCategory}</p>}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-600 shadow-xl transition-all active:scale-[0.98] mt-4"
            >
              Confirm & Create Profile
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] font-bold text-gray-400 max-w-sm mx-auto leading-relaxed uppercase tracking-wider">
            By registering, you agree to our <span className="text-gray-900 underline">Terms of Service</span> and <span className="text-gray-900 underline">Institutional Security Policies</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
