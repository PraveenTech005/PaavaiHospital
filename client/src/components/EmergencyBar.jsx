import React from 'react';
import { Phone, ShieldAlert } from 'lucide-react';

export default function EmergencyBar() {
  return (
    <div className="bg-gradient-to-r from-[#eb6506] via-[#ea580c] to-[#ecb612] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-1.5 rounded-lg shrink-0">
              <ShieldAlert className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <span className="font-extrabold tracking-wide uppercase text-white mr-2">
                Emergency Eye Trauma &amp; Acute Care:
              </span>
              <span className="text-amber-100 hidden md:inline">
                Corneal foreign body, sudden vision drop, acute chemical burn, or severe ocular trauma.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="tel:+918048053215"
              className="bg-white text-[#eb6506] font-extrabold px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors flex items-center gap-1.5 shadow-xs text-xs sm:text-sm"
            >
              <Phone className="w-4 h-4 text-[#eb6506]" />
              <span>Call: +91 80480 53215</span>
            </a>
            <a
              href="tel:+919342790784"
              className="bg-black/25 hover:bg-black/40 text-white font-bold px-3 py-1.5 rounded-lg border border-white/30 transition-colors text-xs"
            >
              <span>Dr. Mobile: 93427 90784</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
