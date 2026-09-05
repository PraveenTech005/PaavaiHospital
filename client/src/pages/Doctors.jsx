import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Eye, 
  Sparkles
} from 'lucide-react';
import api from '../utils/api';
import DoctorCard from '../components/DoctorCard';
import EmergencyBar from '../components/EmergencyBar';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await api.get('/doctors');
        if (res.data?.data) {
          setDoctors(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filteredDoctors = selectedDept === 'All'
    ? doctors
    : selectedDept === 'eye'
    ? doctors.filter(d => d.deptKey === 'eye' || d.department.includes('Ophthalmology'))
    : doctors.filter(d => d.deptKey === 'skin' || d.department.includes('Dermatology'));

  return (
    <div className="space-y-16 sm:space-y-20">
      <EmergencyBar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-14 sm:py-20 border-b-4 border-[#ecb612]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#ecb612] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800">
            Medical Faculty &amp; Consultants
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Doctors &amp; Specialists
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Meet the board-certified specialists heading our Ophthalmology (Eye Care) and Dermatology &amp; Aesthetic Medicine departments at Seelanaickenpatti, Salem.
          </p>

          {/* Department Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedDept('All')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDept === 'All'
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white shadow-md'
                  : 'bg-stone-900 text-slate-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              All Specialists ({doctors.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('skin')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDept === 'skin'
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white shadow-md'
                  : 'bg-stone-900 text-slate-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Dermatology &amp; Aesthetics
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('eye')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDept === 'eye'
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white shadow-md'
                  : 'bg-stone-900 text-slate-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Ophthalmology
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc._id || doc.name} doctor={doc} />
          ))}
        </div>
      </section>

      {/* Doctor Qualifications & Ethical Care Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/40 border border-amber-200 rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Why Patients Trust Our Medical Specialists
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every consultation at Paavai Hospital is conducted directly by qualified medical doctors holding recognized post-graduate MD / MS degrees and specialized clinical fellowships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
              <span className="text-[#eb6506] font-bold text-xs uppercase block">Accredited Memberships</span>
              <p className="text-xs text-slate-700">Members of national and international medical bodies including IADVL, ACSI, INSTED, AIOS, and VRSI.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
              <span className="text-[#ecb612] font-bold text-xs uppercase block">Transparent Protocols</span>
              <p className="text-xs text-slate-700">Detailed pre-procedure explanation, anticipated outcomes, and zero hidden medication markups.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
              <span className="text-[#eb6506] font-bold text-xs uppercase block">Direct Accessibility</span>
              <p className="text-xs text-slate-700">Direct mobile helpline available for post-treatment clarifications and urgent medical follow-ups.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
