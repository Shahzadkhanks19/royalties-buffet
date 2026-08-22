import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(globalThis.scrollY > 550);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => globalThis.scrollTo({ top: 0, behavior: "smooth" });

  return { showTop, scrollToTop };
}
