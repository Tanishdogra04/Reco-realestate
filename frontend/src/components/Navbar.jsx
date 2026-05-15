import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Home, 
  Building2, 
  Lightbulb, 
  MapPin, 
  TrendingUp, 
  Calendar, 
  Briefcase,
  LayoutList,
  User,
  PlusCircle,
  Menu,
  X,
  ArrowRight,
  Settings,
  Heart,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import logo from "/images/Logreco.png";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Properties", path: "/properties", icon: <Home size={14} /> },
    { label: "Solutions", path: "/solutions", icon: <Lightbulb size={14} /> },
    { label: "Localities", path: "/top-localities", icon: <MapPin size={14} /> },
    { label: "Insights", path: "/insights", icon: <TrendingUp size={14} /> },
    { label: "Events", path: "/events", icon: <Calendar size={14} /> },
  ];

  const themeGradient = "bg-gradient-to-r from-[#FFE5B4]/90 via-white/90 to-[#C8FACC]/90";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[70] transition-all duration-500 ${
          location.pathname === "/"
            ? scrolled 
              ? "bg-white/95 backdrop-blur-xl shadow-lg py-3" 
              : `${themeGradient} backdrop-blur-md py-4 border-b border-black/5`
            : "bg-white/95 backdrop-blur-xl shadow-md py-3"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LEFT: BRANDING */}
          <Link to="/" onClick={handleLogoClick} className="shrink-0 flex items-center gap-3 group">
            <img
              src={logo}
              alt="RECO Logo"
              className="h-10 md:h-11 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* RIGHT: NAVIGATION & ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-1 bg-white/40 p-1.5 rounded-[24px] backdrop-blur-sm border border-black/5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all ${
                    location.pathname === link.path 
                      ? "bg-gray-900 text-white shadow-lg" 
                      : "text-gray-800 hover:text-green-700 hover:bg-white/60"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 border-l border-black/5 pl-6">
              {!token ? (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/60 hover:bg-gray-900 hover:text-white text-gray-900 rounded-full transition-all border border-black/5 text-[11px] font-black uppercase tracking-widest"
                >
                  <User size={16} strokeWidth={2.5} className="text-green-600" />
                  Login
                </Link>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 bg-white/60 hover:bg-white rounded-full transition-all border border-black/5"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">
                      {user.fullName?.split(' ').map(n => n[0]).join('')}
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* PROFILE DROPDOWN */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden animate-fade-in z-[100]">
                      <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Signed in as</p>
                        <p className="text-sm font-black text-gray-900 truncate">{user.fullName}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/edit-profile" className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all">
                          <Settings size={16} /> Edit Profile
                        </Link>
                        <Link to="/saved-properties" className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all">
                          <Heart size={16} /> Saved Properties
                        </Link>
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-purple-600 hover:bg-purple-50 rounded-2xl transition-all">
                            <ShieldCheck size={16} /> Admin Console
                          </Link>
                        )}
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-2xl transition-all">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <div className="h-px bg-gray-50 my-2 mx-4" />
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <Link
                to="/post-property"
                className="relative px-6 py-3 bg-green-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 shadow-2xl shadow-green-100 transition-all flex items-center gap-2 group"
              >
                <PlusCircle size={16} strokeWidth={2.5} />
                Post Ad
                <span className="absolute -top-2 -right-1 bg-yellow-400 text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  FREE
                </span>
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex lg:hidden items-center gap-3">
             <button 
               onClick={() => setMenuOpen(true)} 
               className="p-3 bg-white/80 backdrop-blur-md text-green-700 rounded-[18px] shadow-lg border border-black/5 hover:bg-green-600 hover:text-white transition-all"
             >
                <Menu size={22} strokeWidth={2.5} />
             </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[80] lg:hidden ${menuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-700 ${menuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] bg-[#F5EFE7] shadow-2xl transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${menuOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto flex flex-col rounded-l-[48px]`}>
          <div className="p-8 pb-4 flex items-center justify-between">
            <Link to="/" onClick={handleLogoClick}>
              <img src={logo} alt="RECO Logo" className="h-8 w-auto" />
            </Link>
            <button onClick={() => setMenuOpen(false)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm"><X size={20} /></button>
          </div>
          <div className="px-8 mb-8">
            <div className="bg-white p-6 rounded-[32px] flex items-center gap-4 border border-black/5 shadow-sm">
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><User size={24} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Welcome</p>
                {!token ? (
                  <Link to="/login" className="text-lg font-black text-gray-900 hover:underline">Sign In / Register</Link>
                ) : (
                  <p className="text-lg font-black text-gray-900">{user.fullName}</p>
                )}
              </div>
            </div>
          </div>
          <nav className="flex-1 px-8 space-y-3 overflow-y-auto custom-scrollbar">
            {token && user.role === 'admin' && (
              <Link to="/admin" className="group flex items-center gap-4 p-5 bg-purple-50 rounded-[24px] shadow-sm hover:bg-purple-600 transition-all duration-500" onClick={() => setMenuOpen(false)}>
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700"><ShieldCheck size={20} /></div>
                <div className="flex-1"><p className="font-black text-[13px] text-purple-900 group-hover:text-white uppercase tracking-tight">Admin Console</p></div>
                <ArrowRight size={16} className="text-purple-300 group-hover:text-white ml-auto" />
              </Link>
            )}
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} className="group flex items-center gap-4 p-5 bg-white rounded-[24px] shadow-sm hover:bg-green-600 transition-all duration-500" onClick={() => setMenuOpen(false)}>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700">{link.icon}</div>
                <div className="flex-1"><p className="font-black text-[13px] text-gray-900 group-hover:text-white uppercase tracking-tight">{link.label}</p></div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-white ml-auto" />
              </Link>
            ))}
          </nav>
          <div className="p-8 pt-6 border-t border-black/5 space-y-4">
            <Link to="/post-property" className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-5 rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-green-100" onClick={() => setMenuOpen(false)}>
              <PlusCircle size={18} /> Post Ad (FREE)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
