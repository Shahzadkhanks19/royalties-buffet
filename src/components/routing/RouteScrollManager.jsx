import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const browserScroll = {
  toTopInstant() {
    if (typeof globalThis.scrollTo === "function") {
      globalThis.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  },
};

export default function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    browserScroll.toTopInstant();
  }, [pathname]);

  return null;
}
