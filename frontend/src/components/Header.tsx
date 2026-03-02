import { useState, useEffect } from 'react';
import NavigationDrawer from './NavigationDrawer';
import Overlay from './Overlay';
import ProfileModal from './ProfileModal';
import { Menu, X, User, LogOut, Loader2, ChevronDown, History } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useMyProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useMyProfile();

  // Open profile modal if logged in but no profile yet
  useEffect(() => {
    if (isAuthenticated && !profileLoading && profileFetched && userProfile === null) {
      setProfileModalOpen(true);
    }
  }, [isAuthenticated, profileLoading, profileFetched, userProfile]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileMenuOpen) return;
    const handler = () => setProfileMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [profileMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const displayName = userProfile?.name
    ? userProfile.name
    : identity
    ? identity.getPrincipal().toString().slice(0, 8) + '…'
    : '';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface-1 shadow-[0_2px_20px_rgba(0,0,0,0.6)] border-b border-surface-3'
            : 'bg-transparent'
        }`}
        style={{ backgroundColor: scrolled ? '#0d0d0d' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="flex items-center">
                <span
                  className="font-display text-2xl md:text-3xl font-black tracking-tight leading-none"
                  style={{ color: '#FFD700' }}
                >
                  Quick
                </span>
                <span
                  className="font-display text-2xl md:text-3xl font-black tracking-tight leading-none"
                  style={{ color: '#FF8C42' }}
                >
                  Repair
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {['home', 'services', 'about', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white capitalize rounded-lg transition-all duration-200 hover:bg-white/5"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <a
                href="https://wa.me/8447978940?text=Hi%2C%20I%20want%20to%20become%20a%20mechanic%20at%20QuickRepair"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
                  color: '#0d0d0d',
                }}
              >
                Become a Mechanic
              </a>

              {/* Auth Button */}
              <div className="ml-2 relative">
                {isInitializing ? (
                  <div className="w-9 h-9 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                ) : isAuthenticated ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileMenuOpen((v) => !v);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all hover:bg-white/10"
                    style={{ border: '1px solid #2a2a2a' }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
                    >
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{displayName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                ) : (
                  <button
                    onClick={handleAuth}
                    disabled={isLoggingIn}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
                    style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a' }}
                  >
                    {isLoggingIn ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    {isLoggingIn ? 'Signing in…' : 'Sign In'}
                  </button>
                )}

                {/* Profile Dropdown */}
                {profileMenuOpen && isAuthenticated && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl py-1 z-50"
                    style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b" style={{ borderColor: '#1e1e1e' }}>
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{displayName}</p>
                      {userProfile?.area && (
                        <p className="text-xs text-gray-500 mt-0.5">{userProfile.area}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        setProfileModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <a
                      href="/booking-history"
                      onClick={() => setProfileMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <History className="w-4 h-4" />
                      Booking History
                    </a>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleAuth();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={{ color: '#FF8C42' }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile right side: auth + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {!isInitializing && !isAuthenticated && (
                <button
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60"
                  style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a' }}
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                  {isLoggingIn ? '…' : 'Sign In'}
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileMenuOpen((v) => !v);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </button>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile profile dropdown */}
        {profileMenuOpen && isAuthenticated && (
          <div
            className="md:hidden mx-4 mb-2 rounded-xl shadow-2xl py-1"
            style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: '#1e1e1e' }}>
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-medium text-white truncate">{displayName}</p>
            </div>
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                setProfileModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </button>
            <a
              href="/booking-history"
              onClick={() => setProfileMenuOpen(false)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <History className="w-4 h-4" />
              Booking History
            </a>
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                handleAuth();
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
              style={{ color: '#FF8C42' }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>

      <Overlay isOpen={menuOpen} onClick={closeMenu} />
      <NavigationDrawer isOpen={menuOpen} onClose={closeMenu} />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
}
