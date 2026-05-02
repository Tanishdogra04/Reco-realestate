import React from "react";
import { Link } from "react-router-dom";
import { Home, Building2, Factory, Map as MapIcon, ArrowRight } from "lucide-react";

const propertyCategories = [
  {
    title: "Residential",
    description: "Find your perfect home. From luxury villas and high-rise apartments to builder floors and independent houses.",
    icon: <Home className="w-10 h-10 text-green-600 mb-4" />,
    path: "/properties/residential",
    count: "1,200+ Listings",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Commercial",
    description: "Strategic spaces for your business. Office buildings, retail shops, showrooms, and warehouse spaces in prime hubs.",
    icon: <Building2 className="w-10 h-10 text-orange-500 mb-4" />,
    path: "/properties/commercial",
    count: "850+ Listings",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Industrial",
    description: "Expand your manufacturing footprint. Factory spaces, cold storage, and industrial warehouses with high FAR approvals.",
    icon: <Factory className="w-10 h-10 text-blue-500 mb-4" />,
    path: "/properties/industrial",
    count: "320+ Listings",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Plots & Land",
    description: "Build your dream from the ground up. Gated community plots, farmhouses, and industrial land across high-growth corridors.",
    icon: <MapIcon className="w-10 h-10 text-purple-600 mb-4" />,
    path: "/properties/plots",
    count: "500+ Listings",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop"
  }
];

const PropertiesPage = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Property"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3 block">Discover Assets</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Premium Properties</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our curated portfolio of residential, commercial, and industrial assets across India's top markets.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-[-40px] md:mt-[-80px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyCategories.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.path}
              className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item.count}</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                {item.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-green-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Browse Category</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
