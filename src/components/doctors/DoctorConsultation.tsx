import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  User,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Filter,
  FileUp,
  X,
  Phone
} from 'lucide-react';
import { Doctor, Specialty, Appointment } from '../../types';
import { DOCTORS_DATA } from '../../data/doctors';
import { useHealthcare } from '../../context/HealthcareContext';
import { useAuth } from '../../context/AuthContext';

export const DoctorConsultation: React.FC = () => {
  const { user } = useAuth();
  const { bookAppointment, startVideoConsultation, appointments } = useHealthcare();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Booking Modal State
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('2026-11-26');
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'video' | 'in-person'>('video');
  const [symptomsInput, setSymptomsInput] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  const specialties: string[] = [
    'All',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Orthopedic',
    'Pediatrician',
    'Gynecologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Psychiatrist',
    'Endocrinologist',
    'Gastroenterologist',
    'Pulmonologist',
    'Oncologist'
  ];

  // Filter doctors
  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchDoctor.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchDoctor.toLowerCase()) ||
      doc.hospitalAffiliation.toLowerCase().includes(searchDoctor.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleOpenBooking = (doc: Doctor) => {
    setBookingDoctor(doc);
    setBookingSlot(doc.slots[0] || '10:00 AM');
    setSymptomsInput('');
    setBookingSuccess(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDoctor) return;

    const newApp = bookAppointment({
      doctorId: bookingDoctor.id,
      doctorName: bookingDoctor.name,
      doctorSpecialty: bookingDoctor.specialty,
      doctorAvatar: bookingDoctor.avatar,
      hospital: bookingDoctor.hospitalAffiliation,
      patientName: user.name,
      date: bookingDate,
      timeSlot: bookingSlot,
      type: consultationType,
      fee: bookingDoctor.consultationFee,
      symptoms: symptomsInput || 'General clinical consultation and health assessment'
    });

    setBookingSuccess(newApp);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Doctor Consultation & Telehealth</h1>
              <p className="text-xs text-slate-500">
                Book verified appointments with accredited medical specialists
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            placeholder="Search doctors, hospitals..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Specialties Filter Carousel */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedSpecialty === spec
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Active Consultations Bar if user has upcoming appointments */}
      {appointments.filter((a) => a.status === 'confirmed').length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                You have {appointments.filter((a) => a.status === 'confirmed').length} active appointment(s)
              </div>
              <div className="text-[11px] text-slate-600">
                Next: {appointments[0].doctorName} ({appointments[0].date} at {appointments[0].timeSlot})
              </div>
            </div>
          </div>

          <button
            onClick={() => startVideoConsultation(appointments[0])}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2 shrink-0"
          >
            <Video className="w-4 h-4" />
            <span>Open Telehealth Room</span>
          </button>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Doctor Header */}
              <div className="flex items-start space-x-3.5">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-50 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h3>
                    {doc.verified && (
                      <span title="Verified Specialist">
                        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-blue-600">{doc.specialty}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{doc.qualifications}</div>
                  <div className="text-[11px] text-slate-600 font-medium mt-1 flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{doc.rating}</span>
                    <span className="text-slate-400">({doc.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {doc.about}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{doc.hospitalAffiliation}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Experience: <strong className="text-slate-700">{doc.experienceYears} Years</strong></span>
                  <span className="text-slate-500">Consultation Fee: <strong className="text-slate-900 text-xs">₹{doc.consultationFee}</strong></span>
                </div>
              </div>

              {/* Slots Preview */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Available Slots Today
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {doc.slots.slice(0, 3).map((slot, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded-md text-[11px] border border-slate-200"
                    >
                      {slot}
                    </span>
                  ))}
                  {doc.slots.length > 3 && (
                    <span className="px-2 py-0.5 text-slate-400 text-[11px]">
                      +{doc.slots.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center space-x-2">
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition"
              >
                View Profile
              </button>
              <button
                onClick={() => handleOpenBooking(doc)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedDoctor.avatar}
                    alt={selectedDoctor.name}
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-bold text-slate-900">{selectedDoctor.name}</h2>
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-blue-600">{selectedDoctor.specialty}</div>
                    <div className="text-xs text-slate-500">{selectedDoctor.qualifications}</div>
                    <div className="text-xs text-teal-700 font-semibold mt-1">
                      {selectedDoctor.experienceYears} Years Clinical Experience • ⭐ {selectedDoctor.rating} ({selectedDoctor.reviewCount} verified reviews)
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  About Physician
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedDoctor.about}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Hospital Affiliation</span>
                  <span className="font-bold text-slate-800">{selectedDoctor.hospitalAffiliation}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">Consultation Fee</span>
                  <span className="font-bold text-slate-800 text-sm">₹{selectedDoctor.consultationFee}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Languages Spoken
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoctor.languages.map((l, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Available Consultation Days
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.availableDays.map((d, i) => (
                    <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const doc = selectedDoctor;
                    setSelectedDoctor(null);
                    handleOpenBooking(doc);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Booking Wizard Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {bookingSuccess ? (
              /* Success Screen */
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your appointment with <strong>{bookingSuccess.doctorName}</strong> is scheduled for{' '}
                  <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.timeSlot}</strong>.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Appointment ID:</span>
                    <span className="font-mono font-bold text-slate-800">{bookingSuccess.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultation Type:</span>
                    <span className="font-semibold text-blue-600 capitalize">{bookingSuccess.type} Consultation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fee:</span>
                    <span className="font-bold text-slate-900">₹{bookingSuccess.fee}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setBookingDoctor(null)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Done
                  </button>
                  {bookingSuccess.type === 'video' && (
                    <button
                      onClick={() => {
                        const app = bookingSuccess;
                        setBookingDoctor(null);
                        startVideoConsultation(app);
                      }}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
                    >
                      <Video className="w-4 h-4" />
                      <span>Test Video Room</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Book Appointment</h3>
                    <p className="text-xs text-slate-500">{bookingDoctor.name} ({bookingDoctor.specialty})</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingDoctor(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Consultation Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultationType('video')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                        consultationType === 'video'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Video Consultation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultationType('in-person')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                        consultationType === 'in-person'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>In-Clinic Visit</span>
                    </button>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Consultation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Available Slots */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Available Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {bookingDoctor.slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingSlot(slot)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition ${
                          bookingSlot === slot
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms / Chief Complaint */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Symptoms or Clinical Questions
                  </label>
                  <textarea
                    rows={2}
                    value={symptomsInput}
                    onChange={(e) => setSymptomsInput(e.target.value)}
                    placeholder="Describe symptoms, duration, or reason for consultation..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Fee & Confirmation */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Consultation Fee</span>
                    <span className="text-base font-extrabold text-slate-900">₹{bookingDoctor.consultationFee}</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition"
                  >
                    Confirm & Book
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
