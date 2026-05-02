import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../api/api";
import { ArrowLeft, Mail, ShieldCheck, Lock, ChevronRight } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword({ email });
      if (response.success) {
        setStep(2);
      }
    } catch (error) {
      alert(`❌ Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit code");
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({ email, otp, password: newPassword });
      if (response.success) {
        alert("✅ Password reset successfully! Please login with your new password.");
        navigate("/login");
      }
    } catch (error) {
      alert(`❌ Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-orange-50 min-h-screen py-20 px-6 font-inter flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {/* Header Design */}
        <div className="bg-gray-900 p-8 text-white relative">
          <Link to="/login" className="absolute left-6 top-6 text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div className="mt-4">
             <h2 className="text-2xl font-black uppercase tracking-tighter italic">RECO.<span className="text-green-500">SECURE</span></h2>
             <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Identity Recovery Protocol</p>
          </div>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lost your access?</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Enter your verified corporate email below. We'll issue a temporary security token to authorize your identity.
              </p>

              <form onSubmit={handleSendCode} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter verified email"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-green-500/20 outline-none transition-all font-medium text-gray-800"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-green-600 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Issue Security Token"}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Authorize Recovery</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                A 6-digit recovery token has been sent to your inbox. Complete the authorization below to establish new credentials.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="6-digit token"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all font-black tracking-[0.3em] text-center text-gray-800 text-xl"
                    required
                  />
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Secure Password"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 focus:ring-4 focus:ring-green-500/20 outline-none transition-all font-medium text-gray-800"
                    required
                    minLength="6"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? "Rebuilding Identity..." : "Finalize Recovery"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
