import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import EyeCare from './pages/EyeCare';
import SkinCare from './pages/SkinCare';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import About from './pages/About';
import BookAppointment from './pages/BookAppointment';
import AppointmentLookup from './pages/AppointmentLookup';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eye-care" element={<EyeCare />} />
            <Route path="/skin-care" element={<SkinCare />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/lookup" element={<AppointmentLookup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
