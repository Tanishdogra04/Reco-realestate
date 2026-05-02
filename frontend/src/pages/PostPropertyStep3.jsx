import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const PostPropertyStep3 = () => {
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

  /* ================= STATE ================= */
  const [images, setImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(null);

  /* ================= HELP TEXT ================= */
  const uploadHint = isProject
    ? "Upload site images, sample flats, amenities, elevation views, and layout plans."
    : isCommercial
    ? "Upload front view, office/shop interior, washroom, parking, and common areas."
    : isLand
    ? "Upload plot view, boundary wall, road access, and nearby landmarks."
    : "Upload front view, living room, bedrooms, kitchen, bathrooms, and balcony.";

  /* ================= HANDLERS ================= */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...previews]);
  };

  const handleContinue = () => {
    if (images.length < 3) {
      alert("Please upload at least 3 images to continue");
      return;
    }

    if (coverIndex === null) {
      alert("Please select a cover image");
      return;
    }

    navigate("/post-property-step4", {
      state: {
        ...state,
        images,
        coverIndex,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Upload Photos
          </h1>
          <p className="text-sm text-gray-500">
            Step 3 of 4 · Property Images
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border shadow-sm p-8">

          {/* STEP TRACKER */}
          <div className="flex items-center gap-5 text-sm mb-10">
            <span className="text-gray-400">Basic Info</span>
            <span className="text-gray-300">—</span>
            <span className="text-gray-400">Property Details</span>
            <span className="text-gray-300">—</span>
            <span className="flex items-center gap-2 text-green-600 font-medium">
              <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              Photos
            </span>
            <span className="text-gray-300">—</span>
            <span className="text-gray-400">Review</span>
          </div>

          {/* UPLOAD */}
          <div className="mb-8">
            <label className="block mb-2 font-medium">
              Upload Images
            </label>

            <p className="text-sm text-gray-500 mb-4">
              {uploadHint}
            </p>

            <div className="border-2 border-dashed border-green-400 bg-green-50 rounded-xl p-10 text-center hover:bg-green-100 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                id="upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="upload"
                className="cursor-pointer text-green-700 font-semibold"
              >
                Click to upload or drag & drop images
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG / PNG • Max 5MB per image
              </p>
            </div>

            {images.length > 0 && (
              <p className="text-xs text-gray-500 mt-3">
                Uploaded: {images.length} · Recommended: 6+
              </p>
            )}
          </div>

          {/* PREVIEW */}
          {images.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">
                Preview (Select cover image)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative rounded-lg overflow-hidden border cursor-pointer
                      ${coverIndex === index ? "ring-2 ring-green-600" : ""}`}
                    onClick={() => setCoverIndex(index)}
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="h-32 w-full object-cover"
                    />

                    {coverIndex === index && (
                      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex justify-between pt-6 border-t">
            <Link
              to="/post-property-step2"
              state={state}
              className="text-sm text-gray-600"
            >
              ← Back
            </Link>

            <button
              type="button"
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

export default PostPropertyStep3;
