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
  const handleFiles = (files) => {
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => {
      const newImages = [...prev, ...previews];
      if (coverIndex === null && newImages.length > 0) {
        setCoverIndex(0);
      }
      return newImages;
    });
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      const filtered = prev.filter((_, i) => i !== idx);
      if (coverIndex === idx) {
        setCoverIndex(filtered.length > 0 ? 0 : null);
      } else if (coverIndex > idx) {
        setCoverIndex(coverIndex - 1);
      }
      return filtered;
    });
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

            <div 
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-green-100'); }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('bg-green-100'); }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('bg-green-100');
                const files = Array.from(e.dataTransfer.files);
                if (files.length > 0) handleFiles(files);
              }}
              className="border-2 border-dashed border-green-400 bg-green-50 rounded-xl p-10 text-center hover:bg-green-100 transition relative"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                id="upload"
                className="hidden"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
              />
              <label
                htmlFor="upload"
                className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center"
              >
                <span className="text-green-700 font-semibold">
                  Click to upload or drag & drop images
                </span>
                <p className="text-xs text-gray-500 mt-2">
                  JPG / PNG • Max 5MB per image
                </p>
              </label>
              <div className="py-10" /> {/* Spacer for label layout */}
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

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
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
