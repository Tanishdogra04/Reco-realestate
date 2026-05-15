import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, MapPin, Users, CheckCircle2, TrendingUp, Globe, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const projects = [
  {
    title: "Urban Heights 2.0",
    location: "Gurugram, Sector 65",
    status: "Ongoing",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    type: "Residential"
  },
  {
    title: "The Reco Plaza",
    location: "Mumbai, BKC",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    type: "Commercial"
  },
  {
    title: "Skyline Residency",
    location: "Bangalore, Indiranagar",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
    type: "Luxury"
  }
];

export default function DeveloperPortfolio() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="px-4 py-2 bg-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Master Developer</div>
               <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Est. 1998</div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Legacy of <span className="text-green-600">Excellence.</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium max-w-2xl leading-relaxed">
              RECO Infrastructure is India's premier real estate developer, transforming skylines with sustainable, high-yield assets and institutional-grade residential hubs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-20 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
             <StatItem icon={<Building2 size={24}/>} value="42M+" label="Sq.Ft Delivered" />
             <StatItem icon={<Users size={24}/>} value="15k+" label="Happy Families" />
             <StatItem icon={<Globe size={24}/>} value="12" label="Cities Present" />
             <StatItem icon={<Award size={24}/>} value="85" label="Industry Awards" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
             <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Iconic Projects</h2>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Crafting the future of urban living</p>
             </div>
             <div className="flex gap-4">
                <button className="px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-green-600 transition-all">All Projects</button>
                <button className="px-8 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-green-100">Ongoing (12)</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {projects.map((project, idx) => (
               <ProjectCard key={idx} {...project} />
             ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & VISION */}
      <section className="py-32">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative">
                  <div className="aspect-[4/5] rounded-[64px] overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Developer HQ" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-600 rounded-[48px] p-10 text-white flex flex-col justify-end shadow-2xl">
                     <TrendingUp size={40} className="mb-4" />
                     <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Consistent 22% annual appreciation across portfolio</p>
                  </div>
               </div>
               <div>
                  <h3 className="text-xs font-black text-green-600 uppercase tracking-[0.3em] mb-6">Our Philosophy</h3>
                  <h2 className="text-5xl font-black uppercase tracking-tighter leading-[1] mb-10">Engineering <br/> Sustainable <br/> Returns.</h2>
                  <div className="space-y-8">
                     <FeatureItem icon={<Shield size={20}/>} title="Debt Free" desc="Zero debt developer ensuring project completion regardless of market cycles." />
                     <FeatureItem icon={<CheckCircle2 size={20}/>} title="RERA Certified" desc="100% compliance across all states of operation for buyer peace of mind." />
                  </div>
                  <button className="mt-12 px-12 py-5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-2xl">Download Corporate Profile</button>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

const StatItem = ({ icon, value, label }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-gray-50 rounded-[24px] flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
       {icon}
    </div>
    <h4 className="text-4xl font-black tracking-tighter text-gray-900 mb-2">{value}</h4>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

const ProjectCard = ({ title, location, status, image, type }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group cursor-pointer"
  >
    <div className="aspect-[4/3] rounded-[48px] overflow-hidden mb-6 shadow-xl">
       <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={title} />
    </div>
    <div className="flex items-center justify-between mb-2">
       <span className="text-[9px] font-black uppercase tracking-widest text-green-600">{type}</span>
       <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{status}</span>
    </div>
    <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-2 group-hover:text-green-600 transition-all">{title}</h3>
    <div className="flex items-center gap-2 text-gray-400">
       <MapPin size={12} />
       <span className="text-[10px] font-bold uppercase tracking-widest">{location}</span>
    </div>
  </motion.div>
);

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex gap-6">
     <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
        {icon}
     </div>
     <div>
        <h4 className="text-sm font-black uppercase tracking-tight text-gray-900 mb-1">{title}</h4>
        <p className="text-xs font-medium text-gray-400 leading-relaxed">{desc}</p>
     </div>
  </div>
);
