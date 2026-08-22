import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

export default function useCmsCollection(endpoint, fallbackItems) {
  const [items, setItems] = useState(fallbackItems);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    apiRequest(endpoint)
      .then((payload) => {
        if (!active) return;
        const nextItems = Array.isArray(payload?.items) && payload.items.length ? payload.items : fallbackItems;
        setItems(nextItems);
        setUsingFallback(!(Array.isArray(payload?.items) && payload.items.length));
      })
      .catch(() => {
        if (!active) return;
        setItems(fallbackItems);
        setUsingFallback(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [endpoint, fallbackItems]);

  return { items, loading, usingFallback };
}
