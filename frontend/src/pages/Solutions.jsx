import React from "react";
import { Link } from "react-router-dom";
import { Key, Home, Banknote, Briefcase } from "lucide-react";

const solutionsData = [
  {
    title: "Buy a Property",
    description: "Explore thousands of verified residential and commercial listings. Find your dream home or next big investment with expert guidance.",
    icon: <Key className="w-10 h-10 text-green-600 mb-4" />,
    path: "/view",
    buttonText: "Explore Listings",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
  },
  {
    title: "Sell Your Property",
    description: "List your property for free and connect with serious, vetted buyers. Get the best market value with our premium listing tools.",
    icon: <Home className="w-10 h-10 text-orange-500 mb-4" />,
    path: "/post-property",
    buttonText: "Post Property Free",
    img: "https://images.unsplash.com/photo-1560026301-883a2461c3bc?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Rent a Space",
    description: "Looking for a temporary home or office? Browse our verified rental listings for flexible, high-quality spaces.",
    icon: <Banknote className="w-10 h-10 text-blue-500 mb-4" />,
    path: "/view",
    buttonText: "Find Rentals",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  },
  {
    title: "Investment Advisory",
    description: "Consult with our RERA registered experts to build a high-yield real estate portfolio. Tailored advice for maximum ROI.",
    icon: <Briefcase className="w-10 h-10 text-purple-600 mb-4" />,
    path: "/contact",
    buttonText: "Get Expert Advice",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  }
];

const Solutions = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3 block">Our Services</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Real Estate Solutions</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive end-to-end services tailored to meet all your property needs under one roof.
          </p>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-[-40px] md:mt-[-80px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionsData.map((solution, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col sm:flex-row hover:shadow-2xl transition-shadow duration-300">
              {/* Image Half */}
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img 
                  src={solution.img} 
                  alt={solution.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content Half */}
              <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  {solution.icon}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {solution.description}
                  </p>
                </div>
                
                <Link 
                  to={solution.path}
                  className="inline-flex items-center justify-center bg-gray-100 text-gray-900 font-medium px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300 mt-auto"
                >
                  {solution.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
