import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  Waves,
  Zap,
  Wind,
  ParkingCircle,
  ShieldAlert,
  Droplets,
  Truck
} from "lucide-react";

export default function CardProperty({ property }) {
  const [liked, setLiked] = useState(false);

  const amenityIcons = {
    "Gym": <Zap className="w-3 h-3" />,
    "Pool": <Waves className="w-3 h-3" />,
    "Security": <ShieldAlert className="w-3 h-3" />,
    "Parking": <ParkingCircle className="w-3 h-3" />,
    "Power": <Zap className="w-3 h-3" />,
    "Water": <Droplets className="w-3 h-3" />,
    "Road Access": <Truck className="w-3 h-3" />,
    "AC": <Wind className="w-3 h-3" />,
  };

  const amenities = property.amenities || ["Gym", "Pool", "Security"];

  const handleShare = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
    alert("Property link copied to clipboard!");
  };

  const handleDownload = (e) => {
    e.preventDefault();
    alert("Preparing your brochure for download...");
    setTimeout(() => {
      window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-green-100/40 transition-all duration-500 group flex flex-col h-full">
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Top Left: Status */}
        <div className="absolute top-5 left-5">
          <span className="bg-green-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
            {property.status}
          </span>
        </div>

        {/* Top Right: Like & Share */}
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${
              liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-900 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom: Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12">
          <div className="flex items-baseline gap-1">
            <span className="text-white text-3xl font-black tracking-tighter">
              ₹ {(property.price / 10000000).toFixed(2)}
            </span>
            <span className="text-white/80 text-lg font-bold">Cr</span>
          </div>
        </div>
      </div>

      {/* TEXT AREA */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Row 1: Name & Location */}
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-black text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors leading-tight">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full shrink-0">
            <MapPin className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{property.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Row 2: Developer & RERA */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">{property.developer}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[9px] font-black text-gray-900 uppercase tracking-tighter">RERA: {property.rera || "REG12345"}</span>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pt-5 border-t border-gray-50">
          {amenities.slice(0, 3).map((amenity, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50/50 border border-gray-100 pr-3 pl-1.5 py-1.5 rounded-xl">
              <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-green-600 shadow-sm border border-gray-50">
                {amenityIcons[amenity] || <Zap size={12} />}
              </span>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{amenity}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 py-3.5 rounded-2xl text-[10px] font-black hover:bg-green-50 transition-all uppercase tracking-widest"
          >
            <Download className="w-4 h-4" />
            Brochure
          </button>
          <Link
            to={`/property/${property.id}`}
            className="flex-1 bg-green-600 text-white text-center py-4 rounded-2xl text-[10px] font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 uppercase tracking-widest group/btn overflow-hidden"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}