import { useRef } from "react";
import luxuryHero from "/images/luxury_card3.jpeg";

const Luxury = () => {
  const priceRef = useRef(null);
  const planRef = useRef(null);
  const amenitiesRef = useRef(null);
  const galleryRef = useRef(null);
  const locationRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#faf9f6]">
      {/* HERO SECTION */}
      <div className="relative h-[520px] w-full">
        <img
          src={luxuryHero}
          alt="Luxury Project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white max-w-xl">
          <span className="bg-yellow-500 text-black px-4 py-1 text-xs font-semibold rounded">
            PRE LAUNCH
          </span>
          <h1 className="mt-4 text-4xl font-bold">
            HG Tuscan Lanes
          </h1>
          <p className="mt-2 text-sm opacity-90">
            Zirakpur–Patiala Highway, Banur • By HG Group
          </p>
        </div>
      </div>

      {/* STICKY NAV */}
      <div className="sticky top-16 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex gap-6 py-3 text-sm font-medium">
          <button onClick={() => scrollTo(priceRef)} className="hover:text-green-600">
            Price
          </button>
          <button onClick={() => scrollTo(planRef)} className="hover:text-green-600">
            Site & Floor Plan
          </button>
          <button onClick={() => scrollTo(amenitiesRef)} className="hover:text-green-600">
            Amenities
          </button>
          <button onClick={() => scrollTo(galleryRef)} className="hover:text-green-600">
            Gallery
          </button>
          <button onClick={() => scrollTo(locationRef)} className="hover:text-green-600">
            Location
          </button>
        </div>
      </div>

      {/* CONTENT + CTA */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-16">
          {/* PRICE */}
          <div ref={priceRef}>
            <h2 className="text-2xl font-semibold mb-4">Price</h2>
            <p className="text-lg">
              Residential Plots starting from <strong>₹ 65 Lakhs*</strong>
            </p>
          </div>

          {/* SITE PLAN */}
          <div ref={planRef}>
            <h2 className="text-2xl font-semibold mb-4">
              Site & Floor Plan
            </h2>
            <img
              src="/images/siteplan.jpg"
              alt="Site Plan"
              className="rounded-2xl shadow"
            />
          </div>

          {/* AMENITIES */}
          <div ref={amenitiesRef}>
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Clubhouse",
                "Landscaped Gardens",
                "Jogging Track",
                "24x7 Security",
                "Power Backup",
                "Children Play Area",
              ].map((a) => (
                <div
                  key={a}
                  className="bg-white rounded-xl p-4 shadow-sm text-sm"
                >
                  ✔ {a}
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY */}
          <div ref={galleryRef}>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <img src="/images/gallery1.jpg" className="rounded-xl" />
              <img src="/images/gallery2.jpg" className="rounded-xl" />
            </div>
          </div>

          {/* LOCATION */}
          <div ref={locationRef}>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <iframe
              title="Location"
              src="https://www.google.com/maps?q=Banur,Punjab&output=embed"
              width="100%"
              height="350"
              className="rounded-xl border"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT STICKY CTA */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Get the Best Quote
            </h3>

            <input
              placeholder="Name"
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              placeholder="Email"
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              placeholder="Phone"
              className="w-full border rounded-lg p-2 mb-4"
            />

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
              Pre-Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Luxury;
