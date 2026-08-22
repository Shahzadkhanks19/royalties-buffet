import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const routeScroll = {
  reset() {
    const root = globalThis.document?.documentElement;
    const body = globalThis.document?.body;

    if (root) root.scrollTop = 0;
    if (body) body.scrollTop = 0;

    if (typeof globalThis.scrollTo === "function") {
      globalThis.scrollTo(0, 0);
    }
  },
  afterPaint(callback) {
    if (typeof globalThis.requestAnimationFrame === "function") {
      const frame = globalThis.requestAnimationFrame(callback);
      return () => globalThis.cancelAnimationFrame?.(frame);
    }

    callback();
    return () => {};
  },
};

export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    routeScroll.reset();

    return routeScroll.afterPaint(() => {
      routeScroll.reset();
    });
  }, [location.pathname, location.key]);

  return null;
}
