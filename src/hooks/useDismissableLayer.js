import { useEffect } from "react";

export default function useDismissableLayer(ref, active, onDismiss) {
  useEffect(() => {
    if (!active) return undefined;

    const handlePointerDown = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      onDismiss();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onDismiss();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, onDismiss, ref]);
}
