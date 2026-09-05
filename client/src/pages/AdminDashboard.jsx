import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  Search, 
  RefreshCw, 
  Download, 
  Printer, 
  Plus, 
  Phone, 
  FileText,
  X
} from 'lucide-react';
import api from '../utils/api';
import EmergencyBar from '../components/EmergencyBar';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters
  const todayStr = new Date().toISOString().split('T')[0];
  const [filterDate, setFilterDate] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterDoctor, setFilterDoctor] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Walk-in modal
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinForm, setWalkinForm] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    department: 'Eye Care',
    doctorName: 'Dr. R. Soundararajan',
    serviceName: 'Advanced Cataract Surgery & Evaluation',
    appointmentDate: todayStr,
    timeSlot: '10:00 AM',
    visitType: 'First Visit (New Consultation)',
    reasonNotes: 'Walk-in patient at hospital reception'
  });

  // Doctor & service lists for walk-in
  const [doctorsList, setDoctorsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  // Fetch appointments and stats
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appRes, statRes, docRes, srvRes] = await Promise.all([
        api.get('/appointments', {
          params: {
            date: filterDate || undefined,
            department: filterDept !== 'All' ? filterDept : undefined,
            doctorName: filterDoctor !== 'All' ? filterDoctor : undefined,
            status: filterStatus !== 'All' ? filterStatus : undefined,
            search: searchQuery.trim() || undefined,
            limit: 100
          }
        }),
        api.get('/stats'),
        api.get('/doctors'),
        api.get('/services')
      ]);

      if (appRes.data?.data) setAppointments(appRes.data.data);
      if (statRes.data?.data) setStats(statRes.data.data);
      if (docRes.data?.data) setDoctorsList(docRes.data.data);
      if (srvRes.data?.data) setServicesList(srvRes.data.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filterDate, filterDept, filterDoctor, filterStatus, searchQuery]);

  // Status Updater
  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await api.patch(`/appointments/${id}/status`, { status: newStatus });
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update status:', err);
      alert(err.userMessage || 'Failed to update status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Walk-in form submit
  const handleWalkinSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await api.post('/appointments', walkinForm);
      setShowWalkinModal(false);
      fetchDashboardData();
      alert('Walk-in appointment scheduled successfully!');
    } catch (err) {
      console.error('Failed to create walk-in appointment:', err);
      alert(err.userMessage || 'Failed to create walk-in appointment.');
    } finally {
      setActionLoading(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      alert('No appointments to export.');
      return;
    }

    const headers = ['Ref ID', 'Token', 'Patient Name', 'Phone', 'Email', 'Department', 'Doctor', 'Service', 'Date', 'Time Slot', 'Status'];
    const rows = appointments.map(a => [
      a.appointmentRef,
      a.tokenNumber || '',
      `"${a.patientName}"`,
      a.patientPhone,
      a.patientEmail || '',
      `"${a.department}"`,
      `"${a.doctorName}"`,
      `"${a.serviceName}"`,
      a.appointmentDate,
      a.timeSlot,
      a.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Paavai_Hospital_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-amber-300 p-1 flex items-center justify-center shadow-xs">
              <img src="/img/logo.webp" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Hospital Staff Appointment Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Paavai Hospital (Salem) • Real-time patient reservations, status management &amp; OPD scheduling.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-amber-50 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#eb6506]' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-amber-50 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#eb6506]" /> Export CSV
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-amber-50 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-600" /> Print Schedule
          </button>

          <button
            type="button"
            onClick={() => setShowWalkinModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ecb612] to-[#eb6506] hover:from-[#dfa908] hover:to-[#d85800] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Walk-in Patient
          </button>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Appointments</span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-2xl text-slate-900">{stats.totalAppointments}</span>
              <span className="text-xs text-[#eb6506] font-bold bg-amber-50 px-2 py-0.5 rounded-md">All Time</span>
            </div>
            <p className="text-[11px] text-slate-500">Eye: {stats.eyeAppointmentsCount} • Skin: {stats.skinAppointmentsCount}</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#eb6506] block">Today's Schedule</span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-2xl text-[#eb6506]">{stats.todayAppointments}</span>
              <span className="text-xs text-[#eb6506] font-bold bg-amber-50 px-2 py-0.5 rounded-md">{todayStr}</span>
            </div>
            <p className="text-[11px] text-slate-500">Scheduled for today's OPD</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">Confirmed &amp; Active</span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-2xl text-emerald-700">{stats.confirmedCount}</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Ready</span>
            </div>
            <p className="text-[11px] text-slate-500">Pending: {stats.pendingCount}</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">Completed Treatments</span>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black text-2xl text-blue-700">{stats.completedCount}</span>
              <span className="text-xs text-slate-500 font-semibold">Cancelled: {stats.cancelledCount}</span>
            </div>
            <p className="text-[11px] text-slate-500">Successfully served</p>
          </div>

        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Live Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Name, Phone, Ref..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-amber-50/30 border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
            />
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-amber-50/30 border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-amber-50/30 border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
            >
              <option value="All">All Departments</option>
              <option value="Eye Care">Eye Care (Ophthalmology)</option>
              <option value="Skin Care">Skin &amp; Aesthetic Care</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-amber-50/30 border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setFilterDate(todayStr);
              }}
              className="px-3 py-2 rounded-xl bg-amber-100 text-[#eb6506] font-bold text-xs hover:bg-amber-200 flex-1 text-center"
            >
              Today's OPD
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterDate('');
                setFilterDept('All');
                setFilterDoctor('All');
                setFilterStatus('All');
                setSearchQuery('');
              }}
              className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* Appointments Table / List */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900">
            Appointments List ({appointments.length})
          </h3>
          <span className="text-xs text-slate-500">
            Click status pills to update in real-time
          </span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-500 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#eb6506]" />
            <span>Loading appointments from database...</span>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-700">No appointments found matching current filters.</p>
            <p className="text-[11px]">Try clearing search or changing the date filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-50/50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-amber-100">
                  <th className="py-3 px-4">Ref &amp; Token</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Department &amp; Doctor</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Date &amp; Slot</th>
                  <th className="py-3 px-4">Status &amp; Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {appointments.map((app) => {
                  const isEye = app.department === 'Eye Care';

                  return (
                    <tr key={app._id} className="hover:bg-amber-50/40 transition-colors">
                      
                      {/* Ref & Token */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-slate-900 block">{app.appointmentRef}</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isEye ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-orange-50 text-orange-900 border border-orange-200'
                        }`}>
                          Token: {app.tokenNumber || 'PV-01'}
                        </span>
                      </td>

                      {/* Patient Details */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block text-sm">{app.patientName}</span>
                        <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-0.5">
                          <a href={`tel:${app.patientPhone}`} className="text-[#eb6506] hover:underline flex items-center gap-1 font-bold">
                            <Phone className="w-3 h-3" /> {app.patientPhone}
                          </a>
                          {app.patientAge && <span>• {app.patientAge} Yrs</span>}
                        </div>
                      </td>

                      {/* Department & Doctor */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{app.doctorName}</span>
                        <span className={`text-[11px] font-bold ${isEye ? 'text-[#ecb612]' : 'text-[#eb6506]'}`}>
                          {app.department}
                        </span>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 block line-clamp-1">{app.serviceName}</span>
                        <span className="text-[10px] text-slate-400">{app.visitType}</span>
                      </td>

                      {/* Date & Slot */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 block">{app.appointmentDate}</span>
                        <span className="text-[#eb6506] font-bold flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#ecb612]" /> {app.timeSlot}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            disabled={actionLoading}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                              app.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : app.status === 'Completed'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : app.status === 'Cancelled'
                                ? 'bg-red-50 text-red-800 border-red-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Walk-in Modal */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Register Walk-in / Phone Patient
              </h3>
              <button
                type="button"
                onClick={() => setShowWalkinModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkinSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={walkinForm.patientName}
                  onChange={(e) => setWalkinForm({ ...walkinForm, patientName: e.target.value })}
                  placeholder="Patient Name"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={walkinForm.patientPhone}
                    onChange={(e) => setWalkinForm({ ...walkinForm, patientPhone: e.target.value })}
                    placeholder="98421 54321"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department *</label>
                  <select
                    value={walkinForm.department}
                    onChange={(e) => setWalkinForm({ ...walkinForm, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  >
                    <option value="Eye Care">Eye Care</option>
                    <option value="Skin Care">Skin Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    value={walkinForm.doctorName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, doctorName: e.target.value })}
                    placeholder="Dr. Paavai Senthil"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Treatment / Service *</label>
                  <input
                    type="text"
                    required
                    value={walkinForm.serviceName}
                    onChange={(e) => setWalkinForm({ ...walkinForm, serviceName: e.target.value })}
                    placeholder="General Consultation"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={walkinForm.appointmentDate}
                    onChange={(e) => setWalkinForm({ ...walkinForm, appointmentDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot *</label>
                  <select
                    value={walkinForm.timeSlot}
                    onChange={(e) => setWalkinForm({ ...walkinForm, timeSlot: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb6506]"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:15 AM">11:15 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:15 PM">04:15 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white font-bold px-6 py-2 rounded-xl shadow-md"
                >
                  Create Walk-in Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
