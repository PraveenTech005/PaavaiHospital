import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Share2, 
  Copy, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Eye, 
  Sparkles, 
  QrCode, 
  Check, 
  AlertCircle,
  Stethoscope,
  Download
} from 'lucide-react';
import { HOSPITAL_CONFIG } from '../utils/config';

export default function AppointmentReceipt({ appointment, onBookAnother }) {
  const [copied, setCopied] = useState(false);

  if (!appointment) return null;

  const isEye = appointment.department === 'Eye Care';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(
      `Hospital: Eye & Skin Care Hospital (Salem)\nAppointment Ref: ${appointment.appointmentRef}\nPatient: ${appointment.patientName}\nDoctor: ${appointment.doctorName}\nService: ${appointment.serviceName}\nDate: ${appointment.appointmentDate}\nTime: ${appointment.timeSlot}\nLocation: Indhira Nagar, Seelanaickenpatti, Salem`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Hospital Appointment: ${appointment.doctorName} (${appointment.department})`);
    const details = encodeURIComponent(`${HOSPITAL_CONFIG.name} - ${HOSPITAL_CONFIG.tagline} (Salem)\nRef: ${appointment.appointmentRef}\nPatient: ${appointment.patientName}\nService: ${appointment.serviceName}\nPhone: ${HOSPITAL_CONFIG.phone}`);
    const locationStr = encodeURIComponent(HOSPITAL_CONFIG.location);
    const dateFormatted = appointment.appointmentDate.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${locationStr}&dates=${dateFormatted}T043000Z/${dateFormatted}T053000Z`;
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `*${HOSPITAL_CONFIG.name} - Appointment Confirmed*\n` +
      `*Ref No:* ${appointment.appointmentRef}\n` +
      `*Token:* ${appointment.tokenNumber || 'Standard'}\n` +
      `*Patient:* ${appointment.patientName}\n` +
      `*Doctor:* ${appointment.doctorName}\n` +
      `*Service:* ${appointment.serviceName}\n` +
      `*Date:* ${appointment.appointmentDate}\n` +
      `*Time:* ${appointment.timeSlot}\n` +
      `*Venue:* ${HOSPITAL_CONFIG.location}\n` +
      `*Helpline:* ${HOSPITAL_CONFIG.phone}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Printable Area Wrapper */}
      <div className="print-area bg-white rounded-3xl shadow-xl border border-amber-200 overflow-hidden">
        
        {/* Receipt Header */}
        <div className="p-6 sm:p-8 text-white relative bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b-4 border-[#eb6506]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-white p-1 flex items-center justify-center border-2 border-amber-300 shadow-md">
                <img
                  src="/img/logo.webp"
                  alt="Paavai Hospital Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                  Paavai <span className="text-[#eb6506]">Hospital</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#ecb612] font-semibold">
                  Eye &amp; Skin Care Hospital • Seelanaickenpatti, Salem
                </p>
                <p className="text-[11px] text-slate-400 font-mono">Established 2025 • Reg. Healthcare Facility</p>
              </div>
            </div>

            {/* Token & Status Badge */}
            <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between gap-1 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/30">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Token Number</span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#ecb612] tracking-wider">
                  {appointment.tokenNumber || 'PV-01'}
                </span>
              </div>
              <span className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase shadow-xs">
                {appointment.status || 'Confirmed'}
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Banner */}
        <div className="bg-amber-50 px-6 py-3 border-b border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#eb6506] shrink-0" />
            <span className="font-bold">Appointment Successfully Scheduled &amp; Confirmed!</span>
          </div>
          <span className="font-mono text-[11px] text-[#eb6506] font-bold">
            Ref: {appointment.appointmentRef}
          </span>
        </div>

        {/* Receipt Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Reference & Barcode Representation */}
          <div className="bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold block">
                Official Booking Reference ID
              </span>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-mono font-black text-xl sm:text-2xl text-slate-900 tracking-wider">
                  {appointment.appointmentRef}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="no-print p-1.5 rounded-lg bg-white hover:bg-amber-100 text-slate-700 transition-colors border border-amber-200"
                  title="Copy Reference Number"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#eb6506]" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">Show this ID or token at the hospital reception desk on arrival.</p>
            </div>

            {/* QR / Verification Block */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-2xs">
              <div className="p-1 rounded-lg bg-stone-950 text-[#ecb612]">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="text-[10px] text-slate-600 font-mono text-left">
                <p className="font-bold text-slate-900">DIGITAL PASS</p>
                <p className="text-slate-500">PVH-SLM-2025</p>
                <p className="text-[#eb6506] font-extrabold">VERIFIED VALID</p>
              </div>
            </div>
          </div>

          {/* 2-Column Appointment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Consultation Details */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <Stethoscope className="w-3.5 h-3.5 text-[#eb6506]" /> Consultation Information
              </h4>
              
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Specialty Department</span>
                  <span className="font-bold text-slate-900 text-sm">{appointment.department}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Consultant Doctor</span>
                  <span className="font-bold text-[#eb6506] text-sm">{appointment.doctorName}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Selected Treatment / Service</span>
                  <span className="font-semibold text-slate-800">{appointment.serviceName}</span>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-100">
                  <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#eb6506]" /> Date
                    </span>
                    <span className="font-bold text-slate-900">{appointment.appointmentDate}</span>
                  </div>

                  <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#ecb612]" /> Time Slot
                    </span>
                    <span className="font-bold text-[#eb6506]">{appointment.timeSlot}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <User className="w-3.5 h-3.5 text-[#ecb612]" /> Patient Details
              </h4>
              
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Patient Full Name</span>
                  <span className="font-bold text-slate-900 text-sm">{appointment.patientName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
                    <span className="font-semibold text-slate-800">{appointment.patientPhone}</span>
                  </div>
                  {appointment.patientAge && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Age / Gender</span>
                      <span className="font-semibold text-slate-800">
                        {appointment.patientAge} Yrs {appointment.patientGender ? `• ${appointment.patientGender}` : ''}
                      </span>
                    </div>
                  )}
                </div>

                {appointment.patientEmail && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Address</span>
                    <span className="font-medium text-slate-700 truncate block">{appointment.patientEmail}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 block text-[11px]">Visit Type</span>
                  <span className="font-semibold text-slate-800">{appointment.visitType || 'First Visit'}</span>
                </div>

                {appointment.reasonNotes && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Patient Notes / Symptoms</span>
                    <p className="text-slate-700 text-xs italic line-clamp-2">{appointment.reasonNotes}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Hospital Address & Arrival Instructions */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#eb6506] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-slate-900">
                  Hospital Venue: Eye &amp; Skin Care Hospital (Salem)
                </p>
                <p className="text-slate-700">
                  T S No 89, Indhira Nagar, Seelanaickenpatti, Salem, Tamil Nadu – 636201 (Near Seelanaickenpatti Junction)
                </p>
                <p className="text-[#eb6506] font-semibold">
                  Hospital Helpdesk: <strong>{HOSPITAL_CONFIG.phone}</strong> | Direct Doctor Mobile: <strong>{HOSPITAL_CONFIG.mobile}</strong>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2 text-[11px] text-amber-950">
              <AlertCircle className="w-4 h-4 text-[#eb6506] shrink-0" />
              <span>Please arrive 10-15 minutes prior to your scheduled slot. Bring prior medical prescriptions or eyeglass cards if available.</span>
            </div>
          </div>

        </div>

        {/* Action Buttons Toolbar */}
        <div className="no-print p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#ecb612]" />
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </a>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-amber-50 text-slate-700 border border-slate-300 font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#eb6506]" />
              <span>Add to Calendar</span>
            </a>
          </div>

          {onBookAnother && (
            <button
              type="button"
              onClick={onBookAnother}
              className="text-[#eb6506] hover:text-[#d85800] font-bold text-xs sm:text-sm hover:underline"
            >
              + Book Another Appointment
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
