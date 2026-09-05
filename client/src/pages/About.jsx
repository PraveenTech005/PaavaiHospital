import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  AlertCircle, 
  HeartHandshake
} from 'lucide-react';
import EmergencyBar from '../components/EmergencyBar';

import { HOSPITAL_CONFIG } from '../utils/config';

export default function About() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <EmergencyBar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-16 sm:py-24 relative overflow-hidden border-b-4 border-[#ecb612]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ecb612]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Building className="w-4 h-4 text-[#ecb612]" /> Established 2025 • Seelanaickenpatti, Salem
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              About Eye &amp; Skin Care Hospital, Salem
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Founded in 2025, <strong>Paavai Hospital</strong> is an independent healthcare institution dedicated exclusively to advancing Ophthalmology and Aesthetic Dermatology with modern technology, robotic sterilization, and ethical clinical practices.
            </p>
          </div>
        </div>
      </section>

      {/* Distinction & Clarification Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 border-2 border-amber-300/90 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-sm">
          <div className="p-3 bg-[#eb6506] text-white rounded-2xl shrink-0 shadow-md">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-lg sm:text-xl text-amber-950">
              Important Patient Notice: Facility Distinction
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Eye &amp; Skin Care Hospital</strong> located at <em>T S No 89, Indhira Nagar, Seelanaickenpatti, Salem – 636201 (Established 2025)</em> is a specialized, independent hospital focusing exclusively on <strong>Eye Care and Skin/Aesthetic Care</strong>. This institution is <strong>completely distinct and unrelated to Paavai ENT Hospital in Coimbatore</strong>. Please ensure your appointments and inquiries are directed to our Salem hospital desk.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Mission & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-amber-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Our Ophthalmology Vision
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver world-class vision preservation and restoration through sutureless micro-incision cataract surgery, early glaucoma screening with applanation tonometry, and precision spectral OCT imaging — making premier ophthalmic care accessible to patients across Salem and neighboring districts.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#eb6506]">
              <CheckCircle2 className="w-4 h-4" /> Comprehensive Retinal, Cataract &amp; Cornea Care
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-orange-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Our Aesthetic Dermatology Mission
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To combine scientific dermatology with gentle aesthetic artistry. Led by FRGUHS Fellowship trained specialists, we provide doctor-administered anti-aging injectables, HydraFacials, safe laser treatments for Indian skin tones, and biological GFC hair regrowth.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#eb6506]">
              <CheckCircle2 className="w-4 h-4" /> Evidence-Based, Doctor-Administered Aesthetics
            </div>
          </div>

        </div>
      </section>

      {/* Advanced Cleanliness & Robotic Disinfection Showcase */}
      <section className="bg-stone-950 text-white py-16 rounded-3xl mx-4 sm:mx-6 lg:px-8 shadow-xl border border-amber-500/30">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#ecb612] uppercase tracking-widest bg-amber-950 px-3.5 py-1 rounded-full border border-amber-800">
              Infection Control Standards
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Hospital Cleanliness &amp; Robotic Sterilization
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We uphold clinical hygiene protocols using autonomous UV-C disinfection robots that eliminate 99.99% of pathogens in our operation theatres and laser suites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 max-w-xs bg-black">
                <img
                  src="/img/advanced_uv_disinfection_technology.png"
                  alt="UV Disinfection System at Paavai Hospital Salem"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ecb612]" /> Continuous 360-Degree UV-C Decontamination
                </h4>
                <p className="text-slate-400 text-xs">
                  Surgical suites are irradiated between procedures to prevent cross-contamination and ensure sterile environments for delicate micro-eye surgery and hair transplantation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#eb6506]" /> Strict Single-Use Consumables
                </h4>
                <p className="text-slate-400 text-xs">
                  All surgical blades, micro-needles, cannula tips, and GFC/PRP collection kits are individually sealed and 100% single-use.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#ecb612]" /> Integrated Ground Floor Amenities
                </h4>
                <p className="text-slate-400 text-xs">
                  In-house pharmacy and eyewear store ensure you don't need to travel across town for prescribed eye drops or specialty lenses.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facilities Visual Tour */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Our Hospital Facilities
          </h2>
          <p className="text-slate-600 text-sm">
            Purpose-built infrastructure designed for patient convenience, privacy, and fast clinical workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm space-y-3">
            <img src="/img/building.webp" alt="Main Hospital Building Salem" className="w-full h-56 object-cover" />
            <div className="p-5 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Main Hospital Campus</h4>
              <p className="text-xs text-slate-500">T S No 89, Indhira Nagar, Seelanaickenpatti, Salem – 636201.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm space-y-3">
            <img src="/img/pharmacy.webp" alt="In-house Pharmacy" className="w-full h-56 object-cover" />
            <div className="p-5 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">In-House Medical Pharmacy</h4>
              <p className="text-xs text-slate-500">Ophthalmic drops, dermatology formulations, and sunscreens.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm space-y-3">
            <img src="/img/spec store.webp" alt="Optical Eyewear Store" className="w-full h-56 object-cover" />
            <div className="p-5 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Optical &amp; Eyewear Store</h4>
              <p className="text-xs text-slate-500">Precision lens fitting, blue-light blockers, and frame selection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Details & Contact Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/50 border border-amber-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Connect with Our Hospital Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Have questions regarding cataract evaluation, LASIK consultation, HydraFacial sessions, or appointment reservations?
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#ecb612]" /> {HOSPITAL_CONFIG.phone}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#eb6506]" /> Direct: {HOSPITAL_CONFIG.mobile}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#eb6506]" /> {HOSPITAL_CONFIG.email}</span>
            </div>
          </div>

          <Link
            to="/book-appointment"
            className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-md shrink-0 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
        </div>
      </section>

    </div>
  );
}
