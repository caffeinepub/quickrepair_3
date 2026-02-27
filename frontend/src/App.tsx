import { lazy, Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import FloatingCallButton from './components/FloatingCallButton';
import TrustStatsBar from './components/TrustStatsBar';
import HowItWorksSection from './components/HowItWorksSection';
import AdminPage from './components/AdminPage';

// Lazy-load below-fold sections for faster initial paint
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const FeedbackSection = lazy(() => import('./components/FeedbackSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const Footer = lazy(() => import('./components/Footer'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function SectionFallback() {
  return (
    <div
      className="w-full py-20 flex items-center justify-center"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="flex gap-2">
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: '#FFD700', animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: '#FF8C42', animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: '#FFD700', animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}

function useCurrentPath() {
  const [path, setPath] = useState(() => window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  return path;
}

function MainSite() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      <Header />
      <main>
        {/* Above-fold: loaded immediately */}
        <HeroSection />
        <TrustStatsBar />
        <HowItWorksSection />

        {/* Below-fold: lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeedbackSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating action buttons */}
      <FloatingCallButton />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default function App() {
  const path = useCurrentPath();
  const isAdminRoute = path === '/admin' || path === '/admin/';

  return (
    <QueryClientProvider client={queryClient}>
      {isAdminRoute ? <AdminPage /> : <MainSite />}
    </QueryClientProvider>
  );
}
