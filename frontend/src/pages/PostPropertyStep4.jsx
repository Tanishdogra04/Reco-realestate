import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const PostPropertyStep4 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Invalid flow. Please start again.</p>
      </div>
    );
  }

  const {
    listingType,
    category,
    purpose,
    basicInfo = {},
    details = {},
    images = [],
    coverIndex,
  } = state;

  const coverImage =
    coverIndex !== null && images[coverIndex]
      ? images[coverIndex].url
      : null;

  const otherImages = images.filter(
    (_, idx) => idx !== coverIndex
  );

  const handleSubmit = () => {
    console.log("FINAL LISTING DATA:", state);
    alert("✅ Property submitted successfully!");
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Review & Submit
          </h1>
          <p className="text-sm text-gray-500">
            Step 4 of 4 · Final Review
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* COVER IMAGE */}
        {coverImage && (
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* SUMMARY CARD */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-8">

          {/* BASIC INFO */}
          <Section title="Basic Information">
            <SummaryItem label="Listing Type" value={listingType} />
            <SummaryItem label="Category" value={category} />
            <SummaryItem label="Purpose" value={purpose} />
            <SummaryItem label="Title" value={basicInfo.title} />
            <SummaryItem label="Location" value={basicInfo.location} />
            <SummaryItem
              label="Area"
              value={`${basicInfo.area} sq.ft`}
            />
          </Section>

          {/* PROPERTY DETAILS */}
          <Section title="Property Details">
            {details.facing && (
              <SummaryItem label="Facing" value={details.facing} />
            )}
            {details.possession && (
              <SummaryItem
                label="Possession"
                value={details.possession}
              />
            )}
          </Section>

          {/* KEY FEATURES */}
          {details.features?.length > 0 && (
            <Section title="Key Features & Highlights">
              <div className="flex flex-wrap gap-2">
                {details.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* AMENITIES */}
          {details.amenities?.length > 0 && (
            <Section title="Amenities">
              <div className="flex flex-wrap gap-2">
                {details.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* OTHER IMAGES */}
          {otherImages.length > 0 && (
            <Section title="Uploaded Photos">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {otherImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt="Property"
                    className="h-32 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center pt-4">
          <Link
            to="/post-property-step3"
            state={state}
            className="text-sm text-gray-600"
          >
            ← Back
          </Link>

          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold"
          >
            Submit Listing
          </button>
        </div>
      </main>
    </div>
  );
};

/* ================= REUSABLE ================= */

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-800">
      {title}
    </h3>
    {children}
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="text-sm text-gray-700">
    <span className="font-medium">{label}:</span>{" "}
    {value || "—"}
  </div>
);

export default PostPropertyStep4;
