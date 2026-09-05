import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  Sparkles, 
  Filter, 
  X 
} from 'lucide-react';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import EmergencyBar from '../components/EmergencyBar';

export default function Services() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.get('/services');
        if (res.data?.data) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Filter logic
  const filteredServices = services.filter((srv) => {
    const matchesDept = selectedDept === 'All' 
      ? true 
      : selectedDept === 'eye' 
      ? srv.deptKey === 'eye' || srv.department === 'Eye Care'
      : srv.deptKey === 'skin' || srv.department === 'Skin Care';

    const matchesCategory = selectedCategory === 'All' 
      ? true 
      : srv.category === selectedCategory;

    const matchesSearch = searchQuery.trim() === '' 
      ? true 
      : srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.equipmentUsed && srv.equipmentUsed.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesCategory && matchesSearch;
  });

  // Extract unique categories based on selected dept
  const availableCategories = ['All', ...new Set(
    services
      .filter(s => selectedDept === 'All' ? true : selectedDept === 'eye' ? s.deptKey === 'eye' : s.deptKey === 'skin')
      .map(s => s.category)
  )];

  return (
    <div className="space-y-12 sm:space-y-16">
      <EmergencyBar />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950 text-white py-14 sm:py-20 border-b-4 border-[#eb6506]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ecb612] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800">
            Clinical Catalog
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Treatments &amp; Diagnostics Directory
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive list of clinical ophthalmology, surgical cataract care, laser aesthetics, dermatological surgeries, and hair restoration therapies.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments, diagnostics, or equipment (e.g. Cataract, Hydra, OCT, Laser, Botox, PRP)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/20 shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Results Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-100">
          
          {/* Department Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setSelectedDept('All');
                setSelectedCategory('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDept === 'All'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
              }`}
            >
              All Departments
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDept('eye');
                setSelectedCategory('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDept === 'eye'
                  ? 'bg-gradient-to-r from-[#ecb612] to-[#eb6506] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Eye Care (Ophthalmology)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDept('skin');
                setSelectedCategory('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDept === 'skin'
                  ? 'bg-gradient-to-r from-[#eb6506] to-[#ecb612] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Skin &amp; Aesthetic
            </button>
          </div>

          {/* Results Count */}
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredServices.length}</strong> available treatments
          </div>
        </div>

        {/* Sub-Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-100 text-[#eb6506] border border-amber-300 font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-amber-50/40 rounded-3xl border border-amber-100 space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No treatments found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing department filters to see all clinical offerings.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#eb6506] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id || service.name} service={service} />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}
