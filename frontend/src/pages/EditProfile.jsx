import React, { useState } from "react";
import { User, Mail, Phone, ShieldCheck, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("✅ Identity Updated Successfully! Your institutional profile has been synchronized.");
    navigate("/dashboard");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-green-600 mb-8 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
        </Link>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4">
               <ShieldCheck size={300} />
            </div>
            <div className="relative z-10 flex items-center gap-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-4xl font-black border border-white/30 shadow-2xl">
                {formData.fullName?.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-2 block">Account Identity</span>
                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">{formData.fullName}</h1>
                <p className="text-white/60 font-bold mt-2 capitalize">{formData.role} Account</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-gray-100 border-none rounded-2xl p-4 pl-12 text-sm font-bold text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Identity</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Account Type</label>
                <div className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-green-600 uppercase tracking-widest">
                  {formData.role}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50">
               <button className="w-full md:w-auto px-10 py-5 bg-gray-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-600 shadow-xl transition-all flex items-center justify-center gap-3">
                  <Save size={18} /> Save Identity Changes
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
