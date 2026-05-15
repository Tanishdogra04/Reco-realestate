import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Home, Calendar, Download } from "lucide-react";
import jsPDF from "jspdf";

export default function CheckoutSuccess() {
  const location = useLocation();
  const { property, totalPrice, paymentMethod } = location.state || {};

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!property) {
    return (
      <div className="mt-24 text-center py-20">
        <h1 className="text-2xl font-bold">No Booking Data Found</h1>
        <p className="text-gray-500 mt-2">The session may have expired or the booking was not completed.</p>
        <Link to="/" className="text-green-600 font-bold hover:underline mt-6 inline-block">Return to Homepage</Link>
      </div>
    );
  }

  const transactionId = `TXN${Math.floor(100000000 + Math.random() * 900000000)}`;

  const handleDownloadSummary = () => {
    const doc = new jsPDF();
    
    // Set fonts and styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(22, 163, 74); // Green color
    doc.text("RECO INDIA REAL ESTATE", 105, 25, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text("BOOKING CONFIRMATION RECEIPT", 105, 35, { align: "center" });
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 42, 190, 42);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Booking Reference: RECO-${Math.floor(100000 + Math.random() * 900000)}`, 20, 52);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 160, 52);
    doc.text(`Transaction ID: ${transactionId}`, 20, 58);
    
    // Property Details Section
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.text("PROPERTY ACQUISITION DETAILS", 20, 75);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Title:", 20, 85);
    doc.setFont("helvetica", "normal");
    doc.text(property.title, 60, 85);
    
    doc.setFont("helvetica", "bold");
    doc.text("Location:", 20, 93);
    doc.setFont("helvetica", "normal");
    doc.text(property.location, 60, 93);
    
    doc.setFont("helvetica", "bold");
    doc.text("Category:", 20, 101);
    doc.setFont("helvetica", "normal");
    doc.text(property.category.toUpperCase(), 60, 101);
    
    doc.setFont("helvetica", "bold");
    doc.text("Developer:", 20, 109);
    doc.setFont("helvetica", "normal");
    doc.text(property.developer, 60, 109);
    
    // Payment Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT SUMMARY", 20, 125);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Base Property Price:", 20, 135);
    doc.text(formatPrice(property.price), 150, 135);
    
    doc.text("Stamp Duty (Est. 5%):", 20, 143);
    doc.text(formatPrice(property.price * 0.05), 150, 143);
    
    doc.text("Registration Fees:", 20, 151);
    doc.text(formatPrice(50000), 150, 151);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(20, 158, 190, 158);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TOTAL AMOUNT PAID:", 20, 168);
    doc.text(formatPrice(totalPrice), 150, 168);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(22, 163, 74);
    doc.text(`Status: PAYMENT SUCCESSFUL`, 20, 178);
    doc.text(`Payment Method: ${paymentMethod === "bank_transfer" ? "Corporate Bank Transfer" : "Instant Card Payment"}`, 20, 185);
    
    // Footer / Next Steps
    doc.setFontSize(14);
    doc.setTextColor(33, 37, 41);
    doc.text("NEXT STEPS", 20, 205);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("1. Our Relationship Manager will call you within 24 hours.", 20, 215);
    doc.text("2. Physical site visit and document verification will be scheduled.", 20, 222);
    doc.text("3. Final sale deed execution will be coordinated by our legal team.", 20, 229);
    
    doc.setFontSize(9);
    doc.text("This is a computer-generated summary and does not require a physical signature.", 105, 275, { align: "center" });
    doc.text("RECO India Real Estate - Excellence in Every Square Foot", 105, 282, { align: "center" });
    
    doc.save(`RECO_Receipt_${property.id}_${Date.now()}.pdf`);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen py-20 px-4 sm:px-6 mt-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white shadow-2xl mx-auto border-4 border-white">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Congratulations!</h1>
          <p className="text-xl text-gray-600 font-medium">Your request for acquisition has been initiated.</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-[48px] p-8 md:p-12 border border-gray-100 shadow-2xl space-y-10 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-gray-50 pb-8">
            <div>
              <p className="text-[10px] font-black uppercase text-green-600 tracking-widest mb-1">Booking Reference</p>
              <h3 className="text-2xl font-black text-gray-900">RECO-{Math.floor(100000 + Math.random() * 900000)}</h3>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Payment Method</p>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                {paymentMethod === "bank_transfer" ? "Corporate Bank Transfer" : "Online Card/UPI Payment"}
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-white">
              <img src={property.image} className="w-full h-full object-cover" alt={property.title} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[10px] font-black uppercase text-green-600 tracking-widest mb-1">{property.category}</p>
              <h4 className="text-xl font-bold text-gray-900 leading-tight">{property.title}</h4>
              <p className="text-sm text-gray-500 font-medium mt-1">{property.location}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Amount Paid</p>
              <p className="text-2xl font-black text-gray-900">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Verification Call</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">Our relationship manager will call you within 24 hours to schedule a site visit and document verification.</p>
              </div>
            </div>
            <button 
              onClick={handleDownloadSummary}
              className="flex items-start text-left gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                <Download size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Download Summary</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">Click here to download your detailed purchase summary and next-step guidelines as a PDF.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to="/dashboard" className="px-10 py-5 bg-gray-900 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-2xl shadow-gray-900/20 active:scale-95">
            View My Portfolio
          </Link>
          <Link to="/" className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
            <Home size={18} />
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}
