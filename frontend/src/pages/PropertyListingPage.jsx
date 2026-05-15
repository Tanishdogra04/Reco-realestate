import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { 
  Search, 
  ChevronDown, 
  X, 
  SlidersHorizontal, 
  Grid, 
  List, 
  LayoutGrid
} from "lucide-react";
import CardProperty from "../components/Cardproperty";
import { getAllApartments, sortByPriceLowToHigh, sortByPriceHighToLow } from "../data/properties";
import { fetchProperties } from "../api/api";

const CATEGORY_BANNERS = {
  residential: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  industrial: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  plots: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
  rentals: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  all: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop"
};

const PropertyListingPage = () => {
  const { category: pathCategory } = useParams();
  const [searchParams] = useSearchParams();
  const initialCategory = pathCategory || searchParams.get("category") || searchParams.get("type") || "all";
  
  // States
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProperties = async () => {
      setLoading(true);
      try {
        const backendProps = await fetchProperties().catch(() => []);
        const staticProps = getAllApartments();
        const normalizedBackend = backendProps.map(p => ({
          ...p,
          id: p._id 
        }));
        setProperties([...normalizedBackend, ...staticProps]);
      } catch (err) {
        console.error("Failed to load properties:", err);
        setProperties(getAllApartments());
      } finally {
        setLoading(false);
      }
    };
    loadAllProperties();
  }, []);
  
  // Filter States
  const [filters, setFilters] = useState({
    search: "",
    category: initialCategory,
    location: "Any",
    minPrice: 0,
    maxPrice: 150000000,
    bhk: "Any",
    possession: "Any",
    furnishing: "Any",
    facing: "Any",
    locality: "",
    selectedAmenities: [],
    commercialType: "Any",
    grade: "Any"
  });

  useEffect(() => {
    setFilters(prev => ({ ...prev, category: initialCategory }));
  }, [initialCategory]);

  useEffect(() => {
    let result = properties;

    // Strict Category Filtering
    if (filters.category !== "all") {
      result = result.filter(p => p.category === filters.category);
    }

    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.developer.toLowerCase().includes(query)
      );
    }

    // Price
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Location
    if (filters.location !== "Any") {
      result = result.filter(p => p.location.includes(filters.location));
    }

    // Locality
    if (filters.locality !== "") {
      result = result.filter(p => p.location.includes(filters.locality));
    }

    // BHK
    if (filters.bhk !== "Any") {
      result = result.filter(p => p.bhk === filters.bhk);
    }

    // Possession
    if (filters.possession !== "Any") {
      result = result.filter(p => p.possession === filters.possession);
    }

    // Furnishing
    if (filters.furnishing !== "Any") {
      result = result.filter(p => p.furnishing === filters.furnishing);
    }

    // Facing
    if (filters.facing !== "Any") {
      result = result.filter(p => p.facing === filters.facing);
    }

    // Amenities
    if (filters.selectedAmenities.length > 0) {
      result = result.filter(p => 
        filters.selectedAmenities.every(amenity => p.amenities?.includes(amenity))
      );
    }

    // Commercial Type
    if (filters.category === "commercial" && filters.commercialType !== "Any") {
      result = result.filter(p => p.title.toLowerCase().includes(filters.commercialType.toLowerCase()) || p.description?.toLowerCase().includes(filters.commercialType.toLowerCase()));
    }

    // Grade
    if (filters.category === "commercial" && filters.grade !== "Any") {
      result = result.filter(p => p.description?.toLowerCase().includes(filters.grade.toLowerCase()) || p.title.toLowerCase().includes(filters.grade.toLowerCase()));
    }

    // Sort
    if (sortBy === "low") result = sortByPriceLowToHigh(result);
    if (sortBy === "high") result = sortByPriceHighToLow(result);

    setFilteredProperties(result);
  }, [filters, properties, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: initialCategory,
      location: "Any",
      minPrice: 0,
      maxPrice: 150000000,
      bhk: "Any",
      possession: "Any",
      furnishing: "Any",
      facing: "Any",
      locality: "",
      selectedAmenities: [],
      commercialType: "Any",
      grade: "Any"
    });
  };

  const activeBanner = CATEGORY_BANNERS[filters.category] || CATEGORY_BANNERS.all;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative w-full h-[35vh] flex items-center justify-center overflow-hidden">
        <img 
          src={activeBanner} 
          alt="Listing Banner"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-4 pt-10">
          <span className="text-yellow-400 font-black tracking-widest uppercase text-[10px] mb-3 block">
            {filters.category === 'all' ? 'All Assets' : `${filters.category} Collection`}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            {filters.category === 'all' ? 'Property Listings' : `${filters.category} Properties`}
          </h1>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Sticky Search Header */}
      <div className="max-w-7xl mx-auto px-6 mt-[-40px] relative z-30 mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search project, location or developer..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-green-500 outline-none text-sm font-medium"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="relative flex-1 md:w-56">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden md:block col-span-3 ml-[-12px]">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 sticky top-28 space-y-8 overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-xs">Best Filters</h3>
              <button onClick={resetFilters} className="text-[10px] text-green-600 font-black uppercase tracking-widest hover:underline">Reset</button>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Budget Range</label>
              <input 
                type="range"
                min="0"
                max="150000000"
                step="1000000"
                className="w-full accent-green-600 mb-3"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
              />
              <div className="flex justify-between text-xs font-black text-gray-900">
                <span>₹0</span>
                <span>₹{(filters.maxPrice / 10000000).toFixed(1)} Cr</span>
              </div>
            </div>

            {/* Residential Specific Filters */}
            {filters.category !== "commercial" && (
              <>
                {/* Configuration */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Configuration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Any", "1", "2", "3", "4"].map((b) => (
                      <button
                        key={b}
                        onClick={() => handleFilterChange("bhk", b)}
                        className={`py-2 rounded-xl text-[10px] font-black border transition-all ${
                          filters.bhk === b 
                            ? "bg-green-600 text-white border-green-600" 
                            : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                        }`}
                      >
                        {b === "Any" ? b : `${b} BHK`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Furnishing</label>
                  <div className="flex flex-wrap gap-2">
                    {["Any", "Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
                      <button
                        key={f}
                        onClick={() => handleFilterChange("furnishing", f)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-black border transition-all ${
                          filters.furnishing === f 
                            ? "bg-green-600 text-white border-green-600" 
                            : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Commercial Specific Filters */}
            {filters.category === "commercial" && (
              <>
                {/* Commercial Type */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Asset Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Any", "Office", "Retail", "Showroom", "Warehouse"].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleFilterChange("commercialType", t)}
                        className={`py-2 rounded-xl text-[10px] font-black border transition-all ${
                          filters.commercialType === t 
                            ? "bg-green-600 text-white border-green-600" 
                            : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Asset Grade</label>
                  <div className="flex flex-wrap gap-2">
                    {["Any", "Grade A", "Grade B", "Boutique"].map((g) => (
                      <button
                        key={g}
                        onClick={() => handleFilterChange("grade", g)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-black border transition-all ${
                          filters.grade === g 
                            ? "bg-green-600 text-white border-green-600" 
                            : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Possession Status (Common) */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Possession</label>
              <div className="flex flex-wrap gap-2">
                {["Any", "Ready", "6 Months", "1 Year+"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleFilterChange("possession", p)}
                    className={`px-3 py-2 rounded-xl text-[9px] font-black border transition-all ${
                      filters.possession === p 
                        ? "bg-green-600 text-white border-green-600" 
                        : "bg-white text-gray-600 border-gray-100 hover:border-green-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Checklist */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">
                {filters.category === "commercial" ? "Business Amenities" : "Lifestyle Amenities"}
              </label>
              <div className="space-y-2">
                {(filters.category === "commercial" 
                  ? ["High Speed Elevators", "24/7 Security", "Fiber Optic", "Server Room", "Double Height Lobby", "Ample Parking"]
                  : ["Gym", "Pool", "Club House", "Security", "Garden", "Spa"]
                ).map((a) => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={filters.selectedAmenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="w-4 h-4 accent-green-600 rounded"
                    />
                    <span className="text-[11px] font-bold text-gray-600 group-hover:text-green-600 transition-colors">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Facing */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Facing</label>
              <select 
                value={filters.facing}
                onChange={(e) => handleFilterChange("facing", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Any">Select Facing</option>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>

            {/* Locality */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Locality</label>
                <div className="relative">
                  <select
                    value={filters.locality}
                    onChange={(e) =>
                      setFilters({ ...filters, locality: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 text-sm appearance-none bg-white focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Mohali">Mohali</option>
                    <option value="Chandigarh">Chandigarh</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
          </div>
        </aside>

        {/* Listings */}
        <main className="col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              {filteredProperties.length} Properties found
            </h2>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-green-600 shadow-sm" : "text-gray-400"}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-green-600 shadow-sm" : "text-gray-400"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Fetching Real-Estate Assets...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "space-y-8"}>
              {filteredProperties.map((p) => (
                <CardProperty key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] p-20 text-center border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <LayoutGrid className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">No matching properties</h3>
              <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium text-sm">We couldn't find any results for your current selection. Try broadening your budget or area.</p>
              <button 
                onClick={resetFilters}
                className="px-10 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition shadow-xl shadow-green-100"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Overlay (Simplified for context) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-[90%] bg-white p-8 flex flex-col rounded-l-[40px] overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black uppercase tracking-tight">All Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-3 bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 space-y-10 pb-10">
              {/* Reuse sidebar filter components here for mobile */}
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Budget Range</label>
                <input 
                  type="range"
                  min="0"
                  max="150000000"
                  step="1000000"
                  className="w-full accent-green-600"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Configuration</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Any", "1", "2", "3", "4"].map((b) => (
                    <button
                      key={b}
                      onClick={() => handleFilterChange("bhk", b)}
                      className={`py-3 rounded-xl text-[10px] font-black border ${filters.bhk === b ? "bg-green-600 text-white" : "bg-white"}`}
                    >
                      {b} BHK
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-4 mt-auto">
              <button onClick={resetFilters} className="flex-1 py-5 border border-gray-200 rounded-3xl text-xs font-black uppercase tracking-widest">Reset</button>
              <button onClick={() => setShowMobileFilters(false)} className="flex-[2] py-5 bg-green-600 text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-100">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListingPage;
