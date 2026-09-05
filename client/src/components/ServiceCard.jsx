import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  ShieldAlert, 
  Cpu,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceModal from './ServiceModal';

export default function ServiceCard({ service }) {
  const [showModal, setShowModal] = useState(false);

  if (!service) return null;

  const isEye = service.deptKey === 'eye' || service.department === 'Eye Care';

  return (
    <>
      <div className="rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 group border-amber-100/90 hover:border-amber-300">
        <div className="space-y-4">
          
          {/* Top category & tags */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-50 text-[#eb6506] border border-amber-200">
              {isEye ? <Eye className="w-3 h-3 text-[#ecb612]" /> : <Sparkles className="w-3 h-3 text-[#eb6506]" />}
              <span>{service.category}</span>
            </span>

            {service.isEmergency && (
              <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-200 animate-pulse flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> 24/7 Urgent
              </span>
            )}

            {service.isDiagnostic && (
              <span className="bg-amber-100/60 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                Diagnostic Suite
              </span>
            )}
          </div>

          {/* Service Name & Short Description */}
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#eb6506] transition-colors">
              {service.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>

          {/* Equipment badge if available */}
          {service.equipmentUsed && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-amber-50/40 px-3 py-1.5 rounded-xl border border-amber-100">
              <Cpu className="w-3.5 h-3.5 text-[#ecb612] shrink-0" />
              <span className="truncate font-medium">{service.equipmentUsed}</span>
            </div>
          )}

          {/* Highlights */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {service.benefits.slice(0, 2).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#eb6506]" />
                  <span className="line-clamp-1">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-5 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 py-2 px-2.5 rounded-lg hover:bg-amber-50"
          >
            <Info className="w-3.5 h-3.5 text-[#ecb612]" /> Details
          </button>

          <Link
            to={`/book-appointment?service=${encodeURIComponent(service.name)}&dept=${service.deptKey || 'skin'}`}
            className="text-xs font-extrabold px-3.5 py-2 rounded-xl text-white shadow-xs transition-all flex items-center gap-1.5 bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800]"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {showModal && (
        <ServiceModal
          service={service}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
