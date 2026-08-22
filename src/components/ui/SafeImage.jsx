import { useState } from "react";

const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=82";

export default function SafeImage({ src, fallbackSrc = fallbackImage, alt, className = "", ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (failed || currentSrc === fallbackSrc) return;
    setFailed(true);
    setCurrentSrc(fallbackSrc);
  };

  return <img src={currentSrc} alt={alt} className={className} onError={handleError} {...props} />;
}
