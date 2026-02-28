import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Edit } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useMyProfile } from '../hooks/useQueries';
import ProfileModal from './ProfileModal';
import NavigationDrawer from './NavigationDrawer';

interface HeaderProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'contact', label: 'Contact' },
  { id: 'faq', label: 'FAQ' },
  { id: 'feedback', label: 'Reviews' },
];

export default function Header({ activeSection, onNavClick, onMenuToggle, isMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isFetched: profileFetched } = useMyProfile();

  // Show profile modal if authenticated but no profile
  useEffect(() => {
    if (isAuthenticated && profileFetched && userProfile === null) {
      setShowProfileModal(true);
    }
  }, [isAuthenticated, profileFetched, userProfile]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const displayName = userProfile?.name || (identity ? identity.getPrincipal().toString().slice(0, 8) + '...' : '');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => onNavClick('home')}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img
                src="/assets/generated/quickrepair-logo.dim_400x120.png"
                alt="QuickRepair Logo"
                className="h-8 md:h-10 w-auto"
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  style={activeSection === item.id ? { color: '#FFD700' } : {}}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
                    >
                      {(userProfile?.name || 'U')[0].toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium hidden sm:block max-w-24 truncate">
                      {displayName}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden z-50 border border-white/10"
                      style={{ background: 'oklch(14% 0.025 260)' }}
                    >
                      <button
                        onClick={() => { setShowProfileModal(true); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm"
                      >
                        <Edit size={15} />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => { handleAuth(); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm border-t border-white/10"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
                >
                  <User size={16} />
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onMenuToggle}
        />
      )}

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        activeSection={activeSection}
        onNavClick={onNavClick}
      />

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
}
