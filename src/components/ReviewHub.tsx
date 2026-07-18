import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, User, Sparkles, Filter, Plus, ShieldAlert, PenTool } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

export default function ReviewHub() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | '5star'>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // New review form state
  const [newReview, setNewReview] = useState({
    author: '',
    role: '',
    location: '',
    rating: 5,
    content: '',
  });
  const [showDemoMsg, setShowDemoMsg] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'verified') return r.verified;
    if (selectedFilter === '5star') return r.rating === 5;
    return true;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content || !newReview.location) {
      alert('Please fill out all fields');
      return;
    }
    
    // Show demo notification
    setShowDemoMsg(true);
    
    // Add mock review to local state just to show immediate feedback!
    const newlyCreated: Testimonial = {
      id: String(Date.now()),
      author: newReview.author,
      role: newReview.role || 'Homeowner',
      location: newReview.location + ', ON',
      rating: newReview.rating,
      content: newReview.content,
      date: 'Just Now',
      verified: false,
    };

    setReviews([newlyCreated, ...reviews]);

    setTimeout(() => {
      setShowDemoMsg(false);
      setShowReviewForm(false);
      setNewReview({
        author: '',
        role: '',
        location: '',
        rating: 5,
        content: '',
      });
    }, 4000);
  };

  return (
    <div id="reviews-hub-container" className="w-full">
      {/* Aggregate Header */}
      <div className="bg-gradient-to-br from-brand-navy to-primary-950 text-white rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Aggregate score */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <span className="font-display font-bold text-5xl sm:text-6xl text-white">4.9</span>
              <span className="text-primary-100/40 font-mono text-2xl self-end mb-1">/5</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs font-mono tracking-widest text-brand-cyan uppercase">
              4,800+ Total Projects Audited
            </p>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-primary-200/60 font-mono">
              <span>5 Stars</span>
              <span className="text-white font-bold">98%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-cyan rounded-full" style={{ width: '98%' }}></div>
            </div>

            <div className="flex justify-between text-xs text-primary-200/60 font-mono">
              <span>4 Stars</span>
              <span className="text-white font-bold">2%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-cyan/50 rounded-full" style={{ width: '2%' }}></div>
            </div>

            <p className="text-[10px] text-primary-100/40 text-center md:text-left pt-2">
              All reviews audited under WSIB compliance standard structures.
            </p>
          </div>

          {/* CTA review creation */}
          <div className="text-center md:text-right">
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-blue text-white font-medium text-xs uppercase tracking-widest shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>

        </div>
      </div>

      {/* Review creation form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-white border border-primary-100 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <PenTool className="w-4 h-4 text-brand-cyan" />
                <h4 className="font-display font-semibold text-lg text-primary-900">
                  Submit Your Client Experience
                </h4>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-primary-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.author}
                      onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="e.g. Liam Tremblay"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-primary-100 focus:outline-hidden focus:border-brand-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-primary-400 mb-1">
                      Role / Suburb
                    </label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Homeowner / Oakville"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-primary-100 focus:outline-hidden focus:border-brand-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-primary-400 mb-1">
                      City in Ontario
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.location}
                      onChange={(e) => setNewReview(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. Mississauga"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-primary-100 focus:outline-hidden focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-primary-400 mb-1">
                    Quality Rating
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            newReview.rating >= star ? 'text-brand-gold fill-brand-gold' : 'text-primary-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-primary-400 mb-1">
                    Describe your experience with JP & Team
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe your electrical service, panel upgrades, smart-home automation, or immediate diagnostics..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-primary-100 focus:outline-hidden focus:border-brand-cyan resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-primary-400">
                    <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                    <span>Your submission will render locally for instant validation.</span>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="w-full sm:w-auto px-4 py-2.5 text-xs rounded-lg border border-primary-100 hover:bg-primary-50 text-primary-400 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 text-xs rounded-lg bg-brand-cyan hover:bg-brand-blue text-white font-medium uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>
                </div>

                {showDemoMsg && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5 animate-fade-up">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Demo Website — Form submission disabled.</strong>
                      To respect regulatory standards, your feedback has been rendered to your local dashboard state only.
                    </div>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-cyan" />
          <span className="text-xs font-mono tracking-wider uppercase text-primary-400">
            Audit Filter:
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'verified', label: 'Verified Local Projects' },
            { id: '5star', label: 'Elite 5-Star Reviews' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedFilter(btn.id as any)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide uppercase transition-all cursor-pointer ${
                selectedFilter === btn.id
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'bg-white text-primary-800 hover:bg-primary-50 border border-primary-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-primary-100 shadow-xs hover:shadow-md transition-shadow relative group"
          >
            {/* Quote indicator */}
            <div className="absolute top-6 right-6 font-serif text-primary-50 text-5xl font-extrabold select-none pointer-events-none group-hover:text-brand-cyan/10 transition-colors">
              “
            </div>

            <div className="flex items-center gap-1 text-brand-gold mb-3">
              {[...Array(test.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-primary-800 italic leading-relaxed mb-6">
              "{test.content}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-primary-50 text-xs">
              <div>
                <strong className="block text-primary-900 font-display font-medium text-sm">
                  {test.author}
                </strong>
                <span className="text-[10px] text-primary-400">
                  {test.role} — <span className="text-brand-cyan">{test.location}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-primary-400 font-mono">
                  {test.date}
                </span>
                {test.verified && (
                  <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-mono mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
