import React from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Cpu, 
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceModal({ service, onClose }) {
  if (!service) return null;

  const isEye = service.deptKey === 'eye' || service.department === 'Eye Care';

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

          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ecb612]/20 text-xs font-bold uppercase tracking-wider text-[#ecb612] border border-[#ecb612]/40">
                {service.department}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-medium text-slate-300">
                {service.category}
              </span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              {service.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Detailed Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#eb6506]" /> Clinical Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ecb612]" /> Key Clinical Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suitable for */}
          {service.suitableFor && service.suitableFor.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-2">
                Recommended For
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.suitableFor.map((item, idx) => (
                  <span key={idx} className="text-xs bg-amber-50 text-amber-900 px-3 py-1 rounded-xl border border-amber-200 font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Equipment and Prep Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {service.equipmentUsed && (
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#eb6506]" /> Technology / Equipment
                </span>
                <p className="text-slate-700">{service.equipmentUsed}</p>
              </div>
            )}
            {service.durationMinutes && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-600" /> Typical Duration
                </span>
                <p className="text-slate-600">Approx. {service.durationMinutes} minutes</p>
              </div>
            )}
          </div>

          {/* Preparation Info */}
          {service.preparationInfo && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#eb6506]" /> Patient Preparation Note
              </span>
              <p className="text-amber-900 leading-relaxed">{service.preparationInfo}</p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 font-semibold text-xs transition-colors"
          >
            Close Details
          </button>
          <Link
            to={`/book-appointment?service=${encodeURIComponent(service.name)}&dept=${service.deptKey || 'skin'}`}
            onClick={onClose}
            className="w-full sm:w-auto font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl text-white shadow-md flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800]"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for this Treatment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
