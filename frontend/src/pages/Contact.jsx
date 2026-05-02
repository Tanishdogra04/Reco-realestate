import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  Globe
} from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Our advisors will contact you shortly.");
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* HERO SECTION */}
      <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black/20 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Contact Background"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5]"
        />
        <div className="relative z-20 text-center px-4 pt-10">
          <span className="text-yellow-400 font-black tracking-widest uppercase text-[10px] mb-3 block animate-fade-in">Connect with RECO</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
            Get in Touch
          </h1>
          <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full shadow-lg"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: INFO CARDS */}
          <div className="lg:col-span-4 space-y-4">
            {[
              { 
                icon: <Phone className="text-green-600" />, 
                title: "Call Us", 
                value: "+91 8278713791", 
                desc: "Mon-Sat, 9AM to 7PM",
                color: "bg-green-50" 
              },
              { 
                icon: <Mail className="text-blue-600" />, 
                title: "Email Us", 
                value: "advisory@reco.com", 
                desc: "Response within 24 hours",
                color: "bg-blue-50" 
              },
              { 
                icon: <MapPin className="text-orange-600" />, 
                title: "Our Office", 
                value: "Chandigarh, India", 
                desc: "Homeland Business District",
                color: "bg-orange-50" 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.title}</h3>
                  <p className="text-lg font-black text-gray-900 mb-1">{item.value}</p>
                  <p className="text-xs font-bold text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}

            {/* Support Badge */}
            <div className="bg-gray-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck size={120} />
              </div>
              <h4 className="text-xl font-black mb-2 tracking-tight">Expert Advisory</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-bold">
                Our certified investment advisors are ready to help you build your real estate portfolio.
              </p>
              <div className="mt-6 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Advisors Online</span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 h-full">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Send us a Message</h2>
                <p className="text-gray-500 font-bold text-sm">Have a specific inquiry? Fill out the form below.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tanish Dogra"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="name@email.com"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 00000 00000"
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Inquiry Type</label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none">
                      <option>Property Investment</option>
                      <option>Selling my Property</option>
                      <option>Commercial Leasing</option>
                      <option>Legal Advisory</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">How can we help?</label>
                  <textarea 
                    rows="5"
                    placeholder="Tell us about your requirements..."
                    required
                    className="w-full bg-gray-50 border-none rounded-3xl p-6 text-sm font-bold focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full md:w-auto px-10 py-5 bg-green-600 text-white rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* TRUST INDICATORS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-100">
           {[
             { icon: <Clock />, label: "24/7 Priority Support" },
             { icon: <Globe />, label: "Pan-India Coverage" },
             { icon: <ShieldCheck />, label: "Verified Advisors" },
             { icon: <MessageSquare />, label: "Personalized Consulting" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-gray-300 transition-colors hover:text-green-600">{item.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
