import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Phone, MapPin, Building, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import room from "/images/inner-room.jpg";
import { createEnquiry } from "../api/api";

const GetInTouch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: "",
    propertyType: "",
    budget: "",
    message: ""
  });

  const inputWrapperClass = "relative flex items-center";
  const inputClass =
    "w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all duration-300";
  const iconClass = "absolute left-4 text-gray-400 w-5 h-5 pointer-events-none";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { 
        state: { 
          from: location, 
          message: "Please login to request a consultation with our real estate experts." 
        } 
      });
      return;
    }

    setLoading(true);
    try {
      // Map fullName to name for the backend model
      const submissionData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        propertyType: formData.propertyType,
        budget: formData.budget,
        message: formData.message,
        user: user?._id
      };

      await createEnquiry(submissionData);
      
      setShowSuccess(true);
      
      // Reset form fields
      setFormData({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        city: "",
        propertyType: "",
        budget: "",
        message: ""
      });
    } catch (error) {
      alert("❌ Failed to send message. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-orange-50 py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Our real estate experts are here to guide you through every step of the
            way. Fill out the form and we'll connect with you shortly.
          </p>
          <div className="border-b-2 border-yellow-400 w-16 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
              <p className="text-gray-500 mt-2 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={inputWrapperClass}>
                  <User className={iconClass} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className={inputClass} 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required 
                  />
                </div>
                <div className={inputWrapperClass}>
                  <Mail className={iconClass} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className={inputClass} 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={inputWrapperClass}>
                  <Phone className={iconClass} />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className={inputClass} 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>
                <div className={inputWrapperClass}>
                  <MapPin className={iconClass} />
                  <input 
                    type="text" 
                    placeholder="City of Interest" 
                    className={inputClass} 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={inputWrapperClass}>
                  <Building className={iconClass} />
                  <select 
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                    className={inputClass + " appearance-none"}
                  >
                    <option value="" disabled>Property Type</option>
                    <option>Luxury Apartment</option>
                    <option>Independent Villa</option>
                    <option>Commercial Space</option>
                    <option>Investment Plot</option>
                  </select>
                </div>
                <div className={inputWrapperClass}>
                  <span className="absolute left-4 text-gray-400 font-medium pointer-events-none">₹</span>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className={inputClass + " appearance-none"}
                  >
                    <option value="" disabled>Investment Budget</option>
                    <option>Under ₹1 Crore</option>
                    <option>₹1 Cr - ₹5 Cr</option>
                    <option>Above ₹5 Cr</option>
                  </select>
                </div>
              </div>

              <div className={inputWrapperClass + " items-start"}>
                <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5 pointer-events-none" />
                <textarea
                  rows="4"
                  placeholder="Tell us about your specific requirements..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-4 rounded-xl shadow-md hover:bg-green-700 transition-all duration-300 group disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Request Consultation</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Contact Info & Image */}
          <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-full">
            {/* Full Brightness Image */}
            <img src={room} alt="Luxury Interior" className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Elegant Gradient to ensure text readability if needed, but we use a card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            {/* Floating Glassmorphism Contact Card */}
            <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/50">
              <h3 className="text-xl font-bold mb-5 text-gray-900">Reach Us Directly</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2.5 rounded-xl text-green-600 shadow-sm border border-green-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Corporate Office</h4>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">DLF Cyber City, Phase 2<br/>Gurugram, Haryana 122002</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-2.5 rounded-xl text-green-600 shadow-sm border border-green-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Direct Line</h4>
                    <p className="text-sm text-gray-800 font-medium">+91 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-green-50 p-2.5 rounded-xl text-green-600 shadow-sm border border-green-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Desk</h4>
                    <p className="text-sm text-gray-800 font-medium">advisory@recoindia.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-gray-100 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2 uppercase">Request Received</h3>
              <p className="text-gray-500 font-bold text-sm leading-relaxed mb-8">
                Thank you for reaching out! Our real estate advisors will contact you soon to guide you through your requirements.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gray-900 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GetInTouch;
