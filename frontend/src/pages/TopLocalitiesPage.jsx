import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Building, Landmark, Compass } from "lucide-react";

const localitiesData = [
  {
    title: "Delhi NCR",
    description: "The capital's thriving real estate hub. Discover premium commercial spaces in Gurugram, luxury villas in South Delhi, and high-yield investments in Noida.",
    icon: <Landmark className="w-8 h-8 text-orange-500 mb-3" />,
    path: "/view",
    buttonText: "Explore Delhi NCR",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Mumbai",
    description: "The financial capital of India. Explore sea-facing luxury apartments in South Bombay, bustling commercial hubs in BKC, and upcoming suburbs.",
    icon: <Building className="w-8 h-8 text-blue-500 mb-3" />,
    path: "/view",
    buttonText: "Explore Mumbai",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Bangalore",
    description: "India's Silicon Valley. Find state-of-the-art IT parks in Electronic City, premium residential gated communities in Whitefield, and trendy startup spaces.",
    icon: <Compass className="w-8 h-8 text-green-600 mb-3" />,
    path: "/view",
    buttonText: "Explore Bangalore",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop"
  },
  {
    title: "Pune",
    description: "The Oxford of the East. A rapidly growing IT and manufacturing hub with excellent residential options, green spaces, and high ROI potential.",
    icon: <MapPin className="w-8 h-8 text-purple-600 mb-3" />,
    path: "/view",
    buttonText: "Explore Pune",
    img: "https://images.unsplash.com/photo-1598977123118-4e50bb6c469f?q=80&w=2070&auto=format&fit=crop"
  }
];

const TopLocalitiesPage = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Cityscape"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3 block">Premium Markets</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Top Localities</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the most sought-after real estate markets across India. Invest in high-growth corridors.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-[-40px] md:mt-[-80px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {localitiesData.map((loc, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={loc.img} 
                  alt={loc.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                    {loc.icon}
                  </div>
                  <h3 className="text-3xl font-bold">{loc.title}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6 min-h-[80px]">
                  {loc.description}
                </p>
                
                <Link 
                  to={loc.path}
                  className="inline-flex items-center justify-center w-full bg-gray-100 text-gray-900 font-medium px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300"
                >
                  {loc.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopLocalitiesPage;
