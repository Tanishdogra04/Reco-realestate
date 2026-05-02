import { Link } from "react-router-dom";
import { MapPin, BedDouble, Ruler, ArrowRight, Heart, Share2 } from "lucide-react";
import { apartmentListings } from "../data/properties";
import { useState } from "react";

const ResidentialListingsPreview = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("savedProperties")) || [];
  });

  const handleFavorite = (e, id) => {
    e.preventDefault();
    const updated = favorites.includes(id) 
      ? favorites.filter((fid) => fid !== id) 
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  const residentialProperties = apartmentListings.filter(p => p.category === "residential");

  return (
    <section className="py-16 px-6 bg-[#fcfcfc]">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center md:text-left">
        <span className="text-green-600 font-black uppercase tracking-[0.2em] text-[10px] block mb-3">Premium Portfolios</span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none">
          Residential <span className="text-green-600">Assets.</span>
        </h2>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-wide mt-4">
          High-yield institutional properties across prime hubs
        </p>
      </div>

      {/* Grid Optimized for no extra space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {residentialProperties.map((item) => (
          <Link
            key={item.id}
            to={`/property/${item.id}`}
            className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur-xl text-gray-900 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                   {item.status}
                </span>
                <span className="bg-green-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                   RERA: {item.rera?.split('-')[0] || "Approved"}
                </span>
              </div>

              <button 
                onClick={(e) => handleFavorite(e, item.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg transition-all"
              >
                <Heart size={18} className={favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center">
                 <span className="text-white text-sm font-black tracking-tight">₹{(item.price / 10000000).toFixed(2)} Cr</span>
                 <span className="text-white/60 text-[9px] font-black uppercase tracking-widest">Base Value</span>
              </div>
            </div>

            {/* Content Optimized for Compactness */}
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <MapPin size={10} strokeWidth={3} /> {item.location.split(',')[1] || item.location}
                </p>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-green-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">BY {item.developer || "Premium Builder"}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                 <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2 border border-gray-100">
                    <BedDouble size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-900 uppercase">{item.bhk} BHK</span>
                 </div>
                 <div className="bg-gray-50 p-2.5 rounded-xl flex items-center gap-2 border border-gray-100">
                    <Ruler size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-900 uppercase">{item.area} SQFT</span>
                 </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[9px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  View Asset <ArrowRight size={14} className="text-green-600" />
                </span>
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                  <Share2 size={12} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Optimized View All */}
      <div className="mt-16 text-center">
        <Link
          to="/listings"
          className="inline-flex items-center gap-4 px-10 py-4 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-green-600 transition-all shadow-xl"
        >
          Explore All Residential Assets <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ResidentialListingsPreview;
