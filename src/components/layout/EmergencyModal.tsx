import React from 'react';
import { AlertTriangle, Phone, MapPin, X, Heart, ShieldAlert, Activity } from 'lucide-react';
import { useHealthcare } from '../../context/HealthcareContext';

interface EmergencyModalProps {
  onNavigateToNearby?: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onNavigateToNearby }) => {
  const { emergencyModalOpen, setEmergencyModalOpen } = useHealthcare();

  if (!emergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden">
        {/* Top Emergency Banner */}
        <div className="bg-red-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-700 rounded-full animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">MEDICAL EMERGENCY ASSISTANCE</h2>
              <p className="text-xs text-red-100">Immediate action protocol & urgent emergency contacts</p>
            </div>
          </div>
          <button
            onClick={() => setEmergencyModalOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-red-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Urgent Hotline Buttons */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Direct Emergency Hotlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="tel:108"
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform active:scale-95"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <div className="text-left">
                  <div className="text-xs uppercase font-medium">National Ambulance</div>
                  <div className="text-lg">Dial 108</div>
                </div>
              </a>

              <a
                href="tel:112"
                className="flex items-center justify-center space-x-2 bg-slate-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs uppercase font-medium">Unified Emergency</div>
                  <div className="text-lg">Dial 112</div>
                </div>
              </a>

              <a
                href="tel:102"
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition transform active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs uppercase font-medium">Maternity / Child</div>
                  <div className="text-lg">Dial 102</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => {
                setEmergencyModalOpen(false);
                if (onNavigateToNearby) onNavigateToNearby();
              }}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 cursor-pointer transition flex items-start space-x-3"
            >
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Find Nearest Trauma Center</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  View verified 24/7 emergency rooms and open hospitals near your coordinates.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start space-x-3">
              <div className="p-2 bg-amber-600 text-white rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Emergency Contact On File</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sarah Doe (Spouse): <a href="tel:+919845067890" className="font-semibold text-blue-700 underline">+91 98450 67890</a>
                </p>
              </div>
            </div>
          </div>

          {/* Critical First-Aid Protocols */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-red-600" />
              <span>Immediate Life-Support Protocols (While Help is on the Way)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="block text-red-600 mb-1 font-semibold">❤️ Chest Pain / Heart Attack:</strong>
                Keep seated comfortably. Loosen tight collar. Chew 325 mg non-enteric aspirin if not allergic. Do not walk around.
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="block text-blue-600 mb-1 font-semibold">🧠 Suspected Stroke (BE-FAST):</strong>
                Note exact time. Do NOT give food or liquids. Keep head elevated slightly. Ensure clear airway.
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="block text-amber-600 mb-1 font-semibold">🩸 Severe Bleeding:</strong>
                Apply continuous firm pressure directly on wound using clean cloth. Elevate injured limb above heart level.
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-slate-400 text-center">
            MediCore Emergency Triage System • Real-Time GPS Geo-Coordinates Active (Bengaluru, IN)
          </p>
        </div>
      </div>
    </div>
  );
};
