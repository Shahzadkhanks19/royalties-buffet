import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import GlobalErrorBoundary from "./components/system/GlobalErrorBoundary";
import Preloader from "./components/system/Preloader";
import "./index.css";

function RoyaltiesApp() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 650);
    return () => clearTimeout(timer);
  }, []);

  if (booting) return <Preloader />;

  return (
    <GlobalErrorBoundary>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </GlobalErrorBoundary>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RoyaltiesApp />
    </BrowserRouter>
  </StrictMode>,
);
