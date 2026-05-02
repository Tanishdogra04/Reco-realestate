import React from "react";
import { useParams, Link } from "react-router-dom";
import { getInsightById } from "../data/insights";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function InsightDetail() {
  const { id } = useParams();
  const insight = getInsightById(id);

  if (!insight) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-xl font-medium text-gray-700">
        Insight not found.
      </div>
    );
  }

  return (
    <article className="bg-[#f8fafc] min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Back button */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <Link to="/insights" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[350px] sm:h-[450px]">
          <img
            src={insight.image}
            alt={insight.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12">
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              <Tag className="w-4 h-4 mr-1.5" />
              {insight.category}
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1.5" />
              {insight.date}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-8">
            {insight.title}
          </h1>

          {/* Body */}
          <div className="prose prose-lg prose-green max-w-none text-gray-700">
            {insight.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>

        </div>
      </div>
    </article>
  );
}
