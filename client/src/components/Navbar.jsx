import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  UserCheck,
  Search,
  Clock
} from 'lucide-react';
import { HOSPITAL_CONFIG } from '../utils/config';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEyeDropdownOpen, setIsEyeDropdownOpen] = useState(false);
  const [isSkinDropdownOpen, setIsSkinDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsEyeDropdownOpen(false);
    setIsSkinDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top Notification & Emergency Strip */}
      <div className="bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 text-white text-xs py-1.5 px-3 sm:px-6 border-b border-amber-500/20">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar py-0.5">
            <span className="flex items-center gap-1.5 text-amber-300 whitespace-nowrap text-[11px] sm:text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#ecb612] shrink-0" />
              <span>Seelanaickenpatti, Salem – 636201</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300 whitespace-nowrap text-[11px] sm:text-xs">
              <Clock className="w-3.5 h-3.5 text-[#ecb612] shrink-0" />
              <span>OPD: Mon – Sat 09:00 AM – 08:00 PM</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1 bg-[#eb6506]/20 px-2.5 py-0.5 rounded-full text-[10px] text-amber-200 border border-[#eb6506]/40 font-semibold whitespace-nowrap">
              Est. 2025 • Dual Specialty
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 ml-auto">
            <a
              href={`mailto:${HOSPITAL_CONFIG.email}`}
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-[#ecb612] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#ecb612]" />
              <span>{HOSPITAL_CONFIG.email}</span>
            </a>
            <a
              href={`tel:${HOSPITAL_CONFIG.phoneClean}`}
              className="flex items-center gap-1.5 text-white font-bold hover:brightness-110 transition-all bg-gradient-to-r from-[#eb6506] to-[#ecb612] px-2.5 py-0.5 rounded-full shadow-xs text-[11px] sm:text-xs whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-white animate-pulse" />
              <span>{HOSPITAL_CONFIG.phone}</span>
            </a>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-white transition-colors text-[11px] underline underline-offset-2 flex items-center gap-1 whitespace-nowrap"
            >
              <UserCheck className="w-3 h-3 text-[#ecb612]" /> Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4 lg:gap-6">

          {/* Single-Line Brand Logo & Title */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group py-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-xl sm:rounded-2xl bg-white border-2 border-amber-200 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#ecb612] transition-all shrink-0">
              <img
                src="/img/logo.webp"
                alt="Paavai Hospital Logo"
                className="w-full h-full object-contain"
                loading="eager"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            <div className="shrink-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-nowrap">
                <span className="font-display font-black text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-900 tracking-tight whitespace-nowrap">
                  Paavai <span className="text-[#eb6506]">Hospital</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider bg-gradient-to-r from-amber-50 to-orange-50 text-[#eb6506] border border-amber-300/80 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                  Salem
                </span>
              </div>
              <p className="hidden sm:flex text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-tight whitespace-nowrap items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ecb612]"></span>
                <span>Eye &amp; Skin Care Hospital • Est. 2025</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            <Link
              to="/"
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                isActive('/') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
              }`}
            >
              Home
            </Link>

            {/* Eye Care Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsEyeDropdownOpen(true)}
              onMouseLeave={() => setIsEyeDropdownOpen(false)}
            >
              <Link
                to="/eye-care"
                className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive('/eye-care') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
                }`}
              >
                <Eye className="w-4 h-4 text-[#ecb612]" />
                <span>Eye Care</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              {isEyeDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 rounded-2xl bg-white shadow-xl border border-amber-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-amber-100 mb-1 bg-amber-50/50 rounded-xl">
                    <p className="text-xs font-extrabold text-[#eb6506] uppercase tracking-wider">Ophthalmology Suite</p>
                    <p className="text-[11px] text-slate-500">Phaco Cataract, LASIK, OCT &amp; Retina</p>
                  </div>
                  <Link to="/eye-care#cataract" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    Advanced Cataract &amp; Phaco Surgery
                  </Link>
                  <Link to="/eye-care#lasik" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    LASIK &amp; Refractive Suite
                  </Link>
                  <Link to="/eye-care#retina" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    Diabetic Retinopathy &amp; Retina Clinic
                  </Link>
                  <Link to="/eye-care#diagnostics" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    OCT, B-Scan &amp; FFA Diagnostics
                  </Link>
                  <Link to="/eye-care#opticals" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    In-House Opticals &amp; Lens Center
                  </Link>
                </div>
              )}
            </div>

            {/* Skin Care Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsSkinDropdownOpen(true)}
              onMouseLeave={() => setIsSkinDropdownOpen(false)}
            >
              <Link
                to="/skin-care"
                className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive('/skin-care') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#eb6506]" />
                <span>Skin &amp; Aesthetic</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              {isSkinDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 rounded-2xl bg-white shadow-xl border border-amber-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-amber-100 mb-1 bg-amber-50/50 rounded-xl">
                    <p className="text-xs font-extrabold text-[#eb6506] uppercase tracking-wider">Dermatology &amp; Aesthetics</p>
                    <p className="text-[11px] text-slate-500">HydraFacial, Laser, GFC &amp; Anti-Aging</p>
                  </div>
                  <Link to="/skin-care#clinical" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    Clinical Dermatology &amp; Pigmentation
                  </Link>
                  <Link to="/skin-care#aesthetic" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    HydraFacial, PhotoFacial &amp; Botox
                  </Link>
                  <Link to="/skin-care#hair" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    GFC Therapy, PRP &amp; Hair Care
                  </Link>
                  <Link to="/skin-care#minor" onClick={closeMenus} className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-[#eb6506] rounded-lg">
                    RF Microneedling, Nail &amp; Keloid Clinic
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/doctors"
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                isActive('/doctors') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
              }`}
            >
              Doctors
            </Link>

            <Link
              to="/services"
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                isActive('/services') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
              }`}
            >
              Treatments
            </Link>

            <Link
              to="/about"
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                isActive('/about') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                isActive('/contact') ? 'text-[#eb6506] bg-amber-50/90' : 'text-slate-700 hover:text-[#eb6506] hover:bg-amber-50/50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <Link
              to="/lookup"
              className="text-xs font-bold text-slate-700 hover:text-[#eb6506] px-2.5 py-2 xl:px-3.5 xl:py-2.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/60 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Lookup and print your booking receipt pass"
            >
              <Search className="w-3.5 h-3.5 text-[#ecb612]" />
              <span className="hidden xl:inline">Track</span> Receipt
            </Link>

            <Link
              to="/book-appointment"
              className="bg-gradient-to-r from-[#ecb612] via-[#f59e0b] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs xl:text-sm px-3.5 py-2 xl:px-4.5 xl:py-2.5 rounded-xl shadow-sm shadow-orange-500/20 hover:shadow-md transition-all flex items-center gap-2 group whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile & Tablet Toggle Bar */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <Link
              to="/book-appointment"
              className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 whitespace-nowrap shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-amber-50 border border-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <Link
              to="/eye-care"
              onClick={closeMenus}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm border border-amber-200"
            >
              <Eye className="w-4 h-4 text-[#ecb612]" /> Eye Care
            </Link>
            <Link
              to="/skin-care"
              onClick={closeMenus}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-50 text-orange-900 font-bold text-xs sm:text-sm border border-orange-200"
            >
              <Sparkles className="w-4 h-4 text-[#eb6506]" /> Skin &amp; Aesthetic
            </Link>
          </div>

          <div className="space-y-1">
            <Link to="/" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-amber-50">
              Home
            </Link>
            <Link to="/doctors" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-amber-50">
              Doctors &amp; Specialists
            </Link>
            <Link to="/services" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-amber-50">
              Treatments Catalog
            </Link>
            <Link to="/about" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-amber-50">
              About Hospital &amp; Facility
            </Link>
            <Link to="/contact" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-amber-50">
              Location &amp; Contact
            </Link>
            <Link to="/lookup" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-sm font-bold text-[#eb6506] bg-amber-50">
              Track / Print Appointment Pass
            </Link>
            <Link to="/admin" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50">
              Staff Portal / Appointment Dashboard
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/book-appointment"
              onClick={closeMenus}
              className="w-full bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white font-extrabold py-3 rounded-xl text-center shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" /> Book Appointment Now
            </Link>
            <a
              href={`tel:${HOSPITAL_CONFIG.phoneClean}`}
              className="w-full bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#eb6506]" /> Emergency: {HOSPITAL_CONFIG.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
