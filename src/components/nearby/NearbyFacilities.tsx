import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Phone,
  Navigation,
  Clock,
  Star,
  Hospital,
  Building2,
  Pill,
  Microscope,
  ShieldAlert,
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Facility } from '../../types';
import { FACILITIES_DATA } from '../../data/facilities';

export const NearbyFacilities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [activeFacility, setActiveFacility] = useState<Facility>(FACILITIES_DATA[0]);
  const [userCity, setUserCity] = useState<string>('Bengaluru, Karnataka');

  const categories = [
    'All',
    'Hospital',
    'Clinic',
    'Pharmacy',
    'Diagnostic Lab',
    'Emergency Care'
  ];

  const filteredFacilities = FACILITIES_DATA.filter((fac) => {
    const matchesCategory =
      selectedCategory === 'All' || fac.type === selectedCategory;
    const matchesSearch =
      fac.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      fac.specialties.some((s) => s.toLowerCase().includes(searchLocation.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (type: Facility['type']) => {
    switch (type) {
      case 'Hospital':
        return Hospital;
      case 'Clinic':
        return Building2;
      case 'Pharmacy':
        return Pill;
      case 'Diagnostic Lab':
        return Microscope;
      case 'Emergency Care':
        return ShieldAlert;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Nearby Medical Facilities</h1>
              <p className="text-xs text-slate-500">
                Discover accredited hospitals, clinics, 24x7 pharmacies, and laboratories
              </p>
            </div>
          </div>
        </div>

        {/* Location selector */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userCity}
              onChange={(e) => setUserCity(e.target.value)}
              placeholder="City or Area..."
              className="pl-8 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Map + Directory Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[650px]">
        {/* Left 5 Cols: Facilities List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-full overflow-hidden">
          {/* List Search Bar */}
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search facility name or specialty..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar p-2 space-y-1">
            {filteredFacilities.map((fac) => {
              const Icon = getCategoryIcon(fac.type);
              const isSelected = activeFacility.id === fac.id;

              return (
                <div
                  key={fac.id}
                  onClick={() => setActiveFacility(fac)}
                  className={`p-3.5 rounded-xl cursor-pointer transition text-left space-y-2 ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-200 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2.5">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          fac.emergencyServices
                            ? 'bg-red-100 text-red-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{fac.name}</h4>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                          <span>{fac.type}</span>
                          <span>•</span>
                          <span className="text-teal-700 font-semibold">{fac.distanceKm} km away</span>
                        </div>
                      </div>
                    </div>

                    {fac.isOpen24Hours && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        24x7
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1">{fac.address}</p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1 text-[11px] text-slate-700 font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{fac.rating}</span>
                      <span className="text-slate-400 font-normal">({fac.reviewCount})</span>
                    </div>

                    <a
                      href={`tel:${fac.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Interactive Map Canvas View */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-700 shadow-xs relative overflow-hidden flex flex-col justify-between p-6 text-white">
          {/* Simulated OpenStreetMap Interactive Graphical Canvas */}
          <div className="absolute inset-0 bg-[#0F1E2E] opacity-90">
            {/* Map Grid Pattern */}
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated Road Arteries */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 200 150 400 120 T 800 200" stroke="#334155" strokeWidth="8" fill="none" />
              <path d="M 150 0 Q 180 300 220 600" stroke="#334155" strokeWidth="6" fill="none" />
              <path d="M 0 400 Q 300 350 700 480" stroke="#334155" strokeWidth="7" fill="none" />
            </svg>

            {/* Pins on map */}
            {filteredFacilities.map((fac, idx) => {
              const isSelected = activeFacility.id === fac.id;
              // Map simulated coordinate offsets
              const xPos = 20 + ((idx * 27) % 65);
              const yPos = 25 + ((idx * 31) % 55);

              return (
                <div
                  key={fac.id}
                  onClick={() => setActiveFacility(fac)}
                  style={{ top: `${yPos}%`, left: `${xPos}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition transform hover:scale-125 z-20 group`}
                >
                  <div
                    className={`p-2 rounded-full shadow-xl flex items-center justify-center ${
                      fac.emergencyServices
                        ? 'bg-red-600 text-white ring-4 ring-red-500/30'
                        : isSelected
                        ? 'bg-blue-500 text-white ring-4 ring-blue-400/40'
                        : 'bg-white text-slate-800'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 text-white text-[10px] rounded-lg whitespace-nowrap shadow-lg border border-slate-700 z-30">
                    {fac.name} ({fac.distanceKm} km)
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Center: {userCity}</span>
            </div>

            <div className="text-[11px] bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
              {filteredFacilities.length} Verified Facilities
            </div>
          </div>

          {/* Bottom Active Facility Card Overlay */}
          <div className="relative z-10 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-2xl max-w-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-sm text-white">{activeFacility.name}</h3>
                  {activeFacility.emergencyServices && (
                    <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">
                      24/7 ER
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1">{activeFacility.address}</p>
                <div className="mt-2 flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1 text-teal-400 font-semibold">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{activeFacility.distanceKm} km distance</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeFacility.openHours}</span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-amber-400 flex items-center justify-end space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{activeFacility.rating}</span>
                </div>
                <div className="text-[10px] text-slate-400">({activeFacility.reviewCount} reviews)</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-3">
              <a
                href={`tel:${activeFacility.phone}`}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {activeFacility.phone}</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeFacility.name + ' ' + activeFacility.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
