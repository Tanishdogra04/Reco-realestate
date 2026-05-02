import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Video, Map, ArrowRight } from "lucide-react";

const eventsData = [
  {
    title: "Property Expos",
    description: "Join us at our exclusive real estate expos. Meet top developers, explore scale models, and get access to pre-launch offers in person.",
    icon: <Calendar className="w-10 h-10 text-orange-500 mb-4" />,
    path: "/contact",
    buttonText: "View Upcoming Expos",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Exclusive Webinars",
    description: "Participate in expert-led digital sessions. Learn about market trends, ROI strategies, and legal frameworks from the comfort of your home.",
    icon: <Video className="w-10 h-10 text-blue-500 mb-4" />,
    path: "/contact",
    buttonText: "Register for Webinars",
    img: "https://images.unsplash.com/photo-1611348586840-fa91ec1b5f7e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Guided Site Visits",
    description: "Schedule a personalized, guided tour of our premium properties. Experience the architecture, amenities, and neighborhood firsthand.",
    icon: <Map className="w-10 h-10 text-green-600 mb-4" />,
    path: "/contact",
    buttonText: "Book a Site Visit",
    img: "https://images.unsplash.com/photo-1628611225249-6c478a8ee461?q=80&w=2070&auto=format&fit=crop"
  }
];

const EventsPage = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop" 
          alt="Event Hall"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.3]"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3 block">Connect With Us</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Upcoming Events</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Engage with industry leaders, discover investment opportunities, and experience properties through our curated events.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 mt-[-40px] md:mt-[-80px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsData.map((event, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  {event.icon}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {event.description}
                  </p>
                </div>
                
                <Link 
                  to={event.path}
                  className="inline-flex items-center justify-between text-green-700 font-semibold group-hover:text-green-500 transition-colors duration-300"
                >
                  <span>{event.buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
