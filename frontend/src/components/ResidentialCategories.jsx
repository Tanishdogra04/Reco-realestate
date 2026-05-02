import { Link } from "react-router-dom";

const categories = [
  {
    title: "Apartments",
    subtitle: "High-rise & gated living",
    path: "/listings?category=apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    title: "Builder Floors",
    subtitle: "Low-rise independent floors",
    path: "/listings?category=builder-floor",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    title: "Villas",
    subtitle: "Luxury independent homes",
    path: "/listings?category=villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Residential Plots",
    subtitle: "Land for custom homes",
    path: "/listings?category=plot",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
  },
];

const ResidentialCategories = () => {
  return (
    <section className="pt-14 pb-6 px-6 md:px-12 bg-gray-50">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">
          Explore Residential Properties
        </h2>
        <p className="text-gray-600 mt-2">
          Choose a property category to begin your home search
        </p>
      </div>

      {/* Hybrid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.path}
            className="group bg-white rounded-2xl overflow-hidden
                       border border-gray-100
                       hover:shadow-lg transition-all duration-300
                       flex flex-col"
          >
            {/* Image (lighter + shorter) */}
            <div className="h-32 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col text-center flex-grow">
              <h3 className="text-base font-semibold text-gray-900">
                {cat.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1 mb-4">
                {cat.subtitle}
              </p>

              {/* Lightweight CTA */}
              <span
                className="mt-auto text-sm font-medium text-green-600
                           group-hover:underline"
              >
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ResidentialCategories;
