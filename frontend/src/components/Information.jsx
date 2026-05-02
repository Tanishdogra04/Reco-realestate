import React from "react";
import { Link } from "react-router-dom";
import insight4 from "/images/insight4.jpeg"
import insight3 from "/images/insight-3.jpeg"
import insight1 from "/images/Market-trends.jpeg"
import investment22 from "/images/investment22.jpeg"
const Information = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-orange-50  text-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Real Estate Insights</h2>
          <p className="text-gray-600 mt-2">
            Stay informed with the latest trends and insights in the real estate industry
          </p>
          <div className="mt-4 border-b-2 w-16 mx-auto border-yellow-400"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4">
            <img
              src={insight1}
              alt="Insight 1"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
                Market Trends
              </span>
              <span>Mar 15, 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              The Future of Real Estate in Post-Pandemic India
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              How the pandemic has changed the real estate landscape in India and
              what to expect in the coming years.
            </p>
            <Link
              to="/insight/1"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4">
            <img
              src={investment22}
              alt="Insight 2"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
                Investment
              </span>
              <span>Feb 28, 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Top 10 Emerging Localities for Investment in 2025
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Discover the up-and-coming areas across India that promise high
              returns on real estate investments.
            </p>
            <Link
              to="/insight/2"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4">
            <img
              src={insight3}
              alt="Insight 3"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
                Trends
              </span>
              <span>Jan 20, 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sustainable Construction: The New Norm in Indian Real Estate
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              How eco-friendly practices are shaping the future of construction
              in India.
            </p>
            <Link
              to="/insight/3"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4">
            <img
              src={insight4}
              alt="Insight 4"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">
                Investment
              </span>
              <span>Jan 5, 2025</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Understanding REITs: A Modern Investment Avenue
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              A comprehensive guide to Real Estate Investment Trusts and their
              growing popularity in India.
            </p>
            <Link
              to="/insight/4"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            to="/insights"
            className="inline-block bg-green-200 text-gray-700 font-medium px-6 py-2 rounded-full hover:bg-green-800 hover:text-white transition"
          >
            View All Insights &gt;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Information;
