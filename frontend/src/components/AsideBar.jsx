import { useState, useEffect, useCallback } from "react";
import { MessageCircle, PhoneCall, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const asideOptions = [
  { id: 1, label: "Talk to Assistant", Icon: MessageCircle, message: "Chat with our Ai assistant", action: "chat" },
  { id: 2, label: "Expert Consultant", Icon: PhoneCall, message: "Get call back", action: "tel:+918001234567" },
  { id: 3, label: "Connect on WhatsApp", Icon: FaWhatsapp, message: "Connect on WhatsApp", action: "https://wa.me/918001234567" },
  { id: 4, label: "Share your Requirement", Icon: FileText, message: "Share your Requirement", action: "/contact" },
];

const AsideBar = () => {
  const [hovered, setHovered] = useState(null);
  const [atBottom, setAtBottom] = useState(false);
  const navigate = useNavigate();

  const handleAction = (opt) => {
    if (opt.action === "chat") {
      alert("AI Assistant Chat integration coming soon!");
    } else if (opt.action.startsWith("http") || opt.action.startsWith("tel")) {
      window.open(opt.action, opt.action.startsWith("http") ? "_blank" : "_self");
    } else {
      navigate(opt.action);
    }
  };

  // Scroll detection
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY + window.innerHeight;
          const pageHeight = document.documentElement.scrollHeight;
          setAtBottom(scrollTop >= pageHeight - 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hover + Focus handlers
  const handleMouseEnter = useCallback((id) => setHovered(id), []);
  const handleMouseLeave = useCallback(() => setHovered(null), []);
  const handleFocus = useCallback((id) => setHovered(id), []);
  const handleBlur = useCallback(() => setHovered(null), []);

  return (
    <>
      {/* Floating aside (only if not at bottom) */}
      {!atBottom && (
        <nav
          aria-label="Quick actions"
          className="fixed right-0 top-1/3 flex flex-col space-y-3 z-50 transition-all duration-500"
        >
          {asideOptions.map((opt) => (
            <div
              key={opt.id}
              className="relative group flex items-center"
            >
              {/* Tooltip (aria-describedby link) */}
              <div
                id={`tooltip-${opt.id}`}
                role="tooltip"
                className={`absolute right-12 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-md whitespace-nowrap transition-all duration-300 ${
                  hovered === opt.id ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {opt.message}
              </div>

              {/* Button */}
              <button
                aria-label={opt.label}
                aria-describedby={`tooltip-${opt.id}`}
                onClick={() => handleAction(opt)}
                onFocus={() => handleFocus(opt.id)}
                onBlur={handleBlur}
                onMouseEnter={() => handleMouseEnter(opt.id)}
                onMouseLeave={handleMouseLeave}
                className="p-3 rounded-l-xl bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              >
                <opt.Icon size={22} aria-hidden="true" />
              </button>
            </div>
          ))}
        </nav>
      )}

      {/* Bottom row  */}
      {atBottom && (
  <nav
    aria-label="Quick actions bottom bar"
    className="fixed bottom-0 left-0 w-full flex bg-white border-t border-gray-300 z-50"
  >
    {asideOptions.map((opt, idx) => (
      <button
        key={opt.id}
        onClick={() => handleAction(opt)}
        className={`flex items-center justify-center flex-1 py-3 gap-2 hover:bg-green-50 transition-colors ${
          idx !== asideOptions.length - 1 ? "border-r border-gray-300" : ""
        }`}
      >
        <opt.Icon size={22} className="text-green-600" />
        <span className="text-sm font-medium text-gray-700">{opt.label}</span>
      </button>
    ))}
  </nav>
)}
    </>
  );
};

export default AsideBar;
