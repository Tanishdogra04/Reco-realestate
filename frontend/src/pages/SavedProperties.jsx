import React, { useState, useEffect } from "react";
import { Heart, MapPin, ArrowRight, Home, Building2, Ruler, BedDouble, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { apartmentListings } from "../data/properties";

const SavedProperties = () => {
  const [savedAssets, setSavedAssets] = useState([]);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("savedProperties")) || [];
    
    // BULLETPROOF FILTERING: Ensure data type consistency
    const filtered = apartmentListings.filter(p => 
      savedIds.some(sid => Number(sid) === Number(p.id))
    );
    
    setSavedAssets(filtered);
  }, []);

  const handleRemove = (id) => {
    const savedIds = JSON.parse(localStorage.getItem("savedProperties")) || [];
    const updated = savedIds.filter(sid => Number(sid) !== Number(id));
    localStorage.setItem("savedProperties", JSON.stringify(updated));
    
    // Update local state for immediate feedback
    setSavedAssets(prev => prev.filter(p => Number(p.id) !== Number(id)));
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= HEADER ================= */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <span className="text-green-600 font-black uppercase tracking-[0.2em] text-[10px] block mb-3">Investment Ecosystem</span>
              <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">Your Saved <span className="text-green-600">Assets.</span></h1>
           </div>
           <div className="bg-white px-6 py-4 rounded-[24px] border border-gray-100 shadow-sm flex items-center gap-4 h-fit">
              <div className="text-right">
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Total Inventory</p>
                 <p className="text-xl font-black text-gray-900">{savedAssets.length.toString().padStart(2, '0')}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                 <Building2 size={20} />
              </div>
           </div>
        </div>

        {/* ================= CONTENT ================= */}
        {savedAssets.length === 0 ? (
          <div className="bg-white rounded-[56px] p-24 text-center border border-dashed border-gray-200 animate-fade-in shadow-sm">
            <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner group transition-all">
               <Heart size={44} fill="none" className="group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight uppercase">Portfolio is empty</h2>
            <p className="text-gray-400 font-bold text-sm max-w-lg mx-auto mb-12 leading-relaxed uppercase tracking-wide">
              No assets have been saved yet. Browse our curated collections to find high-yield opportunities matching your profile.
            </p>
            <Link to="/properties" className="inline-flex items-center gap-4 px-12 py-6 bg-gray-900 text-white rounded-[28px] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-600 shadow-2xl transition-all hover:-translate-y-1">
               <Home size={18} /> Explore Market Listings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
            {savedAssets.map((p) => (
              <div key={p.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
                
                {/* IMAGE AREA */}
                <div className="relative h-64 overflow-hidden">
                   <img 
                     src={p.image} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     alt={p.title} 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   
                   <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-xl rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-green-700 shadow-lg">
                      {p.status}
                   </div>

                   <button 
                     onClick={() => handleRemove(p.id)}
                     className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-lg"
                     title="Remove from Portfolio"
                   >
                      <Trash2 size={18} />
                   </button>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 pr-4">
                         <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                            <MapPin size={10} strokeWidth={3} /> {p.location.split(',')[0]}
                         </p>
                         <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-green-600 transition-colors">{p.title}</h3>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-gray-900 tracking-tighter">₹{(p.price/10000000).toFixed(2)} Cr</p>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Base Value</p>
                      </div>
                   </div>

                   {/* SPECS GRID */}
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                         <Ruler size={16} className="text-gray-400" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Space</p>
                            <p className="text-xs font-black text-gray-900">{p.area || p.plotSize} {p.area ? 'SQFT' : ''}</p>
                         </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                         <BedDouble size={16} className="text-gray-400" />
                         <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</p>
                            <p className="text-xs font-black text-gray-900 uppercase">{p.bhk ? `${p.bhk} BHK` : p.category}</p>
                         </div>
                      </div>
                   </div>

                   <Link 
                     to={`/property/${p.id}`} 
                     className="flex items-center justify-center gap-3 w-full py-5 bg-gray-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-600 transition-all shadow-lg"
                   >
                      View Full Analysis <ArrowRight size={14} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
