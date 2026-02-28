import React, { Suspense, lazy, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import FloatingCallButton from './components/FloatingCallButton';
import ScrollLoginPopup from './components/ScrollLoginPopup';
import ScrollRatingPopup from './components/ScrollRatingPopup';
import SkeletonLoader from './components/SkeletonLoader';
import { useScrollSpy } from './hooks/useScrollSpy';

const TrustStatsBar = lazy(() => import('./components/TrustStatsBar'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const HowItWorksSection = lazy(() => import('./components/HowItWorksSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const FeedbackSection = lazy(() => import('./components/FeedbackSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const Footer = lazy(() => import('./components/Footer'));
const AdminPage = lazy(() => import('./components/AdminPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

const SECTIONS = ['home', 'services', 'how-it-works', 'about', 'feedback', 'contact', 'faq'];

function MainSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTIONS);

  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onMenuToggle={() => setMenuOpen((v) => !v)}
        isMenuOpen={menuOpen}
      />
      <main>
        <HeroSection />
        <Suspense fallback={<SkeletonLoader height="80px" className="mx-4 my-2" />}>
          <TrustStatsBar />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="400px" className="mx-4 my-4" />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="300px" className="mx-4 my-4" />}>
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="300px" className="mx-4 my-4" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="400px" className="mx-4 my-4" />}>
          <FeedbackSection />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="300px" className="mx-4 my-4" />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<SkeletonLoader height="300px" className="mx-4 my-4" />}>
          <FAQSection />
        </Suspense>
      </main>
      <Suspense fallback={<SkeletonLoader height="120px" />}>
        <Footer />
      </Suspense>
      <FloatingWhatsAppButton />
      <FloatingCallButton />
      <ScrollLoginPopup />
      <ScrollRatingPopup />
    </>
  );
}

export default function App() {
  const path = window.location.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      {path === '/admin' ? (
        <Suspense fallback={<SkeletonLoader height="100vh" />}>
          <AdminPage />
        </Suspense>
      ) : (
        <MainSite />
      )}
    </QueryClientProvider>
  );
}
