import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/api";
import loginImage from "/images/luxury_card3.jpeg"; 
import { ShieldCheck } from "lucide-react";

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
        
        // Redirect based on role
        if (response.user.role === "admin") {
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

          {/* Google & Apple Sign In */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="flex-1 border rounded-full py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex-1 border rounded-full py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium cursor-pointer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.08.2.12.3.12.9 0 2.02-.56 2.52-1.45z"/>
              </svg>
              Apple
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
