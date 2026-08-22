import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import RouteScrollManager from "./components/routing/RouteScrollManager";
import { PageSkeleton } from "./components/system/LoadingSkeletons";
import ScrollTop from "./components/ui/ScrollTop";
import useScrollPosition from "./hooks/useScrollPosition";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const CateringPage = lazy(() => import("./pages/CateringPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const FranchisePage = lazy(() => import("./pages/FranchisePage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const ReservationPage = lazy(() => import("./pages/ReservationPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

export default function App() {
  const { showTop, scrollToTop } = useScrollPosition();

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      <RouteScrollManager />
      <SiteHeader />
      <main>
        <Suspense fallback={<PageSkeleton />}>
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
      <ScrollTop visible={showTop} onScrollTop={scrollToTop} />
    </div>
  );
}
