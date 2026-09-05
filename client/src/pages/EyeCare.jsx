import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Calendar, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Scan, 
  Radio, 
  Camera, 
  Gauge, 
  Glasses, 
  ArrowRight
} from 'lucide-react';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import EmergencyBar from '../components/EmergencyBar';

export default function EyeCare() {
  const [services, setServices] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEyeServices() {
      try {
        const res = await api.get('/services?deptKey=eye');
        if (res.data?.data) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching eye services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEyeServices();
  }, []);

  const categories = ['All', 'Surgical Ophthalmology', 'Diagnostic Ophthalmology', 'Clinical Ophthalmology', 'Retina Care', 'Vision & Optical', 'Emergency Eye Care'];

  const filteredServices = filterCategory === 'All' 
    ? services 
    : services.filter(s => s.category === filterCategory);

  return (
    <div className="space-y-16 sm:space-y-20">
      <EmergencyBar />

      {/* Ophthalmology Hero Header */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-16 sm:py-24 relative overflow-hidden border-b-4 border-[#ecb612]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ecb612]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4 text-[#ecb612]" /> Ophthalmology Department • Paavai Hospital Salem
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Advanced Ophthalmology, <br />
              <span className="bg-gradient-to-r from-[#ecb612] via-[#f59e0b] to-[#eb6506] bg-clip-text text-transparent">
                Micro-Surgeries &amp; Precision Diagnostics
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Equipped with world-class optical biometry, high-definition Spectral OCT, B-Scan ocular ultrasound, and advanced sutureless phaco cataract technology, we protect and restore your clear vision with clinical excellence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/book-appointment?dept=eye"
                className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Eye Checkup</span>
              </Link>

              <a
                href="tel:+918048053215"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#ecb612]" />
                <span>Emergency Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Suites Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Advanced Diagnostic Infrastructure
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            High-Precision Ophthalmic Imaging &amp; Screening
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Accurate diagnosis is the foundation of successful eye treatment. Our Salem facility houses full diagnostic imaging suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* OCT Card */}
          <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold">
              <Scan className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Spectral-Domain OCT
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              3D cross-sectional micro-imaging of retinal layers, macula, and optic nerve for glaucoma and diabetic retinopathy detection.
            </p>
          </div>

          {/* B-Scan Card */}
          <div className="p-6 rounded-3xl bg-white border border-orange-100 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              B-Scan Ocular Ultrasound
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-frequency acoustic diagnostic evaluation of posterior segment behind dense mature cataracts or vitreous opacity.
            </p>
          </div>

          {/* FFA Card */}
          <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Fundus Angiography (FFA)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamic fluorescent imaging of retinal micro-vascular circulation to detect leakage, neo-vascularization, and vein occlusions.
            </p>
          </div>

          {/* Tonometry Card */}
          <div className="p-6 rounded-3xl bg-white border border-orange-100 shadow-xs hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold">
              <Gauge className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Applanation Tonometry
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Goldmann gold-standard accurate intraocular pressure measurement for precise glaucoma diagnosis and progression tracking.
            </p>
          </div>

        </div>
      </section>

      {/* Optical Boutique Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 text-white overflow-hidden shadow-xl border border-amber-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecb612]/20 text-[#ecb612] text-xs font-bold uppercase tracking-wider border border-[#ecb612]/30">
                <Glasses className="w-4 h-4" /> Ground Floor • In-House Facility
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                In-House Opticals &amp; Precision Eyewear Boutique
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Enjoy seamless continuity from your eye doctor’s prescription directly to high-index lenses and stylish designer frames. We provide blue-light filters, anti-glare progressives, bifocals, and contact lenses fitted by experienced optometrists.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-amber-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612]" />
                  <span>Digital Pupillometry Fitting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612]" />
                  <span>Computer Blue-Blocker Lenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612]" />
                  <span>Designer &amp; Lightweight Frames</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ecb612]" />
                  <span>Specialized Pediatric Eyewear</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 lg:p-8 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/20 max-w-sm">
                <img
                  src="/img/spec store.webp"
                  alt="In-house optical and spectacle boutique at Paavai Hospital Salem"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid with Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
              All Eye Care Treatments &amp; Clinics
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select a category to filter ophthalmic treatments and diagnostic examinations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id || service.name} service={service} />
          ))}
        </div>
      </section>

      {/* Eye Emergency Trauma Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#eb6506] text-white rounded-2xl shrink-0 shadow-md">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-orange-950">
                Immediate Eye Trauma &amp; Injury Protocol
              </h3>
              <p className="text-xs sm:text-sm text-orange-900 max-w-xl leading-relaxed">
                Accidental metal sparks, chemical splash, sudden acute loss of vision, or corneal foreign bodies require instant attention. Do not rub the eye. Call our 24/7 hotline or visit directly.
              </p>
            </div>
          </div>

          <a
            href="tel:+918048053215"
            className="bg-[#eb6506] hover:bg-[#d85800] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Emergency: +91 80480 53215</span>
          </a>
        </div>
      </section>

    </div>
  );
}
