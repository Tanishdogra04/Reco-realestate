import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, MessageCircle, Sparkles } from "lucide-react";

const AIChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Hello! I'm your RECO India Property Assistant. How can I help you find your dream property or investment opportunity today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      const response = generateMockResponse(text);
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (input) => {
    const lowInput = input.toLowerCase();
    if (lowInput.includes("investment") || lowInput.includes("roi")) {
      return "Investing in North India's real estate market currently offers average annual ROIs of 8-10%. We recommend checking our 'Hot Properties' section for high-yield opportunities.";
    }
    if (lowInput.includes("residential") || lowInput.includes("house") || lowInput.includes("villa")) {
      return "We have over 3000+ residential properties ranging from luxury villas in South Delhi to budget-friendly apartments in Noida. Would you like to see our curated residential collections?";
    }
    if (lowInput.includes("commercial") || lowInput.includes("office")) {
      return "Commercial spaces in Gurgaon and Mohali are seeing high demand. We have premium office spaces and retail shops starting from ₹1.20 Cr.";
    }
    if (lowInput.includes("price") || lowInput.includes("cost")) {
      return "Property prices vary significantly by location. For example, luxury villas in South Delhi start around ₹2.50 Cr, while investment plots in Jaipur start from ₹75 Lakhs.";
    }
    if (lowInput.includes("rera")) {
      return "All properties listed on RECO India are RERA registered or in the process of verification to ensure maximum security for your investment.";
    }
    return "That's an interesting question! I'm specifically trained on North Indian real estate trends, property valuations, and investment ROI. Could you provide more details about the location or type of property you're interested in?";
  };

  const suggestions = [
    "Best areas for investment?",
    "High ROI properties",
    "Residential vs Commercial?",
    "RERA guidelines",
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.8 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-16 right-16 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-[60] overflow-hidden border border-gray-200 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={20} className="text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">RECO Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[10px] opacity-80">Always Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 min-h-[300px] h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4 scrollbar-hide">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.type === "user"
                    ? "bg-green-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px]">
                  {msg.type === "assistant" ? <Bot size={12} /> : <User size={12} />}
                  <span>{msg.type === "assistant" ? "Assistant" : "You"}</span>
                </div>
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="text-[11px] bg-white border border-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Footer/Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about property..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-[9px] text-center text-gray-400 mt-2">
            Powered by RECO Smart Intelligence
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChatWidget;
