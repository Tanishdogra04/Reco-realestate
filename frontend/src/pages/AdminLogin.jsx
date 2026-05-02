import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { ShieldCheck, Lock, Mail, ChevronRight, Globe } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      if (response.success && response.user.role === "admin") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/admin");
      } else {
        alert("❌ Access Denied: Administrator privileges required.");
      }
    } catch (error) {
      alert(`❌ Login failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6 font-inter">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {/* Admin Branding */}
        <div className="bg-gray-800 p-10 text-white text-center border-b-4 border-green-500">
           <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6 border border-green-500/20">
              <ShieldCheck size={32} />
           </div>
           <h2 className="text-2xl font-black uppercase tracking-tighter italic">RECO.<span className="text-green-500">ADMIN</span></h2>
           <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">Secure Management Terminal</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Admin Identifier</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@recoindia.com"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-green-500/20 outline-none transition-all font-medium text-gray-800"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Security Credential</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-green-500/20 outline-none transition-all font-medium text-gray-800"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-green-600 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Authorize Access"}
              <ChevronRight size={14} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
              <Globe size={14} /> Back to Platform
            </button>
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">v2.0.5 Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
