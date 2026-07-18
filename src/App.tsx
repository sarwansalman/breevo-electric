import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import {
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ThumbsUp,
  Eye,
  Info,
  Calendar,
  ExternalLink,
  Lock,
  FileText
} from 'lucide-react';

import {
  BRAND_INFO,
  STATISTICS,
  SERVICES,
  GALLERY_PROJECTS,
  OUR_PROCESS_STEPS,
  FAQS,
  AREAS_WE_SERVE,
  SERVICE_CATEGORIES
} from './data';

import Header from './components/Header';
import Footer from './components/Footer';
import BeforeAfter from './components/BeforeAfter';
import ContactForm from './components/ContactForm';
import ReviewHub from './components/ReviewHub';
import { Service, Project } from './types';

// Dynamic Icon Renderer
function LucideIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Zap className={className} />;
  return <IconComponent className={className} />;
}

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  
  // Gallery states
  const [selectedGalleryCat, setSelectedGalleryCat] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // FAQ states
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'general' | 'services' | 'pricing' | 'safety'>('all');

  // Service details modal/expand state
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Trigger site loader simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 4; // charging increments
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter projects
  const filteredProjects = GALLERY_PROJECTS.filter((p) => {
    if (selectedGalleryCat === 'all') return true;
    return p.category === selectedGalleryCat;
  });

  // Filter FAQs
  const filteredFaqs = FAQS.filter((f) => {
    if (activeFaqCategory === 'all') return true;
    return f.category === activeFaqCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-[#0f172a] relative">
      
      {/* 1. PROGRESSIVE LOADING ANIMATION */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="global-loader"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-primary-950 z-[100] flex flex-col items-center justify-center text-white"
          >
            {/* Cyber spark icon loading */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              {/* Outer spinning electric ring */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan animate-spin"></div>
              {/* Core pulsing spark icon */}
              <Zap className="w-10 h-10 text-brand-cyan wire-pulse" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="font-display font-bold text-lg tracking-widest text-white uppercase">
                Breevo Electric
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                Ont. Lic. #7014832 • Charging grid...
              </p>
              
              {/* Numerical indicator */}
              <div className="pt-4 font-mono text-xs text-brand-cyan">
                {loadPercentage}%
              </div>

              {/* Progress bar */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-75"
                  style={{ width: `${loadPercentage}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main sticky header */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main content body with smooth transitions */}
      <main className="flex-1 pt-16 sm:pt-24 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME VIEW ==================== */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-24 sm:space-y-32 pb-24"
            >
              {/* Hero Section */}
              <section id="hero" className="relative min-h-[85vh] flex items-center pt-12 pb-20 overflow-hidden bg-primary-950 text-white">
                {/* Visual grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_50%)] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.04),transparent_50%)] pointer-events-none"></div>
                
                {/* Tech vector wireframe decorative animation */}
                <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
                  <div className="absolute top-[20%] left-10 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent animate-pulse"></div>
                  <div className="absolute top-[60%] right-20 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-pulse duration-3000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text */}
                  <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
                    {/* Elite validation badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono tracking-wider text-brand-gold mx-auto lg:mx-0">
                      <Award className="w-3.5 h-3.5 text-brand-gold" />
                      <span>TORONTO’S AWARD-WINNING CUSTOM CONTRACTOR</span>
                    </div>

                    <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                      Uncompromising <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-accent to-brand-gold">
                        Electrical Precision
                      </span>
                    </h2>

                    <p className="text-base sm:text-lg text-primary-100/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                      Breevo Electric designs, installs, and certifies bespoke high-voltage grids, smart home automation, and 200A service transformations for Toronto’s prestigious estates and commercial landmarks. 
                    </p>

                    {/* Trust assurances block */}
                    <div className="grid grid-cols-3 gap-4 pt-4 text-left max-w-md mx-auto lg:mx-0 border-t border-white/5 font-mono text-[10px] tracking-widest text-primary-200/50 uppercase">
                      <div>
                        <strong className="block text-white text-xs font-bold font-sans">100%</strong>
                        <span>ESA COMPLIANCE</span>
                      </div>
                      <div>
                        <strong className="block text-white text-xs font-bold font-sans">LIFETIME</strong>
                        <span>GUARANTEE</span>
                      </div>
                      <div>
                        <strong className="block text-white text-xs font-bold font-sans">$5M</strong>
                        <span>LIABILITY INSURED</span>
                      </div>
                    </div>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button
                        onClick={() => handleNavigate('contact')}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/95 hover:to-brand-blue/95 text-white font-semibold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-cyan-400/20"
                      >
                        Book Master Assessment
                      </button>
                      <button
                        onClick={() => handleNavigate('services')}
                        className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer border border-white/10 flex items-center justify-center gap-2 group"
                      >
                        <span>Explore Services</span>
                        <ArrowRight className="w-4 h-4 text-brand-cyan transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column Visual (Immersive panel mockup or clean custom graphics) */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-primary-900">
                      {/* Premium Ambient Background Image */}
                      <img
                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"
                        alt="High-end Electrical Engineering Panel Installation"
                        className="w-full h-full object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Trust Card */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-primary-950/90 border border-white/10 backdrop-blur-md flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center shrink-0 border border-brand-cyan/20">
                          <Clock className="w-5 h-5 text-brand-cyan animate-pulse" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono uppercase text-brand-cyan tracking-wider">
                            EMERGENCY DISPATCH
                          </span>
                          <span className="block text-sm font-semibold text-white">
                            GTA Core Support 24/7/365
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Trust Assurances / Why Choose Us */}
              <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                    Breevo Foundations
                  </span>
                  <h3 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-none">
                    Unwavering Trust, Engineered.
                  </h3>
                  <p className="text-sm sm:text-base text-primary-200 leading-relaxed font-sans">
                    With over a decade of certified performance in the GTA, our electricians don’t just execute wiring—we craft safe, high-capacity electrical architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Badge 1 */}
                  <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-brand-gold mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-primary-900 mb-3">
                      ESA Licensed & ACP Audited
                    </h4>
                    <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                      We strictly file permits for all installations. Under ESA’s Authorized Contractor Program (ACP), our elite safety protocols permit fast-tracked connection approvals from city hydro teams.
                    </p>
                  </div>

                  {/* Badge 2 */}
                  <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-brand-cyan mb-6">
                      <Zap className="w-6 h-6 animate-pulse" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-primary-900 mb-3">
                      $5M Insurance & Master Bond
                    </h4>
                    <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                      To safeguard your prestigious estate and investment, Breevo carries standard five million dollars in Commercial Liability and strict WSIB worker clearance. Absolute corporate backing.
                    </p>
                  </div>

                  {/* Badge 3 */}
                  <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-primary-900 mb-3">
                      Clean Site White-Glove Standard
                    </h4>
                    <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                      Our elite technicians utilize heavy floor-covering tarps, medical-grade boot booties, and specialized HEPA-shrouded drills to contain drilling dust. We leave your custom home cleaner than we found it.
                    </p>
                  </div>
                </div>
              </section>

              {/* Statistics Showcase */}
              <section id="statistics" className="bg-gradient-to-br from-brand-navy to-primary-950 text-white py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {STATISTICS.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="font-display font-bold text-4xl sm:text-5xl text-brand-cyan">
                          {stat.value}{stat.suffix}
                        </div>
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-primary-100/50">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Service Quick Catalog */}
              <section id="home-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                  <div className="space-y-4 max-w-xl">
                    <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                      Services Catalog
                    </span>
                    <h3 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-none">
                      Comprehensive Capabilities
                    </h3>
                  </div>
                  <div>
                    <button
                      onClick={() => handleNavigate('services')}
                      className="px-6 py-3 rounded-xl bg-primary-900 hover:bg-primary-800 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-4 h-4 text-brand-cyan" />
                    </button>
                  </div>
                </div>

                {/* Grid representing top 3 services with CTA and Testimonial quote snippet */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.slice(0, 3).map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-2xl border border-primary-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="p-8 space-y-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-cyan/5 flex items-center justify-center text-brand-cyan border border-brand-cyan/10 group-hover:scale-110 transition-transform">
                          <LucideIcon name={service.iconName} className="w-6 h-6 text-brand-cyan" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-display font-bold text-lg text-primary-900">
                            {service.title}
                          </h4>
                          <span className="inline-block text-[10px] font-mono tracking-wider bg-brand-navy/5 text-primary-800 px-2.5 py-1 rounded-sm uppercase">
                            Est. starts: <strong className="text-brand-blue">{service.startingPrice}</strong>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-primary-200/85 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Small inline testimonial block to satisfy requirements */}
                      <div className="bg-primary-50 p-6 border-t border-primary-100/50">
                        <p className="text-[11px] text-primary-200 italic leading-relaxed mb-3">
                          "{service.testimonial.quote.slice(0, 115)}..."
                        </p>
                        <span className="text-[9px] font-mono text-primary-400 block">
                          — {service.testimonial.author}, {service.testimonial.location}
                        </span>
                      </div>

                      <div className="px-8 pb-8 pt-4">
                        <button
                          onClick={() => {
                            setExpandedServiceId(service.id);
                            handleNavigate('services');
                          }}
                          className="w-full py-3 rounded-xl bg-primary-950 hover:bg-brand-navy text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Detailed Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-cyan" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Before & After Comparison Showcase */}
              <section id="comparison-portal" className="bg-primary-950 text-white py-20 relative border-y border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.06),transparent_60%)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-mono tracking-widest uppercase">
                      Trade Workmanship
                    </span>
                    <h3 className="font-display font-semibold text-3xl sm:text-5xl text-white tracking-tight">
                      Prism of Precision
                    </h3>
                    <p className="text-sm text-primary-100/70 leading-relaxed font-sans">
                      Hover and drag the visual slider to inspect our premium structural conduit alignments against hazardous outdated panels.
                    </p>
                  </div>

                  <BeforeAfter />
                </div>
              </section>

              {/* Our Structured Process */}
              <section id="our-process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                    Execution Blueprints
                  </span>
                  <h3 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight">
                    Our 4-Step Engineering Process
                  </h3>
                  <p className="text-sm text-primary-200">
                    We eliminate the guesswork from contracting with transparent scheduling, highly detailed engineering reports, and final ESA inspections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  {OUR_PROCESS_STEPS.map((proc, idx) => (
                    <div key={idx} className="space-y-4 relative group">
                      <div className="font-display font-bold text-5xl text-brand-cyan/20 group-hover:text-brand-cyan/40 transition-colors">
                        {proc.step}
                      </div>
                      <h4 className="font-display font-semibold text-base text-primary-900">
                        {proc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                        {proc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Areas We Serve Section */}
              <section id="areas-served" className="bg-primary-100 py-16 border-y border-primary-200/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6">
                      <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                        GTA Operations Area
                      </span>
                      <h3 className="font-display font-semibold text-3xl sm:text-4xl text-primary-900 tracking-tight">
                        Serving Toronto & The Greater Toronto Area
                      </h3>
                      <p className="text-xs sm:text-sm text-primary-200/85 leading-relaxed">
                        Breevo Electric maintains active electrical trucks across the entire GTA, providing seamless dispatch coverage. Our planners coordinate fast connections with Toronto Hydro, Mississauga Hydro, Oakville Hydro, and Alectra Utilities.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        {AREAS_WE_SERVE.slice(0, 6).map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-primary-800">
                            <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                            <span>{area.split('(')[0].trim()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => handleNavigate('contact')}
                          className="px-6 py-3 rounded-xl bg-brand-navy hover:bg-primary-900 text-white font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Phone className="w-4 h-4 text-brand-cyan" />
                          <span>Call Local Dispatch</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 border border-primary-200">
                      <img
                        src={BRAND_INFO.mapPlaceholderUrl}
                        alt="Toronto Ontario Operational Map Grid"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Map HUD Overlay */}
                      <div className="absolute inset-0 bg-primary-950/20"></div>
                      <div className="absolute top-4 left-4 p-3 rounded-lg bg-white/95 border border-primary-100 shadow-md text-[10px] font-mono">
                        <span className="font-bold text-primary-950 block">ACTIVE SECTOR LOCK</span>
                        <span className="text-emerald-600">● 12 TRUCKS DISPATCHED</span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Testimonials highlight */}
              <section id="testimonials-home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                    Client Testimonials
                  </span>
                  <h3 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight">
                    Rave Reviews From Neighbors
                  </h3>
                </div>

                <ReviewHub />
              </section>

              {/* Quick Accordion FAQs */}
              <section id="faq-home" className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                    Customer FAQ
                  </span>
                  <h3 className="font-display font-semibold text-3xl sm:text-4xl text-primary-900 tracking-tight">
                    Frequently Answered Safety Queries
                  </h3>
                </div>

                <div className="space-y-4">
                  {FAQS.slice(0, 4).map((faq) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-white border border-primary-100 rounded-2xl overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                          className="w-full px-6 py-4.5 text-left flex justify-between items-center text-sm font-semibold text-primary-900 transition-colors hover:bg-primary-50 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-brand-cyan" /> : <ChevronDown className="w-4 h-4 text-brand-cyan" />}
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-xs sm:text-sm text-primary-200/90 leading-relaxed pt-2 border-t border-primary-50 bg-[#fafbfc]">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => handleNavigate('faq')}
                    className="text-xs font-semibold text-brand-cyan hover:text-brand-blue uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read All Technical Answers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>

              {/* Master CTA Form Section */}
              <section id="contact-home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-950 text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden border border-white/5">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 lg:max-w-md">
                      <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-mono tracking-widest uppercase">
                        Book Your Assessment
                      </span>
                      <h3 className="font-display font-semibold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                        Power Your Property Safely.
                      </h3>
                      <p className="text-sm text-primary-100/70 leading-relaxed font-sans">
                        Don’t leave your high-voltage engineering to average trade work. Connect with JP & Team today to design a safe, robust, high-capacity custom electrical blueprint.
                      </p>
                      
                      <div className="space-y-3 font-mono text-[11px] text-primary-100/50">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                          <span>Fully WSIB Compliant & Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                          <span>Quotes Compiled Under 1 Business Hour</span>
                        </div>
                      </div>
                    </div>

                    <ContactForm />
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ==================== SERVICES VIEW ==================== */}
          {currentView === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                  Service Portfolio
                </span>
                <h2 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-tight">
                  Surgical Quality Electrical Services
                </h2>
                <p className="text-sm sm:text-base text-primary-200">
                  Every installation is completed by registered licensed journeymen in strict compliance with the Ontario Electrical Safety Code (OESC). No shortcuts, ever.
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {SERVICES.map((serv) => {
                  const isExpanded = expandedServiceId === serv.id;
                  return (
                    <div
                      key={serv.id}
                      id={`service-${serv.id}`}
                      className="bg-white rounded-3xl p-6 sm:p-10 border border-primary-100 shadow-xs hover:shadow-lg hover:border-brand-cyan/20 transition-all duration-300 relative group flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        
                        {/* Title Row */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-brand-cyan/5 flex items-center justify-center text-brand-cyan border border-brand-cyan/10 group-hover:scale-105 transition-transform">
                              <LucideIcon name={serv.iconName} className="w-6 h-6 text-brand-cyan" />
                            </div>
                            <h3 className="font-display font-semibold text-xl text-primary-900 group-hover:text-brand-blue transition-colors">
                              {serv.title}
                            </h3>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-primary-400 block">
                              EST. STARTS FROM:
                            </span>
                            <span className="font-display font-semibold text-sm text-brand-blue block">
                              {serv.startingPrice}
                            </span>
                          </div>
                        </div>

                        {/* Detailed descriptions */}
                        <p className="text-xs sm:text-sm text-primary-200 leading-relaxed">
                          {serv.longDescription}
                        </p>

                        {/* Standard technical bullet specifications */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary-400 block font-semibold">
                            Technical Scope Specifications:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary-800">
                            {serv.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Client testimonial excerpt */}
                        <div className="p-4 rounded-xl bg-primary-50 border border-primary-100/50 text-xs text-primary-200 italic leading-relaxed">
                          "{serv.testimonial.quote}"
                          <span className="block text-[9px] font-mono text-primary-400 mt-2 font-semibold">
                            — {serv.testimonial.author} ({serv.testimonial.location})
                          </span>
                        </div>

                      </div>

                      <div className="pt-8">
                        <button
                          onClick={() => handleNavigate('contact')}
                          className="w-full py-3.5 rounded-xl bg-primary-900 hover:bg-brand-navy text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Request Quote for {serv.title.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-cyan" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA Card */}
              <div className="bg-gradient-to-br from-brand-navy to-primary-950 text-white rounded-3xl p-8 sm:p-12 border border-white/5 shadow-xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white">
                    Need Custom Electrical Architecture?
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-100/70 leading-relaxed font-sans">
                    Whether you are an architect drafting a multi-family luxury complex or a homeowner building an off-grid cabin cabana, Breevo’s Master Electricians formulate bespoke layouts for complex loads.
                  </p>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-blue text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Connect with JP Levesque</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== GALLERY / PROJECTS VIEW ==================== */}
          {currentView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                  Project Gallery
                </span>
                <h2 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-tight">
                  Immaculate Workmanship Showcase
                </h2>
                <p className="text-sm sm:text-base text-primary-200">
                  Step inside some of Toronto’s finest residences and commercial environments styled with Breevo’s custom high-end electrical solutions.
                </p>
              </div>

              {/* Categories Selector */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'residential', label: 'Prestige Residential' },
                  { id: 'commercial', label: 'Corporate Office & Retail' },
                  { id: 'specialty', label: 'Smart Home & EV' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedGalleryCat(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                      selectedGalleryCat === cat.id
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'bg-white hover:bg-primary-50 text-primary-800 border border-primary-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="bg-white rounded-2xl overflow-hidden border border-primary-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="aspect-16/11 relative overflow-hidden bg-primary-950">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-xs font-mono font-bold tracking-widest uppercase inline-flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                          Inspect Blueprint Specs
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-primary-400">
                        <span>{proj.category}</span>
                        <span>{proj.completionYear}</span>
                      </div>
                      <h3 className="font-display font-semibold text-base text-primary-900 group-hover:text-brand-blue transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-primary-200/80 leading-relaxed">
                        {proj.description.slice(0, 110)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* LIGHTBOX MODAL */}
              <AnimatePresence>
                {selectedProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-primary-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 15 }}
                      className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-primary-950/80 hover:bg-brand-navy text-white border border-white/10 transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <Icons.X className="w-4 h-4" />
                      </button>

                      <div className="aspect-16/9 relative bg-primary-950">
                        <img
                          src={selectedProject.imageUrl}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-primary-950/80 backdrop-blur-xs text-[10px] font-mono text-brand-cyan font-bold tracking-widest uppercase border border-white/5">
                          SECURE PORTFOLIO ARCHIVE
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-6">
                        <div className="flex justify-between items-start border-b border-primary-50 pb-4">
                          <div>
                            <h3 className="font-display font-semibold text-xl text-primary-900">
                              {selectedProject.title}
                            </h3>
                            <span className="text-[11px] font-mono text-brand-blue uppercase">
                              {selectedProject.location} • Year {selectedProject.completionYear}
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-brand-navy/5 text-primary-800 text-[10px] font-mono uppercase tracking-wider border border-brand-navy/10">
                            {selectedProject.category}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-primary-200 leading-relaxed">
                          {selectedProject.description}
                        </p>

                        <div className="space-y-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-primary-400 font-bold block">
                            Blueprint Scope & Materials Utilized:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary-800">
                            {selectedProject.scope.map((scp, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                                <span>{scp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setSelectedProject(null);
                              handleNavigate('contact');
                            }}
                            className="px-5 py-2.5 rounded-xl bg-brand-cyan hover:bg-brand-blue text-white font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <span>Inquire on Similar Project Scope</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {/* ==================== ABOUT VIEW ==================== */}
          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20"
            >
              {/* Main row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                    Breevo Foundations
                  </span>
                  
                  <h2 className="font-display font-bold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-tight">
                    JP Levesque & <br />
                    The Breevo Philosophy
                  </h2>

                  <p className="text-sm sm:text-base text-primary-200 leading-relaxed font-sans">
                    {BRAND_INFO.aboutStory}
                  </p>

                  <blockquote className="p-5 rounded-2xl bg-primary-100 border-l-4 border-brand-cyan text-sm italic text-primary-800 leading-relaxed">
                    "Electrical wiring is an invisible architecture. It is easy to hide sloppy conduits behind plaster, but we believe what is unseen must be executed with the same absolute mathematical perfection as what is on display."
                    <span className="block text-[10px] font-mono text-primary-400 mt-2 font-bold uppercase not-italic">
                      — JP Levesque, Master Electrician & Founder
                    </span>
                  </blockquote>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm aspect-square bg-primary-900 rounded-3xl overflow-hidden shadow-2xl border border-primary-100">
                    <img
                      src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=500" // premium electrician work portrait
                      alt="JP Levesque Master Electrician Founder"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 border border-primary-100 text-[10px] font-mono text-center">
                      <strong className="block text-primary-950 font-sans text-xs">JP (Jean-Pierre) Levesque</strong>
                      <span className="text-primary-400">Master Cert. #7014832</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Triple Values Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {/* Value 1 */}
                <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/5 flex items-center justify-center text-brand-cyan border border-brand-cyan/10">
                    <Zap className="w-5 h-5 text-brand-cyan animate-pulse" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary-900">
                    Uncompromising Safety
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                    Electricity supports modern life, but carries high danger. We respect physics, choosing heavy copper tailing, certified breakers, and meticulous grounding. Zero cut corners.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/5 flex items-center justify-center text-brand-gold border border-brand-cyan/10">
                    <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary-900">
                    Rigid Operational Integrity
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                    Our pricing is completely itemized and binding. We never charge surprise fees midway. If we find a code violation behind your walls, we explain it transparently with immediate quotes.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="bg-white rounded-2xl p-8 border border-primary-100 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/5 flex items-center justify-center text-emerald-600 border border-brand-cyan/10">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-primary-900">
                    Modern Green Innovation
                  </h3>
                  <p className="text-xs sm:text-sm text-primary-200/80 leading-relaxed">
                    From Level 2 DCC smart charging arrays to Lutron astronomical automation protocols, we focus on eco-efficient power solutions that slash utility demand charges.
                  </p>
                </div>
              </div>

              {/* Verified credentials list */}
              <div className="bg-primary-50 rounded-3xl p-8 sm:p-12 border border-primary-100 space-y-6">
                <h3 className="font-display font-semibold text-xl text-primary-900 border-b border-primary-200/50 pb-4">
                  Canadian Licensing & Compliance Standard
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-primary-200 leading-relaxed">
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>ESA lic. #7014832</strong>
                        <p>Electrical Safety Authority master license validating complete alignment with Ontario Regulatory requirements.</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>ACP Registered</strong>
                        <p>Authorized Contractor Program status, identifying Breevo as an elite trade firm subject to selective safety audits.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>$5,000,000 Liability Cover</strong>
                        <p>Full commercial underwriting protecting residential estates and commercial properties during structural upgrades.</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>WSIB Compliance Certification</strong>
                        <p>Workplace Safety and Insurance Board clearances provided on demand for all commercial project managers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== REVIEWS VIEW ==================== */}
          {currentView === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                  Client Reviews
                </span>
                <h2 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight leading-tight">
                  Unrivaled GTA Workmanship Feedback
                </h2>
                <p className="text-sm sm:text-base text-primary-200">
                  Read complete authentic, WSIB-audited client testimonials submitted by homeowners, contractors, and building managers.
                </p>
              </div>

              <ReviewHub />
            </motion.div>
          )}

          {/* ==================== FAQ VIEW ==================== */}
          {currentView === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                  Frequently Answered Safety Queries
                </span>
                <h2 className="font-display font-semibold text-3xl sm:text-4xl text-primary-900 tracking-tight leading-tight">
                  Electrical Safety & Compliance Answers
                </h2>
                <p className="text-xs sm:text-sm text-primary-200">
                  Learn about local electrical codes, hydro safety disconnects, insurance-approved aluminum remediation, and Level 2 smart vehicle load balancing.
                </p>
              </div>

              {/* Categorization tabs */}
              <div className="flex flex-wrap justify-center gap-1.5 border-b border-primary-100 pb-6">
                {[
                  { id: 'all', label: 'All Queries' },
                  { id: 'general', label: 'General Standards' },
                  { id: 'services', label: 'Service Timeline' },
                  { id: 'pricing', label: 'Rates & Pricing' },
                  { id: 'safety', label: 'Safety & Insurance' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFaqCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                      activeFaqCategory === tab.id
                        ? 'bg-brand-navy text-white shadow-sm'
                        : 'bg-white hover:bg-primary-50 text-primary-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Accordions */}
              <div className="space-y-4 pt-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white border border-primary-100 rounded-2xl overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center text-sm font-semibold text-primary-900 hover:bg-primary-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-brand-cyan" /> : <ChevronDown className="w-4.5 h-4.5 text-brand-cyan" />}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-xs sm:text-sm text-primary-200/90 leading-relaxed pt-2 border-t border-primary-50 bg-[#fafbfc]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Emergency reminder card */}
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-4 mt-8">
                <Info className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-semibold">Have an urgent electrical hazard or live sparks?</strong>
                  <p className="text-primary-200">
                    Do not wait or email. Live sparks or buzzing breakers pose immediate fire dangers. Shut off your main service breaker immediately and dial our 24/7 master dispatcher at <strong className="text-primary-950 font-bold">{BRAND_INFO.phone}</strong>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== CONTACT VIEW ==================== */}
          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-blue text-xs font-mono tracking-widest uppercase">
                  Contact Hub
                </span>
                <h2 className="font-display font-semibold text-3xl sm:text-5xl text-primary-900 tracking-tight">
                  Design Your Electrical Blueprint
                </h2>
                <p className="text-sm text-primary-200 leading-relaxed">
                  Have a question or ready to schedule your premium 200A service upgrade or Lutron smart lighting scene layout? Connect with JP & Team below.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left block information */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
                  
                  {/* Phone card */}
                  <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-brand-cyan shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-semibold text-primary-400">Direct Dispatch Desk</span>
                      <strong className="block text-primary-900 text-base">{BRAND_INFO.phone}</strong>
                      <span className="block text-[10px] text-emerald-600 font-semibold uppercase">● 24/7 GTA support active</span>
                    </div>
                  </div>

                  {/* Mail card */}
                  <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-brand-gold shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-semibold text-primary-400">Electronic Inquiries</span>
                      <strong className="block text-primary-900 text-xs sm:text-sm">{BRAND_INFO.email}</strong>
                      <span className="block text-[10px] text-primary-400">Response under 1 business hour</span>
                    </div>
                  </div>

                  {/* Address card */}
                  <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-semibold text-primary-400">Engineering Headquarters</span>
                      <strong className="block text-primary-900 text-xs sm:text-sm">{BRAND_INFO.city}</strong>
                      <span className="block text-[10px] text-primary-400">Licensed Technical Dispatch</span>
                    </div>
                  </div>

                  {/* Operational Hours card */}
                  <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-xs flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-semibold text-primary-400">Operation Schedule</span>
                      <strong className="block text-primary-900 text-xs sm:text-sm">Mon–Sun, 7:00 AM – 7:00 PM</strong>
                      <span className="block text-[10px] text-primary-400">Emergency support active 24/7/365</span>
                    </div>
                  </div>

                </div>

                {/* Right block Form */}
                <div className="lg:col-span-8">
                  <ContactForm />
                </div>

              </div>

              {/* Map integration placeholder */}
              <div className="bg-white border border-primary-100 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <h4 className="font-display font-semibold text-base text-primary-900 mb-4">
                  Google Maps Operational Dispatch Grid
                </h4>
                <div className="relative rounded-2xl overflow-hidden aspect-21/9 bg-primary-900 max-h-96 border border-primary-50">
                  <img
                    src={BRAND_INFO.mapPlaceholderUrl}
                    alt="Breevo operational sector Map Grid"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary-950/20"></div>
                  {/* Pin overlay representing corporate headquarters */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="p-2.5 rounded-full bg-brand-navy border-2 border-white text-brand-cyan shadow-xl animate-bounce">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <div className="mt-1 px-3 py-1 bg-primary-950/95 border border-white/10 text-[9px] text-white font-mono rounded-md shadow-md">
                      BREEVO HEADQUARTERS DISPATCH
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== PRIVACY POLICY VIEW ==================== */}
          {currentView === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-brand-cyan" />
                <h2 className="font-display font-semibold text-3xl text-primary-900 tracking-tight">
                  Privacy Policy & Compliance Standard
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 mb-6">
                <strong>Demo Environment Notice:</strong> This privacy policy is a legally structured template compiled for Breevo Electric’s fictional high-end service showcase. No actual customer tracking or real telemetry takes place on this demonstration stage.
              </div>

              <div className="space-y-6 text-xs sm:text-sm text-primary-200 leading-relaxed">
                <div>
                  <strong className="block font-semibold text-primary-900 text-base mb-2">1. Scope of Privacy Protection</strong>
                  <p>
                    Breevo Electric Inc. treats your private property with the utmost discretion and care. This privacy disclosure outlines how we handle, capture, and process client contact requests, structural electrical plans, and estimation diagnostics.
                  </p>
                </div>

                <div>
                  <strong className="block font-semibold text-primary-900 text-base mb-2">2. Information Collection & Consent</strong>
                  <p>
                    When you request an estimate or submit an inquiry via our client planning system, we collect personal contact credentials including your full name, email coordinates, phone numbers, and physical property address. This information is processed strictly for preparing code-compliant engineering blueprints and scheduling ESA safety filings.
                  </p>
                </div>

                <div>
                  <strong className="block font-semibold text-primary-900 text-base mb-2">3. Protection of Structural Blueprints</strong>
                  <p>
                    Any physical or digital CAD blueprints of residential panel circuits, whole-home automation arrays, or commercial fit-out panels are archived on private, locally managed storage engines. We do not sell, rent, or lease your physical estate configurations to secondary marketing platforms.
                  </p>
                </div>

                <div>
                  <strong className="block font-semibold text-primary-900 text-base mb-2">4. Legal & Regulatory Disclosures</strong>
                  <p>
                    Breevo operates in strict compliance with the Electrical Safety Authority (ESA) and Ontario utility guidelines. To secure legal safety certificates, we submit final electrical schema details, permit numbers, and property locations directly to designated municipal and ESA inspectors.
                  </p>
                </div>

                <div className="pt-6 border-t border-primary-100 font-mono text-[10px] text-primary-400">
                  <p>Breevo Electric Corporate Compliance Office • Toronto, ON</p>
                  <p>Last Revised: July 18, 2026</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Main extensive Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
