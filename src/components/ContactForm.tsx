import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ShieldAlert, Sparkles, Loader2, Info } from 'lucide-react';
import { SERVICES } from '../data';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'panel-upgrades',
    urgency: 'standard',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setError('Please provide your name, email, phone number, and a brief description of your project.');
      return;
    }

    setLoading(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      setLoading(false);
      setShowDemoBanner(true);
    }, 1500);
  };

  const selectedServiceObj = SERVICES.find(s => s.id === formData.serviceType);

  return (
    <div id="booking-form-wrapper" className="w-full max-w-2xl mx-auto">
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-primary-100 overflow-hidden">
        {/* Subtle decorative lights */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-cyan/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-[10px] font-mono tracking-widest uppercase border border-brand-navy/10">
              Booking System
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider">
              Diagnostics Available
            </span>
          </div>

          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-primary-900 tracking-tight mb-2">
            Schedule a Premium Consultation
          </h3>
          <p className="text-sm text-primary-200/70 mb-8 leading-relaxed">
            Fill out the form below and our certified master planner will coordinate your consultation details within 1 business hour.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-up">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Jean-Pierre Tremblay"
                  className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. jp.tremblay@example.ca"
                  className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. (416) 555-0188"
                  className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900"
                />
              </div>

              {/* Property Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 123 Maple Rd, Toronto"
                  className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Project / Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900 appearance-none"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%230f172a\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '16px'
                  }}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Urgency Level */}
              <div>
                <label htmlFor="urgency" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                  Priority Urgency
                </label>
                <div className="grid grid-cols-2 gap-3 h-[46px]">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: 'standard' }))}
                    className={`flex items-center justify-center rounded-xl text-xs font-medium uppercase tracking-wider border cursor-pointer transition-all ${
                      formData.urgency === 'standard'
                        ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                        : 'bg-primary-50/50 text-primary-800 border-primary-100 hover:bg-primary-100/50'
                    }`}
                  >
                    Standard Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: 'emergency' }))}
                    className={`flex items-center justify-center rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
                      formData.urgency === 'emergency'
                        ? 'bg-red-950 text-red-400 border-red-500/30 shadow-red-900/10'
                        : 'bg-primary-50/50 text-primary-800 border-primary-100 hover:bg-primary-100/50'
                    }`}
                  >
                    ⚠️ Emergency
                  </button>
                </div>
              </div>
            </div>

            {/* Description / Scope */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-primary-800 mb-2">
                Project Scope / Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe what electrical services, upgrades, or issues you would like JP & Team to address..."
                className="w-full px-4 py-3.5 rounded-xl border border-primary-100 bg-primary-50/50 text-sm focus:outline-hidden focus:border-brand-cyan focus:bg-white transition-all text-primary-900 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/95 hover:to-brand-blue/95 text-white font-semibold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-80 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Configuring Electrical Package...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Quote Request</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Demo Modal overlay */}
      <AnimatePresence>
        {showDemoBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-primary-100 shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="flex items-center gap-3 text-brand-gold mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
                    Platform Notice
                  </h4>
                  <p className="text-[10px] text-primary-400 font-mono">
                    BREEVO DIGITAL STAGE v1.0
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-xs flex items-start gap-3.5 mb-6">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-1">Demo Website — Form submission disabled.</strong>
                  Your request has been successfully captured by the client simulator. To protect real credentials, no emails are dispatched.
                </div>
              </div>

              {/* Structured capture summary */}
              <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100/50 space-y-3.5 mb-6">
                <p className="text-[10px] font-mono tracking-wider text-primary-400 uppercase border-b border-primary-200/50 pb-2">
                  Captured Schema Details:
                </p>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div>
                    <span className="text-primary-400 block text-[10px] uppercase font-semibold">Client Name</span>
                    <strong className="text-primary-900">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-primary-400 block text-[10px] uppercase font-semibold">Email & Phone</span>
                    <strong className="text-primary-900">{formData.email}</strong>
                    <span className="block text-primary-500 font-mono text-[10px]">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-primary-400 block text-[10px] uppercase font-semibold">Service Selection</span>
                    <strong className="text-primary-900">{selectedServiceObj?.title || formData.serviceType}</strong>
                    <span className="block text-brand-cyan font-mono text-[10px]">Est. Starts: {selectedServiceObj?.startingPrice}</span>
                  </div>
                  <div>
                    <span className="text-primary-400 block text-[10px] uppercase font-semibold">Property Scope</span>
                    <strong className="text-primary-900">{formData.address || 'Not Provided'}</strong>
                    <span className="block text-red-500 font-mono text-[10px] uppercase font-semibold">
                      Priority: {formData.urgency.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-primary-200/35">
                  <span className="text-primary-400 block text-[10px] uppercase font-semibold mb-1">Message Brief</span>
                  <p className="text-xs text-primary-200 italic">"{formData.message}"</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDemoBanner(false);
                    // Clear form
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      address: '',
                      serviceType: 'panel-upgrades',
                      urgency: 'standard',
                      message: '',
                    });
                  }}
                  className="px-6 py-3 rounded-xl bg-primary-900 text-white font-medium text-xs uppercase tracking-wider hover:bg-primary-800 transition-all cursor-pointer"
                >
                  Acknowledge & Clear
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
