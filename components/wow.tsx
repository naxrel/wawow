"use client";

import React, { useState, useEffect } from "react";

interface LandingPageProps {
  onApply: () => void;
}

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V22H4V12"/>
    <path d="M22 7H2v5h20V7z"/>
    <path d="M12 22V7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
);

const metaItems = [
  { icon: <MapPinIcon />, label: "Location", value: "Remote / Anywhere" },
  { icon: <BriefcaseIcon />, label: "Compensation", value: "Love & Happiness" },
  { icon: <ClockIcon />, label: "Type", value: "Full-Time, Forever" },
  { icon: <HeartIcon />, label: "Department", value: "Heart & Soul" },
];

const requirements = [
  "A warm heart and kind spirit",
  "Ability to make the world brighter",
  "Experience in being amazing (you clearly have this)",
  "Strong communication skills, especially laughing",
  "Open to new adventures and experiences",
];

const benefits = [
  "Unlimited smiles and laughter",
  "Someone who will always be there for you",
  "Adventures to places unknown",
  "Home-cooked meals (attempting, at least)",
  "Lifetime membership of being cherished",
];

const stats = [
  { number: "\u221E", label: "Days Together", sub: "No expiry date" },
  { number: "100%", label: "Commitment", sub: "No half-measures" },
  { number: "24/7", label: "Availability", sub: "Always here for you" },
  { number: "1", label: "Position Available", sub: "Only for the right one" },
];

export default function LandingPage({ onApply }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    whyApply: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prevHtml = document.documentElement.style.backgroundColor;
    const prevBody = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.documentElement.style.backgroundColor = "#ffffff";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#171717";
    return () => {
      document.documentElement.style.backgroundColor = prevHtml;
      document.body.style.backgroundColor = prevBody;
      document.body.style.color = prevColor;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onApply();
    }, 1800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#ffffff', color: '#171717' }}>

      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3C3489] rounded-lg flex items-center justify-center">
              <span className="text-white font-medium text-sm">N</span>
            </div>
            <span className="text-gray-900 font-medium text-base">NovaCorp</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Careers</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Blog</a>
            <a href="#" className="text-gray-900 border border-gray-200 hover:border-gray-300 px-4 py-1.5 rounded-lg transition-all text-sm">
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Hero Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">

          {/* Left: Job Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-[#534AB7] rounded-full" />
              Actively Hiring
            </div>

            <h1 className="text-4xl font-medium text-gray-900 leading-tight mb-3">
              Chief Happiness
              <span className="block text-[#534AB7]">Officer</span>
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We are looking for an extraordinary individual to fill our most important role.
              This is a lifetime position with incredible benefits and growth potential.
            </p>

            {/* Meta cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {metaItems.map((item) => (
                <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="text-gray-400 mb-2">{item.icon}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-gray-900 text-sm font-medium">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-4">
              <h3 className="text-gray-900 font-medium text-sm mb-4 flex items-center gap-2 text-gray-600">
                <ClipboardIcon />
                Requirements
              </h3>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                    <span className="text-[#534AB7] mt-0.5 flex-shrink-0 font-medium">+</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="text-gray-900 font-medium text-sm mb-4 flex items-center gap-2 text-gray-600">
                <GiftIcon />
                Benefits
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                    <span className="text-[#534AB7] mt-0.5 flex-shrink-0 text-xs">&#9670;</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="sticky top-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-gray-900 text-lg font-medium mb-1">Apply Now</h2>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Fill out the form below to apply for this position. We review every application carefully.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:border-[#534AB7] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+62 xxx xxxx xxxx"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:border-[#534AB7] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:border-[#534AB7] focus:bg-white transition-all"
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#534AB7] focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0–1 years (Fresh Graduate)</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5+">5+ years (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
                    Why should we hire you?
                  </label>
                  <textarea
                    name="whyApply"
                    value={formData.whyApply}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a bit about yourself and why you would be perfect for this role..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:border-[#534AB7] focus:bg-white transition-all resize-none"
                  />
                </div>



                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3C3489] hover:bg-[#534AB7] text-white font-medium py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRightIcon />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-gray-300 text-xs mt-5 flex items-center justify-center gap-1.5">
                <LockIcon />
                Your information is safe with us. We do not spam.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-100 pt-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-3xl font-medium text-gray-900 mb-1">{stat.number}</div>
                <div className="text-[#534AB7] text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300 text-sm border-t border-gray-100 pt-8">
          <p>
            &copy; 2026 NovaCorp. All rights reserved.{" "}
            &middot;{" "}
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
            {" "}&middot;{" "}
            <a href="#" className="hover:text-gray-500 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
}