import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DoctorModal from './DoctorModal';

export default function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = useState(false);

  if (!doctor) return null;

  const isEye = doctor.deptKey === 'eye' || (doctor.department && doctor.department.includes('Ophthalmology'));

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
        
        {/* Top Image Banner */}
        <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
          <img
            src={doctor.image || (isEye ? '/img/building.webp' : '/img/doctor1.webp')}
            alt={doctor.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/img/building.webp';
            }}
          />
          
          {/* Department Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md bg-stone-950/90 text-amber-200 border border-amber-500/30">
              {isEye ? <Eye className="w-3.5 h-3.5 text-[#ecb612]" /> : <Sparkles className="w-3.5 h-3.5 text-[#eb6506]" />}
              <span>{isEye ? 'Ophthalmology' : 'Dermatology & Aesthetic'}</span>
            </span>
          </div>

          {/* Experience Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/95 text-slate-800 font-bold px-2.5 py-1 rounded-full text-xs shadow-md border border-amber-100 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#eb6506]" />
              <span>{doctor.experience || `${doctor.experienceYears || 6}+ Yrs`}</span>
            </span>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex items-end p-4">
            <div className="text-white">
              <p className="text-xs font-mono text-amber-300 font-semibold tracking-wide">
                {doctor.qualifications}
              </p>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          
          <div className="space-y-2">
            <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-[#eb6506] transition-colors">
              {doctor.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#eb6506]">
              {doctor.title}
            </p>
            
            {/* Memberships or key specialties */}
            {doctor.memberships && doctor.memberships.length > 0 ? (
              <div className="pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Affiliations:
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {doctor.memberships.join(' • ')}
                </p>
              </div>
            ) : doctor.specialties && doctor.specialties.length > 0 ? (
              <div className="pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Key Focus:
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {doctor.specialties.slice(0, 3).join(', ')}
                </p>
              </div>
            ) : null}

            {/* Direct Contact Phone */}
            {doctor.directMobile && (
              <div className="pt-2 flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Direct Mobile:</span>
                <a
                  href={`tel:${doctor.directMobile.replace(/\s+/g, '')}`}
                  className="font-bold text-[#eb6506] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#eb6506]" />
                  <span>{doctor.directMobile}</span>
                </a>
              </div>
            )}
          </div>

          {/* Consultation Schedule Info */}
          <div className="bg-amber-50/40 p-3 rounded-2xl border border-amber-100 text-xs space-y-1 text-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-500">Days:</span>
              <span className="font-bold text-slate-800">{doctor.consultationDays || 'Mon - Sat'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-500">Hours:</span>
              <span className="font-bold text-slate-800 truncate max-w-[170px]">{doctor.consultationHours || '10:00 AM - 07:30 PM'}</span>
            </div>
          </div>

          {/* Card Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-amber-100/60 transition-colors text-center"
            >
              View Profile
            </button>

            <Link
              to={`/book-appointment?doctor=${encodeURIComponent(doctor.name)}&dept=${doctor.deptKey || 'skin'}`}
              className="px-3 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xs transition-all text-center flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Modal View */}
      {showModal && (
        <DoctorModal 
          doctor={doctor} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
