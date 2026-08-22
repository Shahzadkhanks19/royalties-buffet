import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminContentManager from "./admin/AdminContentManager";
import AdminDashboardPage from "./admin/AdminDashboardPage";
import AdminForgotPasswordPage from "./admin/AdminForgotPasswordPage";
import AdminLayout from "./admin/AdminLayout";
import AdminLeadManager from "./admin/AdminLeadManager";
import AdminLoginPage from "./admin/AdminLoginPage";
import AdminResetPasswordPage from "./admin/AdminResetPasswordPage";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import RouteScrollManager from "./components/routing/RouteScrollManager";
import SeoManager from "./components/seo/SeoManager";
import { PageSkeleton } from "./components/system/LoadingSkeletons";
import ScrollTop from "./components/ui/ScrollTop";
import useScrollPosition from "./hooks/useScrollPosition";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const CateringPage = lazy(() => import("./pages/CateringPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
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
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { showTop, scrollToTop } = useScrollPosition();

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased">
      {!isAdmin ? <SeoManager /> : null}
      <RouteScrollManager />
      {!isAdmin ? <SiteHeader /> : null}
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
            <Route path="/error" element={<ErrorPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
            <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="reservations" element={<AdminLeadManager kind="reservations" />} />
              <Route path="contacts" element={<AdminLeadManager kind="contacts" />} />
              <Route path="catering" element={<AdminLeadManager kind="catering" />} />
              <Route path="franchise" element={<AdminLeadManager kind="franchise" />} />
              <Route path="menu" element={<AdminContentManager kind="menu" />} />
              <Route path="gallery" element={<AdminContentManager kind="gallery" />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin ? <SiteFooter /> : null}
      {!isAdmin ? <ScrollTop visible={showTop} onScrollTop={scrollToTop} /> : null}
    </div>
  );
}
