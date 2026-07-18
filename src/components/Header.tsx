import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ShieldCheck, Zap } from 'lucide-react';
import { BRAND_INFO } from '../data';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About JP & Team' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 shadow-lg backdrop-blur-md py-3 border-b border-white/10"
    >
      {/* Upper tiny bar for trust */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:flex justify-between items-center text-[11px] font-mono tracking-widest text-primary-100/60 pb-2 mb-2 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            ONTARIO CERTIFIED: {BRAND_INFO.license}
          </span>
          <span className="w-1 h-1 rounded-full bg-brand-cyan"></span>
          <span>FULLY INSURED ($5M LIABILITY) & WSIB COMPLIANT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-brand-cyan" />
            24/7 EMERGENCY DISPATCH: <strong className="text-white ml-1">{BRAND_INFO.phone}</strong>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            id="logo-container"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-navy to-primary-950 flex items-center justify-center border border-white/10 shadow-md transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-transparent blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Zap className="w-5 h-5 text-brand-cyan relative z-10 transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Breevo
                </span>
                <span className="font-display font-medium text-lg text-brand-cyan">
                  Electric
                </span>
              </div>
              <p className="text-[9px] font-mono tracking-wider text-brand-gold uppercase hidden sm:block">
                Master Class Engineering
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-brand-cyan'
                      : 'text-primary-100/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-cyan"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${BRAND_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 font-mono text-xs tracking-wider text-primary-100 hover:text-brand-cyan transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
              </span>
              {BRAND_INFO.phone}
            </a>
            <button
              id="cta-quote-header"
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/90 hover:to-brand-blue/90 text-white font-medium text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-cyan-400/20"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phone.replace(/\D/g, '')}`}
              className="p-2.5 rounded-lg bg-white/5 text-brand-cyan border border-white/10"
              aria-label="Call emergency dispatcher"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg bg-white/5 text-primary-100 border border-white/10 hover:text-white focus:outline-hidden cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-brand-navy border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <p className="text-[10px] font-mono tracking-widest text-brand-gold uppercase px-3 pb-2 border-b border-white/5">
                ECRA/ESA License #7014832
              </p>
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer block ${
                      isActive
                        ? 'bg-brand-cyan/10 text-brand-cyan border-l-2 border-brand-cyan'
                        : 'text-primary-100/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex items-center gap-2 px-3 text-xs text-primary-200/70 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  24/7 GTA Emergency Dispatcher Active
                </div>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-medium text-xs uppercase tracking-widest text-center shadow-lg cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
