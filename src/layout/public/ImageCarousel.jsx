import React, { useEffect, useRef, useState } from "react";

const ImageCarousel = ({
  images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"],
  intervalMs = 3000,
  heightClass = "h-64",
}) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [images.length, intervalMs]);

  // Pause saat hover
  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);
  };

  return (
    <div className="w-full mt-25 px-4">
      <div
        className={`relative w-full ${heightClass} overflow-hidden rounded-xl shadow-lg`}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Slides */}
        {images.map((src, idx) => (
          <div
            key={src + idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}

        {/* Overlay slogan LPPM (tetap 1) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex justify-center">
            <div className="text-primary-content text-lg font-bold tracking-wide w-[80%] bg-primary/80 text-center px-4 py-3 rounded-lg ">
              <div className="text-7xl">
                LPPM ISTTS
              </div>
              <div className="mt-3">
                Menghubungkan Penelitian dan Pengabdian demi Masyarakat.
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                idx === current
                  ? "bg-primary"
                  : "bg-base-100 border border-base-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
