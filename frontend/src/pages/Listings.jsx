import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Heart,
  Share2,
  BedDouble,
  Building2,
  Ruler,
  Home,
  Layers,  
  MapPinned,
  ChevronDown,
} from "lucide-react";
import { useSearchParams ,Link } from "react-router-dom";

// ✅ DATA IMPORT
import { fetchProperties } from "../api/api";
import {
  sortByPriceLowToHigh,
  sortByPriceHighToLow,
} from "../data/properties";

const Listings = () => {
  // DATA
  const [apartments, setApartments] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setApartments(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  // FILTER STATES
const [location, setLocation] = useState("Any");
const [bhk, setBhk] = useState("Any");
const [possession, setPossession] = useState("Any");
const [propertyType, setPropertyType] = useState("Any");
const [minArea, setMinArea] = useState("");
const [maxArea, setMaxArea] = useState("");
const [facing, setFacing] = useState("Any");

//Pagination concept 
const ITEMS_PER_PAGE = 1; // 6–8 cards as per requirement
const MAX_PAGES = 10;
const [jumpPage, setJumpPage] = useState("");
const [currentPage, setCurrentPage] = useState(1);



const [searchParams] = useSearchParams();
const categoryFromUrl =
  searchParams.get("category") || searchParams.get("type");
useEffect(() => {
  if (categoryFromUrl === "plot") {
    setBhk("Any");
  } else {
    setFacing("Any");
  }
}, [categoryFromUrl]);


  // UI STATES
  const [budget, setBudget] = useState(50000000);
  const [savedIds, setSavedIds] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const filterRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target)
    ) {
      setOpenDropdown(null);
    }
  };



  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  // SAVE / UNSAVE
  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  // SORT HANDLER
  const handleSort = (value) => {
    setSortBy(value);

    if (value === "low") {
      setApartments(sortByPriceLowToHigh(apartments));
    }

    if (value === "high") {
      setApartments(sortByPriceHighToLow(apartments));
    }

    if (value === "relevance") {
      setApartments(getAllApartments());
    }
  };

  const baseApartments = categoryFromUrl
  ? apartments.filter(
      (item) => item.category === categoryFromUrl
    )
  : apartments;
  const filteredApartments = baseApartments.filter((item) => {
  // PRICE
  if (item.price > budget) return false;

  // LOCATION
  if (location !== "Any" && item.location !== location)
    return false;

  // BHK (only for non-plots)
if (
  categoryFromUrl !== "plot" &&
  bhk !== "Any" &&
  item.bhk !== Number(bhk)
)
  return false;
  // FACING (only for plots)
if (
  categoryFromUrl === "plot" &&
  facing !== "Any" &&
  item.facing !== facing
)
  return false;


  // POSSESSION
  if (possession !== "Any" && item.status !== possession)
    return false;

  // AREA
  if (minArea && item.area < Number(minArea))
    return false;

  if (maxArea && item.area > Number(maxArea))
    return false;

  return true;
});
const categoryLabel = categoryFromUrl
  ? categoryFromUrl
      .split("-")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
  : "Properties";

// Category based icon in cards
const CATEGORY_META = {
  apartment: {
    label: "Apartment",
    Icon: Building2,
  },
  "builder-floor": {
    label: "Builder Floor",
    Icon: Layers,
  },
  villa: {
    label: "Villa",
    Icon: Home,
  },
  plot: {
    label: "Residential Plot",
    Icon: MapPinned,
  },
};

const totalPages = Math.min(
  Math.ceil(filteredApartments.length / ITEMS_PER_PAGE),
  MAX_PAGES
);

// Pagination logic
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;

const paginatedApartments = filteredApartments.slice(
  startIndex,
  endIndex
);

const totalItems = filteredApartments.length;

const rangeStart = totalItems === 0 ? 0 : startIndex + 1;
const rangeEnd = Math.min(endIndex, totalItems);
useEffect(() => {
  setCurrentPage(1);
}, [
  categoryFromUrl,
  location,
  bhk,
  facing,
  possession,
  minArea,
  maxArea,
  budget
]);



  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-6 mt-8">
        <p className="text-sm text-gray-500 flex items-center gap-1">
  <Link
    to="/"
    className="hover:text-green-600 transition"
  >
    Home
  </Link>

  <span>&gt;</span>

  <span>Residential</span>

  <span>&gt;</span>

  <span className="text-gray-700 font-medium">
    {categoryLabel}
  </span>
</p>


        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-semibold">
  We found {filteredApartments.length}{" "}
  {categoryFromUrl
    ? categoryFromUrl.replace("-", " ")
    : "properties"}
</h2>


          {/* SORT */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="border rounded-md px-3 py-2 pr-10 text-sm bg-white appearance-none"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        {/* FILTER BAR  */}
        <aside className="col-span-12 md:col-span-3">
          <div
  ref={filterRef}
  className="bg-white rounded-xl shadow-sm p-6 space-y-6 sticky top-24"
>

            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="space-y-1 relative">
  <label className="text-sm font-medium">Location</label>

  <button
    type="button"
    onClick={() =>
      setOpenDropdown(openDropdown === "location" ? null : "location")
    }
    className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white"
  >
    <span>{location === "Any" ? "Select location" : location}</span>
    <ChevronDown size={16} className="text-gray-500" />
  </button>

  {openDropdown === "location" && (
    <div className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
      {["Delhi", "Gurgaon", "Noida", "Chandigarh"].map((city) => (
        <button
          key={city}
          onClick={() => {
            setLocation(city);
            setOpenDropdown(null);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
        >
          {city}
        </button>
      ))}
    </div>
  )}
</div>
{/* BHK */}
            {/* BHK OR Facing */}
{categoryFromUrl === "plot" ? (
  /* ===== FACING FILTER (for plots) ===== */
  <div className="space-y-1 relative">
    <label className="text-sm font-medium">Facing</label>

    <button
      type="button"
      onClick={() =>
        setOpenDropdown(openDropdown === "facing" ? null : "facing")
      }
      className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white"
    >
      <span>{facing === "Any" ? "Select Facing" : facing}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </button>

    {openDropdown === "facing" && (
      <div className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
        {["Any", "East", "West", "North", "South"].map((dir) => (
          <button
            key={dir}
            onClick={() => {
              setFacing(dir);
              setOpenDropdown(null);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            {dir}
          </button>
        ))}
      </div>
    )}
  </div>
) : (
  /* ===== BHK FILTER (for non-plots) ===== */
  <div className="space-y-1 relative">
    <label className="text-sm font-medium">BHK Configuration</label>

    <button
      type="button"
      onClick={() =>
        setOpenDropdown(openDropdown === "bhk" ? null : "bhk")
      }
      className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white"
    >
      <span>{bhk === "Any" ? "Select BHK" : bhk}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </button>

    {openDropdown === "bhk" && (
      <div className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
        {["Any", "1", "2", "3", "4"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setBhk(type);
              setOpenDropdown(null);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            {type}
          </button>
        ))}
      </div>
    )}
  </div>
)}

{/* Property Type */}
           <div className="space-y-1 relative">
  <label className="text-sm font-medium">Property Type</label>

  <button
    type="button"
    onClick={() =>
      setOpenDropdown(
        openDropdown === "propertyType" ? null : "propertyType"
      )
    }
    className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white"
  >
    <span>
      {propertyType === "Any" ? "Any" : propertyType}
    </span>
    <ChevronDown size={16} className="text-gray-500" />
  </button>

  {openDropdown === "propertyType" && (
    <div className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
      {[ "Apartment", "High Rise", "Low Rise"].map((type) => (
        <button
          key={type}
          onClick={() => {
            setPropertyType(type);
            setOpenDropdown(null);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
        >
          {type}
        </button>
      ))}
    </div>
  )}
</div>

{/* Possession Status */}
            <div className="space-y-1 relative">
  <label className="text-sm font-medium">Possession Status</label>

  <button
    type="button"
    onClick={() =>
      setOpenDropdown(openDropdown === "possession" ? null : "possession")
    }
    className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm bg-white"
  >
    <span>{possession === "Any" ? "Select Possession" : possession}</span>
    <ChevronDown size={16} className="text-gray-500" />
  </button>

  {openDropdown === "possession" && (
    <div className="absolute z-10 w-full bg-white border rounded-md shadow mt-1">
      {["Any", "Ready", "New Launch", "Upcoming"].map((status) => (
        <button
          key={status}
          onClick={() => {
            setPossession(status);
            setOpenDropdown(null);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
        >
          {status}
        </button>
      ))}
    </div>
  )}
</div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium">Price Range (Cr)</label>
              <input
                type="range"
                min="5000000"
                max="50000000"
                step="500000"
                value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="w-full mt-2"
              />
              <p className="text-xs mt-1">
                ₹0 – ₹{(budget / 10000000).toFixed(1)} Cr
              </p>
            </div>
            {/* Area */}
            <div className="space-y-1">
  <label className="text-sm font-medium">Area (Sq. Ft.)</label>

  <div className="grid grid-cols-2 gap-2">
    <input
      type="number"
      placeholder="Min"
      value={minArea}
      onChange={(e) => setMinArea(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm w-full"
    />

    <input
      type="number"
      placeholder="Max"
      value={maxArea}
      onChange={(e) => setMaxArea(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm w-full"
    />
  </div>
</div>

  
</div>

          
        </aside>

        {/* LISTINGS */}
        <div className="col-span-12 md:col-span-9 grid md:grid-cols-2 gap-8 items-start">
          {paginatedApartments.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.status}
                  </span>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSave(item.id);
                      }}
                      className={`p-2 rounded-full shadow transition ${
                        savedIds.includes(item.id)
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Heart
                        size={16}
                        fill={
                          savedIds.includes(item.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <button className="bg-white p-2 rounded-full shadow">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    item.location
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-gray-500 flex items-center gap-1 mt-1 hover:text-green-600 transition"
>
  <MapPin size={14} className="text-green-600" />
  <span>{item.location}</span>
</a>

                  </div>

                   <p className="text-sm text-gray-600 mt-1">
                    Developer: {item.developer}
                  </p>

                  <p className="text-green-700 text-xl font-bold mt-3">
                    ₹ {(item.price / 10000000).toFixed(2)} Cr
                  </p>

                 

                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mt-3">
                    <span className="flex items-center gap-1">
  {item.category === "plot" ? (
    <>
      <MapPin size={16} />
      {item.facing || "Residential Plot"}
    </>
  ) : (
    <>
      <BedDouble size={16} />
      {item.bhk} BHK
    </>
  )}
</span>

                   <span className="flex items-center gap-1">
  {(() => {
    const meta = CATEGORY_META[item.category];
    if (!meta) return null;

    const Icon = meta.Icon;
    return (
      <>
        <Icon size={16} />
        {meta.label}
      </>
    );
  })()}
</span>

                    <span className="flex items-center gap-1">
                      <Ruler size={16} /> {item.area} sqft
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <Link
  to={`/property/${item.id}`}
  className="bg-gray-100 py-2 rounded-md text-sm font-medium
             text-center hover:bg-gray-200 transition"
>
  View Details
</Link>

                    <button className="bg-green-600 text-white py-2 rounded-md text-sm font-medium">
                      Reach Us
                    </button>
                  </div>
                  <div className="mt-4">
  <label className="text-sm font-medium">Brochure</label>

  <div className="flex gap-2 mt-1">
    <input
      className="flex-1 border rounded-md px-3 py-2 text-sm bg-gray-50"
      value={`https://reco.com/property/${item.id}`}
      readOnly
    />

    {/* COPY */}
    <button
      onClick={() =>
        navigator.clipboard.writeText(
          `https://reco.com/property/${item.id}`
        )
      }
      className="border rounded-md px-3 text-sm hover:bg-gray-100"
      title="Copy link"
    >
      ⧉
    </button>

    {/* OPEN */}
    <button
      onClick={() =>
        window.open(
          `https://reco.com/property/${item.id}`,
          "_blank"
        )
      }
      className="border rounded-md px-3 text-sm hover:bg-gray-100"
      title="Open link"
    >
      ↗
    </button>
  </div>
</div>

                </div>
              </div>
            ))}
        </div>
{totalPages > 1 && (
  <div className="col-span-12 flex flex-wrap items-center justify-between mt-10 gap-4">

    {/* LEFT INFO */}
    <p className="text-sm text-gray-600">
      {rangeStart} – {rangeEnd} / {totalItems}
    </p>

    {/* PAGINATION CONTROLS */}
    <div className="flex items-center gap-2 flex-wrap">

      {/* FIRST */}
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ⟪
      </button>

      {/* PREV */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ‹
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-md border text-sm
              ${
                currentPage === page
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        onClick={() =>
          setCurrentPage((p) => Math.min(p + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ›
      </button>

      {/* LAST */}
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-md disabled:opacity-40"
      >
        ⟫
      </button>
    </div>

    {/* JUMP TO */}
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Jump To</span>

      <input
        type="number"
        min={1}
        max={totalPages}
        value={jumpPage}
        onChange={(e) => setJumpPage(e.target.value)}
        className="w-20 border rounded-md px-2 py-1 text-sm"
      />

      <button
        onClick={() => {
          const page = Number(jumpPage);
          if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setJumpPage("");
          }
        }}
        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
      >
        Go
      </button>
    </div>
  </div>
)}

      </section>
    </div>
  );
};

export default Listings;
