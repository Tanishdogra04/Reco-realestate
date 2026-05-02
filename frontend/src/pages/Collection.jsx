import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiChevronDown } from "react-icons/fi";
import { MapPin, BedDouble, Ruler, ArrowRight, Heart, Share2, LayoutGrid } from "lucide-react";
import { apartmentListings } from "../data/properties";

export default function Collection() {
  const { type } = useParams();

  const formatTitle = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = formatTitle(type || "Collection");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("savedProperties")) || [];
  });
  
  const [visible, setVisible] = useState(6);
  const [filters, setFilters] = useState({
    locality: "",
    bhk: "Any",
    priceMax: 150000000,
  });

  const handleFavorite = (e, id) => {
    e.preventDefault();
    const updated = favorites.includes(id) 
      ? favorites.filter((fid) => fid !== id) 
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  // Intelligent Filtering based on Collection Type
  const getCollectionProperties = () => {
    let base = apartmentListings;
    
    switch(type) {
      case "budget-friendly":
        base = base.filter(p => p.price <= 20000000); // Under 2 Cr
        break;
      case "luxury-homes":
        base = base.filter(p => p.price >= 50000000); // Above 5 Cr
        break;
      case "new-projects":
        base = base.filter(p => p.status === "New Launch" || p.status === "Upcoming");
        break;
      case "ready-to-move":
        base = base.filter(p => p.status === "Ready to Move");
        break;
      case "commercial":
        base = base.filter(p => p.category === "commercial");
        break;
      case "industrial":
        base = base.filter(p => p.category === "industrial");
        break;
      default:
        // Generic filtering if needed
        break;
    }

    return base.filter(p => {
       const matchesLocality = !filters.locality || p.location.toLowerCase().includes(filters.locality.toLowerCase());
       const matchesBHK = filters.bhk === "Any" || Number(p.bhk) === Number(filters.bhk);
       const matchesPrice = p.price <= filters.priceMax;
       return matchesLocality && matchesBHK && matchesPrice;
    });
  };

  const filteredProperties = getCollectionProperties();

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* High-Impact Hero */}
      <div className="relative w-full h-[45vh] flex items-center justify-center overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt={title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-4 pt-12">
          <span className="text-yellow-400 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Curated Portfolios</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            {title}<span className="text-green-600">.</span>
          </h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 pb-24">
        {/* Sidebar Filters - Left Aligned Optimized */}
        <aside className="hidden lg:block col-span-3 ml-[-12px]">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 sticky top-28 space-y-8 h-fit">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] border-b pb-4">Filter Asset Class</h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Location</label>
                <div className="relative">
                  <select
                    value={filters.locality}
                    onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs font-bold appearance-none outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Regions</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Valuation Range</label>
                <input
                  type="range"
                  min="0"
                  max="150000000"
                  step="1000000"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                  className="w-full accent-green-600 mb-2"
                />
                <div className="flex justify-between text-[10px] font-black text-gray-900">
                  <span>₹0</span>
                  <span>₹{(filters.priceMax / 10000000).toFixed(1)} Cr</span>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Configuration</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Any", "2", "3", "4"].map(b => (
                    <button
                      key={b}
                      onClick={() => setFilters({ ...filters, bhk: b })}
                      className={`py-3 rounded-xl text-[10px] font-black border transition-all ${
                        filters.bhk === b 
                          ? "bg-gray-900 text-white border-gray-900" 
                          : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                      }`}
                    >
                      {b === "Any" ? "ANY BHK" : `${b} BHK`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Section */}
        <div className="col-span-12 lg:col-span-9">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Found <span className="text-gray-900">{filteredProperties.length} Assets</span> in {title}
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.slice(0, visible).map((item) => (
                <Link
                  key={item.id}
                  to={`/property/${item.id}`}
                  className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  {/* High-Density Card Structure */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-xl text-gray-900 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {item.status}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => handleFavorite(e, item.id)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg transition-all"
                    >
                      <Heart size={18} className={favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"} />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex justify-between items-center text-white">
                      <span className="text-sm font-black tracking-tight">₹{(item.price / 10000000).toFixed(2)} Cr</span>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Investment Hub</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <MapPin size={10} strokeWidth={3} /> {item.location}
                      </p>
                      <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-green-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">BY {item.developer || "Premium Builder"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 border border-gray-100">
                        <BedDouble size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-900 uppercase">{item.bhk || "N/A"} BHK</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2 border border-gray-100">
                        <Ruler size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-900 uppercase">{item.area} SQFT</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[9px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Asset Profile <ArrowRight size={14} className="text-green-600" />
                      </span>
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                        <Share2 size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] py-32 text-center border border-dashed border-gray-200">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <LayoutGrid className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">No Matching Assets</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest max-w-sm mx-auto">
                We couldn't find any listings for this collection in your current filter range.
              </p>
            </div>
          )}

          {visible < filteredProperties.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisible(prev => prev + 4)}
                className="inline-flex items-center gap-4 px-12 py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-green-600 transition-all shadow-xl"
              >
                Expand Collection <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
