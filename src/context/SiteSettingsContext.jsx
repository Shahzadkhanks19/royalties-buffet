import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteSettings } from "../data/locations";
import { apiRequest } from "../lib/api";

const SiteSettingsContext = createContext(defaultSiteSettings);

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    let active = true;
    apiRequest("/api/settings")
      .then((result) => {
        if (active && result?.settings) setSettings((current) => ({ ...current, ...result.settings }));
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const value = useMemo(() => settings, [settings]);
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
