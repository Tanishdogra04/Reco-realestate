import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "/images/Main_2.avif";

const HeroSection = () => {
  const [selected, setSelected] = useState("Residential");
  const navigate = useNavigate();

  const handleClick = (option) => {
    setSelected(option);
    if (option === "Residential") {
      navigate("/properties/residential");
    } else {
      navigate("/properties/commercial");
    }
  };

  return (
    <div className="w-full">
      {/* Gradient + Heading */}
      <div className="relative pt-2 pb-12 bg-gradient-to-r from-[#FFE5B4] via-white to-[#C8FACC] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-16 after:bg-gradient-to-b after:from-transparent after:to-white">
        
        {/* Heading */}
        <div className="text-center mt-40 md:mt-40 px-6 md:px-12 max-w-4xl mx-auto space-y-6">
          <p className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-wide uppercase leading-snug">
            North India’s Leading and Most Trusted
            <br /> Real Estate Architecture Platform
          </p>
        </div>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-gray-700 text-lg md:text-xl mt-8 text-center">
          Take control of your financial future by diversifying your <br />
          portfolio with secure and high-yield real estate properties.
        </p>
      </div>

      {/* Hero Image with Text + Toggle */}
      <div className="w-screen h-[40vh] relative overflow-hidden">
        <img
          src={mainImage}
          alt="Modern city skyline representing real estate opportunities"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />

        {/* Explore Text Overlay */}
        <p className="absolute top-[-4%] sm:top-[-2] md:top-[-2] left-1/2 -translate-x-1/2 text-center text-gray-800 text-base md:text-lg bg-white/70 px-4 py-2 ">
          Explore over <span className="font-bold text-green-700">5000+</span> properties and invest in your future
        </p>

        {/* Toggle Buttons Centered on Image */}
        <div className="absolute top-[32%] sm:top-[36%] md:top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex bg-gray-200 rounded-full p-1 w-64 sm:w-72 md:w-80 shadow-md">
            {/* Slider */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-green-600 rounded-full transition-transform duration-300 ${
                selected === "Residential" ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>

            <button
              onClick={() => handleClick("Residential")}
              className={`flex-1 z-10 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${
                selected === "Residential" ? "text-white" : "text-gray-700"
              }`}
            >
              Residential
            </button>

            <button
              onClick={() => handleClick("Commercial")}
              className={`flex-1 z-10 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 ${
                selected === "Commercial" ? "text-white" : "text-gray-700"
              }`}
            >
              Commercial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
