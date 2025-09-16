import React, { useEffect, useRef, useState } from "react";

const ImageCarousel = ({
  images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"],
  intervalMs = 3000,
  placeholderText = "Placeholder Text",
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
    <div className="w-full mt-20 px-4"> {/* 🔑 tambah margin top supaya turun */}
      <div
        className={`relative w-full ${heightClass} overflow-hidden rounded-xl shadow-md`}
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

        {/* Overlay placeholder text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-4 py-2 rounded-lg bg-black/40">
            <span className="text-white text-xl font-semibold">
              {placeholderText}
            </span>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${
                idx === current ? "bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
