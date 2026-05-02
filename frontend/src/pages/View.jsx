import React, { useState, useRef, useEffect } from "react";
import Cardproperty from "../components/Cardproperty";
export default function FilterBar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Ownership Type");
const [openDropdown, setOpenDropdown] = useState(null);
const filterBarRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      filterBarRef.current &&
      !filterBarRef.current.contains(event.target)
    ) {
      setOpenDropdown(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
     possession: "", 
    furnishing: "",
    facing: "",
    amenities: [],
    ownershipType: "",
    legal: [],
    postedBy: "",
  });
const Chevron = ({ active }) => (
  <svg
    className={`w-4 h-4 ml-1 transition-transform ${
      active ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
  const toggleAmenity = (item) => {
    if (filters.amenities.includes(item)) {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter((a) => a !== item),
      });
    } else {
      setFilters({
        ...filters,
        amenities: [...filters.amenities, item],
      });
    }
  };
  const toggleLegal = (item) => {
  if (filters.legal.includes(item)) {
    setFilters({
      ...filters,
      legal: filters.legal.filter((l) => l !== item),
    });
  } else {
    setFilters({
      ...filters,
      legal: [...filters.legal, item],
    });
  }
};

  const clearAll = () => {
    setFilters({
      location: "",
      propertyType: "",
      bhk: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
       possession: "", 
      furnishing: "",
      facing: "",
      amenities: [],
      ownershipType: "",
      legal: [],
      postedBy: "",
    });
  };

 const hasActive =
  filters.location ||
  filters.propertyType ||
  filters.bhk ||
  filters.minPrice ||
  filters.maxPrice ||
  filters.minArea ||
  filters.maxArea ||
  filters.possession ||
  filters.furnishing ||
  filters.facing ||
  filters.postedBy ||
  filters.ownershipType ||
  filters.amenities.length > 0 ||
  filters.legal.length > 0;

  return (
    <>
      {/* ================= MAIN FILTER BAR ================= */}
      <div
  ref={filterBarRef}
  className="fixed top-[110px] left-0 right-0 bg-white z-40 pl-24 pr-10 py-4 flex items-center gap-4 border-b"
>
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Filter
        </span>

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Search for Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className={`px-3 py-2 border rounded-md text-sm w-48 ${
            filters.location
              ? "border-green-500 bg-green-50 text-green-600"
              : "border-gray-300"
          }`}
        />

        
        {/* PROPERTY TYPE DROPDOWN */}
<div className="relative">
  <button
    onClick={() =>
      setOpenDropdown(
        openDropdown === "propertyType" ? null : "propertyType"
      )
    }
    className={`flex items-center px-3 py-2 border rounded-md text-sm ${
      filters.propertyType
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300"
    }`}
  >
    {filters.propertyType || "Property Type"}
    <Chevron active={openDropdown === "propertyType"} />
  </button>

  {openDropdown === "propertyType" && (
    <div className="absolute mt-2 bg-white shadow-lg border rounded-md w-48 z-50">
      {["Apartment", "Villa", "Plot", "Commercial"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setFilters({ ...filters, propertyType: item });
            setOpenDropdown(null);
          }}
          className={`px-4 py-2 text-sm cursor-pointer ${
            filters.propertyType === item
              ? "bg-green-50 text-green-600"
              : "hover:bg-gray-50"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

        
        {/* PRICE DROPDOWN */}
<div className="relative">
  <button
    onClick={() =>
      setOpenDropdown(openDropdown === "price" ? null : "price")
    }
    className={`flex items-center px-3 py-2 border rounded-md text-sm ${
      filters.minPrice || filters.maxPrice
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300"
    }`}
  >
    Price
    <Chevron active={openDropdown === "price"} />
  </button>

  {openDropdown === "price" && (
    <div className="absolute mt-2 bg-white shadow-lg border rounded-md p-4 w-64 z-50">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
          className="border p-2 w-1/2 text-sm rounded-md focus:border-green-500 outline-none"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          className="border p-2 w-1/2 text-sm rounded-md focus:border-green-500 outline-none"
        />
      </div>
    </div>
  )}
</div>

       {/* BHK DROPDOWN */}
<div className="relative">
  <button
    onClick={() =>
      setOpenDropdown(openDropdown === "bhk" ? null : "bhk")
    }
    className={`flex items-center px-3 py-2 border rounded-md text-sm ${
      filters.bhk
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300"
    }`}
  >
    {filters.bhk || "BHK"}
    <Chevron active={openDropdown === "bhk"} />
  </button>

  {openDropdown === "bhk" && (
    <div className="absolute mt-2 bg-white shadow-lg border rounded-md w-40 z-50">
      {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setFilters({ ...filters, bhk: item });
            setOpenDropdown(null);
          }}
          className={`px-4 py-2 text-sm cursor-pointer ${
            filters.bhk === item
              ? "bg-green-50 text-green-600"
              : "hover:bg-gray-50"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

       
      {/* AREA DROPDOWN */}
<div className="relative">
  <button
    onClick={() =>
      setOpenDropdown(openDropdown === "area" ? null : "area")
    }
    className={`flex items-center px-3 py-2 border rounded-md text-sm ${
      filters.minArea || filters.maxArea
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300"
    }`}
  >
    Area (sq.ft)
    <Chevron active={openDropdown === "area"} />
  </button>

  {openDropdown === "area" && (
    <div className="absolute mt-2 bg-white shadow-lg border rounded-md p-4 w-64 z-50">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Area"
          value={filters.minArea}
          onChange={(e) =>
            setFilters({ ...filters, minArea: e.target.value })
          }
          className="border p-2 w-1/2 text-sm rounded-md focus:border-green-500 outline-none"
        />
        <input
          type="number"
          placeholder="Max Area"
          value={filters.maxArea}
          onChange={(e) =>
            setFilters({ ...filters, maxArea: e.target.value })
          }
          className="border p-2 w-1/2 text-sm rounded-md focus:border-green-500 outline-none"
        />
      </div>
    </div>
  )}
</div>
{/* POSSESSION DROPDOWN */}
<div className="relative">
  <button
    onClick={() =>
      setOpenDropdown(
        openDropdown === "possession" ? null : "possession"
      )
    }
    className={`flex items-center px-3 py-2 border rounded-md text-sm ${
      filters.possession
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300"
    }`}
  >
    {filters.possession || "Possession"}
    <Chevron active={openDropdown === "possession"} />
  </button>

  {openDropdown === "possession" && (
    <div className="absolute mt-2 bg-white shadow-lg border rounded-md w-52 z-50">
      {[
        "Ready to Move",
        "Under Construction",
        "Within 3 Months",
        "Within 6 Months",
        "Within 1 Year",
      ].map((item) => (
        <div
          key={item}
          onClick={() => {
            setFilters({ ...filters, possession: item });
            setOpenDropdown(null);
          }}
          className={`px-4 py-2 text-sm cursor-pointer ${
            filters.possession === item
              ? "bg-green-50 text-green-600"
              : "hover:bg-gray-50"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

        
        {/* MORE BUTTON */}
<div className="relative">
  <button
    onClick={() => setIsMoreOpen(!isMoreOpen)}
    className={`flex items-center px-4 py-2 border rounded-md text-sm transition ${
      isMoreOpen
        ? "border-green-500 bg-green-50 text-green-600"
        : "border-gray-300 hover:bg-gray-50"
    }`}
  >
    More
    <Chevron active={isMoreOpen} />
  </button>
</div>

        {/* CLEAR ALL */}
        {hasActive && (
          <button
            onClick={clearAll}
            className="text-red-500 text-sm hover:underline"
          >
            Clear All
          </button>
        )}

        <button className="bg-green-600 text-white px-5 py-2 rounded-md text-sm">
          Apply
        </button>
      </div>

     
     {/* MODAL */}
{isMoreOpen && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-[800px] h-[500px] rounded-lg shadow-xl flex relative">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setIsMoreOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

            {/* LEFT MENU */}
            <div className="w-1/3 border-r p-4">
              {[
                "Ownership Type",
                "Furnishing",
                "Facing",
                "Amenities",
                "Legal",    
                "Posted By",  
              ].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-3 cursor-pointer rounded-md mb-2 ${
                    activeTab === tab
                      ? "bg-green-50 text-green-600 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-2/3 p-6 overflow-y-auto">
              {activeTab === "Ownership Type" && (
  <>
    <h3 className="mb-4 font-medium">Ownership Type</h3>

    {[
      "Freehold",
      "Leasehold",
      "Co-operative Society",
    ].map((item) => (
      <div
        key={item}
        onClick={() =>
          setFilters({ ...filters, ownershipType: item })
        }
        className={`p-2 border rounded-md mb-2 cursor-pointer ${
          filters.ownershipType === item
            ? "border-green-500 bg-green-50 text-green-600"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {item}
      </div>
    ))}
  </>
)}{activeTab === "Legal" && (
  <>
    <h3 className="mb-4 font-medium">Legal & Approvals</h3>

    {[
      "RERA Approved",
      "Loan Approved",
      "Encumbrance Clear",
      "Occupancy Certificate (OC)",
      "Completion Certificate (CC)",
    ].map((item) => (
      <div
        key={item}
        onClick={() => toggleLegal(item)}
        className={`p-2 border rounded-md mb-2 cursor-pointer ${
          filters.legal.includes(item)
            ? "border-green-500 bg-green-50 text-green-600"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {item}
      </div>
    ))}
  </>
)}
              {activeTab === "Furnishing" && (
                <>
                  <h3 className="mb-4 font-medium">Furnishing</h3>
                  {["Furnished", "Semi-Furnished", "Unfurnished"].map(
                    (item) => (
                      <div
                        key={item}
                        onClick={() =>
                          setFilters({ ...filters, furnishing: item })
                        }
                        className={`p-2 border rounded-md mb-2 cursor-pointer ${
                          filters.furnishing === item
                            ? "border-green-500 bg-green-50 text-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </>
              )}
              {activeTab === "Posted By" && (
  <>
    <h3 className="mb-4 font-medium">Posted By</h3>
    {["Owner", "Builder", "Agent"].map((item) => (
      <div
        key={item}
        onClick={() =>
          setFilters({ ...filters, postedBy: item })
        }
        className={`p-2 border rounded-md mb-2 cursor-pointer ${
          filters.postedBy === item
            ? "border-green-500 bg-green-50 text-green-600"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {item}
      </div>
    ))}
  </>
)}

              {activeTab === "Facing" && (
                <>
                  <h3 className="mb-4 font-medium">Facing</h3>
                  {["North", "South", "East", "West"].map((item) => (
                    <div
                      key={item}
                      onClick={() =>
                        setFilters({ ...filters, facing: item })
                      }
                      className={`p-2 border rounded-md mb-2 cursor-pointer ${
                        filters.facing === item
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-gray-300"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </>
              )}

              {activeTab === "Amenities" && (
                <>
                  <h3 className="mb-4 font-medium">Amenities</h3>
                  {["Lift", "Parking", "Gym", "Pool", "Smart Home Automation", "App-Based Visitor Entry", "Smart Lighting Control", "CCTV Monitoring App", "Facial Recognition Entry", "Smart Parking System","Convenience Store","Grocery Store","Café Area","ATM","Pharmacy","Clinic / First Aid Room",

].map((item) => (
                    <label key={item} className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(item)}
                        onChange={() => toggleAmenity(item)}
                        className="mr-2 accent-green-600"
                      />
                      {item}
                    </label>
                  ))}
                </>
              )}
              

            </div>

            {/* FOOTER */}
            <div className="absolute bottom-0 left-0 right-0 border-t p-4 flex justify-between bg-white">
              <button
                onClick={clearAll}
                className="text-red-500"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Show Result
              </button>
            </div>
          </div>
        </div>
        
      )}
      <Cardproperty filters={filters} />
    </>
  );
}