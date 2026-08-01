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
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-green-150/20 transition-all duration-500 group flex flex-col h-full">
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Top Left: Status */}
        <div className="absolute top-5 left-5">
          <span className="bg-green-100/95 text-green-800 text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-xs">
            {property.status}
          </span>
        </div>

        {/* Top Right: Like & Share */}
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              liked ? "bg-red-500 text-white" : "bg-white/90 text-gray-900 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom: Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 pt-12">
          <div className="flex items-baseline gap-0.5">
            <span className="text-white text-2xl font-bold tracking-tight">
              ₹ {(property.price / 10000000).toFixed(2)}
            </span>
            <span className="text-white/90 text-sm font-semibold ml-0.5">Cr</span>
          </div>
        </div>
      </div>

      {/* TEXT AREA */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Row 1: Name & Location */}
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors leading-snug">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full shrink-0">
            <MapPin className="w-3 h-3 text-green-700" />
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{property.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Row 2: Developer & RERA */}
        <div className="flex justify-between items-center mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="uppercase tracking-wider text-[10px]">{property.developer}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span className="text-[10px] font-semibold text-gray-700 uppercase">RERA Approved</span>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pt-4 border-t border-gray-100">
          {amenities.slice(0, 3).map((amenity, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-gray-50/50 border border-gray-100 pr-2.5 pl-1.5 py-1 rounded-lg">
              <span className="w-5.5 h-5.5 bg-white rounded-md flex items-center justify-center text-green-700 shadow-xs border border-gray-50">
                {React.cloneElement(amenityIcons[amenity] || <Zap size={10} />, { className: "w-3 h-3 text-green-700" })}
              </span>
              <span className="text-[9px] font-semibold text-gray-600 uppercase tracking-wider">{amenity}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1.5 border border-green-700 text-green-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-green-50 transition-all uppercase tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            Brochure
          </button>
          <Link
            to={`/property/${property.id}`}
            className="flex-1 bg-green-700 text-white text-center py-2.5 rounded-xl text-xs font-semibold hover:bg-green-800 transition-all shadow-md shadow-green-150/10 flex items-center justify-center gap-1.5 uppercase tracking-wider group/btn overflow-hidden"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}