import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  AlertCircle, 
  RefreshCw
} from 'lucide-react';
import api from '../utils/api';
import AppointmentReceipt from '../components/AppointmentReceipt';
import EmergencyBar from '../components/EmergencyBar';

export default function AppointmentLookup() {
  const [searchRef, setSearchRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!searchRef.trim()) {
      setErrorMessage('Please enter your Booking Reference (e.g. PVH-2025-XXXXXX) or Mobile Number.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setAppointment(null);

    try {
      const cleanInput = searchRef.trim().toUpperCase();

      // Check if input is a reference code
      if (cleanInput.startsWith('PVH')) {
        const res = await api.get(`/appointments/ref/${cleanInput}`);
        if (res.data?.data) {
          setAppointment(res.data.data);
        }
      } else {
        // Search by phone
        const res = await api.get('/appointments', {
          params: { search: cleanInput, limit: 1 }
        });
        if (res.data?.data && res.data.data.length > 0) {
          setAppointment(res.data.data[0]);
        } else {
          setErrorMessage(`No active appointments found matching "${searchRef}". Please check the reference ID or phone number.`);
        }
      }
    } catch (err) {
      console.error('Lookup failed:', err);
      setErrorMessage(err.userMessage || 'Appointment not found. Please verify your reference number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      <EmergencyBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#eb6506] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
            Patient Self-Service Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track &amp; Print Appointment Pass
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Enter your booking reference code or registered mobile number to retrieve your official digital pass, token number, and doctor details.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleLookup} className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md max-w-2xl mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
              Booking Reference or Mobile Number *
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="e.g. PVH-2025-081421 or 98421 54321"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-amber-50/40 border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-2xs uppercase placeholder:normal-case placeholder:font-sans"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Retrieve Appointment Pass</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Appointment Result Receipt */}
        {appointment && (
          <div className="mt-10">
            <AppointmentReceipt appointment={appointment} />
          </div>
        )}

      </div>
    </div>
  );
}
