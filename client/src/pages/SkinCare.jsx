import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Flame, 
  Droplet, 
  Scissors, 
  Award, 
  ArrowRight
} from 'lucide-react';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import EmergencyBar from '../components/EmergencyBar';

export default function SkinCare() {
  const [services, setServices] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkinServices() {
      try {
        const res = await api.get('/services?deptKey=skin');
        if (res.data?.data) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching skin services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSkinServices();
  }, []);

  const categories = ['All', 'Skin Care', 'Aesthetic Treatments', 'Hair Treatments', 'Minor Procedures'];

  const filteredServices = filterCategory === 'All' 
    ? services 
    : services.filter(s => s.category === filterCategory);

  return (
    <div className="space-y-16 sm:space-y-20">
      <EmergencyBar />

      {/* Skin Care Hero Header */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-16 sm:py-24 relative overflow-hidden border-b-4 border-[#eb6506]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#eb6506]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#eb6506]" /> Dermatology &amp; Aesthetic Medicine • Paavai Hospital
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Evidence-Based Dermatology &amp; <br />
              <span className="bg-gradient-to-r from-[#eb6506] via-[#f59e0b] to-[#ecb612] bg-clip-text text-transparent">
                Advanced Aesthetic Medicine
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Led by FRGUHS Aesthetic Fellowship trained dermatologists, we provide scientifically validated clinical treatments for stubborn pigmentation, acne scars, unwanted hair, facial rejuvenation, and advanced biological GFC &amp; PRP hair regrowth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/book-appointment?dept=skin"
                className="bg-gradient-to-r from-[#eb6506] to-[#ecb612] hover:from-[#d85800] hover:to-[#dfa908] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Skin Consultation</span>
              </Link>

              <a
                href="tel:+919342790784"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#ecb612]" />
                <span>Doctor Helpline: 93427 90784</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Structured Category Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Categorized Clinical Protocols
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Comprehensive Skin, Hair &amp; Aesthetic Care
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Organized into four dedicated clinical wings to give your skin and hair the exact scientific attention they need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Skin Care */}
          <div 
            onClick={() => setFilterCategory('Skin Care')}
            className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#eb6506] transition-colors">
              1. Clinical Skin Care
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medical protocols for melasma, chemical peels, cryotherapy, chronic allergies, eczema, psoriasis, and active cystic acne.
            </p>
            <div className="text-xs font-bold text-[#eb6506] flex items-center gap-1 pt-1">
              <span>View Treatments</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Category 2: Aesthetic Treatments */}
          <div 
            onClick={() => setFilterCategory('Aesthetic Treatments')}
            className="p-6 rounded-3xl bg-white border border-orange-100 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#eb6506] transition-colors">
              2. Aesthetic Medicine
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              HydraFacial glow, Photo Facial IPL, triple diode laser hair removal, Q-switched tattoo removal, Botox, and collagen thread lifts.
            </p>
            <div className="text-xs font-bold text-[#eb6506] flex items-center gap-1 pt-1">
              <span>View Treatments</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Category 3: Hair Treatments */}
          <div 
            onClick={() => setFilterCategory('Hair Treatments')}
            className="p-6 rounded-3xl bg-white border border-amber-100 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#eb6506] transition-colors">
              3. Hair Restoration
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Next-generation GFC growth factor concentrate therapy, autologous PRP scalp therapy, and advanced FUE hair transplantation.
            </p>
            <div className="text-xs font-bold text-[#eb6506] flex items-center gap-1 pt-1">
              <span>View Treatments</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Category 4: Minor Procedures */}
          <div 
            onClick={() => setFilterCategory('Minor Procedures')}
            className="p-6 rounded-3xl bg-white border border-orange-100 shadow-xs hover:shadow-xl hover:border-orange-300 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#eb6506] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#eb6506] transition-colors">
              4. Minor Dermatosurgery
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Radiofrequency microneedling for acne scars, aesthetic sutureless earlobe repair, ingrown toenail surgery, and keloid excision.
            </p>
            <div className="text-xs font-bold text-[#eb6506] flex items-center gap-1 pt-1">
              <span>View Treatments</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* Doctor Lead Spotlight: Dr. Paavai Senthil */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white overflow-hidden shadow-xl border border-amber-500/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-56 sm:w-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#ecb612]/30 bg-white/5">
                <img
                  src="/img/doctor1.webp"
                  alt="Dr. Paavai Senthil - Dermatologist & Aesthetic Physician"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eb6506]/20 text-orange-300 text-xs font-bold uppercase tracking-wider border border-[#eb6506]/30">
                <Award className="w-4 h-4 text-[#ecb612]" /> Chief Aesthetic Physician
              </div>

              <h3 className="font-display text-3xl font-bold text-white">
                Dr. Paavai Senthil
              </h3>
              <p className="text-[#ecb612] font-mono text-sm font-semibold">
                MBBS, MD(DVL), FRGUHS (Fellowship in Aesthetic Dermatology)
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                With specialized fellowship credentials from Rajiv Gandhi University of Health Sciences (FRGUHS), Dr. Paavai Senthil has 6+ years of clinical excellence in non-surgical anti-aging, acne scar revision, and advanced laser aesthetics.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-lg">IADVL Member</span>
                <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-lg">ACSI Member</span>
                <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-lg">INSTED Member</span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/book-appointment?doctor=Dr.+Paavai+Senthil&dept=skin"
                  className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Dr. Paavai</span>
                </Link>

                <a
                  href="tel:9342790784"
                  className="text-amber-300 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#eb6506]" />
                  <span>Direct Mobile: 93427 90784</span>
                </a>
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
              Skin, Hair &amp; Aesthetic Treatments
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Showing {filterCategory === 'All' ? 'all' : filterCategory} clinical procedures.
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
                    ? 'bg-gradient-to-r from-[#eb6506] to-[#ecb612] text-white shadow-xs'
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

    </div>
  );
}
