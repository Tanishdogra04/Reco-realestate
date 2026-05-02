import React, { useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import newproperty from "/images/new-projectcard1.jpg";
import ready from "/images/ready_card2.jpg";
import luxury from "/images/luxury_card3.jpeg"
import budget from "/images/budget_friendly.webp"
import condo from "/images/condmoniyum.jpeg";
import build from "/images/builder floor.jpeg";
import bach from "/images/bachelor.jpeg"
import House1 from "/images/House1.jpg"
import office from "/images/office.jpg";
import land from "/images/land.jpg"
import { apartmentListings } from "../data/properties";
import { Heart } from "lucide-react";

export default function PropertySection() {

  const [favorites, setFavorites] = React.useState(() => {
    return JSON.parse(localStorage.getItem("savedProperties")) || [];
  });

  const handleFavorite = (id) => {
    const updated = favorites.includes(id) 
      ? favorites.filter((fid) => fid !== id) 
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollContainer");
    const scrollLeft = document.getElementById("scrollLeft");
    const scrollRight = document.getElementById("scrollRight");

    if (scrollLeft && scrollRight && scrollContainer) {
      scrollLeft.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
      });

      scrollRight.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
      });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".property-card");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");

        filterButtons.forEach((b) => {
          b.classList.remove("bg-blue-900", "text-white");
          b.classList.add("bg-white", "text-black");
        });

        btn.classList.add("bg-blue-900", "text-white");
        btn.classList.remove("bg-white", "text-black");

        cards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");
          card.style.display =
            category === "all" || cardCategory === category ? "block" : "none";
        });
      });
    });
  }, []);

  return (
    <>
      {/* Curated Collections Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Curated Collections
          </h2>
          <p className="text-gray-600">
            Explore prime properties based on your recommendation
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* LEFT BUTTON */}
          <button
            id="scrollLeft"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            ◀
          </button>

          {/* RIGHT BUTTON */}
          <button
            id="scrollRight"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200"
          >
            ▶
          </button>

          {/* Scrollable Container */}
          <div
            id="scrollContainer"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 max-w-7xl mx-auto"
          >
            {/* Card 1 */}
           <Link to="/new-project">
  <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
    <img
      src={newproperty}
      alt="New Projects"
      className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-white text-xl font-bold drop-shadow-lg">
        New Projects
      </h3>
    </div>
  </div>
</Link>

            {/* Card 2 */}
             <Link to="/ready-to-move">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={ready}
                  alt="New Projects"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Ready to Move
                  </h3>
                </div>
              </div>
            </Link>
            {/* card 3 */}
              <Link to="/luxury">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={luxury}
                  alt="luxury projects"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Luxury
                  </h3>
                </div>
              </div>
            </Link>
            {/* Card 4 */}
            <Link to="/collection/budget-friendly">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={budget}
                  alt="Budget-Friendly"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Budget-Friendly
                  </h3>
                </div>
              </div>
            </Link>
            {/* card 5 */}
            <Link to="/collection/condominiums">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={condo}
                  alt="Condominiums"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Condominiums
                  </h3>
                </div>
              </div>
            </Link>
            {/* Card 6 */}
            <Link to="/collection/builder-floor">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={build}
                  alt="Builder Floor"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Builder Floor
                  </h3>
                </div>
              </div>
            </Link>
            {/* Card 7 */}
            <Link to="/collection/bachelors">
              <div className="min-w-[250px] relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer group">
                <img
                  src={bach}
                  alt="Bachelors"
                  className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold drop-shadow-lg">
                    Bachelors
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      
     {/* Hot Properties Section */}
<section className="max-w-7xl mx-auto px-4 py-12">
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold">Hot Properties</h2>
    <p className="text-gray-600 mt-2">
      Explore our most sought-after properties across India
    </p>
    <div className="mt-4 border-b-2 w-16 mx-auto border-yellow-400"></div>
  </div>

  {/* Filters */}
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    <button
      className="filter-btn bg-blue-900 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-800 transition"
      data-category="all"
    >
      All
    </button>
    <button
      className="filter-btn bg-white border border-gray-300 text-black px-4 py-2 rounded-full hover:bg-blue-100 transition"
      data-category="residential"
    >
      Residential
    </button>
    <button
      className="filter-btn bg-white border border-gray-300 text-black px-4 py-2 rounded-full hover:bg-blue-100 transition"
      data-category="commercial"
    >
      Commercial
    </button>
    <button
      className="filter-btn bg-white border border-gray-300 text-black px-4 py-2 rounded-full hover:bg-blue-100 transition"
      data-category="industrial"
    >
      Industrial
    </button>
    <button
      className="filter-btn bg-white border border-gray-300 text-black px-4 py-2 rounded-full hover:bg-blue-100 transition"
      data-category="investment"
    >
      Investment
    </button>
  </div>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Residential Card */}
    <div className="property-card bg-white border border-yellow-400 rounded-xl overflow-hidden shadow-md" data-category="residential">
      <div className="relative">
        <img src={House1} alt="Luxury Villa" className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          Independent House
        </span>
        <button 
          onClick={() => handleFavorite(1)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <Heart size={18} className={favorites.includes(1) ? "text-red-500 fill-current" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <span className="text- bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
          Residential
        </span>
        <h3 className="mt-2 font-semibold text-gray-900">Luxury Villa in South Delhi</h3>
        <p className="text-sm text-gray-500 mb-2">📍 South Delhi, Delhi</p>
        <div className="flex text-sm text-gray-600 space-x-4 mb-2">
          <span>2 & 3 BHK</span>
          <span>4500 sqft</span>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p><strong>Price:</strong> ₹2.50 Cr</p>
          <p><strong>Possession:</strong> Immediate</p>
        </div>
        <div className="flex justify-between space-x-2">
          <Link to="/property/1" className="flex-1 bg-blue-100 text-blue-800 text-center text-sm font-medium py-2 rounded hover:bg-blue-200 transition">View Details</Link>
          <a href="/image/house_3.jpg" download className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium py-2 rounded hover:bg-blue-200 transition">
            <Download className="w-4 h-4" /><span>Brochure</span>
          </a>
        </div>
      </div>
    </div>

    {/* Commercial Card */}
    <div className="property-card bg-white border border-yellow-400 rounded-xl overflow-hidden shadow-md" data-category="commercial">
      <div className="relative">
        <img src={office} alt="Office Space" className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
          Office Space
        </span>
        <button 
          onClick={() => handleFavorite(8)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <Heart size={18} className={favorites.includes(8) ? "text-red-500 fill-current" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full ">
          Commercial
        </span>
        <h3 className="mt-2 font-semibold text-gray-900">Premium Office Space in Gurgaon</h3>
        <p className="text-sm text-gray-500 mb-2">📍 Gurgaon, Haryana</p>
        <div className="flex text-sm text-gray-600 space-x-4 mb-2">
          <span>Fully Furnished</span>
          <span>2000 sqft</span>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p><strong>Price:</strong> ₹1.20 Cr</p>
          <p><strong>Possession:</strong> Ready to Move</p>
        </div>
        <div className="flex justify-between space-x-2">
          <Link to="/property/8" className="flex-1 bg-blue-100 text-blue-800 text-center text-sm font-medium py-2 rounded hover:bg-blue-200 transition">View Details</Link>
          <a href="/image/office_brochure.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium py-2 rounded hover:bg-blue-200 transition">
            <Download className="w-4 h-4" /><span>Brochure</span>
          </a>
        </div>
      </div>
    </div>

    {/* Industrial Card */}
    <div className="property-card bg-white border border-yellow-400 rounded-xl overflow-hidden shadow-md" data-category="industrial">
      <div className="relative">
        <img src={land} alt="Factory Land" className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          Industrial Plot
        </span>
        <button 
          onClick={() => handleFavorite(15)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <Heart size={18} className={favorites.includes(15) ? "text-red-500 fill-current" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full ">
          Industrial
        </span>
        <h3 className="mt-2 font-semibold text-gray-900">Industrial Land in Noida</h3>
        <p className="text-sm text-gray-500 mb-2">📍 Noida, Uttar Pradesh</p>
        <div className="flex text-sm text-gray-600 space-x-4 mb-2">
          <span>Plot Size: 10 Acres</span>
          <span>FAR Approved</span>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p><strong>Price:</strong> ₹15 Cr</p>
          <p><strong>Possession:</strong> Immediate</p>
        </div>
        <div className="flex justify-between space-x-2">
          <Link to="/property/15" className="flex-1 bg-blue-100 text-blue-800 text-center text-sm font-medium py-2 rounded hover:bg-blue-200 transition">View Details</Link>
          <a href="/image/industrial_brochure.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium py-2 rounded hover:bg-blue-200 transition">
            <Download className="w-4 h-4" /><span>Brochure</span>
          </a>
        </div>
      </div>
    </div>

    {/* Investment Card */}
    <div className="property-card bg-white border border-yellow-400 rounded-xl overflow-hidden shadow-md" data-category="investment">
      <div className="relative">
        <img src={land} alt="Investment Plot" className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          Investment Plot
        </span>
        <button 
          onClick={() => handleFavorite(16)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <Heart size={18} className={favorites.includes(16) ? "text-red-500 fill-current" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Investment
        </span>
        <h3 className="mt-2 font-semibold text-gray-900">Premium Investment Plot in Jaipur</h3>
        <p className="text-sm text-gray-500 mb-2">📍 Jaipur, Rajasthan</p>
        <div className="flex text-sm text-gray-600 space-x-4 mb-2">
          <span>Size: 1800 sqft</span>
          <span>Gated Community</span>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p><strong>Price:</strong> ₹75 Lakhs</p>
          <p><strong>Possession:</strong> In 6 Months</p>
        </div>
        <div className="flex justify-between space-x-2">
          <Link to="/property/16" className="flex-1 bg-blue-100 text-blue-800 text-center text-sm font-medium py-2 rounded hover:bg-blue-200 transition">View Details</Link>
          <a href="/image/investment_brochure.pdf" download className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium py-2 rounded hover:bg-blue-200 transition">
            <Download className="w-4 h-4" /><span>Brochure</span>
          </a>
        </div>
      </div>
    </div>

  </div>

  {/* View All Button */}
  <div className="mt-8 text-center col-span-full">
    <Link
      to="/properties"
      className="inline-block bg-green-400 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition"
    >
      View All Properties
    </Link>
  </div>
</section>

    </>
  );
}
