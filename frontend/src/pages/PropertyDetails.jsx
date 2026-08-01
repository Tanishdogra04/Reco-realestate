import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, BedDouble, Ruler, Download, CheckCircle, ShieldCheck, Heart, ShoppingBag,
  ArrowRight, Phone, MessageSquare, Star, Info, LayoutGrid, Building2, Map, Calendar,
  ChevronLeft, Share2, Eye, Video, Calculator, Clock, Users, BarChart3, TrendingUp,
  Award, Zap, Waves, Dumbbell, Coffee, Car, Shield, TreePine, Baby, Smartphone,
  ExternalLink, ChevronRight, PlayCircle, MessageCircle
} from "lucide-react";
import { apartmentListings } from "../data/properties";
import { fetchPropertyById, createEnquiry } from "../api/api";
import CardProperty from "../components/Cardproperty";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSticky, setShowSticky] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const getInitialFormData = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        return {
          name: parsed.fullName || "",
          phone: parsed.phone || "",
          email: parsed.email || "",
          message: ""
        };
      }
    } catch (e) {
      console.error("Error reading stored user:", e);
    }
    return { name: "", phone: "", email: "", message: "" };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [emiData, setEmiData] = useState({ amount: 10000000, years: 20, rate: 8.5 });
  const [emiResult, setEmiResult] = useState(0);

  const isAuthenticated = !!localStorage.getItem("token");

  const authAction = (action) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/property/${id}` } });
    } else {
      action();
    }
  };

  const handleCallStrategist = () => {
    alert("📞 Vikram Malhotra (Senior Asset Strategist)\nPhone: +91 99990 00000\n\n(A call prompt has been initiated on your device)");
    window.location.href = "tel:+919999000000";
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/property/${id}`, message: "Please login to submit an enquiry." } });
      return;
    }
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }
    
    setSubmitting(true);
    try {
      await createEnquiry({
        ...formData,
        message: formData.message.trim() || `Interested in callback for property: ${property?.title || 'this asset'}`,
        property: id,
        type: 'general'
      });
      setShowVisitModal(false);
      setShowSuccessModal(true);
      // Reset form fields but keep user details
      const userObj = JSON.parse(localStorage.getItem("user")) || {};
      setFormData({ 
        name: userObj.fullName || "", 
        phone: userObj.phone || "", 
        email: userObj.email || "", 
        message: "" 
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send request");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const p = emiData.rate / (12 * 100);
    const n = emiData.years * 12;
    const emi = (emiData.amount * p * Math.pow(1 + p, n)) / (Math.pow(1 + p, n) - 1);
    setEmiResult(Math.round(emi));
  }, [emiData]);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      try {
        const staticProp = apartmentListings.find(p => String(p.id) === String(id));
        if (staticProp) {
          setProperty(staticProp);
        } else {
          const backendProp = await fetchPropertyById(id);
          setProperty(backendProp);
        }
      } catch (err) {
        console.error("Failed to load property:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
    setIsFavorited(saved.includes(Number(id)) || saved.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
    const updated = isFavorited 
      ? saved.filter(fid => String(fid) !== String(id))
      : [...saved, id];
    setIsFavorited(!isFavorited);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Info size={48} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">Asset Not Found</h2>
        <button onClick={() => navigate("/properties")} className="mt-6 px-8 py-3 bg-gray-900 text-white rounded-full font-black text-xs uppercase tracking-widest">Back to Listings</button>
      </div>
    </div>
  );

  const images = property.images && property.images.length > 0 ? property.images : [property.image, ...Array(3).fill("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070")];
  const similar = apartmentListings
    .filter(p => p.category === property.category && String(p.id) !== String(property.id))
    .slice(0, 3);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-green-100 pb-20">
      
      {/* 1. HERO PROPERTY GALLERY */}
      <section className="relative pt-28 pb-12 px-6 bg-gradient-to-b from-[#FFE5B4]/30 via-white to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Featured Image */}
            <div className="col-span-12 lg:col-span-8">
              <div 
                onClick={() => { setShowGallery(true); setGalleryIndex(current); }}
                className="relative h-[400px] md:h-[600px] rounded-[32px] overflow-hidden shadow-xl group cursor-pointer"
              >
                <img src={images[current]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badges */}
                <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl flex items-center gap-1.5 shadow-md">
                    <ShieldCheck size={14} className="text-green-700" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Verified Asset</span>
                  </div>
                  <div className="px-4 py-2 bg-green-700/90 backdrop-blur-md rounded-xl flex items-center shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">{property.status || "Ready to Move"}</span>
                  </div>
                </div>

                {/* Video Tour Trigger */}
                <button 
                  onClick={(e) => { e.stopPropagation(); authAction(() => setShowVideo(true)); }}
                  className="absolute bottom-8 left-8 px-5 py-3.5 bg-white/95 hover:bg-green-750 hover:text-white rounded-2xl flex items-center gap-2.5 transition-all group shadow-xl"
                >
                  <PlayCircle size={18} className="text-green-700 group-hover:text-white" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Cinema Tour Preview</span>
                </button>

                {/* Floating Controls */}
                <div className="absolute bottom-8 right-8 flex gap-2" onClick={e => e.stopPropagation()}>
                  <button onClick={toggleFavorite} className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${isFavorited ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white/90 backdrop-blur-md text-gray-800 hover:bg-red-500 hover:text-white shadow-md'}`}>
                    <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                  </button>
                  <button className="w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-800 hover:bg-gray-900 hover:text-white transition-all shadow-md">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Gallery - ONLY 2 ON RIGHT */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {images.slice(1, 3).map((img, i) => (
                <div key={i} onClick={() => i === 1 ? setShowGallery(true) : setCurrent(i + 1)} className="relative h-[190px] md:h-[288px] rounded-3xl overflow-hidden cursor-pointer group border-4 border-transparent hover:border-green-700 transition-all shadow-md">
                  <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
                  {i === 1 && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                      <LayoutGrid size={28} className="mb-2" />
                      <span className="text-xs font-semibold uppercase tracking-wider">View All Photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROPERTY QUICK SUMMARY */}
      <section className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-505 font-bold uppercase tracking-wider text-[11px] text-gray-500">
                      <MapPin size={14} className="text-green-700" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Starting Price</p>
                    <div className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight">
                      ₹{(property.price / 10000000).toFixed(2)} <span className="text-base font-semibold">Cr*</span>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mt-0.5">₹{Math.round(property.price / property.area).toLocaleString()} / sq.ft</p>
                  </div>
                </div>

                {/* Trust Highlights Ribbon */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/80 mb-8 mt-2">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                      <ShieldCheck size={12} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">RERA Verified</span>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-[#D97706]">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Prime Asset</span>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                      <TrendingUp size={12} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">High Yield</span>
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                      <Zap size={12} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Zero Brokerage</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                  <SummaryItem icon={<Building2 size={18} />} label="Asset Type" value={property.category?.toUpperCase()} />
                  <SummaryItem icon={<BedDouble size={18} />} label="Configuration" value={`${property.bhk || "Office"} BHK`} />
                  <SummaryItem icon={<Ruler size={18} />} label="Super Area" value={`${property.area} sq.ft`} />
                  <SummaryItem icon={<Calendar size={18} />} label="Possession" value={property.possession || "Immediate"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">RERA STATUS</p>
                      <p className="text-xs font-bold text-gray-800 tracking-wider">{property.rera || "VERIFIED"}</p>
                    </div>
                    <ShieldCheck size={20} className="text-green-700" />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">ASSET RATING</p>
                      <div className="flex gap-0.5 text-yellow-400">
                        {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <Award size={20} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Sticky Quick Actions */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-[80px]" />
                   <h3 className="text-lg font-bold uppercase tracking-wider mb-5">Expert Advisory</h3>
                   <div className="space-y-3">
                      <button 
                        onClick={() => authAction(() => navigate(`/buy/${property._id || property.id}`))}
                        className="w-full py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} className="text-green-700" /> Secure Allocation / Reserve Now
                      </button>
                      <button 
                        onClick={() => authAction(() => setShowVisitModal(true))}
                        className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all"
                      >
                        Schedule Site Visit
                      </button>
                      <button 
                        onClick={() => authAction(() => window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank"))}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all border border-white/10 flex items-center justify-center gap-2"
                      >
                        <Download size={14} /> Get Brochure
                      </button>
                   </div>
                </div>

                {/* ESTIMATED ALL-INCLUSIVE COST BREAKDOWN */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">Estimated Cost Breakup</h4>
                      <Info size={16} className="text-green-700" />
                   </div>
                   <div className="space-y-2.5 text-xs font-semibold text-gray-600">
                      <div className="flex justify-between">
                         <span>Base Price</span>
                         <span className="text-gray-900">₹{property.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Stamp Duty (est. 5%)</span>
                         <span className="text-gray-900">₹{(property.price * 0.05).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                         <span>Registration Fees</span>
                         <span className="text-gray-900">₹50,000</span>
                      </div>
                      <div className="flex justify-between pt-2.5 border-t border-gray-100 text-xs font-bold text-gray-900">
                         <span className="text-green-700">All-Inclusive Est.</span>
                         <span className="text-green-700">₹{(property.price * 1.05 + 50000).toLocaleString('en-IN')}</span>
                      </div>
                   </div>
                </div>
                
                {/* EMI CALCULATOR PREVIEW */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">Financial Planner</h4>
                      <Calculator size={16} className="text-green-700" />
                   </div>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-[10px] font-bold uppercase mb-1.5">
                            <span className="text-gray-405 text-gray-400">Loan Amount</span>
                            <span className="text-gray-800">₹{(emiData.amount/100000).toFixed(0)} L</span>
                         </div>
                         <input 
                           type="range" min="1000000" max="50000000" step="1000000"
                           value={emiData.amount} onChange={e => setEmiData({...emiData, amount: Number(e.target.value)})}
                           className="w-full accent-green-700 cursor-pointer" 
                         />
                      </div>
                      <div className="flex justify-between text-xs font-bold pt-3 border-t border-gray-50">
                         <span className="text-gray-450 uppercase text-[9px] tracking-wider">Monthly EMI</span>
                         <span className="text-green-700 font-extrabold">₹{emiResult.toLocaleString()}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESCRIPTION & 4. AMENITIES */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-green-700 font-extrabold uppercase tracking-widest text-[10px] block mb-2">Lifestyle Asset</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Asset Overview<span className="text-green-700">.</span></h2>
              <p className="text-gray-600 text-base font-medium leading-relaxed mb-6">
                {property.description || `${property.title} is a premier institutional asset strategically located in ${property.location}. This development represents the pinnacle of modern architectural excellence, offering a seamless blend of luxury and functionality. Whether you are looking for a dream home or a high-yield commercial asset, this property is curated to exceed every standard.`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">Strategic Landmarks</h4>
                    <ul className="space-y-2.5">
                       {["5 mins to Metro Station", "2 mins to Express Highway", "Top Schools within 3km", "Hospitals within 1km"].map((item, i) => (
                         <li key={i} className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-700 rounded-full" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">Growth Potential</h4>
                    <p className="text-sm font-bold text-green-700 mb-3">+12.5% YoY Appreciation</p>
                    <div className="h-16 flex items-end gap-1">
                       {[40, 60, 45, 80, 70, 90].map((h, i) => (
                         <div key={i} className="flex-1 bg-green-200 rounded-t-md transition-all hover:bg-green-700" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* 4. AMENITIES SECTION */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider mb-6">World-Class Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AmenityCard icon={<Waves />} label="Infinity Pool" />
                <AmenityCard icon={<Dumbbell />} label="Modern Gym" />
                <AmenityCard icon={<Coffee />} label="Executive Club" />
                <AmenityCard icon={<Car />} label="EV Charging" />
                <AmenityCard icon={<Shield />} label="24/7 Security" />
                <AmenityCard icon={<TreePine />} label="Zen Garden" />
                <AmenityCard icon={<Baby />} label="Kids Zone" />
                <AmenityCard icon={<Smartphone />} label="Smart Home" />
              </div>
            </div>
          </div>

          {/* 5. FLOOR PLANS & 6. SPECIFICATIONS */}
          <div className="lg:col-span-5 space-y-10">
             <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800 mb-6">Architectural Plans</h3>
                <div className="space-y-3.5">
                   <PlanCard title="Standard Unit Plan" area={`${property.area} sq.ft`} />
                   <PlanCard title="Institutional Master Plan" area="12.5 Acres" />
                </div>
                <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider hover:bg-green-700 transition-all">Download Floor Plans</button>
             </div>

             <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-805 mb-6">Technical Specs</h3>
                <div className="space-y-4">
                   {getDynamicSpecs(property.category).map((spec, index) => (
                      <SpecItem key={index} label={spec.label} value={spec.value} />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & CONNECTIVITY */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <iframe
                  title="Connectivity Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  width="100%" height="100%" loading="lazy" className="grayscale contrast-125"
                ></iframe>
             </div>
             <div className="space-y-6">
                               <div>
                    <span className="text-green-700 font-extrabold uppercase tracking-widest text-[10px] block mb-1">Connectivity Hub</span>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Proximity Index</h2>
                    <div className="grid grid-cols-2 gap-3">
                       {getLocalizedConnectivity(property.location).map((conn, index) => {
                         const icons = [
                           <Building2 size={14} />,
                           <Award size={14} />,
                           <Zap size={14} />,
                           <Smartphone size={14} />
                         ];
                         return (
                           <ConnectivityChip 
                             key={index}
                             icon={icons[index % icons.length]} 
                             label={conn.label} 
                             time={conn.time} 
                           />
                         );
                       })}
                    </div>
                 </div>
                 <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-800">Nearby Essentials</h4>
                    <div className="space-y-3">
                       {(() => {
                         const loc = property.location.toLowerCase();
                         let essentials = ["Local Market - 1.0km", "Commercial Plaza - 1.8km", "Public Park - 0.5km"];
                         if (loc.includes("delhi")) essentials = ["Vasant Kunj Mall - 3.2km", "Max Healthcare - 1.5km", "Delhi Public School - 2.0km"];
                         if (loc.includes("gurgaon")) essentials = ["Galleria Market - 2.1km", "Fortis Hospital - 1.8km", "Pathway School - 3.5km"];
                         if (loc.includes("noida")) essentials = ["Mall of India - 4.0km", "Jaypee Hospital - 2.5km", "Step by Step School - 1.2km"];
                         return essentials.map((item, i) => (
                           <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                              <span className="text-sm font-semibold text-gray-600">{item.split(' - ')[0]}</span>
                              <span className="text-xs font-bold text-gray-800">{item.split(' - ')[1]}</span>
                           </div>
                         ));
                       })()}
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. BUILDER & 9. ADVISOR */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Builder Info */}
           <div className="bg-gray-50 rounded-3xl p-8 flex flex-col justify-between border border-gray-100">
              <div>
                <div className="flex items-center gap-5 mb-8">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100 shrink-0">
                      <Building2 size={32} className="text-green-700" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">{property.developer || "RECO INFRASTRUCTURE"}</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Institutional Developer</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                   <StatBox label="Years Exp" value="25+" />
                   <StatBox label="Projects" value="114+" />
                   <StatBox label="Customers" value="50k+" />
                </div>
              </div>
              <button 
                onClick={() => navigate('/developer-portfolio')}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider hover:bg-green-700 transition-all"
              >
                View Developer Portfolio
              </button>
           </div>

           {/* Advisor Card */}
           <div className="bg-white rounded-3xl p-8 border border-gray-205 shadow-xl border-gray-100">
              <div className="flex items-center gap-5 mb-6">
                 <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border-2 border-green-50 shadow-inner shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" className="w-full h-full object-cover" alt="" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-950 tracking-tight">Vikram Malhotra</h3>
                    <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Senior Asset Strategist</p>
                    <div className="flex gap-0.5 text-yellow-400 mt-1">
                       {Array(5).fill(0).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                 <ContactItem icon={<Phone size={14} />} label="Mobile" value="+91 99990 00000" />
                 <ContactItem icon={<MessageSquare size={14} />} label="WhatsApp" value="Instant Connect" />
              </div>
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                 <input 
                   type="tel" required placeholder="Your Mobile Number" 
                   value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-150 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all" 
                 />
                 <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-green-700 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider shadow-md shadow-green-150/10 disabled:opacity-50 hover:bg-green-800 transition-colors"
                 >
                   {submitting ? "Processing..." : "Request Callback"}
                 </button>
              </form>
           </div>
        </div>
      </section>

      {/* 10. INVESTMENT INSIGHTS */}
      <section className="px-6 py-16 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[120px]" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
               <span className="text-green-500 font-extrabold uppercase tracking-widest text-[10px] block mb-2">AI ANALYTICS HUB</span>
               <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">Investment Insights<span className="text-green-500">.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <InsightCard icon={<TrendingUp />} label="Rental Yield" value="~5.8%" trend="Institutional Avg" />
               <InsightCard icon={<BarChart3 />} label="Demand Score" value="High" trend="98th Percentile" />
               <InsightCard icon={<TrendingUp />} label="ROI Forecast" value="+45%" trend="Next 3 Years" />
               <InsightCard icon={<Award />} label="RECO Score" value="9.4/10" trend="Tier-1 Asset" />
            </div>
         </div>
      </section>

      {/* 11. REVIEWS */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-xl font-bold text-gray-905 uppercase tracking-wider mb-8 text-gray-800">Investor Testimonials</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ReviewCard name="Rahul Sharma" content="The acquisition process was seamless. The asset value appreciated 12% within just 6 months of booking." />
              <ReviewCard name="Sanya Malhotra" content="Highly professional advisory. The property specs are exactly as promised. A true Tier-1 development." />
              <ReviewCard name="Amit Desai" content="Strategically located. The rental demand in this corridor is phenomenal. Best decision for my portfolio." />
           </div>
        </div>
      </section>

      {/* 11.5 FAQ SECTION */}
      <section className="px-6 py-16 bg-gray-50 border-t border-gray-100">
         <div className="max-w-4xl mx-auto space-y-6 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xs">
            <div className="text-center mb-8">
               <span className="text-green-700 font-extrabold uppercase tracking-widest text-[10px] block mb-1">Information Desk</span>
               <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
               <FAQItem 
                 question="Is this property RERA approved?" 
                 answer={`Yes, this property is fully verified and RERA registered under registration code ${property.rera || "Approved (Registration Verification Complete)"}.`} 
               />
               <FAQItem 
                 question="What is the expected possession timeline?" 
                 answer={`The current estimated possession timeline for this asset is specified as "${property.possession || "Immediate / Ready to Move"}" by the developer.`} 
               />
               <FAQItem 
                 question="Can I get home loan assistance?" 
                 answer="Absolutely. RECO works with leading institutional banking partners (including SBI, HDFC, ICICI, and Axis) to offer pre-approved home loan options with fast-track processing and competitive rates." 
               />
               <FAQItem 
                 question="Are there extra hidden fees or maintenance taxes?" 
                 answer="Taxes such as Stamp Duty (est. 5%) and registration fees (₹50,000) are standard government statutory payments. General maintenance charges are dynamically estimated at approximately ₹4 per sq. ft. per month." 
               />
            </div>
         </div>
      </section>

      {/* 12. SIMILAR PROPERTIES */}
      {similar.length > 0 && (
        <section className="px-6 py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-end mb-8">
                <div>
                   <span className="text-green-700 font-extrabold uppercase tracking-widest text-[10px] block mb-1">Discover Options</span>
                   <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-800">Similar Premium Assets</h2>
                </div>
                <button 
                  onClick={() => navigate(`/properties?category=${property.category}`)}
                  className="text-xs font-bold text-green-700 hover:text-green-800 flex items-center gap-1 group"
                >
                  View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((item) => (
                   <CardProperty key={item.id} property={item} />
                ))}
             </div>
          </div>
        </section>
      )}

      {/* 13. STICKY BOTTOM CTA BAR */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 py-3.5 px-6 md:px-12 flex items-center justify-between shadow-2xl"
          >
            <div className="hidden md:flex flex-col">
               <h4 className="text-sm font-bold text-gray-850 truncate max-w-[200px] text-gray-800">{property.title}</h4>
               <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider">₹{(property.price / 10000000).toFixed(2)} Cr Onwards</p>
            </div>
            <div className="flex-1 md:flex-none flex items-center gap-3">
               <button 
                onClick={() => authAction(handleCallStrategist)}
                className="flex-1 md:w-48 py-3 bg-green-700 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider shadow-md shadow-green-150/10 flex items-center justify-center gap-2 hover:bg-green-800"
               >
                 <Phone size={14} /> Call Strategist
               </button>
               <button 
                onClick={() => authAction(() => setShowVisitModal(true))}
                className="hidden md:flex w-48 py-3 bg-gray-905 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider hover:bg-green-700 bg-gray-800 transition-all items-center justify-center gap-2"
               >
                 <Calendar size={14} /> Site Visit
               </button>
               <button 
                onClick={() => authAction(() => window.open("https://wa.me/919999000000", "_blank"))}
                className="p-3 bg-gray-50 text-green-700 rounded-xl hover:bg-green-50 transition-all border border-gray-100"
               >
                  <MessageCircle size={18} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISIT / CONTACT MODAL */}
      <AnimatePresence>
        {showVisitModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs flex items-center justify-center p-6"
            onClick={() => setShowVisitModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900 mb-1">Request Access</h3>
              <p className="text-[10px] font-bold text-gray-405 uppercase tracking-wider mb-6 text-gray-400">Personalized Advisor Support</p>
              
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <input 
                  type="text" required placeholder="Full Name" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all" 
                />
                <input 
                  type="tel" required placeholder="Mobile Number" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all" 
                />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all" 
                />
                <textarea 
                  placeholder="Your Message (Optional)" 
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all h-28 resize-none" 
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-green-700 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider shadow-md shadow-green-150/10 disabled:opacity-50 hover:bg-green-800 transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl border border-gray-100 text-center"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-sm">
                 <CheckCircle size={32} />
               </div>
               <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2 uppercase">Request Received</h2>
               <p className="text-gray-500 font-bold text-sm leading-relaxed mb-8">
                 Thank you! Your call-back request for <span className="text-green-700 font-black">"{property.title}"</span> has been registered. Our dedicated asset strategist will contact you soon.
               </p>
               <button 
                 onClick={() => setShowSuccessModal(false)} 
                 className="w-full bg-gray-900 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 cursor-pointer text-xs font-bold uppercase tracking-wider"
               >
                 Return to Asset
               </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 14. INTERACTIVE LIGHTBOX PHOTO GALLERY */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 flex flex-col justify-between p-6"
            onClick={() => setShowGallery(false)}
          >
            {/* Top Toolbar */}
            <div className="flex justify-between items-center text-white" onClick={e => e.stopPropagation()}>
              <span className="text-xs font-bold uppercase tracking-wider">
                Photo {galleryIndex + 1} of {images.length}
              </span>
              <button 
                onClick={() => setShowGallery(false)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Main Image Slider */}
            <div className="flex-1 flex items-center justify-between" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setGalleryIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all text-xl font-bold"
              >
                ‹
              </button>

              <img 
                src={images[galleryIndex]} 
                alt="Property View" 
                className="max-h-[75vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl animate-fade-in"
              />

              <button 
                onClick={() => setGalleryIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all text-xl font-bold"
              >
                ›
              </button>
            </div>

            {/* Bottom Thumbnails */}
            <div className="flex justify-center gap-3 overflow-x-auto py-4" onClick={e => e.stopPropagation()}>
              {images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt="Thumb" 
                  onClick={() => setGalleryIndex(i)}
                  className={`w-16 h-12 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    galleryIndex === i ? "border-green-500 scale-105" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

const SummaryItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-2 p-3 bg-gray-50/70 border border-gray-100 rounded-2xl hover:bg-green-50/30 hover:border-green-200 transition-all duration-300 group">
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-green-700 shadow-xs group-hover:bg-green-700 group-hover:text-white transition-all duration-300">{icon}</div>
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-xs font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AmenityCard = ({ icon, label }) => (
  <div className="p-5 bg-white border border-gray-100 rounded-2xl flex flex-col items-center gap-3.5 transition-all hover:shadow-lg hover:border-green-700 cursor-pointer group">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-green-700 group-hover:bg-green-50 transition-all">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider text-center">{label}</span>
  </div>
);

const PlanCard = ({ title, area }) => (
  <div 
    onClick={() => window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank")}
    className="p-4 bg-white rounded-xl border border-gray-100 flex items-center justify-between group hover:border-green-700 transition-all cursor-pointer"
  >
     <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-green-700 transition-all">
           <Map size={18} />
        </div>
        <div>
           <h4 className="text-xs font-bold text-gray-800 uppercase">{title}</h4>
           <p className="text-[10px] font-semibold text-gray-450 uppercase text-gray-500">{area}</p>
        </div>
     </div>
     <Download size={16} className="text-gray-400 group-hover:text-green-700 transition-colors" />
  </div>
);

const SpecItem = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
     <p className="text-sm font-semibold text-gray-800 leading-tight">{value}</p>
  </div>
);

const ConnectivityChip = ({ icon, label, time }) => (
  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col gap-2">
     <div className="flex items-center justify-between text-gray-400">
        {React.cloneElement(icon, { className: "text-green-700 w-4 h-4" })}
        <span className="text-[9px] font-bold uppercase text-green-700">{time}</span>
     </div>
     <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">{label}</span>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center">
     <p className="text-xl font-bold text-gray-800 tracking-tight mb-0.5">{value}</p>
     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
     <div className="text-green-700">{icon}</div>
     <div>
        <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-gray-800">{value}</p>
     </div>
  </div>
);

const InsightCard = ({ icon, label, value, trend }) => (
  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
     <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4">
        {React.cloneElement(icon, { size: 20 })}
     </div>
     <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">{label}</p>
     <h4 className="text-2xl font-bold tracking-tight mb-1.5">{value}</h4>
     <p className="text-[9px] font-bold text-green-400 uppercase tracking-wider">{trend}</p>
  </div>
);

const ReviewCard = ({ name, content }) => (
  <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col justify-between">
     <div>
        <div className="flex gap-0.5 text-yellow-400 mb-4">
           {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
        </div>
        <p className="text-gray-600 font-medium italic mb-6 leading-relaxed text-sm">"{content}"</p>
     </div>
     <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase bg-gray-800">
           {name[0]}
        </div>
        <div>
           <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">{name}</p>
           <p className="text-[9px] font-semibold text-green-700 uppercase">Verified Investor</p>
        </div>
      </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0 transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-sm text-gray-800 hover:text-green-750 transition-colors focus:outline-none py-2"
      >
        <span>{question}</span>
        <span className="text-green-700 font-bold text-lg leading-none">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-xs font-semibold text-gray-500 leading-relaxed transition-all duration-300">
          {answer}
        </p>
      )}
    </div>
  );
};

const getDynamicSpecs = (category) => {
  const cat = category?.toLowerCase();
  if (cat === "commercial") {
    return [
      { label: "HVAC System", value: "Centralized VRV Air Conditioning" },
      { label: "Lobby Reception", value: "Double Height Premium Marble Finished" },
      { label: "Power Load Capacity", value: "Dedicated 120 KVA Power Backup" },
      { label: "Passenger Elevators", value: "6 High-Speed Mitsubishi Lifts" }
    ];
  } else if (cat === "plots") {
    return [
      { label: "Road Width", value: "12 Meter Wide Internal Asphalt Road" },
      { label: "Water & Electricity", value: "Dedicated Underground Line Ready" },
      { label: "Zoning Authority", value: "RERA & Municipal Approved Plotting" },
      { label: "Security & Gates", value: "Gated Perimeter with Guard Post" }
    ];
  } else if (cat === "industrial") {
    return [
      { label: "Ceiling Height", value: "12 Meter Clear Height at Apex" },
      { label: "Floor Load Capacity", value: "8 Tons/Sq.M Reinforced Floor" },
      { label: "Loading Bays", value: "3 Heavy Vehicle Bays with Hyd Levelers" },
      { label: "Power Capacity", value: "HT Connection with 350 KVA Load" }
    ];
  } else {
    return [
      { label: "Flooring Specs", value: "Premium Italian Marble / Laminated Wood" },
      { label: "Kitchen layout", value: "Fully Fitted Modular with Premium Hob" },
      { label: "Power Backup", value: "100% Auto-Switch Silent Generator" },
      { label: "Home Automation", value: "Fully Integrated Smart Lock & Video Bell" }
    ];
  }
};

const getLocalizedConnectivity = (location) => {
  const loc = location?.toLowerCase() || "";
  if (loc.includes("delhi")) {
    return [
      { label: "Connaught Place", time: "15 Mins" },
      { label: "IGI Airport", time: "20 Mins" },
      { label: "Max Super Speciality Hospital", time: "8 Mins" },
      { label: "Nearest Metro Station", time: "2 Mins" }
    ];
  } else if (loc.includes("gurgaon")) {
    return [
      { label: "DLF Cyber City Hub", time: "10 Mins" },
      { label: "IGI Airport T3 Terminal", time: "30 Mins" },
      { label: "Medanta Medicity Hospital", time: "12 Mins" },
      { label: "Rapid Metro Station", time: "5 Mins" }
    ];
  } else if (loc.includes("noida")) {
    return [
      { label: "Noida-Greater Noida Exp", time: "3 Mins" },
      { label: "Upcoming Jewar Airport", time: "45 Mins" },
      { label: "Fortis Hospital Sec-62", time: "7 Mins" },
      { label: "Metro Blue Line Station", time: "5 Mins" }
    ];
  } else {
    return [
      { label: "City Center Hub", time: "10 Mins" },
      { label: "Railway Terminus", time: "15 Mins" },
      { label: "Super Speciality Hospital", time: "10 Mins" },
      { label: "State Highway Connection", time: "5 Mins" }
    ];
  }
};
