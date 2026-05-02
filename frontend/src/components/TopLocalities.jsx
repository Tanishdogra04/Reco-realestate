import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopLocalities = () => {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [area, setArea] = useState(1000);

  const cityData = {
    Mumbai: {
      "Bandra West": { min: 35000, max: 65000, trend: "↑ 5.2%" },
      "Andheri East": { min: 18000, max: 25000, trend: "↑ 3.8%" },
      "Powai": { min: 20000, max: 32000, trend: "→ 1.0%" },
      "Worli": { min: 45000, max: 85000, trend: "↑ 6.5%" },
    },
    Delhi: {
      "South Extension": { min: 25000, max: 45000, trend: "↑ 4.1%" },
      "Vasant Vihar": { min: 30000, max: 55000, trend: "↑ 2.8%" },
      "Dwarka": { min: 10000, max: 18000, trend: "↑ 6.2%" },
      "Rohini": { min: 8000, max: 15000, trend: "→ 0.5%" },
    },
    Bangalore: {
      "Koramangala": { min: 15000, max: 25000, trend: "↑ 7.1%" },
      "Indiranagar": { min: 18000, max: 28000, trend: "↑ 5.5%" },
      "Whitefield": { min: 8000, max: 14000, trend: "↑ 8.2%" },
      "Electronic City": { min: 6000, max: 10000, trend: "→ 1.2%" },
    },
  };

  const activeLocalities = cityData[selectedCity];

  const calculatePriceRange = () => {
    if (!selectedLocality || !activeLocalities[selectedLocality]) return "₹0 - ₹0";
    const { min, max } = activeLocalities[selectedLocality];
    const minPrice = min * area;
    const maxPrice = max * area;
    return `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`;
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedLocality(""); // Reset locality when city changes
  };

  return (
    <section
      className="bg-gradient-to-br from-green-50 to-orange-50  text-black py-16 px-4"
      aria-labelledby="top-localities-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2
            id="top-localities-heading"
            className="text-3xl font-bold text-gray-900"
          >
            Top Localities
          </h2>
          <p className="text-gray-600 mt-2">
            Explore price trends in popular localities across major cities
          </p>
          <div className="mt-3 border-b-2 w-16 mx-auto border-yellow-400"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Price Trends */}
          <div
            className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm"
            role="region"
            aria-labelledby="price-trends-heading"
          >
            <h3
              id="price-trends-heading"
              className="text-lg font-semibold text-gray-800 mb-4"
            >
              Price Trends by Locality
            </h3>

            {/* City Selector */}
            <div className="relative w-full mb-4">
              <label
                htmlFor="city"
                className="sr-only"
              >
                Select City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full p-2 border rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.keys(cityData).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  aria-hidden="true"
                  focusable="false"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
            </div>

            {/* Accessible Table */}
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm text-left text-gray-700"
                role="table"
              >
                <thead className="text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th scope="col" className="py-2">Locality</th>
                    <th scope="col" className="py-2">Price Range (Per Sqft)</th>
                    <th scope="col" className="py-2">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(activeLocalities).map(([name, data], index) => {
                    const isPositive = data.trend.includes('↑');
                    return (
                      <tr key={index} className="border-b">
                        <td scope="row" className="py-3 font-medium">{name}</td>
                        <td>₹{data.min.toLocaleString()} - ₹{data.max.toLocaleString()}</td>
                        <td>
                          <span
                            role="status"
                            aria-label={`Trend ${data.trend}`}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              isPositive
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-900"
                            }`}
                          >
                            {data.trend}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Price Calculator */}
          <div
            className="bg-white rounded-lg p-6 shadow-sm"
            role="region"
            aria-labelledby="price-calculator-heading"
          >
            <h3
              id="price-calculator-heading"
              className="text-lg font-semibold text-gray-800 mb-4"
            >
              Price Calculator
            </h3>

            {/* Locality Selector */}
            <div className="mb-4">
              <label
                htmlFor="locality"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Select Locality <span className="text-red-600">*</span>
              </label>
              <div className="relative w-full">
                <select
                  id="locality"
                  aria-required="true"
                  className="w-full p-2 border rounded text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                >
                  <option value="">Select a locality</option>
                  {Object.keys(activeLocalities).map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    aria-hidden="true"
                    focusable="false"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Area Input */}
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Area (in sq. ft.)
              </label>
              <input
                id="area"
                type="number"
                value={area}
                onChange={(e) => setArea(+e.target.value)}
                className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Estimated Price */}
            <div className="mb-4">
              <label
                htmlFor="price-output"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Estimated Price Range:
              </label>
              <div
                id="price-output"
                className="text-lg font-semibold text-gray-800"
                aria-live="polite"
              >
                {calculatePriceRange()}
              </div>
            </div>

            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              Get Detailed Report
            </button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/view"
            className="text-green-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Explore all localities →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopLocalities;
