import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Car,
  ArrowUpDown,
  Shield,
  Power,
  Droplets,
  Trees,
  Wifi,
  Warehouse,
  Camera,
  Sun,
} from "lucide-react";

const PostPropertyStep2 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Invalid flow. Please start again.</p>
      </div>
    );
  }

  const { listingType, category } = state;

  /* ================= DOMAIN FLAGS ================= */
  const isProject = listingType === "Project";
  const isResidential =
    !isProject && category.toLowerCase().includes("residential");
  const isCommercial =
    !isProject && category.toLowerCase().includes("commercial");
  const isLand =
    !isProject && category.toLowerCase().includes("land");

  /* ================= FORM STATE ================= */
  const [details, setDetails] = useState({
    facing: "",
    possession: "",
    age: "",
    features: [],
    amenities: [],
  });

  const toggleItem = (key, value) => {
    setDetails((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleContinue = () => {
    navigate("/post-property-step3", {
      state: {
        ...state,
        details,
      },
    });
  };

  /* ================= FEATURES ================= */

  const residentialFeatures = [
    "Ready to Move",
    "Gated Society",
    "Corner Property",
    "Vaastu Compliant",
    "Well Ventilated",
    "Balcony",
  ];

  const commercialFeatures = [
    "Main Road Facing",
    "High Footfall Area",
    "Fire Safety Approved",
    "Ideal for Office",
    "Ideal for Retail",
  ];

  const landFeatures = [
    "Clear Title",
    "Boundary Wall Present",
    "Road Facing Plot",
    "Approved Layout",
    "Ideal for Investment",
  ];

  const projectFeatures = [
    "RERA Approved",
    "Bank Approved",
    "Phased Development",
    "Multiple Unit Options",
    "Trusted Developer",
  ];

  const featuresToShow = isProject
    ? projectFeatures
    : isResidential
    ? residentialFeatures
    : isCommercial
    ? commercialFeatures
    : landFeatures;

  /* ================= AMENITIES ================= */

  const residentialAmenities = [
    { label: "ArrowUpDown", icon: ArrowUpDown },
    { label: "Power Backup", icon: Power },
    { label: "24x7 Security", icon: Shield },
    { label: "Parking", icon: Car },
    { label: "Water Supply", icon: Droplets },
    { label: "Park / Green Area", icon: Trees },
    { label: "CCTV", icon: Camera },
    { label: "Solar Power", icon: Sun },
  ];

  const commercialAmenities = [
    { label: "Parking", icon: Car },
    { label: "Power Backup", icon: Power },
    { label: "CCTV Surveillance", icon: Camera },
    { label: "Security", icon: Shield },
    { label: "ArrowUpDown", icon: ArrowUpDown },
    { label: "High-Speed Internet", icon: Wifi },
    { label: "Warehouse Access", icon: Warehouse },
  ];

  const landAmenities = [
    { label: "Boundary Wall", icon: Shield },
    { label: "Road Access", icon: Car },
    { label: "Water Connection", icon: Droplets },
    { label: "Electricity Available", icon: Power },
  ];

  const projectAmenities = [
   // { label: "ArrowUpDown", icon: ArrowUpDown },
    { label: "Power Backup", icon: Power },
    { label: "Security", icon: Shield },
    { label: "Parking", icon: Car },
    { label: "Park / Green Area", icon: Trees },
    { label: "CCTV", icon: Camera },
    { label: "Solar Power", icon: Sun },
  ];

  const amenitiesToShow = isProject
    ? projectAmenities
    : isResidential
    ? residentialAmenities
    : isCommercial
    ? commercialAmenities
    : landAmenities;

  /* ================= STYLES ================= */

  const selectClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Property Details
          </h1>
          <p className="text-sm text-gray-500">
            Step 2 of 4 · Specifications, Features & Amenities
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-10">

          {/* BASIC DETAILS */}
          {!isLand && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Facing
                </label>
                <select
                  className={selectClass}
                  value={details.facing}
                  onChange={(e) =>
                    setDetails({ ...details, facing: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>East</option>
                  <option>West</option>
                  <option>North</option>
                  <option>South</option>
                  <option>North-East</option>
                  <option>North-West</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Possession Status
                </label>
                <select
                  className={selectClass}
                  value={details.possession}
                  onChange={(e) =>
                    setDetails({ ...details, possession: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option>Ready to Move</option>
                  <option>Under Construction</option>
                </select>
              </div>
            </div>
          )}

          {/* ================= KEY FEATURES ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Key Features & Highlights
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {featuresToShow.map((feature) => {
                const selected = details.features.includes(feature);

                return (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleItem("features", feature)}
                    className={`px-4 py-3 rounded-xl border text-sm text-left transition
                      ${
                        selected
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white hover:border-green-400"
                      }`}
                  >
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= AMENITIES ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Amenities
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesToShow.map(({ label, icon: Icon }) => {
                const selected = details.amenities.includes(label);

                return (
                  <button
                    type="button"
                    key={label}
                    onClick={() => toggleItem("amenities", label)}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition
                      ${
                        selected
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 bg-white hover:border-green-400"
                      }`}
                  >
                    <Icon
                      size={20}
                      className={
                        selected ? "text-green-600" : "text-gray-500"
                      }
                    />
                    <span className="flex-1 text-left">{label}</span>
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      className="accent-green-600"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center pt-10 border-t">
            <Link to="/post-property-step1" className="text-sm text-gray-600">
              ← Back
            </Link>

            <button
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold"
            >
              Continue →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostPropertyStep2;
