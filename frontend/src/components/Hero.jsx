import React from "react";
import house2 from "/images/house2.jpeg"; 

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-orange-50 text-black px-6 md:px-20 py-12">
      {/* Stats Row */}
      <div className="flex flex-wrap justify-center md:justify-between gap-6 mb-16 text-center">
        {[
          { value: "₹500M+", label: "TOTAL INVESTMENTS" },
          { value: "10K+", label: "PROPERTIES MANAGED" },
          { value: "100K+", label: "REGISTERED MEMBERS" },
          { value: "8–10%", label: "AVERAGE ANNUAL ROI" },
        ].map((stat, idx) => (
          <div key={idx}>
            <p className="text-4xl font-bold text-black">{stat.value}</p>
            <p className="text-lg text-gray-800 tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Unlock the <br /> numbers behind <br /> smart property <br /> investments
          </h1>
          <p className="text-gray-800 mb-6">
            Find the best property from the market. We analyze all the
            properties and pick the best for you.
          </p>
          <button
            aria-label="Find the best property for you"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            Find the best for you
          </button>
        </div>

        {/* Visual cards */}
        <div className="flex gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-1/2">
            {/* Card 1 */}
            <div className="relative flex justify-center items-center">
              <div className="absolute left-0 w-full max-w-md h-48 bg-gray-200 rounded-2xl z-0 -translate-x-2" />
              <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl z-10 translate-x-2">
                <p className="text-green-700 font-semibold text-lg mb-1">Reco</p>
                <p className="text-lg font-medium text-black">AI optimization</p>
                <div className="mt-4 flex justify-center items-center gap-2">
                  <label htmlFor="property-search" className="sr-only">
                    Ask for best property suggestion
                  </label>
                  <input
                    id="property-search"
                    type="text"
                    placeholder="Ask for best property suggestion"
                    className="px-3 py-2 border rounded-full text-sm w-2/3"
                  />
                  <button
                    aria-label="Ask AI for best property suggestion"
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700"
                  >
                    Ask
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                <div className="text-green-600 text-3xl" aria-hidden="true">💡</div>
                <div>
                  <p className="text-2xl font-bold text-black">95%</p>
                  <p className="text-sm text-gray-800">INVESTOR TRUST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute inset-0 -translate-x-4 translate-y-4 bg-gray-200 rounded-2xl z-0" />
            <div className="relative bg-white rounded-2xl shadow-xl z-10 overflow-hidden">
              <img
                src={house2}
                alt="Luxury oceanfront property exterior view"
                width={400}
                height={200}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Multi-family
                </span>
                <h2 className="font-semibold text-lg text-gray-900 mb-1">
                  Luxury Oceanfront
                </h2>
                <p className="text-sm text-gray-800 mb-2">
                  <span aria-hidden="true">📍</span> Miami, Florida
                </p>
                <div className="flex items-center text-xs text-gray-700 gap-3">
                  <span><span aria-hidden="true">🏠</span> 1,500 sq.ft.</span>
                  <span aria-hidden="true">•</span>
                  <span><span aria-hidden="true">🛏</span> 3 Bed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
