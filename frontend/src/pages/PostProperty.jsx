import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

const PostProperty = () => {
  const navigate = useNavigate();

  const [listingType, setListingType] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [userType, setUserType] = useState("");
  const [phone, setPhone] = useState("");

  const propertyCategories = ["Residential", "Commercial", "Land"];
  const projectCategories = [
    "Residential Project",
    "Commercial Project",
    "Builder Floor",
    "Apartments",
    "Villas",
  ];

  const purposeMap = {
    Residential: ["Sell", "Rent", "PG"],
    Commercial: ["Sell", "Rent", "Lease"],
    Land: ["Sell"],
    Project: ["Sell"],
  };

  const handleContinue = () => {
    const finalCategory = category === "Other" ? customCategory : category;

    if (
      !listingType ||
      !finalCategory ||
      !purpose ||
      !userType ||
      phone.length < 10
    ) {
      alert("Please complete all required fields");
      return;
    }

    navigate("/post-property-step1", {
      state: {
        listingType,
        category: finalCategory,
        purpose,
        userType,
        phone,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex items-center">
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center w-full py-20">

        {/* ================= LEFT HERO ================= */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Post your Property or Project for{" "}
            <span className="text-green-600">FREE</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            Reach verified buyers & tenants faster with RECO’s trusted real estate platform.
          </p>

          {/* TRUST CARDS */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-xl">
            {[
              {
               icon: ShieldCheck,
  title: "No Hidden Charges",
  desc: "Post and manage listings without any fees",
              },
              {
                icon: Users,
                title: "Verified Leads",
                desc: "Connect with genuine buyers only",
              },
              {
                icon: BadgeCheck,
                title: "Trusted Platform",
                desc: "Thousands of successful listings",
              },
              {
                icon: TrendingUp,
                title: "Higher Visibility",
                desc: "Your listing reaches more users",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border"
              >
                <Icon className="text-green-600 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-7 text-black">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
            Start Posting
          </h3>

          {/* WHAT ARE YOU POSTING */}
          <label className="text-sm font-medium text-gray-700">
            What are you posting?
          </label>
          <div className="flex gap-2 mt-2">
            {["Property", "Project"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setListingType(item);
                  setCategory("");
                  setCustomCategory("");
                  setPurpose("");
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                  listingType === item
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CATEGORY */}
          {listingType && (
            <>
              <label className="text-sm font-medium mt-5 block text-gray-700">
                Category
              </label>

              <div className="relative mt-1">
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCustomCategory("");
                    setPurpose("");
                  }}
                  className="w-full border rounded-lg px-3 py-2.5 pr-10 appearance-none focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Select category</option>
                  {(listingType === "Property"
                    ? [...propertyCategories, "Other"]
                    : [...projectCategories, "Other"]
                  ).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </span>
              </div>
            </>
          )}

          {/* CUSTOM CATEGORY */}
          {category === "Other" && (
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2.5 mt-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
          )}

          {/* PURPOSE */}
          {category && (
            <>
              <label className="text-sm font-medium mt-5 block text-gray-700">
                Looking to
              </label>
              <div className="flex gap-2 mt-2">
                {(purposeMap[category] || purposeMap.Project).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPurpose(p)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                      purpose === p
                        ? "bg-green-50 text-green-700 border border-green-500"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* USER TYPE */}
          <label className="text-sm font-medium mt-5 block text-gray-700">
            You are a
          </label>
          <div className="flex gap-2 mt-2">
            {["Owner", "Broker", "Builder"].map((u) => (
              <button
                key={u}
                onClick={() => setUserType(u)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                  userType === u
                    ? "bg-green-50 text-green-700 border border-green-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* PHONE */}
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5 mt-5 focus:ring-2 focus:ring-green-500 outline-none"
          />

          {/* CTA */}
          <button
            onClick={handleContinue}
            className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-lg shadow-md transition"
          >
            Continue →
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            No brokerage • No hidden charges
          </p>
        </div>
      </section>
    </div>
  );
};

export default PostProperty;
