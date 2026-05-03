import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Video, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Users, 
  CheckCircle2, 
  Star, 
  Play, 
  Search, 
  Filter,
  Share2,
  Bell
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Premium Data Structure
const upcomingEvents = [
  {
    id: 1,
    title: "North India Property Expo 2026",
    date: "May 25 - 28, 2026",
    time: "10:00 AM - 7:00 PM",
    location: "Pragati Maidan, New Delhi",
    type: "Expo",
    category: "Physical",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    attendees: "12,000+ Pre-registered",
    featured: true,
    description: "The grandest real estate spectacle in North India returns. Connect with 150+ premium developers and unlock exclusive pre-launch offers."
  },
  {
    id: 2,
    title: "Global Investment Summit 2026",
    date: "June 15, 2026",
    time: "3:30 PM - 6:00 PM",
    location: "Online (Global Stream)",
    type: "Webinar",
    category: "Virtual",
    img: "https://images.unsplash.com/photo-1611348586840-fa91ec1b5f7e?q=80&w=2070&auto=format&fit=crop",
    attendees: "2,500+ Registered",
    featured: false,
    description: "A high-level briefing on global real estate trends and the Indian market's ROI potential in the post-RERA 2.0 era."
  },
  {
    id: 3,
    title: "South Delhi Luxury Residency Tour",
    date: "July 02, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Vasant Vihar & GK, Delhi",
    type: "Site Visit",
    category: "Physical",
    img: "https://images.unsplash.com/photo-1628611225249-6c478a8ee461?q=80&w=2070&auto=format&fit=crop",
    attendees: "15 Spots Left",
    featured: false,
    description: "Step inside the most exclusive pin codes of Delhi. A private tour of ready-to-move-in luxury floors and independent villas."
  },
  {
    id: 4,
    title: "RECO Tech-Prop Annual Gala",
    date: "January 15, 2027",
    time: "7:00 PM - 11:00 PM",
    location: "The Oberoi, Gurgaon",
    type: "Exclusive Launch",
    category: "Physical",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    attendees: "Exclusive Waitlist",
    featured: false,
    description: "Celebrate the future of Prop-Tech. Our annual networking gala bringing together visionaries, developers, and RECO's top-tier investors."
  }
];

const categories = [
  {
    title: "Educational Workshops",
    desc: "Master the art of real estate with RERA, Tax, and Legal experts.",
    icon: <Users className="text-blue-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Networking Dinners",
    desc: "Build connections that count with elite investors and developers.",
    icon: <Star className="text-orange-500" />,
    color: "bg-orange-50"
  },
  {
    title: "Virtual Property Tours",
    desc: "Immersive 3D experiences from the comfort of your home.",
    icon: <Video className="text-purple-600" />,
    color: "bg-purple-50"
  }
];

const pastHighlights = [
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop"
];

const EventsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesFilter = filter === "All" || event.type === filter || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredEvent = upcomingEvents.find(e => e.featured);

  const handleRegister = (eventId) => {
    navigate(`/contact?event=${eventId}`);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    alert(`Welcome to the RECO inner circle! Updates will be sent to ${email}.`);
    e.target.reset();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans overflow-x-hidden">
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-4 md:p-10"
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
              >
                <ArrowRight className="rotate-45" size={20} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/6iW_i0-T5u4?autoplay=1" 
                title="RECO 2025 Recap" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Hero Section */}
      <section className="relative h-[85vh] sm:h-[80vh] md:h-[85vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1501281668745-f74eccf877e2?q=80&w=2070&auto=format&fit=crop"
            alt="Events Background"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-4 sm:mb-6"
            >
              <span className="w-8 sm:w-12 h-[1px] bg-green-500"></span>
              <span className="text-green-500 font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs">Premium Experiences</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] sm:leading-[0.9] tracking-tighter">
              BEYOND THE <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">TRANSACTION</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl font-light">
              RECO events aren't just gatherings; they are curated gateways to wealth, wisdom, and the most elite community in Indian real estate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={() => document.getElementById('calendar').scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold overflow-hidden transition-all text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">Explore Calendar <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button 
                onClick={() => setShowVideo(true)}
                className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Watch 2025 Recap <Play size={20} className="fill-white" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
        </motion.div>
      </section>

      {/* Trust & Stats Bar */}
      <div className="container mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 relative z-30">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 md:p-14 border border-white/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { icon: <Users className="text-green-600" />, val: "50K+", label: "Investors Joined", desc: "India's largest prop-tech community" },
              { icon: <Calendar className="text-blue-600" />, val: "120+", label: "Annual Events", desc: "Curated monthly experiences" },
              { icon: <Star className="text-orange-600" />, val: "4.9/5", label: "User Satisfaction", desc: "Unmatched event quality" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-row md:flex-col items-center text-left md:text-left gap-4 group">
                <div className="bg-gray-50 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors duration-500 shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-2xl sm:text-4xl font-black text-gray-900 leading-none mb-1 sm:mb-2">{stat.val}</h4>
                  <p className="text-[10px] sm:text-sm font-bold text-gray-800 mb-0.5 sm:mb-1">{stat.label}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Event Highlight */}
      {featuredEvent && (
        <section className="py-12 sm:py-24 container mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden bg-black min-h-[500px] sm:h-[600px] flex items-center group flex-col sm:flex-row">
            <img 
              src={featuredEvent.img} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 sm:opacity-60 group-hover:scale-105 transition-transform duration-1000" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black sm:bg-gradient-to-r sm:from-black sm:via-black/40 sm:to-transparent"></div>
            
            <div className="relative z-10 p-8 sm:p-12 md:p-20 max-w-2xl text-white mt-auto sm:mt-0">
              <span className="inline-flex items-center gap-2 bg-green-500 text-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase mb-4 sm:mb-8">
                <Star size={12} fill="currentColor" /> Highlight of the Month
              </span>
              <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 leading-tight">{featuredEvent.title}</h2>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-10 leading-relaxed font-light">
                {featuredEvent.description}
              </p>
              
              <div className="flex flex-wrap gap-4 sm:gap-8 mb-8 sm:mb-12">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="text-green-500" size={18} />
                  <div>
                    <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Date</p>
                    <p className="text-xs sm:text-sm font-bold">{featuredEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="text-green-500" size={18} />
                  <div>
                    <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-widest">Location</p>
                    <p className="text-xs sm:text-sm font-bold">{featuredEvent.location}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(featuredEvent.id)}
                className="w-full sm:w-auto bg-green-500 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20 text-sm sm:text-base"
              >
                Secure Your VIP Pass <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Header */}
      <section id="calendar" className="py-12 sm:py-16 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2 sm:mb-4 tracking-tighter">Event Calendar</h2>
            <p className="text-gray-500 font-medium text-sm sm:text-base">Filter by category to find your perfect opportunity.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full bg-white border-none rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-green-500 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex bg-white p-1 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {["All", "Expo", "Webinar", "Site Visit"].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setFilter(btn)}
                  className={`flex-1 sm:flex-none whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold transition-all ${
                    filter === btn ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -15 }}
                className="bg-white rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] group border border-gray-50 flex flex-col h-full"
              >
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-1 sm:gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {event.type}
                    </span>
                    <span className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm ${
                      event.category === 'Virtual' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {event.category}
                    </span>
                  </div>

                  <button className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl text-gray-900 hover:bg-green-500 hover:text-white">
                    <Share2 size={16} />
                  </button>
                </div>

                <div className="p-6 sm:p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] sm:text-xs mb-3 sm:mb-4">
                    <Calendar size={14} />
                    <span className="uppercase tracking-widest">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 leading-[1.2] group-hover:text-green-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 line-clamp-2 leading-relaxed font-medium">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600 text-[10px] sm:text-xs font-bold">
                      <Clock size={16} className="text-gray-300" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-[10px] sm:text-xs font-bold">
                      <MapPin size={16} className="text-gray-300" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-green-600 text-[10px] sm:text-xs font-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span>{event.attendees}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    <button 
                      onClick={() => handleRegister(event.id)}
                      className="flex-1 bg-black text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm hover:bg-green-600 transition-all shadow-lg active:scale-95"
                    >
                      Register Now
                    </button>
                    <button className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-all group/btn">
                      <Bell size={18} className="group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Categories & Experience types */}
      <section className="py-20 sm:py-32 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 sm:mb-20 gap-6 sm:gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <span className="text-green-600 font-black tracking-widest text-[10px] sm:text-xs uppercase mb-3 sm:mb-4 block">Discovery</span>
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tighter">Event Ecosystem</h2>
              <p className="text-gray-500 mt-4 sm:mt-6 text-base sm:text-lg font-medium">More than just properties, we build legacies through education and networking.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className={`${cat.color} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10`}>
                  {React.cloneElement(cat.icon, { className: "w-8 h-8 sm:w-10 sm:h-10" })}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">{cat.title}</h3>
                <p className="text-gray-500 leading-relaxed text-xs sm:text-sm font-medium">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Glassmorphism Final CTA */}
      <section className="py-20 sm:py-32 container mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden bg-black py-16 sm:py-24 px-6 sm:px-10 md:px-20 text-center">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-green-500/20 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[100px] sm:blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-tight">
                NEVER MISS A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">BEAT</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-xl mb-10 sm:mb-14 leading-relaxed font-light">
                Subscribe to our elite mailing list. Get early access to property expos, private webinar links, and quarterly market insights.
              </p>
              
              <form onSubmit={handleNewsletter} className="flex flex-col md:flex-row gap-4 sm:gap-5 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your private email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-sm sm:text-base"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-green-500 text-black px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black hover:bg-white transition-all shadow-2xl shadow-green-500/20 active:scale-95 text-sm sm:text-base"
                >
                  Join Inner Circle
                </button>
              </form>
              
              <p className="mt-8 sm:mt-10 text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                Join 50,000+ Investors Already Subscribed
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="pb-10 sm:pb-20 text-center">
        <p className="text-gray-400 text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4">
          RECO Experiences &copy; 2026 • High Yield Events
        </p>
      </div>
    </div>
  );
};

export default EventsPage;
