import { useState } from "react";
import { Heart, Share2, Images, X } from "lucide-react";

export default function PropertyHeroGallery({
  images,
  status = "Ready to Move",
}) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Property link copied!");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* ===== BIG IMAGE ===== */}
        <div className="relative">
          <img
            src={activeImage}
            alt="Property"
            className="w-full h-[500px] object-cover"
          />

          {/* Status */}
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            {status}
          </span>

          {/* Heart + Share */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
            >
              <Heart
                className={`w-5 h-5 ${
                  liked ? "text-red-500 fill-red-500" : "text-gray-600"
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* ===== THUMBNAILS + VIEW GALLERY ===== */}
        <div className="flex items-center justify-between p-4 gap-4">

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images.slice(1, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                onClick={() => setActiveImage(img)}
                className={`h-24 w-32 object-cover rounded-xl cursor-pointer border-2 transition ${
                  activeImage === img
                    ? "border-white ring-2 ring-green-500"
                    : "border-transparent hover:ring-2 hover:ring-gray-300"
                }`}
              />
            ))}
          </div>

          {/* View Gallery Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-2 text-sm font-medium hover:text-black transition"
          >
            <Images className="w-4 h-4" />
            View Gallery
          </button>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 relative">

            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-6">
              Property Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Gallery"
                  className="w-full h-52 object-cover rounded-xl hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}