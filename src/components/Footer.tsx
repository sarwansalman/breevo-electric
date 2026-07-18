import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldAlert, Sparkles, Send, Zap, ShieldCheck } from 'lucide-react';
import { BRAND_INFO, SERVICES, AREAS_WE_SERVE } from '../data';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showDemoMsg, setShowDemoMsg] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setShowDemoMsg(true);
    setTimeout(() => {
      setShowDemoMsg(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const quickNav = [
    { label: 'Home', id: 'home' },
    { label: 'Services Catalog', id: 'services' },
    { label: 'Project Gallery', id: 'gallery' },
    { label: 'About JP & Crew', id: 'about' },
    { label: 'Client Reviews', id: 'reviews' },
    { label: 'General FAQ', id: 'faq' },
    { label: 'Contact & Booking', id: 'contact' },
  ];

  return (
    <footer id="main-footer" className="bg-brand-navy text-white pt-20 pb-8 relative border-t border-white/10 overflow-hidden">
      {/* Decorative glowing backdrops */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-navy to-black flex items-center justify-center border border-white/10 shadow-md">
                <Zap className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-white block">
                  Breevo <span className="text-brand-cyan">Electric</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block">
                  Lic. #7014832
                </span>
              </div>
            </div>
            
            <p className="text-xs text-primary-200/60 leading-relaxed">
              Toronto’s elite electrical contracting firm. Specializing in bespoke residential panel transformations, smart systems, and premium commercial construction.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider text-brand-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACP CERTIFIED CONTRACTOR
              </span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-6">
            <h4 className="font-display font-medium text-xs uppercase tracking-widest text-brand-cyan">
              Corporate Registry
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickNav.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => { onNavigate(link.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-primary-100/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { onNavigate('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-primary-100/60 hover:text-white transition-colors cursor-pointer font-semibold underline decoration-brand-cyan"
                >
                  Privacy Policy & Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Col */}
          <div className="space-y-6">
            <h4 className="font-display font-medium text-xs uppercase tracking-widest text-brand-cyan">
              Headquarters & Dispatch
            </h4>
            <ul className="space-y-4 text-xs text-primary-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{BRAND_INFO.address}</span>
                  <span className="block text-[10px] text-primary-100/50">
                    {BRAND_INFO.city}{BRAND_INFO.postalCode ? `, ${BRAND_INFO.postalCode}` : ''}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <div>
                  <a href={`tel:${BRAND_INFO.phone}`} className="block text-white font-semibold hover:text-brand-cyan transition-colors">
                    {BRAND_INFO.phone}
                  </a>
                  <span className="block text-[9px] text-emerald-400 uppercase font-mono font-bold tracking-wider">
                    24/7 GTA Dispatcher Active
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <div>
                  <a href={`mailto:${BRAND_INFO.email}`} className="block text-white hover:text-brand-cyan transition-colors">
                    {BRAND_INFO.email}
                  </a>
                  <span className="block text-[10px] text-primary-100/40">Response under 1 hour</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Newsletter Mock Col */}
          <div className="space-y-6">
            <h4 className="font-display font-medium text-xs uppercase tracking-widest text-brand-cyan">
              Technical Dispatch Digest
            </h4>
            <p className="text-xs text-primary-200/60 leading-relaxed">
              Subscribe to stay updated with green electrical rebates, safety checklists, and Lutron smart home releases.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@example.ca"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-3.5 py-3 rounded-lg bg-white/5 border border-white/10 text-xs focus:outline-hidden focus:border-brand-cyan text-white w-full"
                />
                <button
                  type="submit"
                  className="p-3 bg-brand-cyan hover:bg-brand-blue rounded-lg text-white transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {showDemoMsg && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2.5 rounded-lg bg-amber-950/90 border border-amber-500/20 text-[10px] text-amber-400 font-mono flex items-center gap-1.5 animate-fade-up z-20">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>Demo Website — Newsletter disabled.</span>
                </div>
              )}
            </form>

            <div className="text-[10px] font-mono text-primary-200/40 space-y-1">
              <p>Operating Hours: Mon–Sun, 7:00 AM – 7:00 PM</p>
              <p>Emergency Support: 24/7/365</p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-wider text-primary-100/40">
          <div>
            <p>© {new Date().getFullYear()} Breevo Electric Inc. All rights reserved.</p>
            <p className="text-brand-gold/50 mt-0.5">Licensed Ontario Electrical Contractor {BRAND_INFO.license}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              AGENCY PREVIEW STAGE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>TORONTO, ON</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
