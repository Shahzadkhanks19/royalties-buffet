import { Route, Routes } from "react-router-dom";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import RouteScrollManager from "./components/routing/RouteScrollManager";
import ScrollTop from "./components/ui/ScrollTop";
import useScrollPosition from "./hooks/useScrollPosition";
import AboutPage from "./pages/AboutPage";
import CateringPage from "./pages/CateringPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import FranchisePage from "./pages/FranchisePage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import MenuPage from "./pages/MenuPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReservationPage from "./pages/ReservationPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  const { showTop, scrollToTop } = useScrollPosition();

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      <RouteScrollManager />
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/catering" element={<CateringPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <ScrollTop visible={showTop} onScrollTop={scrollToTop} />
    </div>
  );
}
