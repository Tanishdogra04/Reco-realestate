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
import { fetchPropertyById } from "../api/api";

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
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
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

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }
    
    setSubmitting(true);
    try {
      await createEnquiry({
        ...formData,
        property: id,
        type: 'general'
      });
      setShowVisitModal(false);
      setShowSuccessModal(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
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

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-green-100">
      
      {/* 1. HERO PROPERTY GALLERY */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Featured Image */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative h-[400px] md:h-[600px] rounded-[48px] overflow-hidden shadow-2xl group">
                <img src={images[current]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badges */}
                <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                  <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl flex items-center gap-2 shadow-lg">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Verified Asset</span>
                  </div>
                  <div className="px-5 py-2.5 bg-gray-900/90 backdrop-blur-md rounded-2xl flex items-center gap-2 shadow-lg border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{property.status || "Ready to Move"}</span>
                  </div>
                </div>

                {/* Video Tour Trigger */}
                <button 
                  onClick={() => authAction(() => setShowVideo(true))}
                  className="absolute bottom-8 left-8 px-6 py-4 bg-white hover:bg-green-600 hover:text-white rounded-3xl flex items-center gap-3 transition-all group shadow-2xl"
                >
                  <PlayCircle size={20} className="text-green-600 group-hover:text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Cinema Tour Preview</span>
                </button>

                {/* Floating Controls */}
                <div className="absolute bottom-8 right-8 flex gap-3">
                  <button onClick={toggleFavorite} className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${isFavorited ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white/90 backdrop-blur-md text-gray-900 hover:bg-red-500 hover:text-white shadow-xl'}`}>
                    <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
                  </button>
                  <button className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-3xl flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-xl">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Gallery - ONLY 2 ON RIGHT */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
              {images.slice(1, 3).map((img, i) => (
                <div key={i} onClick={() => i === 1 ? alert("Opening Full Gallery...") : setCurrent(i + 1)} className="relative h-[190px] md:h-[288px] rounded-[32px] overflow-hidden cursor-pointer group border-4 border-transparent hover:border-green-600 transition-all shadow-lg">
                  <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                  {i === 1 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                      <LayoutGrid size={32} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">View All Photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROPERTY QUICK SUMMARY */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 uppercase leading-none mb-4">{property.title}</h1>
                    <div className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs">
                      <MapPin size={16} className="text-green-600" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Starting Price</p>
                    <div className="text-4xl md:text-5xl font-black text-green-600 tracking-tighter">
                      ₹{(property.price / 10000000).toFixed(2)} <span className="text-lg">Cr*</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">₹{Math.round(property.price / property.area)} / sq.ft</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-gray-50">
                  <SummaryItem icon={<Building2 size={20} />} label="Asset Type" value={property.category?.toUpperCase()} />
                  <SummaryItem icon={<BedDouble size={20} />} label="Configuration" value={`${property.bhk || "Office"} BHK`} />
                  <SummaryItem icon={<Ruler size={20} />} label="Super Area" value={`${property.area} sq.ft`} />
                  <SummaryItem icon={<Calendar size={20} />} label="Possession" value={property.possession || "Immediate"} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  <div className="p-6 bg-gray-50 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-1">RERA STATUS</p>
                      <p className="text-sm font-black text-gray-900 tracking-widest">{property.rera || "VERIFIED"}</p>
                    </div>
                    <ShieldCheck size={24} className="text-green-600" />
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-1">ASSET RATING</p>
                      <div className="flex gap-1 text-yellow-400">
                        {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    <Award size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Sticky Quick Actions */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="bg-gray-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/20 rounded-full blur-[80px]" />
                   <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Expert Advisory</h3>
                   <div className="space-y-4">
                      <button 
                        onClick={() => authAction(() => setShowVisitModal(true))}
                        className="w-full py-5 bg-green-600 hover:bg-white hover:text-green-600 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                      >
                        Schedule Site Visit
                      </button>
                      <button 
                        onClick={() => authAction(() => window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank"))}
                        className="w-full py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2"
                      >
                        <Download size={14} /> Get Brochure
                      </button>
                      <button 
                        onClick={() => authAction(() => setShowVisitModal(true))}
                        className="w-full py-5 bg-white text-gray-900 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl"
                      >
                        Contact Advisor
                      </button>
                   </div>
                </div>
                
                {/* EMI CALCULATOR PREVIEW */}
                <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                   <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-black uppercase tracking-widest">Financial Planner</h4>
                      <Calculator size={18} className="text-green-600" />
                   </div>
                   <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                           <span className="text-gray-400">Loan Amount</span>
                           <span className="text-gray-900">₹{(emiData.amount/100000).toFixed(0)} L</span>
                        </div>
                        <input 
                          type="range" min="1000000" max="50000000" step="1000000"
                          value={emiData.amount} onChange={e => setEmiData({...emiData, amount: Number(e.target.value)})}
                          className="w-full accent-green-600" 
                        />
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-4 border-t border-gray-50">
                        <span className="text-gray-400 uppercase text-[9px] tracking-widest">Monthly EMI</span>
                        <span className="text-green-600 font-black">₹{emiResult.toLocaleString()}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESCRIPTION & 4. AMENITIES */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Lifestyle Asset</span>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">Asset Overview<span className="text-green-600">.</span></h2>
              <p className="text-gray-500 text-lg font-medium leading-[1.8] mb-8">
                {property.description || `${property.title} is a premier institutional asset strategically located in ${property.location}. This development represents the pinnacle of modern architectural excellence, offering a seamless blend of luxury and functionality. Whether you are looking for a dream home or a high-yield commercial asset, this property is curated to exceed every standard.`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-50">
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4">Strategic Landmarks</h4>
                    <ul className="space-y-3">
                       {["5 mins to Metro Station", "2 mins to Express Highway", "Top Schools within 3km", "Hospitals within 1km"].map((item, i) => (
                         <li key={i} className="text-sm font-bold text-gray-600 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-600 rounded-full" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2">Growth Potential</h4>
                    <p className="text-sm font-bold text-green-600 mb-4">+12.5% YoY Appreciation</p>
                    <div className="h-16 flex items-end gap-1">
                       {[40, 60, 45, 80, 70, 90].map((h, i) => (
                         <div key={i} className="flex-1 bg-green-200 rounded-t-md transition-all hover:bg-green-600" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* 4. AMENITIES SECTION */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">World-Class Amenities</h2>
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
          <div className="lg:col-span-5 space-y-12">
             <div className="bg-gray-50 rounded-[48px] p-10 border border-gray-100">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Architectural Plans</h3>
                <div className="space-y-4">
                   <PlanCard title="Standard Unit Plan" area={`${property.area} sq.ft`} />
                   <PlanCard title="Institutional Master Plan" area="12.5 Acres" />
                </div>
                <button className="w-full mt-8 py-5 bg-gray-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all">Download Floor Plans</button>
             </div>

             <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Technical Specs</h3>
                <div className="space-y-6">
                   <SpecItem label="Flooring" value="Premium Italian Marble / Vitrified" />
                   <SpecItem label="Kitchen" value="Designer Modular with Hob & Chimney" />
                   <SpecItem label="Construction" value="MIVAN High-Rise Formwork" />
                   <SpecItem label="Automation" value="Fully Integrated Smart Home Hub" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & CONNECTIVITY */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div className="h-[500px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
                <iframe
                  title="Connectivity Map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  width="100%" height="100%" loading="lazy" className="grayscale contrast-125"
                ></iframe>
             </div>
             <div className="space-y-8">
                <div>
                   <span className="text-green-600 font-black uppercase tracking-widest text-[10px] block mb-2">Connectivity Hub</span>
                   <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-6">Proximity Index</h2>
                   <div className="grid grid-cols-2 gap-4">
                      <ConnectivityChip icon={<Building2 size={14} />} label="Hospitals" time="5 Mins" />
                      <ConnectivityChip icon={<Award size={14} />} label="Top Schools" time="8 Mins" />
                      <ConnectivityChip icon={<Zap size={14} />} label="Metro Station" time="2 Mins" />
                      <ConnectivityChip icon={<Smartphone size={14} />} label="Airport" time="25 Mins" />
                   </div>
                </div>
                <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                   <h4 className="text-xs font-black uppercase tracking-widest mb-6">Nearby Essentials</h4>
                   <div className="space-y-4">
                      {["Heritage International School - 1.2km", "Fortis Hospital Hub - 2.5km", "Galleria Mall - 3.0km"].map((item, i) => (
                        <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                           <span className="text-sm font-bold text-gray-600">{item.split(' - ')[0]}</span>
                           <span className="text-xs font-black text-gray-900">{item.split(' - ')[1]}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. BUILDER & 9. ADVISOR */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Builder Info */}
           <div className="bg-gray-50 rounded-[48px] p-12 flex flex-col justify-between border border-gray-100">
              <div>
                <div className="flex items-center gap-6 mb-10">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-gray-100">
                      <Building2 size={40} className="text-green-600" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{property.developer || "RECO INFRASTRUCTURE"}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Institutional Developer</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-10">
                   <StatBox label="Years Exp" value="25+" />
                   <StatBox label="Projects" value="114+" />
                   <StatBox label="Customers" value="50k+" />
                </div>
              </div>
              <button 
                onClick={() => navigate('/developer-portfolio')}
                className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all"
              >
                View Developer Portfolio
              </button>
           </div>

           {/* Advisor Card */}
           <div className="bg-white rounded-[48px] p-12 border border-gray-200 shadow-2xl shadow-gray-200/50">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-4 border-green-50 shadow-inner shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" className="w-full h-full object-cover" alt="" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tighter">Vikram Malhotra</h3>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Senior Asset Strategist</p>
                    <div className="flex gap-1 text-yellow-400 mt-1">
                       {Array(5).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                 <ContactItem icon={<Phone size={14} />} label="Mobile" value="+91 99990 00000" />
                 <ContactItem icon={<MessageSquare size={14} />} label="WhatsApp" value="Instant Connect" />
              </div>
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                 <input 
                   type="tel" required placeholder="Your Mobile Number" 
                   value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                   className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500" 
                 />
                 <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-green-600 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-green-100 disabled:opacity-50"
                 >
                   {submitting ? "Processing..." : "Request Instant Callback"}
                 </button>
              </form>
           </div>
        </div>
      </section>

      {/* 10. INVESTMENT INSIGHTS */}
      <section className="px-6 py-20 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[120px]" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
               <span className="text-green-500 font-black uppercase tracking-[0.3em] text-[10px] block mb-4">AI ANALYTICS HUB</span>
               <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Investment Insights<span className="text-green-500">.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <InsightCard icon={<TrendingUp />} label="Rental Yield" value="~5.8%" trend="Institutional Avg" />
               <InsightCard icon={<BarChart3 />} label="Demand Score" value="High" trend="98th Percentile" />
               <InsightCard icon={<TrendingUp />} label="ROI Forecast" value="+45%" trend="Next 3 Years" />
               <InsightCard icon={<Award />} label="RECO Score" value="9.4/10" trend="Tier-1 Asset" />
            </div>
         </div>
      </section>

      {/* 11. REVIEWS & 12. SIMILAR PROPERTIES */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-12">Investor Testimonials</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ReviewCard name="Rahul Sharma" content="The acquisition process was seamless. The asset value appreciated 12% within just 6 months of booking." />
              <ReviewCard name="Sanya Malhotra" content="Highly professional advisory. The property specs are exactly as promised. A true Tier-1 development." />
              <ReviewCard name="Amit Desai" content="Strategically located. The rental demand in this corridor is phenomenal. Best decision for my portfolio." />
           </div>
        </div>
      </section>

      {/* 13. STICKY BOTTOM CTA BAR */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between shadow-2xl"
          >
            <div className="hidden md:flex flex-col">
               <h4 className="text-sm font-black text-gray-900 uppercase truncate max-w-[200px]">{property.title}</h4>
               <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">₹{(property.price / 10000000).toFixed(2)} Cr Onwards</p>
            </div>
            <div className="flex-1 md:flex-none flex items-center gap-3">
               <button 
                onClick={() => authAction(() => window.location.href = "tel:+919999000000")}
                className="flex-1 md:w-48 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-green-100 flex items-center justify-center gap-2"
               >
                 <Phone size={14} /> Call Strategist
               </button>
               <button 
                onClick={() => authAction(() => setSiteVisitScheduled(true))}
                className="hidden md:flex w-48 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-2"
               >
                 <Calendar size={14} /> Site Visit
               </button>
               <button 
                onClick={() => authAction(() => window.open("https://wa.me/919999000000", "_blank"))}
                className="p-4 bg-gray-50 text-green-600 rounded-2xl hover:bg-green-50 transition-all border border-gray-100"
               >
                  <MessageCircle size={20} />
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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowVisitModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[40px] p-10 relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Request Access</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Personalized Advisor Support</p>
              
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <input 
                  type="text" required placeholder="Full Name" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500" 
                />
                <input 
                  type="tel" required placeholder="Mobile Number" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500" 
                />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500" 
                />
                <textarea 
                  placeholder="Your Message (Optional)" 
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500 h-32 resize-none" 
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-green-100 disabled:opacity-50"
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
            className="fixed inset-0 z-[110] bg-green-600 flex items-center justify-center p-6 text-white text-center"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
               <CheckCircle size={80} className="mx-auto mb-8" />
               <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Request Received!</h2>
               <p className="text-sm font-black uppercase tracking-[0.3em] opacity-60">Our Advisor will contact you soon.</p>
               <button onClick={() => setShowSuccessModal(false)} className="mt-12 px-12 py-4 bg-white text-green-600 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl">Return to Asset</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

const SummaryItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-3">
    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xs font-black text-gray-900">{value}</p>
    </div>
  </div>
);

const AmenityCard = ({ icon, label }) => (
  <div className="p-6 bg-white border border-gray-100 rounded-[32px] flex flex-col items-center gap-4 transition-all hover:shadow-xl hover:border-green-600 cursor-pointer group">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-green-600 group-hover:bg-green-50 transition-all">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest text-center">{label}</span>
  </div>
);

const PlanCard = ({ title, area }) => (
  <div 
    onClick={() => window.open("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "_blank")}
    className="p-5 bg-white rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-green-600 transition-all cursor-pointer"
  >
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-green-600 transition-all">
           <Map size={20} />
        </div>
        <div>
           <h4 className="text-sm font-black text-gray-900 uppercase">{title}</h4>
           <p className="text-[10px] font-bold text-gray-400 uppercase">{area}</p>
        </div>
     </div>
     <Download size={18} className="text-gray-300 group-hover:text-green-600" />
  </div>
);

const SpecItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
     <p className="text-sm font-bold text-gray-900 leading-tight">{value}</p>
  </div>
);

const ConnectivityChip = ({ icon, label, time }) => (
  <div className="p-5 bg-white rounded-[24px] border border-gray-100 flex flex-col gap-3">
     <div className="flex items-center justify-between text-gray-400">
        {icon}
        <span className="text-[9px] font-black uppercase text-green-600">{time}</span>
     </div>
     <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{label}</span>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="text-center">
     <p className="text-2xl font-black text-gray-900 tracking-tighter mb-1">{value}</p>
     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
  </div>
);

const ContactItem = ({ icon, label, value }) => (
  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
     <div className="text-green-600">{icon}</div>
     <div>
        <p className="text-[9px] font-black text-gray-400 uppercase mb-0.5">{label}</p>
        <p className="text-xs font-black text-gray-900">{value}</p>
     </div>
  </div>
);

const InsightCard = ({ icon, label, value, trend }) => (
  <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-md">
     <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6">
        {React.cloneElement(icon, { size: 24 })}
     </div>
     <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{label}</p>
     <h4 className="text-4xl font-black tracking-tighter mb-2">{value}</h4>
     <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">{trend}</p>
  </div>
);

const ReviewCard = ({ name, content }) => (
  <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 flex flex-col justify-between">
     <div>
        <div className="flex gap-1 text-yellow-400 mb-6">
           {Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <p className="text-gray-500 font-medium italic mb-10 leading-relaxed text-sm">"{content}"</p>
     </div>
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase">
           {name[0]}
        </div>
        <div>
           <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{name}</p>
           <p className="text-[9px] font-black text-green-600 uppercase">Verified Investor</p>
        </div>
     </div>
  </div>
);
