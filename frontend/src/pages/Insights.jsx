import React from "react";
import { Link } from "react-router-dom";
import { getAllInsights } from "../data/insights";
import { TrendingUp, BookOpen, BarChart2, ArrowRight } from "lucide-react";

export default function Insights() {
  const insights = getAllInsights();

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
          alt="Data and Trends"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3 block">Market Intelligence</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Insights & Trends</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Stay ahead of the curve with expert analysis, market reports, and the latest real estate trends.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-[-40px] md:mt-[-80px] relative z-20">
        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Price Trends", value: "+12.4%", icon: <TrendingUp className="text-green-600" />, desc: "Average annual growth" },
            { label: "Market Reports", value: "50+", icon: <BarChart2 className="text-blue-600" />, desc: "Expert analysis published" },
            { label: "Investment Guides", value: "Free", icon: <BookOpen className="text-orange-500" />, desc: "Downloadable resources" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-5">
              <div className="bg-gray-50 p-4 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-400">{stat.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
              <Link to={`/insight/${insight.id}`} className="block relative h-56 overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-sm">
                    {insight.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-400 mb-4">
                  <span>{insight.date}</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors">
                  <Link to={`/insight/${insight.id}`}>
                    {insight.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <Link
                  to={`/insight/${insight.id}`}
                  className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
