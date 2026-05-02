import React, { useState } from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  IndianRupee,
  Phone,
  Mail,
  Download,
  CheckCircle,
  Waves,
  Dumbbell,
  Trees,
  ShieldCheck,
  Home,
  Car,
  Building2
} from "lucide-react";


const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68",
];

export default function ProjectDetail() {
  const [current, setCurrent] = useState(0);
  const [activePlan, setActivePlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [masterZoom, setMasterZoom] = useState(1);
const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
const [isBrochureOpen, setIsBrochureOpen] = useState(false);
const [selectedUnit, setSelectedUnit] = useState(null);





  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8 px-4 sm:px-6 mt-5">


      <div className="max-w-7xl mx-auto">

        {/* IMAGE GALLERY  */}
        <div className="bg-white rounded-xl overflow-hidden border mb-8">

          <div className="relative h-[420px]">
            <img
              src={images[current]}
              className="w-full h-full object-cover"
              alt=""
            />

            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded">
              {current + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 p-4 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrent(i)}
                className={`w-24 h-16 object-cover rounded cursor-pointer ${
                  current === i ? "ring-2 ring-green-600" : ""
                }`}
              />
            ))}
          </div>

        </div>

      <div className="flex flex-col lg:flex-row gap-8">


          {/*LEFT CONTENT  */}
          <div className="w-full lg:w-2/3 space-y-8">


            {/* PROPERTY HEADER */}
            <div className="bg-white p-8 rounded-xl border">

              <div className="flex justify-between items-start">

                <div>
                  <h1 className="text-2xl font-semibold">
                    Luxury Heights
                  </h1>

                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin size={16} className="mr-2" />
                    Sector 80, Gurgaon
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹95 Lakhs
                  </div>
                  <div className="text-sm text-gray-500">
                    Starting Price
                  </div>
                </div>

              </div>

              {/* Summary Row */}
              <div className="flex gap-10 mt-6 text-gray-700 border-t pt-6">

                <div className="flex items-center gap-2">
                  <BedDouble size={18} />
                  2 & 3 BHK
                </div>

                <div className="flex items-center gap-2">
                  <Bath size={18} />
                  2-3 Bathrooms
                </div>

                <div className="flex items-center gap-2">
                  <Ruler size={18} />
                  1250 - 1650 sq.ft
                </div>

              </div>

            </div>

            {/* OVERVIEW */}
            <Section title="Overview">

  {/* Short Intro */}
  <p className="text-gray-700 leading-relaxed mb-8">
    Luxury Heights is a thoughtfully designed residential development
    offering spacious 2 & 3 BHK apartments in Sector 80, Gurgaon.
    Built with modern architecture and premium finishes, the project
    delivers comfort, connectivity, and long-term investment value.
  </p>

  {/* Divider */}
  <div className="border-t my-6"></div>

  {/* Key Details Grid */}
  <div className="grid md:grid-cols-2 gap-y-6 gap-x-12 text-sm text-gray-700">

    <div>
      <span className="text-gray-500">Developer</span>
      <p className="font-medium mt-1">Dogra Developers</p>
    </div>

    <div>
      <span className="text-gray-500">Project Type</span>
      <p className="font-medium mt-1">Residential</p>
    </div>

    <div>
      <span className="text-gray-500">Total Units</span>
      <p className="font-medium mt-1">320 Apartments</p>
    </div>

    <div>
      <span className="text-gray-500">Configuration</span>
      <p className="font-medium mt-1">2 & 3 BHK</p>
    </div>

    <div>
      <span className="text-gray-500">Super Built-up Area</span>
      <p className="font-medium mt-1">1250 – 1650 sq.ft</p>
    </div>

    <div>
      <span className="text-gray-500">Possession</span>
      <p className="font-medium mt-1">December 2027</p>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t my-6"></div>

  {/* Additional Description */}
  <p className="text-gray-600 leading-relaxed text-sm">
    Strategically located with seamless metro and highway connectivity,
    the project ensures access to leading schools, hospitals, and business hubs.
    Residents enjoy curated lifestyle amenities including a clubhouse,
    swimming pool, landscaped gardens, and 24x7 security.
  </p>

</Section>


            {/* AMENITIES */}
           <Section title="Amenities">

  {/* Intro Line */}
  <p className="text-gray-600 mb-10">
    A curated selection of lifestyle, recreational and security amenities
    designed to enhance everyday living.
  </p>

  {/* Amenities Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">


    {[
      { icon: <Waves size={22} />, label: "Swimming Pool" },
      { icon: <Dumbbell size={22} />, label: "Modern Gymnasium" },
      { icon: <Trees size={22} />, label: "Landscaped Gardens" },
      { icon: <ShieldCheck size={22} />, label: "24x7 Security" },
      { icon: <Home size={22} />, label: "Clubhouse" },
      { icon: <Ruler size={22} />, label: "Jogging Track" },
      { icon: <Car size={22} />, label: "Basement Parking" },
      { icon: <Building2 size={22} />, label: "Multipurpose Hall" },
      { icon: <CheckCircle size={22} />, label: "Children Play Area" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-start gap-4 p-5 border rounded-xl hover:shadow-md transition duration-300 bg-gray-50"
      >
        <div className="text-green-600">
          {item.icon}
        </div>

        <div className="text-gray-800 font-medium">
          {item.label}
        </div>
      </div>
    ))}

  </div>

</Section>


      {/* FLOOR PLANS */}
<Section title="Floor Plans">

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


    {/* 2 BHK  */}
    <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-[28px] p-12 shadow-sm hover:shadow-xl transition duration-500">

      <div className="flex items-center gap-4 mb-8 text-green-700">
        <div className="bg-green-100 p-3 rounded-full">
          <Home size={24} />
        </div>
        <h3 className="text-3xl font-semibold tracking-tight">
          2 BHK
        </h3>
      </div>

      <div className="flex items-center gap-3 text-gray-500 mb-6">
        <Ruler size={18} />
        <span className="text-base">1100 – 1250 sq.ft</span>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
        Thoughtfully designed layout offering efficient space planning,
        abundant natural light and well-defined private & social zones.
      </p>

      <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-10 text-sm">
        <div>• 2 Spacious Bedrooms</div>
        <div>• 2 Modern Bathrooms</div>
        <div>• Private Balcony</div>
        <div>• Covered Parking</div>
      </div>

      <button
        onClick={() => {
          setActivePlan("/images/twobhkfloor.png");
          setIsModalOpen(true);
        }}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md"
      >
        View Floor Plan
      </button>

    </div>


    {/* 3 BHK  */}
    <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 rounded-[28px] p-12 shadow-sm hover:shadow-xl transition duration-500">

      <div className="flex items-center gap-4 mb-8 text-green-700">
        <div className="bg-green-100 p-3 rounded-full">
          <Home size={24} />
        </div>
        <h3 className="text-3xl font-semibold tracking-tight">
          3 BHK
        </h3>
      </div>

      <div className="flex items-center gap-3 text-gray-500 mb-6">
        <Ruler size={18} />
        <span className="text-base">1450 – 1650 sq.ft</span>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
        Premium configuration offering expansive living zones,
        enhanced privacy and larger balconies for elevated comfort.
      </p>

      <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-10 text-sm">
        <div>• 3 Spacious Bedrooms</div>
        <div>• 3 Modern Bathrooms</div>
        <div>• Large Balcony</div>
        <div>• Covered Parking</div>
      </div>

      <button
        onClick={() => {
          setActivePlan("/images/threebhkfloor.png");
          setIsModalOpen(true);
        }}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md"
      >
        View Floor Plan
      </button>

    </div>

  </div>

</Section>
{isModalOpen && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

    <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">


      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute -top-4 -right-4 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <div className="px-8 py-5 border-b bg-green-50 rounded-t-2xl">
        <h3 className="text-lg font-semibold text-green-700">
          Floor Plan Preview
        </h3>
      </div>

      {/* Image Container */}
      <div className="p-8 flex justify-center bg-white">

        <div className="max-h-[500px] overflow-auto">
          <img
            src={activePlan}
            alt="Floor Plan"
            className="max-h-[450px] w-auto object-contain rounded-xl border shadow-sm"
          />
        </div>

      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50 rounded-b-2xl">

        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Close
        </button>

        <a
          href={activePlan}
          download
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <Download size={18} />
          Download Plan
        </a>

      </div>

    </div>
  </div>
)}

{/*Available Units  */}

<Section title="Available Units">

  <div className="bg-white border rounded-2xl overflow-hidden">

    {/* Header */}
    <div className="grid grid-cols-6 bg-green-50 text-green-700 font-semibold text-sm px-6 py-4">
      <div>Unit</div>
      <div>Tower</div>
      <div>Floor</div>
      <div>Type</div>
      <div>Price</div>
      <div>Status</div>
    </div>

    {[
      {
        unit: "A-502",
        tower: "A",
        floor: 5,
        type: "2 BHK",
        size: "1250 sq.ft",
        price: "₹95 Lakhs",
        status: "available",
      },
      {
        unit: "A-603",
        tower: "A",
        floor: 6,
        type: "3 BHK",
        size: "1650 sq.ft",
        price: "₹1.25 Cr",
        status: "sold",
      },
      {
        unit: "B-204",
        tower: "B",
        floor: 2,
        type: "2 BHK",
        size: "1200 sq.ft",
        price: "₹90 Lakhs",
        status: "available",
      },
    ].map((item, index) => (
      <div
        key={index}
        onClick={() => setSelectedUnit(item)}
        className="grid grid-cols-6 items-center text-sm px-6 py-4 border-t hover:bg-gray-50 cursor-pointer transition"
      >
        <div className="font-medium">{item.unit}</div>
        <div>{item.tower}</div>
        <div>{item.floor}</div>
        <div>{item.type}</div>
        <div>{item.price}</div>

        <div>
          {item.status === "available" ? (
            <span className="text-green-600 font-medium">
              ● Available
            </span>
          ) : (
            <span className="text-red-500 font-medium">
              ● Sold
            </span>
          )}
        </div>
      </div>
    ))}

  </div>

</Section>
{/*  UNIT DETAIL MODAL */}
{selectedUnit && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

    <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative">

      {/* Close */}
      <button
        onClick={() => setSelectedUnit(null)}
        className="absolute -top-4 -right-4 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center"
      >
        ✕
      </button>

      <div className="p-8 space-y-6">

        <h3 className="text-xl font-semibold text-green-700">
          Unit {selectedUnit.unit}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">

          <div>
            <span className="text-gray-500">Tower</span>
            <p className="font-medium">{selectedUnit.tower}</p>
          </div>

          <div>
            <span className="text-gray-500">Floor</span>
            <p className="font-medium">{selectedUnit.floor}</p>
          </div>

          <div>
            <span className="text-gray-500">Configuration</span>
            <p className="font-medium">{selectedUnit.type}</p>
          </div>

          <div>
            <span className="text-gray-500">Size</span>
            <p className="font-medium">{selectedUnit.size}</p>
          </div>

          <div>
            <span className="text-gray-500">Price</span>
            <p className="font-medium text-green-600">
              {selectedUnit.price}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Status</span>
            <p className={`font-medium ${
              selectedUnit.status === "available"
                ? "text-green-600"
                : "text-red-500"
            }`}>
              {selectedUnit.status === "available"
                ? "Available"
                : "Sold"}
            </p>
          </div>

        </div>

        {/* CTA */}
        {selectedUnit.status === "available" ? (
          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            Enquire for this Unit
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed"
          >
            Unit Sold
          </button>
        )}

      </div>

    </div>

  </div>
)}



{/*  MASTER PLAN  */}
<Section title="Master Plan">

  <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl relative max-h-[90vh] overflow-y-auto">


    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-semibold text-green-700">
        Project Master Layout
      </h3>

      <a
        href="/images/masterplan.png"
        download
        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
      >
        <Download size={18} />
        Download
      </a>
    </div>

    {/* Preview Container */}
    <div className="relative border rounded-2xl overflow-hidden bg-white p-4 flex justify-center">

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => setMasterZoom((prev) => prev + 0.1)}
          className="bg-white shadow-md border rounded-full w-9 h-9 flex items-center justify-center"
        >
          +
        </button>

        <button
          onClick={() => setMasterZoom((prev) => Math.max(0.5, prev - 0.1))}
          className="bg-white shadow-md border rounded-full w-9 h-9 flex items-center justify-center"
        >
          –
        </button>
      </div>

      {/* Image */}
      <div
        className="max-h-[350px] overflow-hidden cursor-pointer"
        onClick={() => setIsMasterModalOpen(true)}
      >
        <img
          src="/images/masterplan.png"
          alt="Master Plan"
          style={{ transform: `scale(${masterZoom})` }}
          className="transition duration-300 object-contain"
        />
      </div>

    </div>

  </div>

</Section>
{/* MASTER PLAN MODAL  */}
{isMasterModalOpen && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">

    <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl relative">

      {/* Close Button */}
      <button
        onClick={() => setIsMasterModalOpen(false)}
        className="absolute -top-4 -right-4 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <div className="px-8 py-5 border-b bg-green-50 rounded-t-2xl">
        <h3 className="text-lg font-semibold text-green-700">
          Master Plan Preview
        </h3>
      </div>

      {/* Image */}
      <div className="p-8 flex justify-center bg-white">
        <div className="max-h-[600px] overflow-auto">
          <img
            src="/images/masterplan.png"
            alt="Master Plan"
            className="max-h-[550px] w-auto object-contain rounded-xl border shadow-sm"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50 rounded-b-2xl">

        <button
          onClick={() => setIsMasterModalOpen(false)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Close
        </button>

        <a
          href="/images/masterplan.png"
          download
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <Download size={18} />
          Download
        </a>

      </div>

    </div>

  </div>
)}



            {/*LOCATION ADVANTAGE*/}
<Section title="Location Advantage">

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


    {/* LEFT CONTENT */}
    <div className="space-y-8">

      {/* Address */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-green-700">
          Project Address
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Luxury Heights, Sector 80, Gurgaon, Haryana 122004, India
        </p>
      </div>

      {/* Connectivity */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-800">
          Connectivity & Transport
        </h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>• 5 mins from Metro Station</li>
          <li>• 10 mins from NH-48</li>
          <li>• 25 mins from IGI Airport</li>
        </ul>
      </div>

      {/* Social Infrastructure */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-800">
          Social Infrastructure
        </h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>• Nearby Schools & Colleges</li>
          <li>• Multi-speciality Hospitals</li>
          <li>• Shopping Malls & Retail Hubs</li>
        </ul>
      </div>

      {/* Business Hubs */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-800">
          Employment & Business Hubs
        </h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>• 10 mins from IT Hub</li>
          <li>• Close to Cyber City</li>
          <li>• Commercial Business District Nearby</li>
        </ul>
      </div>

    </div>


    {/* RIGHT SIDE MAP */}
    <div className="border rounded-2xl overflow-hidden shadow-sm">

      <iframe
        title="Project Location"
        src="https://www.google.com/maps?q=Sector+80+Gurgaon&output=embed"
        width="100%"
        height="100%"
        className="min-h-[420px]"
        loading="lazy"
      ></iframe>

    </div>

  </div>

</Section>


          </div>

          {/*  RIGHT CONTACT PANEL  */}
          <div className="w-full lg:w-1/3">


  <div className="lg:sticky lg:top-24 
                bg-gradient-to-br from-white to-green-50 
                border border-green-100 
                rounded-3xl 
                p-8 
                shadow-xl 
                space-y-6 
                lg:max-h-[100vh] 
                overflow-y-auto">


    {/* Header */}
    <div>
      <h3 className="text-2xl font-semibold text-green-700">
        Get the Best Offer
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        Unlock exclusive pricing, payment plans & early-buyer benefits.
      </p>
    </div>

    {/* Scarcity / Trust Line */}
    <div className="bg-green-100 text-green-700 text-xs px-4 py-2 rounded-lg font-medium">
      Limited inventory available • Enquire for latest price
    </div>

    {/* Form */}
    <div className="space-y-4">

      <input
        placeholder="Full Name"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        placeholder="Phone Number"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        placeholder="Email Address"
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md">
        Request Best Price
      </button>

    </div>

    {/* Benefits */}
    <div className="border-t pt-5 space-y-2 text-sm text-gray-600">

      <div>✔ Free Site Visit Assistance</div>
      <div>✔ Price Breakup & Cost Sheet</div>
      <div>✔ Bank Loan Support</div>
      <div>✔ Zero Brokerage Assistance</div>

    </div>

    {/* Secondary Actions */}
    <div className="pt-4 border-t space-y-3">

      <button className="w-full border border-green-600 text-green-700 py-2 rounded-xl font-medium hover:bg-green-600 hover:text-white transition">
        Schedule Site Visit
      </button>

      <button
  onClick={() => setIsBrochureOpen(true)}
  className="w-full border py-2 rounded-xl flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition"
>
  <Download size={16} />
  Download Brochure
</button>
{isBrochureOpen && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative">

      {/* Close */}
      <button
        onClick={() => setIsBrochureOpen(false)}
        className="absolute -top-4 -right-4 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center"
      >
        ✕
      </button>

      <div className="p-8">

        <h3 className="text-xl font-semibold text-green-700 mb-2">
          Download Brochure
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Please enter your details to receive the official brochure.
        </p>

        <div className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            placeholder="Phone Number *"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            placeholder="Email Address"
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            onClick={() => {
              setIsBrochureOpen(false);
              window.open("/images/brochure.pdf", "_blank");
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Submit & Download
          </button>

        </div>

      </div>

    </div>
  </div>
)}



    </div>

    {/* Direct Contact */}
    <div className="text-xs text-gray-500 pt-4 border-t">
      Direct Helpline: <span className="font-medium text-gray-700">+91 8278713791</span>
    </div>

  </div>

</div>


        </div>

      </div>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function Section({ title, children }) {
  return (
    <div className="bg-white p-8 rounded-xl border">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function FloorCard({ title, size }) {
  return (
    <div className="border p-6 rounded-lg">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-500 text-sm">{size}</p>
      <button className="mt-4 text-green-600 font-medium">
        View Floor Plan →
      </button>
    </div>
  );
}
