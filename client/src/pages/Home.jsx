import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Sparkles, 
  Calendar, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Zap, 
  ChevronRight, 
  Star, 
  Building, 
  Pill, 
  Glasses, 
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import api from '../utils/api';
import EmergencyBar from '../components/EmergencyBar';
import DoctorCard from '../components/DoctorCard';
import ServiceCard from '../components/ServiceCard';
import { HOSPITAL_CONFIG } from '../utils/config';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [docRes, srvRes] = await Promise.all([
          api.get('/doctors'),
          api.get('/services?featured=true')
        ]);
        if (docRes.data?.data) setDoctors(docRes.data.data);
        if (srvRes.data?.data) setFeaturedServices(srvRes.data.data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Emergency Strip */}
      <EmergencyBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20">
        {/* Background glow effects with yellow (#ecb612) and orange (#eb6506) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ecb612]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#eb6506]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Coimbatore ENT Distinction Note */}
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-xs text-amber-950 font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#eb6506] animate-ping"></span>
            <span><strong>Salem Facility:</strong> Dedicated Eye &amp; Skin Care Hospital • Seelanaickenpatti (Est. 2025)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-100/80 px-3 py-1 rounded-lg border border-amber-200">
                  Integrative Ophthalmology &amp; Aesthetic Dermatology
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                  Vision Clarity &amp; <br />
                  <span className="bg-gradient-to-r from-[#ecb612] via-[#eb6506] to-[#ea580c] bg-clip-text text-transparent">
                    Radiant Skin Health
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Welcome to <strong>Paavai Hospital</strong>, Salem’s premier multi-specialty center established in 2025 at Seelanaickenpatti. Experience sutureless phaco cataract surgery, advanced retinal diagnostics, HydraFacial, laser therapies, and GFC hair restoration under one roof.
              </p>

              {/* Quick Feature Pill Badges */}
              <div className="flex flex-wrap gap-2.5 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612]" />
                  <span>Sutureless Phaco &amp; LASIK Suite</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-orange-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#eb6506]" />
                  <span>HydraFacial &amp; Laser Aesthetics</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#eb6506]" />
                  <span>100% Robotic UV-C Disinfected OTs</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/book-appointment"
                  className="bg-gradient-to-r from-[#ecb612] via-[#f59e0b] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-black text-base px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Book Consultation</span>
                  <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${HOSPITAL_CONFIG.phoneClean}`}
                  className="bg-white hover:bg-amber-50/50 text-slate-900 font-bold text-base px-6 py-4 rounded-2xl border-2 border-amber-200 shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#eb6506] animate-pulse" />
                  <span>Call: {HOSPITAL_CONFIG.phone}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-amber-200/80">
                <div>
                  <p className="font-display font-black text-2xl text-[#eb6506]">2025</p>
                  <p className="text-xs text-slate-500 font-medium">Established in Salem</p>
                </div>
                <div>
                  <p className="font-display font-black text-2xl text-slate-900">2 Core</p>
                  <p className="text-xs text-slate-500 font-medium">Eye &amp; Skin Depts</p>
                </div>
                <div>
                  <p className="font-display font-black text-2xl text-[#ecb612]">6+ Yrs</p>
                  <p className="text-xs text-slate-500 font-medium">Specialist Doctors</p>
                </div>
              </div>

            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Building Frame */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative">
                  <img
                    src="/img/building.webp"
                    alt="Paavai Hospital Building in Seelanaickenpatti, Salem"
                    className="w-full h-[420px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm">
                        <Building className="w-3.5 h-3.5" /> Paavai Hospital Facility
                      </div>
                      <p className="text-sm font-bold text-white">
                        Indhira Nagar, Seelanaickenpatti, Salem
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Doctor Preview Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-amber-100 flex items-center gap-3 animate-in slide-in-from-bottom-6 max-w-xs">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-amber-50 border border-amber-200 shrink-0">
                    <img
                      src="/img/doctor1.webp"
                      alt="Dr. Paavai Senthil"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Dr. Paavai Senthil</p>
                    <p className="text-[#eb6506] font-semibold text-[11px]">Dermatology &amp; Aesthetics</p>
                    <p className="text-slate-400 text-[10px]">MD(DVL), FRGUHS • 6 Yrs Exp</p>
                  </div>
                </div>

                {/* Floating UV Disinfection Tag */}
                <div className="absolute -top-4 -right-4 bg-stone-950 text-white rounded-2xl p-3 shadow-xl border border-amber-500/30 flex items-center gap-2.5 max-w-[200px]">
                  <div className="p-1.5 rounded-lg bg-[#ecb612]/20 text-[#ecb612]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white">UV-C Sterilized</p>
                    <p className="text-amber-300 text-[10px]">Zero Infection Protocol</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Dual-Specialty Focus Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Center of Clinical Excellence
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Two Specialized Departments. One Trusted Hospital.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Paavai Hospital brings together world-class Ophthalmology for complete eye health and evidence-based Aesthetic Dermatology for radiant skin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Department 1: Eye Care */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-stone-900 via-stone-950 to-slate-950 text-white relative overflow-hidden shadow-xl group border border-amber-500/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ecb612]/10 rounded-full blur-3xl group-hover:bg-[#ecb612]/20 transition-all pointer-events-none" />
            
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#ecb612]/20 border border-[#ecb612]/40 flex items-center justify-center text-[#ecb612] shadow-inner">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="bg-[#ecb612]/10 text-[#ecb612] font-mono text-xs font-bold px-3 py-1 rounded-full border border-[#ecb612]/30">
                  Ophthalmology Suite
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Ophthalmology &amp; Eye Care
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Advanced diagnostic and micro-surgical care for cataracts, glaucoma, retina disorders, cornea health, and precision spectacle dispensing.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-amber-100">
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612] shrink-0" />
                  <span>Phaco Cataract Surgery</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612] shrink-0" />
                  <span>OCT &amp; B-Scan Diagnostic</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612] shrink-0" />
                  <span>Diabetic Retinopathy</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612] shrink-0" />
                  <span>In-House Opticals Store</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/eye-care"
                  className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 group-hover:gap-3"
                >
                  <span>Explore Eye Care</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/book-appointment?dept=eye"
                  className="text-white hover:text-amber-300 text-xs sm:text-sm font-semibold underline underline-offset-4"
                >
                  Book Eye Checkup
                </Link>
              </div>
            </div>
          </div>

          {/* Department 2: Skin Care & Aesthetics */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-stone-900 via-stone-950 to-slate-950 text-white relative overflow-hidden shadow-xl group border border-[#eb6506]/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#eb6506]/10 rounded-full blur-3xl group-hover:bg-[#eb6506]/20 transition-all pointer-events-none" />
            
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#eb6506]/20 border border-[#eb6506]/40 flex items-center justify-center text-[#eb6506] shadow-inner">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="bg-[#eb6506]/10 text-orange-300 font-mono text-xs font-bold px-3 py-1 rounded-full border border-[#eb6506]/30">
                  Dermatology &amp; Aesthetics
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Dermatology &amp; Skin Care
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Personalized skin rejuvenation, medical HydraFacial, laser hair removal, acne scar revision, and advanced GFC &amp; PRP hair regrowth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-orange-100">
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0" />
                  <span>HydraFacial &amp; Glow Peels</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0" />
                  <span>Triple Laser Hair Removal</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0" />
                  <span>GFC &amp; PRP Hair Therapy</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0" />
                  <span>Botox &amp; Collagen Threads</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/skin-care"
                  className="bg-gradient-to-r from-[#eb6506] to-[#ecb612] hover:from-[#d85800] hover:to-[#dfa908] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 group-hover:gap-3"
                >
                  <span>Explore Skin &amp; Aesthetic</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/book-appointment?dept=skin"
                  className="text-white hover:text-amber-300 text-xs sm:text-sm font-semibold underline underline-offset-4"
                >
                  Book Skin Consultation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Advanced Technology & UV-C Disinfection Showcase */}
      <section className="bg-stone-950 text-white py-16 sm:py-20 relative overflow-hidden border-y border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ecb612] bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
                Hospital Hygiene &amp; Surgical Precision
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Cutting-Edge Diagnostics &amp; Robotic UV-C Disinfection
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Patient safety is our foremost commitment. Our operation theatres, procedure rooms, and diagnostic suites are sterilized with autonomous <strong>Advanced UV-C Disinfection Technology</strong> to ensure near-zero bacterial and viral contamination.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                  <ShieldCheck className="w-5 h-5 text-[#ecb612] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Robotic UV-C Disinfection Protocol</h4>
                    <p className="text-xs text-slate-400">Continuous 360-degree germicidal irradiation of operating suites between surgical procedures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                  <Activity className="w-5 h-5 text-[#eb6506] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">High-Resolution Spectral OCT &amp; B-Scan</h4>
                    <p className="text-xs text-slate-400">Micrometer-level retinal layer tomography and posterior segment acoustic ultrasonography.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800">
                  <Zap className="w-5 h-5 text-[#ecb612] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Medical Hydro-Dermabrasion &amp; Diode Lasers</h4>
                    <p className="text-xs text-slate-400">US-FDA approved aesthetic energy platforms with active epidermal contact cooling.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 hover:text-white"
                >
                  <span>Learn about our sterilization standards</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right UV Technology Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/30 bg-slate-950">
                <img
                  src="/img/advanced_uv_disinfection_technology.png"
                  alt="Advanced UV Disinfection Technology at Paavai Hospital"
                  className="w-full h-[450px] object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 text-center">
                  <span className="text-[11px] font-mono text-[#ecb612] uppercase tracking-widest font-bold block">
                    UV-C Disinfection Robot
                  </span>
                  <p className="text-xs text-slate-300 font-medium">
                    Ensuring sterile surgical environments for eye &amp; dermatosurgery
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Expert Medical Specialists
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Meet Our Doctors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Consult with board-certified dermatologists and experienced ophthalmologists dedicated to ethical, transparent medical care.
            </p>
          </div>

          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#eb6506] hover:text-[#d85800] transition-colors"
          >
            <span>View All Doctors &amp; Timings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id || doctor.name} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Featured Treatments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Specialized Procedures
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Treatments &amp; Diagnostics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              From advanced cataract phacoemulsification and OCT scans to HydraFacial and GFC hair therapy.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#eb6506] hover:text-[#d85800] transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service._id || service.name} service={service} />
          ))}
        </div>
      </section>

      {/* Facilities & Infrastructure Tour */}
      <section className="bg-amber-50/40 py-16 sm:py-20 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-white px-3 py-1 rounded-full border border-amber-200">
              Modern Campus &amp; Amenities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              State-of-the-Art Hospital Infrastructure
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Conveniently located on the main road in Seelanaickenpatti, Salem with complete in-house diagnostic, optical, and pharmaceutical facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Facility 1: Building */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-amber-100 group">
              <div className="h-56 overflow-hidden bg-slate-900">
                <img
                  src="/img/building.webp"
                  alt="Hospital Exterior Seelanaickenpatti Salem"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[#eb6506] font-bold text-xs uppercase tracking-wider">
                  <Building className="w-4 h-4 text-[#ecb612]" /> Multi-Story Campus
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Dedicated Eye &amp; Skin Facility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A four-story purpose-built hospital featuring laminar-flow modular OTs, outpatient suites, and parking in Seelanaickenpatti.
                </p>
              </div>
            </div>

            {/* Facility 2: Pharmacy */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-amber-100 group">
              <div className="h-56 overflow-hidden bg-slate-900">
                <img
                  src="/img/pharmacy.webp"
                  alt="In-house Pharmacy at Paavai Hospital"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[#eb6506] font-bold text-xs uppercase tracking-wider">
                  <Pill className="w-4 h-4 text-[#eb6506]" /> In-House Pharmacy
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Specialized Eye &amp; Derm Pharmacy
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Stocking authentic ophthalmic formulations, preservative-free eye lubricants, sunscreen formulations, and dermatological serums.
                </p>
              </div>
            </div>

            {/* Facility 3: Optical Store */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-amber-100 group">
              <div className="h-56 overflow-hidden bg-slate-900">
                <img
                  src="/img/spec store.webp"
                  alt="In-house Optical and Eyewear Boutique"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[#eb6506] font-bold text-xs uppercase tracking-wider">
                  <Glasses className="w-4 h-4 text-[#ecb612]" /> In-House Opticals
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Spectacle &amp; Lens Center
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Wide range of designer frames, anti-glare blue-light blocker lenses, progressive lenses, and personalized pupillometer measurements.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us & Ethical Care */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              The Paavai Difference
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Ethical Healthcare Built on Trust &amp; Science
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe in honest, transparent medical recommendations. No unnecessary procedures, no hidden costs, and evidence-backed clinical protocols tailored to your unique biology.
            </p>
            
            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Visit Today</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Transparent Diagnostics</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear diagnostic reports with OCT and photographic evidence shared directly with patients before proposing treatment plans.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-orange-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Doctor-Administered Aesthetics</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All aesthetic injectables, botox, chemical peels, and laser treatments are administered directly by qualified MD dermatologists.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#eb6506] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Minimal Wait Times</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our digital token reservation system ensures timely consultations and smooth slot transitions for working professionals and families.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-2xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Convenient Salem Connectivity</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Located near Seelanaickenpatti Bypass with direct arterial connectivity from Namakkal, Rasipuram, Attur, and Salem Old Bus Stand.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Salem Location & Map CTA Strip */}
      <section className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white py-14 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl border border-amber-500/30">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <span className="bg-[#ecb612]/20 text-[#ecb612] text-xs font-mono font-bold px-3.5 py-1 rounded-full border border-[#ecb612]/30">
            Visit Us in Seelanaickenpatti, Salem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Prioritize Your Vision &amp; Skin Health?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Book an appointment online in under 60 seconds to receive your instant digital pass with doctor, slot, and token details.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book-appointment"
              className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now</span>
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#ecb612]" />
              <span>Get Hospital Directions</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
