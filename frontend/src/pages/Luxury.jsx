import { useState } from "react";
import { FiMapPin, FiChevronDown, FiPhone } from "react-icons/fi";
import luxuryHero from "/images/luxury_card3.jpeg";
import { apartmentListings } from "../data/properties";
import CardProperty from "../components/Cardproperty";

export default function Luxury() {
  // Filter for properties representing luxury assets (values >= 4 Cr)
  const allProperties = apartmentListings.filter(p => p.price >= 40000000);

  const [visible, setVisible] = useState(3);
  const [conciergePhone, setConciergePhone] = useState("");
  const [submittingConcierge, setSubmittingConcierge] = useState(false);
  const [filters, setFilters] = useState({
    locality: "",
    bedrooms: "",
    type: "",
    possession: "",
    price: [4, 15], // 4 Cr to 15 Cr for luxury
    areaMin: "",
    areaMax: "",
  });

  const handleViewMore = () => {
    setVisible((prev) => prev + 3);
  };

  const filteredProperties = allProperties.filter((p) => {
    const matchesLocality = !filters.locality || p.location.toLowerCase().includes(filters.locality.toLowerCase());
    const matchesBHK = !filters.bedrooms || Number(p.bhk) === Number(filters.bedrooms);
    const matchesStatus = !filters.possession || p.status === filters.possession;
    
    // Price checks (value in Cr)
    const matchesPrice = p.price <= filters.price[1] * 10000000 && p.price >= filters.price[0] * 10000000;
    
    const matchesArea = (!filters.areaMin || Number(p.area) >= Number(filters.areaMin)) && 
                        (!filters.areaMax || Number(p.area) <= Number(filters.areaMax));

    return matchesLocality && matchesBHK && matchesStatus && matchesPrice && matchesArea;
  });

  const handleConciergeSubmit = (e) => {
    e.preventDefault();
    if (!conciergePhone) return;
    setSubmittingConcierge(true);
    setTimeout(() => {
      alert("VIP Concierge Request Registered! An executive will reach out to you within 15 minutes.");
      setConciergePhone("");
      setSubmittingConcierge(false);
    }, 1200);
  };

  return (
    <div className="mt-5 pb-20 bg-[#faf9f6]">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-16">
        <img
          src={luxuryHero}
          alt="Luxury Portfolios"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 rounded-xl">
          <span className="bg-yellow-500/90 text-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded mb-3 shadow-sm">
            Elite Portfolios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg text-white uppercase tracking-tight">
            Luxury Estates<span className="text-yellow-500">.</span>
          </h2>
        </div>
      </div>

      {/* Layout: Sidebar Filters + Listings */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="bg-white border border-gray-100 rounded-3xl p-6 mb-6 lg:mb-0 lg:sticky lg:top-28 h-fit space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-50">
            <h3 className="font-bold text-gray-950 tracking-wide text-sm">Filters</h3>
            <button 
              onClick={() => setFilters({
                locality: "",
                bedrooms: "",
                type: "",
                possession: "",
                price: [4, 15],
                areaMin: "",
                areaMax: "",
              })}
              className="text-xs text-green-700 font-semibold hover:text-green-805 hover:underline"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-4">
            {/* Locality */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Locality</label>
              <div className="relative">
                <select
                  value={filters.locality}
                  onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
                  className="w-full border border-gray-100 rounded-xl p-2.5 text-xs font-semibold appearance-none bg-white focus:ring-1 focus:ring-green-500 outline-none text-gray-700"
                >
                  <option value="">Select Locality</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Bedrooms</label>
              <div className="relative">
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full border border-gray-100 rounded-xl p-2.5 text-xs font-semibold appearance-none bg-white focus:ring-1 focus:ring-green-500 outline-none text-gray-700"
                >
                  <option value="">Any BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Possession */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Possession</label>
              <div className="relative">
                <select
                  value={filters.possession}
                  onChange={(e) => setFilters({ ...filters, possession: e.target.value })}
                  className="w-full border border-gray-100 rounded-xl p-2.5 text-xs font-semibold appearance-none bg-white focus:ring-1 focus:ring-green-500 outline-none text-gray-700"
                >
                  <option value="">Any Possession</option>
                  <option value="Ready">Ready to Move</option>
                  <option value="Immediate">Immediate</option>
                  <option value="New Launch">New Launch</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Price Range (Cr)</label>
              <input
                type="range"
                min="4"
                max="15"
                step="1"
                value={filters.price[1]}
                onChange={(e) => setFilters({ ...filters, price: [4, parseInt(e.target.value)] })}
                className="w-full accent-green-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-gray-800 mt-1">
                <span>₹4 Cr</span>
                <span>₹{filters.price[1]} Cr</span>
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Super Area (sq.ft)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.areaMin}
                  onChange={(e) => setFilters({ ...filters, areaMin: e.target.value })}
                  className="w-1/2 border border-gray-100 rounded-xl p-2 text-xs outline-none focus:ring-1 focus:ring-green-500 font-semibold text-gray-700"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.areaMax}
                  onChange={(e) => setFilters({ ...filters, areaMax: e.target.value })}
                  className="w-1/2 border border-gray-100 rounded-xl p-2 text-xs outline-none focus:ring-1 focus:ring-green-500 font-semibold text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* NEW FEATURE: BESPOKE CONCIERGE ASSISTANT */}
          <div className="pt-6 border-t border-gray-100">
            <div className="bg-[#FFE5B4]/15 border border-[#FFE5B4]/50 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-extrabold text-[#D97706] uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md">
                VIP Feature
              </span>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Estates Concierge</h4>
              <p className="text-[10px] text-gray-500 leading-normal font-medium">
                Get custom bespoke investment briefings, off-market opportunities, and private previews.
              </p>
              <form onSubmit={handleConciergeSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Enter Mobile Number"
                    value={conciergePhone}
                    onChange={(e) => setConciergePhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#FFE5B4]/40 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-green-500 outline-none text-gray-800"
                  />
                  <FiPhone className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                </div>
                <button
                  type="submit"
                  disabled={submittingConcierge}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                >
                  {submittingConcierge ? "Requesting..." : "Connect Strategist"}
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Property Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <p className="text-gray-450 text-sm font-semibold mb-4">No luxury projects match the specified filter criteria.</p>
              <button 
                onClick={() => setFilters({
                  locality: "",
                  bedrooms: "",
                  type: "",
                  possession: "",
                  price: [4, 15],
                  areaMin: "",
                  areaMax: "",
                })}
                className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.slice(0, visible).map((p) => (
                  <CardProperty key={p.id} property={p} />
                ))}
              </div>

              {/* View More button */}
              {visible < filteredProperties.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={handleViewMore}
                    className="px-8 py-3 bg-gray-900 hover:bg-green-750 hover:bg-green-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all"
                  >
                    Load More Assets
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
