import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getApartmentById } from "../data/properties";
import {
  MapPin, BedDouble, Bath, Ruler, Download, CheckCircle, Waves, Dumbbell, 
  Trees, ShieldCheck, Home, Car, Building2, Coffee, Zap, Droplet, MonitorSmartphone, Map, Heart
} from "lucide-react";

// Section Wrapper Component
const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-8 shadow-sm border mt-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">{title}</h2>
    {children}
  </div>
);

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const property = getApartmentById(id);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!localStorage.getItem("token");

  const [current, setCurrent] = useState(0);
  const [activePlan, setActivePlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerData, setOfferData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("savedProperties")) || [];
  });

  const isFavorited = favorites.includes(Number(id));

  const toggleFavorite = () => {
    const updated = isFavorited 
      ? favorites.filter(fid => fid !== Number(id))
      : [...favorites, Number(id)];
    setFavorites(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  const handleRequestOffer = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { 
        state: { 
          from: location, 
          message: "Please login to request an exclusive offer and unlock best prices." 
        } 
      });
      return;
    }
    
    alert(`✅ Success! Our team will contact you shortly at ${offerData.phone} with the best offer for ${property.title}.`);
  };

  if (!property) {
    return <div className="max-w-4xl mx-auto p-10 text-center text-xl mt-20">Property not found</div>;
  }

  // Dynamic image gallery based on category (using unsplash placeholders if needed)
  let images = [property.image];
  if (property.category === "residential") {
    images.push("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c");
    images.push("https://images.unsplash.com/photo-1600573472591-ee6b68d14c68");
  } else if (property.category === "commercial") {
    images.push("https://images.unsplash.com/photo-1497366216548-37526070297c");
    images.push("https://images.unsplash.com/photo-1497366811353-6870744d04b2");
  } else {
    images.push("https://images.unsplash.com/photo-1500382017468-9049fed747ef");
    images.push("https://images.unsplash.com/photo-1416331108676-a22ccb276e35");
  }

  const isResidential = property.category === "residential";
  const isCommercial = property.category === "commercial";
  const isLand = property.category === "industrial" || property.category === "investment";

  const getAmenities = () => {
    if (isCommercial) {
      return [
        { icon: <MonitorSmartphone size={22} />, label: "Smart Access" },
        { icon: <Coffee size={22} />, label: "Cafeteria" },
        { icon: <Building2 size={22} />, label: "Conference Rooms" },
        { icon: <Zap size={22} />, label: "100% Power Backup" },
        { icon: <Car size={22} />, label: "Reserved Parking" },
        { icon: <ShieldCheck size={22} />, label: "24x7 Security" },
      ];
    }
    if (isLand) {
      return [
        { icon: <Map size={22} />, label: "Wide Access Roads" },
        { icon: <Zap size={22} />, label: "Power Grid Access" },
        { icon: <Droplet size={22} />, label: "Water Connection" },
        { icon: <ShieldCheck size={22} />, label: "Gated Perimeter" },
        { icon: <Trees size={22} />, label: "Landscaped Outer Area" },
        { icon: <CheckCircle size={22} />, label: "Clear Title" },
      ];
    }
    // Default Residential
    return [
      { icon: <Waves size={22} />, label: "Swimming Pool" },
      { icon: <Dumbbell size={22} />, label: "Modern Gymnasium" },
      { icon: <Trees size={22} />, label: "Landscaped Gardens" },
      { icon: <ShieldCheck size={22} />, label: "24x7 Security" },
      { icon: <Home size={22} />, label: "Clubhouse" },
      { icon: <CheckCircle size={22} />, label: "Children Play Area" },
    ];
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto">

        {/* IMAGE GALLERY  */}
        <div className="bg-white rounded-xl overflow-hidden border mb-8">
          <div className="relative h-[300px] sm:h-[420px]">
            <img src={images[current]} className="w-full h-full object-cover" alt="" />
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded">
              {current + 1} / {images.length}
            </div>
          </div>
          <div className="flex gap-3 p-4 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrent(i)}
                className={`w-24 h-16 object-cover rounded cursor-pointer ${current === i ? "ring-2 ring-green-600" : ""}`}
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/*LEFT CONTENT  */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* PROPERTY HEADER */}
            <div className="bg-white p-8 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">{property.title}</h1>
                  <div className="flex items-center text-gray-500 mt-2 text-lg">
                    <MapPin size={18} className="mr-2 text-green-600" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex justify-end gap-3 mt-2">
                    <button 
                      onClick={toggleFavorite}
                      className={`p-2 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isFavorited ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                      {isFavorited ? "Saved" : "Save Asset"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Summary Row */}
              <div className="flex flex-wrap gap-8 mt-6 text-gray-700 border-t pt-6">
                
                {isResidential && (
                  <>
                    <div className="flex items-center gap-2 font-medium">
                      <BedDouble size={20} className="text-green-600" />
                      {property.bhk} BHK
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <Bath size={20} className="text-green-600" />
                      Multiple Bathrooms
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <Ruler size={20} className="text-green-600" />
                      {property.area} sq.ft
                    </div>
                  </>
                )}

                {isCommercial && (
                  <>
                    <div className="flex items-center gap-2 font-medium">
                      <Building2 size={20} className="text-green-600" />
                      {property.furnishing}
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <Ruler size={20} className="text-green-600" />
                      {property.area} sq.ft
                    </div>
                  </>
                )}

                {isLand && (
                  <>
                    <div className="flex items-center gap-2 font-medium">
                      <Map size={20} className="text-green-600" />
                      {property.plotSize} {property.category === "investment" ? "sqft" : ""}
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <ShieldCheck size={20} className="text-green-600" />
                      {property.zoning}
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* OVERVIEW */}
            <Section title="Overview">
              <p className="text-gray-700 leading-relaxed mb-8">
                {property.title} is a premium {property.category} property located in {property.location}.
                {isResidential && " Perfect for modern families looking for comfort and luxury."}
                {isCommercial && " Designed to elevate your business operations with state-of-the-art facilities."}
                {isLand && " An excellent opportunity for future development and high-yield investment."}
              </p>
              <div className="border-t my-6"></div>
              <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 text-sm text-gray-700">
                <div>
                  <span className="text-gray-500">Developer</span>
                  <p className="font-medium mt-1">{property.developer}</p>
                </div>
                <div>
                  <span className="text-gray-500">Project Type</span>
                  <p className="font-medium mt-1 capitalize">{property.category}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <p className="font-medium mt-1">{property.status}</p>
                </div>
                
                {isResidential && (
                  <>
                    <div>
                      <span className="text-gray-500">Configuration</span>
                      <p className="font-medium mt-1">{property.bhk} BHK</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Area</span>
                      <p className="font-medium mt-1">{property.area} sq.ft</p>
                    </div>
                  </>
                )}

                {isCommercial && (
                  <>
                    <div>
                      <span className="text-gray-500">Furnishing</span>
                      <p className="font-medium mt-1">{property.furnishing}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Super Built-up Area</span>
                      <p className="font-medium mt-1">{property.area} sq.ft</p>
                    </div>
                  </>
                )}

                {isLand && (
                  <>
                    <div>
                      <span className="text-gray-500">Plot Size</span>
                      <p className="font-medium mt-1">{property.plotSize}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Zoning/Approval</span>
                      <p className="font-medium mt-1">{property.zoning}</p>
                    </div>
                  </>
                )}

              </div>
            </Section>

            {/* AMENITIES */}
            <Section title="Key Features & Amenities">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {getAmenities().map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 border rounded-xl hover:shadow-md transition duration-300 bg-gray-50">
                    <div className="text-green-600">{item.icon}</div>
                    <div className="text-gray-800 font-medium text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* FLOOR PLANS / LAYOUT - Hide for Land */}
            {!isLand && (
              <Section title={isResidential ? "Floor Plans" : "Layout Plans"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Plan 1 */}
                  <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-[28px] p-8 shadow-sm hover:shadow-xl transition duration-500">
                    <div className="flex items-center gap-4 mb-6 text-green-700">
                      <div className="bg-green-100 p-3 rounded-full">
                        {isResidential ? <Home size={24} /> : <Building2 size={24} />}
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {isResidential ? "Standard Layout" : "Office Floor Plan"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 mb-6">
                      <Ruler size={18} />
                      <span className="text-base">{property.area} sq.ft</span>
                    </div>
                    <button onClick={() => { setActivePlan("/images/twobhkfloor.png"); setIsModalOpen(true); }} className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md">
                      View Plan
                    </button>
                  </div>
                </div>
              </Section>
            )}

            {/* LOCATION ADVANTAGE */}
            <Section title="Location Advantage">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT CONTENT */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-700">Property Address</h3>
                    <p className="text-gray-600 leading-relaxed">{property.title}, {property.location}, India</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Connectivity & Transport</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• 5 mins from main highway</li>
                      <li>• Excellent access to public transport</li>
                      <li>• Close to major transit hubs</li>
                    </ul>
                  </div>
                </div>
                {/* RIGHT SIDE MAP */}
                <div className="border rounded-2xl overflow-hidden shadow-sm h-full min-h-[300px]">
                  <iframe
                    title="Property Location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </Section>

          </div>

          {/*  RIGHT CONTACT PANEL  */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-24 bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-3xl p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-green-700">Get the Best Offer</h3>
                <p className="text-sm text-gray-600 mt-2">Unlock exclusive pricing, payment plans & early-buyer benefits.</p>
              </div>
              <div className="bg-green-100 text-green-700 text-xs px-4 py-2 rounded-lg font-medium text-center">
                Limited inventory available • Enquire for latest price
              </div>
              <form onSubmit={handleRequestOffer} className="space-y-4">
                <input 
                  placeholder="Full Name" 
                  value={offerData.fullName}
                  onChange={(e) => setOfferData({...offerData, fullName: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
                <input 
                  placeholder="Phone Number" 
                  value={offerData.phone}
                  onChange={(e) => setOfferData({...offerData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required
                />
                <input 
                  placeholder="Email Address" 
                  value={offerData.email}
                  onChange={(e) => setOfferData({...offerData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  type="email"
                  required
                />
                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md">
                  Request Best Price
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute -top-4 -right-4 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black">✕</button>
            <div className="px-8 py-5 border-b bg-green-50 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-green-700">Plan Preview</h3>
            </div>
            <div className="p-8 flex justify-center bg-white">
              <img src={activePlan} alt="Plan" className="max-h-[450px] w-auto object-contain rounded-xl border shadow-sm" />
            </div>
            <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">Close</button>
              <a href={activePlan} download className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
                <Download size={18} /> Download Plan
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
