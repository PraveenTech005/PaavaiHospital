import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw,
  Stethoscope
} from 'lucide-react';
import api from '../utils/api';
import confetti from 'canvas-confetti';
import AppointmentReceipt from '../components/AppointmentReceipt';
import EmergencyBar from '../components/EmergencyBar';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();

  // URL query pre-fills
  const preSelectedDept = searchParams.get('dept') === 'skin' ? 'Skin Care' : searchParams.get('dept') === 'eye' ? 'Eye Care' : 'Eye Care';
  const preSelectedDoctor = searchParams.get('doctor') || '';
  const preSelectedService = searchParams.get('service') || '';

  // Multi-step Wizard: 1 = Specialty & Doctor, 2 = Date & Slot, 3 = Patient Details, 4 = Confirmation Pass
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [department, setDepartment] = useState(preSelectedDept);
  const [doctorName, setDoctorName] = useState(preSelectedDoctor || 'Any Available Specialist');
  const [doctorId, setDoctorId] = useState('');
  const [serviceName, setServiceName] = useState(preSelectedService || '');
  
  // Date and Time Slot
  const todayFormatted = new Date().toISOString().split('T')[0];
  const [appointmentDate, setAppointmentDate] = useState(todayFormatted);
  const [timeSlot, setTimeSlot] = useState('');

  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Prefer not to say');
  const [visitType, setVisitType] = useState('First Visit (New Consultation)');
  const [reasonNotes, setReasonNotes] = useState('');

  // Backend Data State
  const [doctorsList, setDoctorsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [slotsState, setSlotsState] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Completed Appointment Result
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  // 1. Fetch Doctors and Services on mount / department change
  useEffect(() => {
    async function loadDeptData() {
      try {
        const deptKey = department === 'Eye Care' ? 'eye' : 'skin';
        const [docRes, srvRes] = await Promise.all([
          api.get(`/doctors?deptKey=${deptKey}`),
          api.get(`/services?deptKey=${deptKey}`)
        ]);

        if (docRes.data?.data) {
          setDoctorsList(docRes.data.data);
          if (preSelectedDoctor && docRes.data.data.some(d => d.name === preSelectedDoctor)) {
            setDoctorName(preSelectedDoctor);
            const matched = docRes.data.data.find(d => d.name === preSelectedDoctor);
            if (matched) setDoctorId(matched._id);
          }
        }

        if (srvRes.data?.data) {
          setServicesList(srvRes.data.data);
          if (preSelectedService && srvRes.data.data.some(s => s.name === preSelectedService)) {
            setServiceName(preSelectedService);
          } else if (!serviceName && srvRes.data.data.length > 0) {
            setServiceName(srvRes.data.data[0].name);
          }
        }
      } catch (err) {
        console.error('Error fetching department data:', err);
      }
    }
    loadDeptData();
  }, [department]);

  // 2. Fetch Live Slot Availability when Date or Doctor changes
  useEffect(() => {
    async function checkSlots() {
      if (!appointmentDate) return;
      setLoadingSlots(true);
      setErrorMessage('');
      try {
        const res = await api.get('/appointments/available-slots', {
          params: {
            date: appointmentDate,
            doctorName: doctorName,
            department: department
          }
        });
        if (res.data?.slots) {
          setSlotsState(res.data.slots);
          const currentIsAvail = res.data.slots.find(s => s.time === timeSlot)?.isAvailable;
          if (!currentIsAvail) {
            setTimeSlot('');
          }
        }
      } catch (err) {
        console.error('Error checking slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    }
    checkSlots();
  }, [appointmentDate, doctorName, department]);

  // Handle department change
  const handleDepartmentSelect = (dept) => {
    setDepartment(dept);
    setDoctorName('Any Available Specialist');
    setDoctorId('');
    setTimeSlot('');
    setServiceName('');
  };

  // Form Validation and Step Progression
  const goToStep2 = () => {
    if (!department) {
      setErrorMessage('Please choose a department.');
      return;
    }
    if (!serviceName) {
      setErrorMessage('Please select a treatment or consultation type.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  const goToStep3 = () => {
    if (!appointmentDate) {
      setErrorMessage('Please choose an appointment date.');
      return;
    }
    if (!timeSlot) {
      setErrorMessage('Please choose an available time slot.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  // Final Submit to Backend
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        department,
        doctorId: doctorId || undefined,
        doctorName: doctorName || 'Any Available Specialist',
        serviceName,
        appointmentDate,
        timeSlot,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim() || undefined,
        patientAge: patientAge ? parseInt(patientAge) : undefined,
        patientGender,
        visitType,
        reasonNotes: reasonNotes.trim()
      };

      const res = await api.post('/appointments', payload);

      if (res.data?.success) {
        setConfirmedAppointment(res.data.data);
        setCurrentStep(4);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Booking failed:', err);
      const serverMsg = err.userMessage || 'Failed to book appointment. Please try selecting a different slot.';
      setErrorMessage(serverMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setConfirmedAppointment(null);
    setCurrentStep(1);
    setTimeSlot('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setReasonNotes('');
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      <EmergencyBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Instant Digital Reservation
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book Hospital Appointment
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Choose your department, doctor, and preferred time slot to generate your official patient appointment pass.
          </p>
        </div>

        {/* Step Indicator */}
        {currentStep < 4 && (
          <div className="mb-10">
            <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto">
              
              {/* Step 1 Pill */}
              <div className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                currentStep === 1 
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white border-orange-500 shadow-sm' 
                  : currentStep > 1 
                  ? 'bg-amber-50 text-amber-900 border-amber-200' 
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
                <span className="truncate">Dept &amp; Doctor</span>
              </div>

              {/* Step 2 Pill */}
              <div className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                currentStep === 2 
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white border-orange-500 shadow-sm' 
                  : currentStep > 2 
                  ? 'bg-amber-50 text-amber-900 border-amber-200' 
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
                <span className="truncate">Date &amp; Slot</span>
              </div>

              {/* Step 3 Pill */}
              <div className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                currentStep === 3 
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white border-orange-500 shadow-sm' 
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">3</span>
                <span className="truncate">Patient Info</span>
              </div>

            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Attention Required</p>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Step 1: Department, Doctor & Treatment Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-md space-y-8 animate-in fade-in duration-200">
            
            {/* Department Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Select Specialty Department *
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Eye Care Option */}
                <div
                  onClick={() => handleDepartmentSelect('Eye Care')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    department === 'Eye Care'
                      ? 'border-[#eb6506] bg-amber-50/60 shadow-sm ring-2 ring-[#ecb612]/30'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    department === 'Eye Care' ? 'bg-[#eb6506] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      Ophthalmology (Eye Care)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Cataract, LASIK evaluation, Glaucoma, Retina diagnostics, and Opticals.
                    </p>
                  </div>
                </div>

                {/* Skin Care Option */}
                <div
                  onClick={() => handleDepartmentSelect('Skin Care')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    department === 'Skin Care'
                      ? 'border-[#eb6506] bg-amber-50/60 shadow-sm ring-2 ring-[#ecb612]/30'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    department === 'Skin Care' ? 'bg-[#eb6506] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      Dermatology &amp; Aesthetics
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      HydraFacial, Photo Facial, GFC &amp; PRP Hair, Laser, Botox, and Dermatosurgery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Select Doctor / Consultant *
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Any Available Specialist */}
                <div
                  onClick={() => {
                    setDoctorName('Any Available Specialist');
                    setDoctorId('');
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer text-xs transition-all flex items-center gap-3 ${
                    doctorName === 'Any Available Specialist'
                      ? 'border-[#eb6506] bg-amber-50/80 font-bold text-[#eb6506] ring-2 ring-orange-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-bold">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold">Any Available Doctor</p>
                    <p className="text-[11px] text-slate-500 font-normal">Next available OPD slot</p>
                  </div>
                </div>

                {doctorsList.map((doc) => (
                  <div
                    key={doc._id || doc.name}
                    onClick={() => {
                      setDoctorName(doc.name);
                      setDoctorId(doc._id);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer text-xs transition-all flex items-center gap-3 ${
                      doctorName === doc.name
                        ? 'border-[#eb6506] bg-amber-50/80 font-bold text-[#eb6506] ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={doc.image || '/img/building.webp'}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.target.src = '/img/building.webp'; }}
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-bold truncate">{doc.name}</p>
                      <p className="text-[11px] text-slate-500 font-normal truncate">{doc.qualifications.split(',')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment / Service Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Select Treatment / Consultation Type *
              </label>

              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs font-medium"
              >
                <option value="">-- Choose Treatment / Service --</option>
                {servicesList.map((srv) => (
                  <option key={srv._id || srv.name} value={srv.name}>
                    {srv.name} ({srv.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Proceed Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={goToStep2}
                className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all"
              >
                <span>Proceed to Select Date &amp; Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Step 2: Date & Live Slot Picker */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-md space-y-8 animate-in fade-in duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#eb6506]">Booking For:</span>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {serviceName} • <span className="text-[#eb6506]">{doctorName}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Change Doctor/Service
              </button>
            </div>

            {/* Date Picker */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#ecb612]" /> Choose Preferred Date *
              </label>
              
              <input
                type="date"
                min={todayFormatted}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full sm:w-72 p-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs font-medium"
              />
            </div>

            {/* Time Slot Picker with Real-time Double-Booking Prevention */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#eb6506]" /> Choose Available Time Slot *
                </label>
                {loadingSlots && (
                  <span className="text-xs text-[#eb6506] flex items-center gap-1 font-semibold">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Checking slot availability...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slotsState.map((slot) => {
                  const isSelected = timeSlot === slot.time;
                  const isAvailable = slot.isAvailable;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setTimeSlot(slot.time)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                        !isAvailable
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60'
                          : isSelected
                          ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white border-orange-500 shadow-md ring-2 ring-orange-500/30'
                          : 'bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200 hover:border-amber-300 shadow-2xs'
                      }`}
                    >
                      <span className="text-sm">{slot.time}</span>
                      <span className={`text-[10px] font-medium ${
                        !isAvailable ? 'text-red-500' : isSelected ? 'text-amber-100' : 'text-emerald-600'
                      }`}>
                        {!isAvailable ? 'Booked' : 'Available'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                Slots highlighted in green are available. Booked slots are locked in real time to prevent scheduling conflicts.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                type="button"
                onClick={goToStep3}
                className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
              >
                <span>Proceed to Patient Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Patient Information Form */}
        {currentStep === 3 && (
          <form onSubmit={handleBookingSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-md space-y-6 animate-in fade-in duration-200">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#eb6506]">Summary:</span>
                <h3 className="font-display font-bold text-base text-slate-900">
                  {serviceName} • {appointmentDate} at {timeSlot}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Change Slot
              </button>
            </div>

            {/* Patient Name */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Patient Full Name *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                />
              </div>
            </div>

            {/* Phone & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. 98421 54321"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                  />
                </div>
              </div>

            </div>

            {/* Age, Gender & Visit Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  Gender
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  Visit Type
                </label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs"
                >
                  <option value="First Visit (New Consultation)">First Visit (New Consultation)</option>
                  <option value="Follow-up Checkup">Follow-up Checkup</option>
                  <option value="Diagnostic Test / Procedure">Diagnostic Test / Procedure</option>
                  <option value="Emergency / Urgent Care">Emergency / Urgent Care</option>
                </select>
              </div>

            </div>

            {/* Optional Notes */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                Reason for Visit / Primary Symptoms (Optional)
              </label>
              <textarea
                rows="3"
                value={reasonNotes}
                onChange={(e) => setReasonNotes(e.target.value)}
                placeholder="Describe any vision blurriness, skin concerns, or prior surgical history..."
                className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs resize-none"
              ></textarea>
            </div>

            {/* Policy Consent */}
            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#eb6506] shrink-0 mt-0.5" />
              <span>
                By confirming, your appointment slot will be reserved at Paavai Hospital (Salem). Consultation fees are payable directly at the hospital reception counter on arrival.
              </span>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Slots
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-[#ecb612] via-[#f59e0b] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm &amp; Generate Pass</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* Step 4: Digital Confirmation Pass / Receipt */}
        {currentStep === 4 && confirmedAppointment && (
          <AppointmentReceipt
            appointment={confirmedAppointment}
            onBookAnother={handleBookAnother}
          />
        )}

      </div>
    </div>
  );
}
