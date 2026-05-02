import React from "react";
import CommercialListingsPreview from "../components/CommercialListingsPreview";

const Commercial = () => {
  return (
    <div className="pt-10">
      <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Commercial Real Estate"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-blue-400 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Market Hub</span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Commercial Hub<span className="text-blue-600">.</span></h1>
          <p className="text-gray-300 text-sm md:text-lg font-bold uppercase tracking-wide max-w-2xl mx-auto mt-4">
            Strategic institutional assets in India's fastest growing business districts.
          </p>
        </div>
      </div>
      
      <CommercialListingsPreview />
    </div>
  );
};

export default Commercial;
