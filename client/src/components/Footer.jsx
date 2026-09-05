import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-slate-300 pt-16 pb-12 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Clarification Banner */}
        <div className="mb-12 bg-stone-900/90 border border-[#ecb612]/30 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs sm:text-sm text-slate-300 shadow-lg shadow-black/40">
          <div className="p-2.5 rounded-2xl bg-[#ecb612]/10 text-[#ecb612] shrink-0 border border-[#ecb612]/30">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-white tracking-wide flex items-center gap-2">
              <span>Independent Specialty Facility in Salem</span>
              <span className="bg-[#eb6506]/20 text-[#ecb612] px-2.5 py-0.5 rounded-md text-[11px] font-mono border border-[#eb6506]/30">Est. 2025</span>
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong>Eye &amp; Skin Care Hospital</strong> located at Indhira Nagar, Seelanaickenpatti, Salem is an independent center dedicated exclusively to <strong>Ophthalmology (Eye Care)</strong> and <strong>Dermatology &amp; Aesthetic Medicine (Skin Care)</strong>. Please note that this hospital is <em>completely distinct and unrelated</em> to Paavai ENT Hospital in Coimbatore.
            </p>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Hospital Info with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center border border-amber-300 shadow-md">
                <img
                  src="/img/logo.webp"
                  alt="Paavai Hospital Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white tracking-tight">
                  Paavai <span className="text-[#eb6506]">Hospital</span>
                </h3>
                <p className="text-xs text-[#ecb612] font-semibold">
                  Eye &amp; Skin Care Hospital • Est. 2025
                </p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Salem’s premier integrated hospital for modern Ophthalmology and Aesthetic Dermatology, delivering surgical precision, robotic UV-C sterilization, and compassionate patient care.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ecb612] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  T S No 89, Indhira Nagar, Seelanaickenpatti, Salem, Tamil Nadu – 636201
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ecb612] shrink-0" />
                <a href="tel:+918048053215" className="text-white hover:text-[#ecb612] transition-colors font-bold">
                  +91 80480 53215
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#eb6506] shrink-0" />
                <a href="tel:+919342790784" className="text-[#ecb612] hover:text-white transition-colors font-bold">
                  Direct Doctor: +91 93427 90784
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ecb612] shrink-0" />
                <a href="mailto:hospitalpaavai@gmail.com" className="text-slate-300 hover:text-[#ecb612] transition-colors">
                  hospitalpaavai@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Eye Care Department */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
              <Eye className="w-4 h-4 text-[#ecb612]" /> Ophthalmology
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/eye-care#cataract" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> Advanced Cataract Surgery (Phaco)
                </Link>
              </li>
              <li>
                <Link to="/eye-care#lasik" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> LASIK &amp; Refractive Suite
                </Link>
              </li>
              <li>
                <Link to="/eye-care#glaucoma" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> Glaucoma &amp; Applanation Tonometry
                </Link>
              </li>
              <li>
                <Link to="/eye-care#retina" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> Diabetic Retinopathy &amp; Retina Clinic
                </Link>
              </li>
              <li>
                <Link to="/eye-care#diagnostics" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> OCT, B-Scan &amp; FFA Imaging
                </Link>
              </li>
              <li>
                <Link to="/eye-care#dry-eye" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> Dry Eye &amp; Pediatric Care
                </Link>
              </li>
              <li>
                <Link to="/eye-care#opticals" className="hover:text-[#ecb612] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#eb6506]" /> In-House Opticals &amp; Frames Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Skin Care Department */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
              <Sparkles className="w-4 h-4 text-[#eb6506]" /> Skin &amp; Aesthetics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/skin-care#hydrafacial" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> Hydra Facial &amp; Photo Facial
                </Link>
              </li>
              <li>
                <Link to="/skin-care#hair-removal" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> Triple Wavelength Laser Hair Removal
                </Link>
              </li>
              <li>
                <Link to="/skin-care#pigmentation" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> Pigmentation &amp; Chemical Peels
                </Link>
              </li>
              <li>
                <Link to="/skin-care#gfc-prp" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> GFC Therapy &amp; PRP Hair Regrowth
                </Link>
              </li>
              <li>
                <Link to="/skin-care#botox" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> Botox &amp; Collagen Threads Lift
                </Link>
              </li>
              <li>
                <Link to="/skin-care#acne-scars" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> RF Microneedling &amp; Acne Scars
                </Link>
              </li>
              <li>
                <Link to="/skin-care#minor-surgery" className="hover:text-[#eb6506] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#ecb612]" /> Earlobe Repair &amp; Keloid Surgery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Actions & Timings */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              Hospital Hours
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300 pb-1 border-b border-stone-800/60">
                <span>Mon – Sat (OPD):</span>
                <span className="font-bold text-[#ecb612]">09:00 AM – 08:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pb-1 border-b border-stone-800/60">
                <span>Sunday:</span>
                <span className="font-semibold text-slate-400">Emergency &amp; Elective by Appt</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pb-1 border-b border-stone-800/60">
                <span>Pharmacy &amp; Optical:</span>
                <span className="font-semibold text-[#ecb612]">Ground Floor (Open Daily)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Eye Trauma Emergency:</span>
                <span className="font-bold text-[#eb6506]">24/7 Rapid Response</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="w-full bg-gradient-to-r from-[#ecb612] via-[#f59e0b] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all"
              >
                <Calendar className="w-4 h-4" /> Book Appointment Online
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2025–2026 Eye &amp; Skin Care Hospital, Seelanaickenpatti, Salem. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-amber-200 transition-colors">About Us</Link>
            <span>•</span>
            <Link to="/doctors" className="hover:text-amber-200 transition-colors">Our Doctors</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-200 transition-colors">Salem Location Map</Link>
            <span>•</span>
            <Link to="/lookup" className="hover:text-amber-200 transition-colors">Track Receipt</Link>
            <span>•</span>
            <Link to="/admin" className="text-[#ecb612] hover:underline font-semibold">Staff Dashboard</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
