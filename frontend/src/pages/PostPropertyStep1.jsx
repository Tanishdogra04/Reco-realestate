import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const PostPropertyStep1 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Invalid flow. Please start again.</p>
      </div>
    );
  }

  const { listingType, category, purpose } = state;

  /* ================= DOMAIN FLAGS ================= */
  const isProject = listingType === "Project";
  const isResidential =
    !isProject && category.toLowerCase().includes("residential");
  const isCommercial =
    !isProject && category.toLowerCase().includes("commercial");
  const isLand =
    !isProject && category.toLowerCase().includes("land");

  const projectCategory = category; // from Step-0 ONLY

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    area: "",

    // Residential
    bhk: "",
    furnishing: "",

    // Commercial
    commercialType: "",
    floor: "",
    parking: "",

    // Land
    landType: "",
    boundary: "",
    roadAccess: "",

    // Project
    totalUnits: "",
    config: "",
    projectStatus: "",
    floors: "",
    unitsPerFloor: "",
    villaType: "",
    price: "",
    developer: "",
    rera: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContinue = () => {
    if (!formData.title || !formData.location || !formData.area || !formData.price || !formData.description) {
      alert("Please fill all required fields (Title, Location, Area, Price, Description)");
      return;
    }

    navigate("/post-property-step2", {
      state: { ...state, basicInfo: formData },
    });
  };

  /* ================= INPUT STYLES ================= */
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500";

  const selectClass =
    "w-full appearance-none border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Post Your {listingType}
          </h1>
          <p className="text-sm text-gray-500">
            Step 1 of 4 · Basic Details
          </p>
        </div>
      </header>

      {/* FORM */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border shadow-sm p-8">

          {/* CONTEXT */}
          <div className="text-sm text-gray-600 mb-8">
            Listing: <strong>{listingType}</strong> ·{" "}
            <strong>{category}</strong> · <strong>{purpose}</strong>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* TITLE */}
            <Field label={isProject ? "Project Name *" : "Property Title *"}>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            {/* LOCATION */}
            <Field label="Location *">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            {/* AREA */}
            <Field
              label={
                isProject
                  ? "Land / Plot Area (sq.ft) *"
                  : "Built-up Area (sq.ft) *"
              }
            >
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={inputClass}
              />
            </Field>

            {/* ================= PROPERTY ================= */}

            {/* Residential */}
            {isResidential && (
              <>
                <Select
                  label="BHK"
                  name="bhk"
                  value={formData.bhk}
                  onChange={handleChange}
                  options={["1", "2", "3", "4+"]}
                  selectClass={selectClass}
                />
                <Select
                  label="Furnishing"
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  options={[
                    "Unfurnished",
                    "Semi-Furnished",
                    "Fully Furnished",
                  ]}
                  selectClass={selectClass}
                />
              </>
            )}

            {/* Commercial */}
            {isCommercial && (
              <>
                <Select
                  label="Commercial Property Type"
                  name="commercialType"
                  value={formData.commercialType}
                  onChange={handleChange}
                  options={[
                    "Office Space",
                    "Retail Shop",
                    "Showroom",
                    "Warehouse",
                    "Industrial Unit",
                  ]}
                  selectClass={selectClass}
                />

                <Field label="Floor / Level">
                  <input
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Select
                  label="Parking Availability"
                  name="parking"
                  value={formData.parking}
                  onChange={handleChange}
                  options={[
                    "Covered Parking",
                    "Open Parking",
                    "No Parking",
                  ]}
                  selectClass={selectClass}
                />
              </>
            )}

            {/* Land */}
            {isLand && (
              <>
                <Select
                  label="Land Type"
                  name="landType"
                  value={formData.landType}
                  onChange={handleChange}
                  options={[
                    "Residential Plot",
                    "Commercial Plot",
                    "Industrial Plot",
                    "Agricultural Land",
                  ]}
                  selectClass={selectClass}
                />

                <Select
                  label="Boundary Wall"
                  name="boundary"
                  value={formData.boundary}
                  onChange={handleChange}
                  options={["Yes", "No"]}
                  selectClass={selectClass}
                />

                <Select
                  label="Road Access"
                  name="roadAccess"
                  value={formData.roadAccess}
                  onChange={handleChange}
                  options={[
                    "Wide Road",
                    "Narrow Road",
                    "No Direct Road",
                  ]}
                  selectClass={selectClass}
                />
              </>
            )}

            {/* ================= PROJECT (NO CATEGORY REPEAT) ================= */}

            {isProject && (
              <>
                {/* Residential Project / Apartments */}
                {(projectCategory === "Residential Project" ||
                  projectCategory === "Apartments") && (
                  <>
                    <Select
                      label="Configurations Available"
                      name="config"
                      value={formData.config}
                      onChange={handleChange}
                      options={["1 BHK", "2 BHK", "3 BHK", "4 BHK"]}
                      selectClass={selectClass}
                    />

                    <Field label="Total Units">
                      <input
                        type="number"
                        name="totalUnits"
                        value={formData.totalUnits}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </Field>

                    <Select
                      label="Project Status"
                      name="projectStatus"
                      value={formData.projectStatus}
                      onChange={handleChange}
                      options={[
                        "New Launch",
                        "Under Construction",
                        "Ready to Move",
                      ]}
                      selectClass={selectClass}
                    />
                  </>
                )}

                {/* Commercial Project */}
                {projectCategory === "Commercial Project" && (
                  <>
                    <Select
                      label="Commercial Usage"
                      name="commercialType"
                      value={formData.commercialType}
                      onChange={handleChange}
                      options={[
                        "Office Spaces",
                        "Retail Shops",
                        "IT / Tech Park",
                        "Mixed Use",
                      ]}
                      selectClass={selectClass}
                    />

                    <Field label="Total Units / Shops">
                      <input
                        type="number"
                        name="totalUnits"
                        value={formData.totalUnits}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </Field>

                    <Select
                      label="Project Status"
                      name="projectStatus"
                      value={formData.projectStatus}
                      onChange={handleChange}
                      options={[
                        "New Launch",
                        "Under Construction",
                        "Operational",
                      ]}
                      selectClass={selectClass}
                    />
                  </>
                )}

                {/* Builder Floor */}
                {projectCategory === "Builder Floor" && (
                  <>
                    <Field label="Number of Floors">
                      <input
                        type="number"
                        name="floors"
                        value={formData.floors}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </Field>

                    <Select
                      label="Units per Floor"
                      name="unitsPerFloor"
                      value={formData.unitsPerFloor}
                      onChange={handleChange}
                      options={["1", "2"]}
                      selectClass={selectClass}
                    />
                  </>
                )}

                {/* Villas */}
                {projectCategory === "Villas" && (
                  <>
                    <Field label="Total Villas">
                      <input
                        type="number"
                        name="totalUnits"
                        value={formData.totalUnits}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </Field>

                    <Select
                      label="Villa Type"
                      name="villaType"
                      value={formData.villaType}
                      onChange={handleChange}
                      options={[
                        "Independent Villa",
                        "Row Villa",
                        "Duplex Villa",
                      ]}
                      selectClass={selectClass}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center pt-10 border-t mt-10">
            <Link to="/post-property" className="text-sm text-gray-600">
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

/* ================= REUSABLE ================= */

const Field = ({ label, children }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

const Select = ({ label, name, value, onChange, options, selectClass }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        ▼
      </span>
    </div>
  </div>
);

export default PostPropertyStep1;
