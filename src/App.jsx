import { Route, Routes } from "react-router-dom";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import ScrollTop from "./components/ui/ScrollTop";
import useScrollPosition from "./hooks/useScrollPosition";
import AboutPage from "./pages/AboutPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import HomePage from "./pages/HomePage";

const routedPlaceholders = [
  "/menu",
  "/reservation",
  "/catering",
  "/franchise",
  "/gallery",
  "/locations",
  "/contact",
  "/privacy",
  "/terms",
];

export default function App() {
  const { showTop, scrollToTop } = useScrollPosition();

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {routedPlaceholders.map((path) => (
            <Route key={path} path={path} element={<ComingSoonPage />} />
          ))}
          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <ScrollTop visible={showTop} onScrollTop={scrollToTop} />
    </div>
  );
}
