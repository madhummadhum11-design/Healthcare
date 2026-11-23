// MediCore AI - Healthcare State Management Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VitalSign, Appointment, MedicationReminder, MedicalReport, NotificationItem } from '../types';
import { INITIAL_VITALS } from '../data/defaultVitals';
import { SAMPLE_REPORTS } from '../data/sampleReports';

interface HealthcareContextType {
  vitals: VitalSign[];
  addVital: (vital: Omit<VitalSign, 'id'>) => void;
  getLatestVital: (type: VitalSign['type']) => VitalSign | undefined;

  appointments: Appointment[];
  bookAppointment: (appData: Omit<Appointment, 'id' | 'status'>) => Appointment;
  cancelAppointment: (id: string, reason: string) => void;

  medications: MedicationReminder[];
  toggleMedicationTaken: (id: string) => void;
  addMedicationReminder: (med: Omit<MedicationReminder, 'id' | 'takenToday'>) => void;
  adherenceRate: number;

  reports: MedicalReport[];
  addReport: (report: MedicalReport) => void;
  deleteReport: (id: string) => void;

  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;

  activeVideoConsultation: Appointment | null;
  startVideoConsultation: (app: Appointment) => void;
  endVideoConsultation: () => void;

  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
}

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arvind Swaminathan',
    doctorSpecialty: 'Cardiologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    hospital: 'Apollo Institute of Cardiac Sciences',
    patientName: 'John Doe',
    date: '2026-11-25',
    timeSlot: '11:00 AM',
    type: 'video',
    status: 'confirmed',
    fee: 1200,
    symptoms: 'Routine 6-month blood pressure and cardiovascular checkup'
  },
  {
    id: 'app-2',
    doctorId: 'doc-3',
    doctorName: 'Dr. Rajeshwari Iyer',
    doctorSpecialty: 'Endocrinologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    hospital: 'Fortis Hospital, Bannerghatta',
    patientName: 'John Doe',
    date: '2026-11-29',
    timeSlot: '02:00 PM',
    type: 'in-person',
    status: 'confirmed',
    fee: 1100,
    symptoms: 'Follow-up on fasting glucose (112 mg/dL) and prediabetes dietary optimization'
  },
  {
    id: 'app-3',
    doctorId: 'doc-2',
    doctorName: 'Dr. Meera Nambiar',
    doctorSpecialty: 'General Physician',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813583-36652425e791?auto=format&fit=crop&q=80&w=400',
    hospital: 'Manipal Hospital, Old Airport Road',
    patientName: 'John Doe',
    date: '2026-10-14',
    timeSlot: '10:00 AM',
    type: 'video',
    status: 'completed',
    fee: 800,
    symptoms: 'Seasonal allergic rhinitis and dry cough',
    notes: 'Prescribed Cetirizine 10mg daily and saline nasal spray. Advised avoiding early morning dust exposure.'
  }
];

const DEFAULT_MED_REMINDERS: MedicationReminder[] = [
  {
    id: 'rem-1',
    medicineName: 'Losartan Potassium',
    dosage: '50 mg Tablet',
    timeOfDay: 'Morning',
    time: '08:00 AM',
    takenToday: true,
    takenAt: '08:15 AM',
    foodRelation: 'After Food',
    frequency: 'Once Daily',
    instructions: 'Take with full glass of water after breakfast'
  },
  {
    id: 'rem-2',
    medicineName: 'Metformin Hydrochloride',
    dosage: '500 mg Tablet',
    timeOfDay: 'Morning',
    time: '08:30 AM',
    takenToday: true,
    takenAt: '08:32 AM',
    foodRelation: 'With Food',
    frequency: 'Twice Daily',
    instructions: 'Take during or immediately after meals'
  },
  {
    id: 'rem-3',
    medicineName: 'Metformin Hydrochloride',
    dosage: '500 mg Tablet',
    timeOfDay: 'Night',
    time: '08:30 PM',
    takenToday: false,
    foodRelation: 'With Food',
    frequency: 'Twice Daily',
    instructions: 'Take with dinner'
  },
  {
    id: 'rem-4',
    medicineName: 'Atorvastatin Calcium',
    dosage: '10 mg Tablet',
    timeOfDay: 'Night',
    time: '09:30 PM',
    takenToday: false,
    foodRelation: 'Anytime',
    frequency: 'Once Daily at Bedtime',
    instructions: 'Take before sleep'
  }
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Video Consultation',
    message: 'Your tele-health consultation with Dr. Arvind Swaminathan (Cardiologist) is scheduled for Nov 25 at 11:00 AM.',
    timestamp: '10 mins ago',
    type: 'appointment',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Medication Reminder (Evening)',
    message: 'Upcoming: Metformin 500mg and Atorvastatin 10mg scheduled for tonight with dinner.',
    timestamp: '1 hour ago',
    type: 'medication',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Vitals Health Insight',
    message: 'Your morning resting Blood Pressure reading (124/82 mmHg) is slightly elevated. Keep up sodium restriction.',
    timestamp: '3 hours ago',
    type: 'vitals',
    read: true
  },
  {
    id: 'notif-4',
    title: 'New Medical Report Analyzed',
    message: 'Comprehensive Lipid & Metabolic Profile report has been analyzed. 2 biomarkers require attention.',
    timestamp: 'Yesterday',
    type: 'report',
    read: true
  }
];

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const HealthcareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vitals, setVitals] = useState<VitalSign[]>(() => {
    const saved = localStorage.getItem('medicore_vitals');
    return saved ? JSON.parse(saved) : INITIAL_VITALS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('medicore_appointments');
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  });

  const [medications, setMedications] = useState<MedicationReminder[]>(() => {
    const saved = localStorage.getItem('medicore_medications');
    return saved ? JSON.parse(saved) : DEFAULT_MED_REMINDERS;
  });

  const [reports, setReports] = useState<MedicalReport[]>(() => {
    const saved = localStorage.getItem('medicore_reports');
    return saved ? JSON.parse(saved) : SAMPLE_REPORTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('medicore_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [activeVideoConsultation, setActiveVideoConsultation] = useState<Appointment | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('medicore_vitals', JSON.stringify(vitals));
  }, [vitals]);

  useEffect(() => {
    localStorage.setItem('medicore_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medicore_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('medicore_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('medicore_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addVital = (newVitalData: Omit<VitalSign, 'id'>) => {
    const newVital: VitalSign = {
      ...newVitalData,
      id: `v-${Date.now()}`
    };
    setVitals((prev) => [newVital, ...prev]);

    // Check if reading is critical or abnormal to add an alert notification
    if (newVital.status === 'critical' || newVital.status === 'elevated') {
      addNotification({
        title: `Health Parameter Notice: ${newVital.type.toUpperCase()}`,
        message: `Recorded ${newVital.value} ${newVital.unit} (${newVital.status}). Logged at ${new Date(newVital.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
        type: 'vitals'
      });
    }
  };

  const getLatestVital = (type: VitalSign['type']) => {
    return vitals.find((v) => v.type === type);
  };

  const bookAppointment = (appData: Omit<Appointment, 'id' | 'status'>): Appointment => {
    const newApp: Appointment = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'confirmed'
    };
    setAppointments((prev) => [newApp, ...prev]);
    addNotification({
      title: 'Appointment Confirmed',
      message: `Consultation with ${newApp.doctorName} confirmed for ${newApp.date} at ${newApp.timeSlot}.`,
      type: 'appointment'
    });
    return newApp;
  };

  const cancelAppointment = (id: string, reason: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'cancelled', cancelReason: reason } : app))
    );
    addNotification({
      title: 'Appointment Cancelled',
      message: `Your appointment has been cancelled. Refund will be processed if applicable.`,
      type: 'appointment'
    });
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const nextState = !med.takenToday;
          return {
            ...med,
            takenToday: nextState,
            takenAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
          };
        }
        return med;
      })
    );
  };

  const addMedicationReminder = (med: Omit<MedicationReminder, 'id' | 'takenToday'>) => {
    const newMed: MedicationReminder = {
      ...med,
      id: `rem-${Date.now()}`,
      takenToday: false
    };
    setMedications((prev) => [...prev, newMed]);
  };

  // Medication adherence calculation
  const takenCount = medications.filter((m) => m.takenToday).length;
  const adherenceRate = medications.length > 0 ? Math.round((takenCount / medications.length) * 100) : 100;

  const addReport = (report: MedicalReport) => {
    setReports((prev) => [report, ...prev]);
    addNotification({
      title: 'Medical Report Added',
      message: `${report.title} analyzed. Identified ${report.biomarkers.length} biomarker indicators.`,
      type: 'report'
    });
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const startVideoConsultation = (app: Appointment) => {
    setActiveVideoConsultation(app);
  };

  const endVideoConsultation = () => {
    setActiveVideoConsultation(null);
  };

  return (
    <HealthcareContext.Provider
      value={{
        vitals,
        addVital,
        getLatestVital,
        appointments,
        bookAppointment,
        cancelAppointment,
        medications,
        toggleMedicationTaken,
        addMedicationReminder,
        adherenceRate,
        reports,
        addReport,
        deleteReport,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        activeVideoConsultation,
        startVideoConsultation,
        endVideoConsultation,
        emergencyModalOpen,
        setEmergencyModalOpen
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
};

export const useHealthcare = () => {
  const context = useContext(HealthcareContext);
  if (!context) throw new Error('useHealthcare must be used within a HealthcareProvider');
  return context;
};
