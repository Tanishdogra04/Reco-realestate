import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-gradient-to-br from-green-50 to-orange-50 py-20 px-6 text-black border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Description */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Reco<span className="text-green-600">.</span></h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            North India's most trusted real estate ecosystem. We simplify your property journey with data-driven insights and premium listings.
          </p>

          {/* Social Media */}
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF size={16} />, label: "Facebook", color: "hover:bg-blue-600" },
              { icon: <FaTwitter size={16} />, label: "Twitter", color: "hover:bg-sky-500" },
              { icon: <FaInstagram size={16} />, label: "Instagram", color: "hover:bg-pink-500" },
              { icon: <FaLinkedinIn size={16} />, label: "LinkedIn", color: "hover:bg-blue-700" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                aria-label={social.label}
                className={`w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-white ${social.color} transition-all duration-300 shadow-sm`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Discovery</h3>
          <ul className="space-y-4 text-sm font-bold text-gray-700">
            <li><Link to="/properties/residential" className="hover:text-green-600 transition-colors">Residential Properties</Link></li>
            <li><Link to="/properties/commercial" className="hover:text-green-600 transition-colors">Commercial Spaces</Link></li>
            <li><Link to="/properties/industrial" className="hover:text-green-600 transition-colors">Industrial Assets</Link></li>
            <li><Link to="/properties/plots" className="hover:text-green-600 transition-colors">Plots & Land</Link></li>
            <li><Link to="/insights" className="hover:text-green-600 transition-colors">Insights & Trends</Link></li>
            <li><Link to="/view" className="hover:text-green-600 transition-colors">All Listings</Link></li>
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Resources">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Resources</h3>
          <ul className="space-y-4 text-sm font-bold text-gray-700">
            <li><Link to="/solutions" className="hover:text-green-600 transition-colors">Investment Solutions</Link></li>
            <li><Link to="/insights" className="hover:text-green-600 transition-colors">Market Trends</Link></li>
            <li><Link to="/top-localities" className="hover:text-green-600 transition-colors">Locality Insights</Link></li>
            <li><Link to="/events" className="hover:text-green-600 transition-colors">Industry Events</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition-colors">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-green-600 transition-colors">FAQ</Link></li>
          </ul>
        </nav>

        {/* Contact Info */}
        <address className="not-italic">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Contact</h3>
          <div className="space-y-4 text-sm font-bold text-gray-700">
            <p className="leading-relaxed">
              Homeland, 123 Business District,<br /> Chandigarh, India - 140308
            </p>
            <p className="pt-2">
              <a href="tel:+918278713791" className="hover:text-green-600 transition-colors">+91 8278713791</a>
            </p>
            <p>
              <a href="mailto:info@reco.com" className="hover:text-green-600 transition-colors">info@reco.com</a>
            </p>
            <div className="pt-4">
              <Link to="/contact" className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600 transition-all">Get In Touch</Link>
            </div>
          </div>
        </address>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">
            © 2025 Reco Platform. Built for the future of Real Estate.
          </p>
          <div className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
            <Link to="/contact" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-green-600 transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-green-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
