import { useParams } from 
"react-router-dom";
import { useState } from "react";
import {
  MapPin,
  Bed,
  Maximize,
  Compass,
  CalendarDays,
  FileText,
  User,
  Building2,            
    Info,   
    ShieldCheck,
    Dumbbell,
  Waves,
  Car,
  TreePalm,
  Cctv,
  Users,
  Bike,
  Gamepad2,
  Wifi,
  Store,
  Flower2,
  ParkingCircle,
  Zap,
  Camera,
  Shield,
  ChevronDown,
  ChevronUp,
  Train, School, Hospital, ShoppingBag,
} from "lucide-react";
import PropertyHeroGallery from "../components/PropertyHeroGallery";
const propertyImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200",
  "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1200",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200",
];

export default function Detailsproperty() {
  const { id } = useParams();
    const [activeTab, setActiveTab] = useState("Lifestyle");
const [showAll, setShowAll] = useState(false);
const [openPlan, setOpenPlan] = useState(false);
const [openFAQ, setOpenFAQ] = useState(null);

const floorPlan = {
  area: "1450 sq.ft",
  carpet: "1200 sq.ft",
  configuration: "3 BHK",
  image:
    "/images/threebhkfloor.png",
  pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
};

const faqs = [
  {
    question: "Is this property RERA approved?",
    answer:
      "Yes, this project is registered under HRERA with RERA ID HRERA12345. All regulatory compliances are completed.",
  },
  {
    question: "What is the expected possession date?",
    answer:
      "The property is ready to move. Immediate possession is available.",
  },
  {
    question: "Are home loan facilities available?",
    answer:
      "Yes, leading banks and financial institutions provide home loan assistance for this property.",
  },
  {
    question: "What amenities are included?",
    answer:
      "The project offers lifestyle amenities such as swimming pool, gym, clubhouse, landscaped gardens, 24x7 security, and more.",
  },
  {
    question: "Is the property good for investment?",
    answer:
      "Yes, due to its prime location and connectivity, the property offers strong rental yield and long-term appreciation potential.",
  },
];




  return (
    <div className="pt-24 px-4 lg:px-24 pb-20 bg-gray-50 min-h-screen">
      
      {/* ================= IMAGE + BASIC INFO ================= */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Image Section */}
        <div className="relative">
          <PropertyHeroGallery images={propertyImages} />

          

          
        </div>

        {/* Title Section */}
      <div className="p-8">

  {/* ===== TITLE + DEVELOPER ===== */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Skyline Heights
      </h1>

      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
        <Building2 className="w-4 h-4 text-gray-500" />
        By <span className="font-medium text-gray-800">ABC Developers</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
        <MapPin className="w-4 h-4" />
        Sector 54, Gurgaon, Haryana
      </div>
    </div>

    {/* PRICE SECTION */}
    <div className="text-left lg:text-right">
      <div className="text-3xl font-bold text-green-700">
        ₹ 1.25 Cr
      </div>
      <p className="text-xs text-gray-500 mt-1">
        ₹ 8,620 / sq.ft
      </p>
      <p className="text-xs text-gray-500">
        EMI starts at ₹ 78,000 / month
      </p>
    </div>
  </div>

  {/* ===== PROPERTY META INFO GRID ===== */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 border-t pt-6">

    <div className="flex items-start gap-3">
      <Bed className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">Configuration</p>
        <p className="font-medium text-gray-800">3 BHK</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Maximize className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">Super Area</p>
        <p className="font-medium text-gray-800">1450 sq.ft</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <Compass className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">Facing</p>
        <p className="font-medium text-gray-800">East</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <CalendarDays className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">Possession</p>
        <p className="font-medium text-gray-800">Ready to Move</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <FileText className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">RERA ID</p>
        <p className="font-medium text-gray-800">HRERA12345</p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <User className="w-5 h-5 text-gray-500 mt-1" />
      <div>
        <p className="text-xs text-gray-500">Posted By</p>
        <p className="font-medium text-gray-800">Builder</p>
      </div>
    </div>

  </div>

</div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* Description */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">

  {/* ===== SECTION HEADER ===== */}
  <div className="flex items-center gap-2 mb-5">
    <Info className="w-5 h-5 text-green-600" />
    <h2 className="text-xl font-semibold text-gray-900">
      About Property
    </h2>
  </div>

  {/* ===== DESCRIPTION ===== */}
  <p className="text-gray-600 text-sm leading-relaxed">
    Skyline Heights offers thoughtfully designed 3 BHK residences 
    located in Sector 54, Gurgaon. Built with contemporary architecture 
    and high-quality construction standards, the project ensures 
    comfort, natural lighting, and cross ventilation in every unit.
  </p>

  <p className="text-gray-600 text-sm leading-relaxed mt-4">
    The development provides modern amenities, landscaped green spaces, 
    and seamless connectivity to major commercial hubs, educational 
    institutions, and healthcare facilities — making it ideal for 
    families and working professionals.
  </p>

  {/* ===== HIGHLIGHTS GRID ===== */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

    <div className="flex items-start gap-3">
      <ShieldCheck className="w-4 h-4 text-green-600 mt-1" />
      <p className="text-sm text-gray-700">
        Premium gated community with 24x7 security
      </p>
    </div>

    <div className="flex items-start gap-3">
      <ShieldCheck className="w-4 h-4 text-green-600 mt-1" />
      <p className="text-sm text-gray-700">
        Spacious layouts with modern interiors
      </p>
    </div>

    <div className="flex items-start gap-3">
      <ShieldCheck className="w-4 h-4 text-green-600 mt-1" />
      <p className="text-sm text-gray-700">
        Close to Metro & major IT hubs
      </p>
    </div>

    <div className="flex items-start gap-3">
      <ShieldCheck className="w-4 h-4 text-green-600 mt-1" />
      <p className="text-sm text-gray-700">
        High rental yield & investment potential
      </p>
    </div>

  </div>

</div>

          {/* Amenities */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">

  {/* SECTION TITLE */}
  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Amenities
  </h2>

  {/* TABS */}
  <div className="flex gap-6 border-b mb-6 overflow-x-auto">
    {["Lifestyle", "Security", "Convenience"].map((tab) => (
      <button
        key={tab}
        onClick={() => {
          setActiveTab(tab);
          setShowAll(false);
        }}
        className={`pb-3 text-sm font-medium transition ${
          activeTab === tab
            ? "border-b-2 border-green-600 text-green-600"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* AMENITY DATA */}
  {(() => {
    const amenitiesData = {
      Lifestyle: [
        { icon: <Waves />, label: "Swimming Pool" },
        { icon: <Dumbbell />, label: "Gymnasium" },
        { icon: <TreePalm />, label: "Landscaped Garden" },
        { icon: <Users />, label: "Club House" },
        { icon: <Gamepad2 />, label: "Indoor Games Room" },
        { icon: <Bike />, label: "Cycling Track" },
        { icon: <Flower2 />, label: "Jogging Track" },
        { icon: <Zap />, label: "Yoga & Meditation Area" },
        { icon: <Store />, label: "Mini Theatre" },
      ],
      Security: [
        { icon: <ShieldCheck />, label: "24x7 Security" },
        { icon: <Cctv />, label: "CCTV Surveillance" },
        { icon: <Shield />, label: "Gated Community" },
        { icon: <Camera />, label: "Video Door Phone" },
        { icon: <Wifi />, label: "Smart Access Control" },
      ],
      Convenience: [
        { icon: <Car />, label: "Reserved Parking" },
        { icon: <ParkingCircle />, label: "Visitor Parking" },
        { icon: <Building2 />, label: "High Speed Elevators" },
        { icon: <Zap />, label: "Power Backup" },
        { icon: <Wifi />, label: "WiFi Enabled Campus" },
      ],
    };

    const currentAmenities = amenitiesData[activeTab];
    const visibleAmenities = showAll
      ? currentAmenities
      : currentAmenities.slice(0, 6);

    return (
      <>
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {visibleAmenities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="text-green-600 w-5 h-5">
                {item.icon}
              </div>
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        {currentAmenities.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-green-600 font-medium text-sm hover:text-green-800 transition"
            >
              {showAll ? "Show Less" : "View All Amenities"}
              {showAll ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </>
    );
  })()}
</div>

{/* Virtual tour */}
<div className="bg-white p-8 rounded-2xl shadow-sm border">

  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Virtual Tour
  </h2>

  <div className="relative aspect-video rounded-xl overflow-hidden border">

    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/BQpDkRorLwo?si=nsUOAphVZrRYzbRR"
      title="Property Virtual Tour"
      allowFullScreen
    ></iframe>

  </div>

</div>

<div className="bg-white p-8 rounded-2xl shadow-sm border">

  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Floor Plan
  </h2>

  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">

    <div className="text-sm text-gray-600 space-y-1">
      <div><strong>Configuration:</strong> {floorPlan.configuration}</div>
      <div><strong>Super Built-up:</strong> {floorPlan.area}</div>
      <div><strong>Carpet Area:</strong> {floorPlan.carpet}</div>
    </div>

    <div className="flex gap-4">

      <button
        onClick={() => setOpenPlan(true)}
        className="bg-green-600 text-white px-5 py-2 rounded-md text-sm hover:bg-green-700 transition"
      >
        View Floor Plan
      </button>

      <a
        href={floorPlan.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-gray-300 px-5 py-2 rounded-md text-sm hover:bg-gray-50 transition"
      >
        Download PDF
      </a>

    </div>

  </div>

</div>

{/* Emi section */}

          {/* Location Advantages */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border">

  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Location & Connectivity
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* LEFT SIDE - LOCATION POINTS */}
    <div className="space-y-5">

      <LocationItem
        icon={<Train />}
        title="Metro Station"
        subtitle="5 mins drive"
      />

      <LocationItem
        icon={<School />}
        title="Reputed Schools"
        subtitle="Within 3 km radius"
      />

      <LocationItem
        icon={<Hospital />}
        title="Multi-Speciality Hospitals"
        subtitle="10 mins away"
      />

      <LocationItem
        icon={<ShoppingBag />}
        title="Shopping Malls"
        subtitle="Close proximity"
      />

      <LocationItem
        icon={<MapPin />}
        title="Cyber City"
        subtitle="15 mins commute"
      />

    </div>




    {/* RIGHT SIDE - GOOGLE MAP */}
    <div className="rounded-xl overflow-hidden border h-[300px] lg:h-full">

      <iframe
        title="Property Location"
        src="https://www.google.com/maps?q=Gurgaon,Haryana&output=embed"
        className="w-full h-full"
        loading="lazy"
      ></iframe>

    </div>

  </div>
</div>

{/* FAQ */}
<div className="bg-white p-8 rounded-2xl shadow-sm border">

  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className="border rounded-xl overflow-hidden"
      >
        <button
          onClick={() =>
            setOpenFAQ(openFAQ === index ? null : index)
          }
          className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
        >
          <span className="font-medium text-gray-800 text-sm">
            {faq.question}
          </span>

          {openFAQ === index ? (
            <ChevronUp className="w-4 h-4 text-green-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {openFAQ === index && (
          <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
            {faq.answer}
          </div>
        )}
      </div>
    ))}
  </div>

</div>
        </div>

      

        {/* RIGHT SIDEBAR */}
       <div className="bg-white p-8 rounded-2xl shadow-sm border h-fit sticky top-28">

  {/* ===== HEADER ===== */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-900">
      Interested in this property?
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      Get complete details & site visit assistance
    </p>
  </div>

  {/* ===== QUICK ACTIONS ===== */}
  <div className="flex gap-3 mb-6">
    <button className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
      Call Now
    </button>
    <button className="flex-1 border border-gray-300 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition">
      WhatsApp
    </button>
  </div>

  {/* ===== FORM ===== */}
  <form className="space-y-4">

    <input
      type="text"
      placeholder="Full Name"
      className="w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none p-3 rounded-md text-sm transition"
    />

    <input
      type="tel"
      placeholder="Phone Number"
      className="w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none p-3 rounded-md text-sm transition"
    />

    <input
      type="email"
      placeholder="Email Address"
      className="w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none p-3 rounded-md text-sm transition"
    />

    <textarea
      placeholder="I'm interested in this property. Please share more details."
      rows="3"
      className="w-full border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none p-3 rounded-md text-sm transition"
    ></textarea>

    <button
      type="submit"
      className="w-full bg-green-600 text-white py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition"
    >
      Request Callback
    </button>

  </form>

  {/* ===== TRUST NOTE ===== */}
  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
    By submitting, you agree to be contacted regarding this property. 
    We respect your privacy and do not share your information.
  </p>

</div>

      </div>
{openPlan && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
    <div className="relative bg-white rounded-xl overflow-hidden max-w-5xl w-full">

      <button
        onClick={() => setOpenPlan(false)}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
      >
        ✕
      </button>

      <img
        src={floorPlan.image}
        alt="Floor Plan"
        className="w-full"
      />

    </div>
  </div>
)}
    </div>
  );
}

function Amenity({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="text-green-600 w-5 h-5">
        {icon}
      </div>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}

function LocationItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
      <div className="text-green-600 w-6 h-6 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800 text-sm">
          {title}
        </h4>
        <p className="text-gray-500 text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}