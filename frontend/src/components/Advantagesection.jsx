import React from "react";
import steady from "/images/steady_returns.jpg";
import growth from "/images/growth.jpg";
import insight from "/images/insights.jpeg";
import expertassistance from "/images/expert assistance.jpeg";
import time from "/images/time.avif";
import stress from "/images/stress.jpeg";

const advantages = [
  {
    id: 1,
    img: steady,
    alt: "Steady Returns icon",
    title: "Steady returns",
    desc: "Earn reliable returns without day-to-day involvement.",
  },
  {
    id: 2,
    img: growth,
    alt: "Reliable Growth icon",
    title: "Reliable growth",
    desc: "Backed by data and expert analysis for long-term success.",
  },
  {
    id: 3,
    img: insight,
    alt: "Clear Insights icon",
    title: "Clear insights",
    desc: "Track your investment with real-time insights.",
  },
  {
    id: 4,
    img: expertassistance,
    alt: "Expert Assistance icon",
    title: "Expert assistance",
    desc: "Get expert help tailored to your financial goals.",
  },
  {
    id: 5,
    img: time,
    alt: "Long-term Value icon",
    title: "Long-term value",
    desc: "Invest in appreciating assets with strong future value.",
  },
  {
    id: 6,
    img: stress,
    alt: "Stress-free Investing icon",
    title: "Stress-free investing",
    desc: "We handle the complexities while you enjoy the returns.",
  },
];

const Advantage = () => {
  return (
    <section
      className="py-20 px-4 md:px-16 lg:px-24 bg-gradient-to-br from-green-50 to-orange-50 text-black"
      aria-labelledby="advantage-heading"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* Heading */}
        <h2
          id="advantage-heading"
          className="text-4xl font-bold text-gray-900 mb-12"
        >
          Your real estate investment advantage
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
            {advantages.map(({ id, img, alt, title, desc }) => (
              <article
                key={id}
                className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition min-h-[200px]"
                aria-label={title}
              >
                <img
                  src={img}
                  alt={alt}
                  width="40"
                  height="40"
                  loading="lazy"
                  className="w-10 h-10 mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>

          {/* RIGHT: Description & Button */}
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-green-100 to-orange-100 p-8 rounded-2xl shadow-md flex flex-col justify-center">
  {/* Image */}
  <img
    src="/images/House1.jpg"
    alt="Growth icon"
    className="w-full h-70 mb-6"
  />

  {/* Button */}
  <button
    className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg mb-6
      hover:bg-gray-900 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
  >
    Find the best for you
  </button>

  {/* Content */}
  <p className="text-gray-800 text-base leading-relaxed">
    From curated properties to end-to-end management, we simplify
    investing so you can focus on growing your wealth.
  </p>
</div>

        </div>
      </div>
    </section>
  );
};

export default Advantage;
