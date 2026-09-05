import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  ExternalLink
} from 'lucide-react';
import api from '../utils/api';
import EmergencyBar from '../components/EmergencyBar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'General Inquiry',
    subject: '',
    message: '',
    isUrgent: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.post('/contact', formData);
      if (res.data?.success) {
        setSuccessMsg('Your message has been received by the Paavai Hospital front desk. We will get back to you promptly.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          department: 'General Inquiry',
          subject: '',
          message: '',
          isUrgent: false
        });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.userMessage || 'Failed to submit inquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      <EmergencyBar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-16 sm:py-24 border-b-4 border-[#ecb612]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ecb612] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800">
            Seelanaickenpatti, Salem
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact &amp; Hospital Location
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Conveniently located in Indhira Nagar, Seelanaickenpatti, Salem with seamless arterial access from Salem City, Namakkal, and Rasipuram.
          </p>
        </div>
      </section>

      {/* Main Grid: Info Cards + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Hospital Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
              
              <div className="space-y-2 pb-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white border border-amber-300 p-1 flex items-center justify-center shrink-0">
                  <img src="/img/logo.webp" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-slate-900">
                    Paavai <span className="text-[#eb6506]">Hospital</span>
                  </h3>
                  <p className="text-xs font-bold text-[#eb6506]">
                    Eye &amp; Skin Care Hospital • Established 2025
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#eb6506] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                  <p className="font-bold text-slate-900">Hospital Address:</p>
                  <p>T S No 89, Indhira Nagar, Seelanaickenpatti, Salem, Tamil Nadu – 636201</p>
                  <p className="text-[11px] text-slate-500 font-medium">Landmark: Near Seelanaickenpatti Roundana / Bypass Junction</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Telephone / Helpdesk:</p>
                  <a href="tel:+918048053215" className="font-bold text-[#eb6506] hover:underline block">
                    +91 80480 53215
                  </a>
                  <p className="text-[11px] text-slate-500">Doctor Direct Mobile:</p>
                  <a href="tel:+919342790784" className="font-bold text-[#eb6506] hover:underline block">
                    +91 93427 90784
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#ecb612] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Email Inquiry:</p>
                  <a href="mailto:hospitalpaavai@gmail.com" className="text-slate-700 hover:text-[#eb6506] font-medium block">
                    hospitalpaavai@gmail.com
                  </a>
                </div>
              </div>

              {/* OPD Timings */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#eb6506] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                  <p className="font-bold text-slate-900">Consultation Timings:</p>
                  <p>Mon – Sat: <strong>09:00 AM – 08:00 PM</strong></p>
                  <p>Sunday: <strong>Emergency &amp; Elective Procedures</strong></p>
                  <p className="text-[#eb6506] text-xs font-bold">24/7 Eye Trauma &amp; Emergency Support</p>
                </div>
              </div>

            </div>

            {/* Travel & Directions Guide */}
            <div className="bg-amber-50/40 p-6 rounded-3xl border border-amber-200 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <Navigation className="w-4 h-4 text-[#eb6506]" /> Reaching Us in Salem
              </h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li><strong>From Salem Old Bus Stand:</strong> 12 mins via Trichy Main Road.</li>
                <li><strong>From Salem Railway Junction:</strong> 18 mins via Leigh Bazaar &amp; NH-44.</li>
                <li><strong>From Namakkal / Rasipuram:</strong> Direct highway access reaching Seelanaickenpatti bypass.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-md space-y-6">
            
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <h3 className="font-display font-bold text-2xl text-slate-900">
                Send an Inquiry / Request a Callback
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Have a query regarding cataract surgery, laser packages, or doctor consultation availability? Drop a note below.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Message Sent</p>
                  <p>{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Error</p>
                  <p>{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Anandha Kumar"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98421 54321"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. anand@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Department of Interest
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Eye Care / Ophthalmology">Eye Care / Ophthalmology</option>
                    <option value="Skin & Aesthetic Care">Skin &amp; Aesthetic Care</option>
                    <option value="Optical Store">Optical Store / Eyewear</option>
                    <option value="Emergency Support">Emergency Support</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Inquiry about Cataract evaluation or HydraFacial packages"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Message / Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please specify your query or preferred consultation schedule..."
                  className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  id="isUrgent"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#eb6506] focus:ring-[#eb6506] border-slate-300"
                />
                <label htmlFor="isUrgent" className="font-semibold text-slate-800 cursor-pointer">
                  Mark as Urgent (Request same-day phone contact)
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-950 rounded-3xl overflow-hidden p-8 sm:p-12 text-white relative shadow-xl border border-amber-500/30">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecb612]/20 text-[#ecb612] text-xs font-bold uppercase border border-[#ecb612]/40">
              <MapPin className="w-4 h-4" /> Salem Location Map
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              T S No 89, Indhira Nagar, Seelanaickenpatti, Salem
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Located on the arterial highway corridor at Seelanaickenpatti, Salem. Ample on-campus parking and ground-floor elevator accessibility for senior eye and skin patients.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Seelanaickenpatti+Salem+Tamil+Nadu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md inline-flex items-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Open in Google Maps
              </a>
              <a
                href="tel:+918048053215"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#ecb612]" /> Call for Directions: +91 80480 53215
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
