"use client";

import React, { useState } from "react";

interface LandingPageProps {
  onApply: () => void;
}

export default function LandingPage({ onApply }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    whyApply: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onApply();
    }, 1800);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0f1117] font-sans">
      {/* Subtle animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-[#0f1117]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-white font-semibold text-lg">NovaCorp</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Careers
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Blog
            </a>
            <a
              href="#"
              className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Job Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              Actively Hiring
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Chief Happiness
              <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Officer 💼
              </span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We&apos;re looking for an extraordinary individual to fill our
              most important role. This is a lifetime position with incredible
              benefits and growth potential.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "📍", label: "Location", value: "Remote / Anywhere" },
                { icon: "💰", label: "Compensation", value: "Love & Happiness" },
                { icon: "⏰", label: "Type", value: "Full-Time, Forever" },
                { icon: "🏢", label: "Department", value: "Heart & Soul" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <span>📋</span> Requirements
              </h3>
              <ul className="space-y-3">
                {[
                  "A warm heart and kind spirit",
                  "Ability to make the world brighter",
                  "Experience in being amazing (you clearly have this)",
                  "Strong communication skills (especially laughing)",
                  "Open to new adventures and experiences",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <span>🎁</span> Benefits
              </h3>
              <ul className="space-y-3">
                {[
                  "Unlimited smiles and laughter",
                  "Someone who will always be there for you",
                  "Adventures to places unknown",
                  "Home-cooked meals (attempting, at least)",
                  "Lifetime membership of being cherished",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-violet-400 mt-0.5 flex-shrink-0">★</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-white text-xl font-bold mb-2">
                Apply Now
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form below to apply for this position. We review every application carefully.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+62 xxx xxxx xxxx"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-500">Select experience level</option>
                    <option value="0-1">0–1 years (Fresh Graduate)</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5+">5+ years (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Why should we hire you? *
                  </label>
                  <textarea
                    name="whyApply"
                    required
                    value={formData.whyApply}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a bit about yourself and why you'd be perfect for this role..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    required
                    className="mt-1 accent-indigo-500 w-4 h-4 flex-shrink-0 cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-gray-500 text-xs leading-relaxed cursor-pointer">
                    I agree to the Terms & Conditions and understand that this application will be reviewed by our team within 0 business days.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Application
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>

              <p className="text-center text-gray-600 text-xs mt-6">
                🔒 Your information is safe with us. We do not spam.
              </p>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="border-t border-white/5 pt-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "∞", label: "Days Together", sub: "No expiry date" },
              { number: "100%", label: "Commitment", sub: "No half-measures" },
              { number: "24/7", label: "Availability", sub: "Always here for you" },
              { number: "1", label: "Position Available", sub: "Only for the right one" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white/3 rounded-2xl border border-white/5">
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-indigo-400 text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-gray-600 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
          <p>© 2026 NovaCorp. All rights reserved. · <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a> · <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a></p>
        </div>
      </div>
    </div>
  );
}
