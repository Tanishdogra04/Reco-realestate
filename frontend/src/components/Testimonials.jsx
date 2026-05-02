import React from "react";

const testimonials = [
  {
    name: "Vikram Ahuja",
    role: "NRI Investor",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    text: "RECO made remote property investment seamless. Their transparent process and curated commercial listings gave me complete confidence to invest from Dubai.",
  },
  {
    name: "Sneha & Rahul",
    role: "First-time Homebuyers",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Finding our first home felt overwhelming until we used this platform. The neighborhood insights and verified listings saved us countless hours of searching.",
  },
  {
    name: "Rajeev Sharma",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    text: "We needed a premium office space in Gurgaon fast. The team's deep market knowledge and quick negotiation process helped us close the deal in under two weeks.",
  },
  {
    name: "Priya Desai",
    role: "Property Seller",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Selling my luxury villa was a breeze. The premium listing tools and extensive network of vetted buyers ensured I got the best market price without the usual hassle.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-orange-50 py-20 px-6 text-black">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Customer Testimonials
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Hear what our happy clients have to say about their experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-12">
        {testimonials.map((t, index) => (
          <article
            key={index}
            className="relative bg-white shadow-lg rounded-xl p-6 pt-12"
          >
            {/* Name + Role Banner */}
            <div className="absolute top-0 left-0 bg-emerald-600 text-white px-4 py-2 rounded-br-xl text-sm font-semibold">
              <p>{t.name}</p>
              <p className="text-xs font-normal">{t.role}</p>
            </div>

            {/* Optimized Image */}
            <img
              src={t.image}
              alt={`${t.name}, ${t.role}`}
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
              className="w-16 h-16 rounded-full absolute -top-8 right-4 border-4 border-white shadow object-cover"
            />

            {/* Stars */}
            <div className="mt-8 text-yellow-400 flex text-2xl" aria-label={`Rating: ${t.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < t.rating ? "★" : "☆"}</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="mt-2 text-gray-700 text-sm leading-relaxed">{t.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
