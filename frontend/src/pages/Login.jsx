import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/api";
import loginImage from "/images/luxury_card3.jpeg"; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const redirectPath = location.state?.from?.pathname || "/";
  const redirectMessage = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        // Redirect to intended destination or home
        if (response.user.email === "superadmin@reco.com") {
          navigate("/admin");
        } else {
          navigate(redirectPath);
        }
      }
    } catch (error) {
      alert(`❌ Login failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-orange-50 py-20 px-6 text-black min-h-screen flex items-center justify-center font-inter">
      <div className="bg-white rounded-3xl shadow-xl max-w-6xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 relative">
        
        {/* Redirect Message Alert */}
        {redirectMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-orange-100 border border-orange-400 text-orange-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-bounce">
            <span className="text-lg">⚠️</span>
            {redirectMessage}
          </div>
        )}
        
        {/* Left Image with Text */}
        <div className="relative hidden md:block">
          <img
            src={loginImage}
            alt="Real Nest"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-xl font-semibold">Manage Properties Efficiently</h2>
            <p className="text-sm max-w-xs mt-2 text-white/80">
              Easily track rent payments, maintenance requests, and tenant
              communications in one place. Say goodbye to the hassle of manual
              management.
            </p>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <div className="text-right mb-4">
            <Link to="/login" className="bg-green-400 text-white px-6 py-2 rounded-full inline-block">
              Login
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Reco
          </h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <span className="absolute right-3 top-2.5 text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded" /> Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="text-green-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center my-4 text-gray-300 font-black uppercase text-[10px] tracking-widest flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" /> Professional Access <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            type="button"
            onClick={() => {
              const demoUser = { fullName: "Test Professional", email: "test@reco.com", role: "broker", phone: "+91 9999999999" };
              localStorage.setItem("token", "demo-token");
              localStorage.setItem("user", JSON.stringify(demoUser));
              navigate("/dashboard");
            }}
            className="w-full mb-6 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3"
          >
            🚀 Instant Demo Access
          </button>

          {/* Google & Apple Sign In */}
          <div className="flex gap-4">
            <button className="flex-1 border rounded-full py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
            <button className="flex-1 border rounded-full py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/apple.svg"
                alt="Apple"
                className="w-5 h-5"
              />
              Sign in with Apple
            </button>
          </div>

          <div className="text-center mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
