import { useState } from "react";
import { FiMapPin, FiCopy, FiShare2 } from "react-icons/fi";
import readyToMoveVideo from "/images/ready-to-move.mp4";
import { apartmentListings } from "../data/properties";
import { Link } from "react-router-dom";


export default function ReadyToMove() {
  const allProperties = apartmentListings.filter(p => p.status === "Ready to Move");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("savedProperties")) || [];
  });
  const [visible, setVisible] = useState(3);
  const [filters, setFilters] = useState({
    locality: "",
    bedrooms: "",
    type: "",
    possession: "",
    price: [0, 5],
    areaUnit: "sqft",
    areaMin: "",
    areaMax: "",
  });

  const handleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) 
        ? prev.filter((fid) => fid !== id) 
        : [...prev, id];
      localStorage.setItem("savedProperties", JSON.stringify(updated));
      return updated;
    });
  };

  const handleViewMore = () => {
    setVisible((prev) => prev + 3);
  };

  const filteredProperties = allProperties.filter((p) => {
    const matchesLocality = !filters.locality || p.location.toLowerCase().includes(filters.locality.toLowerCase());
    const matchesBHK = !filters.bedrooms || Number(p.bhk) === Number(filters.bedrooms);
    const matchesType = !filters.type || p.category === filters.type.toLowerCase();
    const matchesPrice = p.price <= filters.price[1] * 10000000;
    const matchesArea = (!filters.areaMin || Number(p.area) >= Number(filters.areaMin)) && 
                        (!filters.areaMax || Number(p.area) <= Number(filters.areaMax));

    return matchesLocality && matchesBHK && matchesType && matchesPrice && matchesArea;
  });

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleShare = (link) => {
    if (navigator.share) {
      navigator.share({
        title: "Property Details",
        url: link,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="mt-5">
      {/* Hero Video Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-16">
        <video
          src={readyToMoveVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg text-white">
            Ready to Move Projects
          </h2>
        </div>
      </div>

      {/* Layout: Aside + Listings */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Aside Filter */}
        <aside className="bg-white shadow-lg rounded-xl p-6 mb-6 lg:mb-0 lg:sticky lg:top-30 h-fit">
          <h3 className="text-lg font-semibold mb-10">Filters</h3>
          <div className="space-y-4">
            {/* Locality */}
            <div>
              <label className="block text-xs font-medium mb-1">Locality</label>
              <select
                value={filters.locality}
                onChange={(e) =>
                  setFilters({ ...filters, locality: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">Select</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Mohali">Mohali</option>
                <option value="Chandigarh">Chandigarh</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-medium mb-1">Bedrooms</label>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">Any</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-medium mb-1">
                Property Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">Any</option>
                <option value="Apartment">Apartment</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            {/* Possession */}
            <div>
              <label className="block text-xs font-medium mb-1">Possession</label>
              <select
                value={filters.possession}
                onChange={(e) =>
                  setFilters({ ...filters, possession: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">Any</option>
                <option value="Ready">Ready to Move</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-medium mb-1">
                Price Range (Cr)
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={filters.price[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: [0, parseFloat(e.target.value)],
                  })
                }
                className="w-full"
              />
              <p className="text-xs text-gray-600">
                ₹0 Cr - ₹{filters.price[1]} Cr
              </p>
            </div>

            {/* Area */}
            <div>
              <label className="block text-xs font-medium mb-1">Area</label>
              <div className="flex gap-2 mb-1 flex-wrap">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.areaMin}
                  onChange={(e) =>
                    setFilters({ ...filters, areaMin: e.target.value })
                  }
                  className="w-1/2 sm:w-1/2 border rounded-lg p-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.areaMax}
                  onChange={(e) =>
                    setFilters({ ...filters, areaMax: e.target.value })
                  }
                  className="w-1/2 sm:w-1/2 border rounded-lg p-2 text-sm"
                />
              </div>
              <select
                value={filters.areaUnit}
                onChange={(e) =>
                  setFilters({ ...filters, areaUnit: e.target.value })
                }
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="sqft">Sq. Ft.</option>
                <option value="sqyd">Sq. Yards</option>
                <option value="sqm">Sq. Meter</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Property Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.slice(0, visible).map((p) => {
            const propertyLink = `https://reco.com/property/${p.id}`;

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {/* Image + Status + Favorite */}
                <div className="relative">
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      p.status === "Ready"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>

                  <img
                    src={p.image}
                    alt={`${p.title} in ${p.location}`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    loading="lazy"
                  />

                  <button
                    onClick={() => handleFavorite(p.id)}
                    aria-label={`${
                      favorites.includes(p.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    } ${p.title}`}
                    className="absolute top-3 right-3 text-2xl"
                  >
                    {favorites.includes(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {p.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        p.rera === "Awaiting"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      RERA: {p.rera}
                    </span>
                  </div>

                  {/* Price Highlight */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Price Starting:</p>
                    <p className="text-xl font-bold text-green-600">
                      ₹ {p.price / 10000000} Cr
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                    <p>
                      <span className="font-medium">Developer:</span>{" "}
                      {p.developer}
                    </p>
                    <p className="flex items-center gap-1">
                      <FiMapPin className="text-red-500" /> {p.location}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700 mb-5">
                    <div className="flex justify-between flex-wrap gap-4">
                      <p>🛏️ {p.bhk} BHK</p>
                      <p>🏠 <span className="capitalize">{p.category}</span></p>
                      <p>📐 {p.area} {filters.areaUnit}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="my-3" />

                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <Link to={`/property/${p.id}`} className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 text-center">
                      View Details
                    </Link>
                    <Link to="/contact" className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 text-center">
                      Reach Us
                    </Link>
                  </div>

                  {/* Brochure Section */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Brochure
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={propertyLink}
                        className="flex-1 border rounded-lg p-2 text-sm"
                      />
                      <button
                        onClick={() => handleCopy(propertyLink)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <FiCopy />
                      </button>
                      <button
                        onClick={() => handleShare(propertyLink)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <FiShare2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* View More */}
          {visible < filteredProperties.length && (
            <div className="text-center mt-10 lg:col-span-2">
              <button
                onClick={handleViewMore}
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
