import React from 'react';
import { 
  X, 
  Award, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DoctorModal({ doctor, onClose }) {
  if (!doctor) return null;

  const isEye = doctor.deptKey === 'eye' || doctor.department.includes('Ophthalmology');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-amber-200 my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 text-white relative bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b-4 border-[#eb6506]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/10 border-2 border-amber-400 shadow-lg shrink-0">
              <img
                src={doctor.image || (isEye ? '/img/building.webp' : '/img/doctor1.webp')}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = '/img/building.webp';
                }}
              />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ecb612]/20 text-xs font-bold text-[#ecb612] mb-1 border border-[#ecb612]/40">
                {isEye ? <Eye className="w-3.5 h-3.5 text-[#ecb612]" /> : <Sparkles className="w-3.5 h-3.5 text-[#eb6506]" />}
                <span>{doctor.department}</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                {doctor.name}
              </h3>
              <p className="text-sm text-amber-300 font-semibold">{doctor.title}</p>
              <p className="text-xs text-white/80 font-mono">{doctor.qualifications}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Key Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Experience</span>
              <span className="font-bold text-slate-800 text-sm">{doctor.experience || `${doctor.experienceYears} Years`}</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">OPD Room</span>
              <span className="font-bold text-slate-800 text-sm">{doctor.roomNumber || 'Suite 101'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] text-slate-500 block uppercase font-medium">Status</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available for OPD
              </span>
            </div>
          </div>

          {/* Bio Description */}
          {doctor.bio && (
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#eb6506]" /> Professional Profile
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
                {doctor.bio}
              </p>
            </div>
          )}

          {/* Clinical Specialties */}
          {doctor.specialties && doctor.specialties.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#eb6506]" /> Clinical Expertise &amp; Focus Areas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doctor.specialties.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#ecb612] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Memberships */}
          {doctor.memberships && doctor.memberships.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-2">
                Professional Affiliations &amp; Fellowships
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctor.memberships.map((mem, idx) => (
                  <span key={idx} className="text-xs bg-amber-50 text-amber-950 px-3 py-1.5 rounded-xl font-medium border border-amber-200">
                    {mem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timings & Direct Contact */}
          <div className="bg-stone-950 text-white p-4 sm:p-5 rounded-2xl space-y-3 border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ecb612] shrink-0" />
                <span className="text-slate-300">Days: {doctor.consultationDays || 'Monday - Saturday'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ecb612] shrink-0" />
                <span className="text-slate-300">Hours: {doctor.consultationHours || '10:00 AM - 07:30 PM'}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              <div className="flex items-center gap-4">
                <a href={`tel:${doctor.directMobile || doctor.phone}`} className="flex items-center gap-1.5 text-amber-300 hover:text-white font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#eb6506]" /> {doctor.directMobile || doctor.phone}
                </a>
                <a href={`mailto:${doctor.email || 'hospitalpaavai@gmail.com'}`} className="flex items-center gap-1.5 text-slate-400 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-[#ecb612]" /> {doctor.email || 'hospitalpaavai@gmail.com'}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 font-semibold text-xs transition-colors"
          >
            Close Profile
          </button>
          <Link
            to={`/book-appointment?doctor=${encodeURIComponent(doctor.name)}&dept=${doctor.deptKey || 'skin'}`}
            onClick={onClose}
            className="w-full sm:w-auto font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl text-white shadow-md flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation with {doctor.name.split(' ')[0]} {doctor.name.split(' ')[1]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
