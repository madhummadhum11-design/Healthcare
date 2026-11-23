import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthcareProvider, useHealthcare } from './context/HealthcareContext';
import { Sidebar, NavSection } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { EmergencyModal } from './components/layout/EmergencyModal';
import { VideoConsultationModal } from './components/doctors/VideoConsultationModal';
import { AddVitalModal } from './components/vitals/AddVitalModal';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';

// Role Dashboards
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { DashboardOverview } from './components/dashboard/DashboardOverview';

// Healthcare Modules
import { AIChatbot } from './components/chat/AIChatbot';
import { DoctorConsultation } from './components/doctors/DoctorConsultation';
import { HealthParameters } from './components/vitals/HealthParameters';
import { NearbyFacilities } from './components/nearby/NearbyFacilities';
import { MedicalKnowledgeCenter } from './components/encyclopedia/MedicalKnowledgeCenter';
import { MedicalReportAnalyzer } from './components/reports/MedicalReportAnalyzer';
import { MedicineDirectory } from './components/medicines/MedicineDirectory';
import { AppointmentsManager } from './components/appointments/AppointmentsManager';
import { HealthRecordsLocker } from './components/records/HealthRecordsLocker';
import { NotificationsCenter } from './components/notifications/NotificationsCenter';
import { PatientProfileSettings } from './components/profile/PatientProfileSettings';
import { VitalSign } from './types';

const MainLayout: React.FC = () => {
  const { role } = useAuth();
  const { activeVideoConsultation, endVideoConsultation } = useHealthcare();

  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Add vital modal state
  const [addVitalOpen, setAddVitalOpen] = useState(false);
  const [addVitalType, setAddVitalType] = useState<VitalSign['type']>('bp');

  const handleOpenAddVital = (type?: VitalSign['type']) => {
    if (type) setAddVitalType(type);
    setAddVitalOpen(true);
  };

  const handleGlobalSearch = (q: string) => {
    setSearchQuery(q);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex text-[#172B4D]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(sec) => setCurrentSection(sec)}
        isOpenMobile={isOpenMobile}
        onToggleMobile={() => setIsOpenMobile(!isOpenMobile)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        <Header
          currentSection={currentSection}
          onToggleMobile={() => setIsOpenMobile(!isOpenMobile)}
          onNavigate={(sec) => setCurrentSection(sec)}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={(lang) => setSelectedLanguage(lang)}
          searchQuery={searchQuery}
          onSearchChange={handleGlobalSearch}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentSection === 'dashboard' && (
            <>
              {role === 'doctor' ? (
                <DoctorDashboard />
              ) : role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <DashboardOverview
                  onNavigate={(sec) => setCurrentSection(sec)}
                  onOpenAddVital={handleOpenAddVital}
                />
              )}
            </>
          )}

          {currentSection === 'chat' && (
            <AIChatbot
              currentLanguage={selectedLanguage}
              onLanguageChange={(lang) => setSelectedLanguage(lang)}
              onNavigateToSection={(sec) => setCurrentSection(sec as any)}
            />
          )}

          {currentSection === 'doctors' && <DoctorConsultation />}

          {currentSection === 'vitals' && (
            <HealthParameters onOpenAddVital={handleOpenAddVital} />
          )}

          {currentSection === 'nearby' && <NearbyFacilities />}

          {currentSection === 'encyclopedia' && <MedicalKnowledgeCenter />}

          {currentSection === 'reports' && <MedicalReportAnalyzer />}

          {currentSection === 'medicines' && <MedicineDirectory />}

          {currentSection === 'appointments' && (
            <AppointmentsManager onNavigateToDoctors={() => setCurrentSection('doctors')} />
          )}

          {currentSection === 'records' && <HealthRecordsLocker />}

          {currentSection === 'notifications' && <NotificationsCenter />}

          {currentSection === 'profile' && <PatientProfileSettings />}
        </main>
      </div>

      {/* High-Priority Emergency Triage Modal */}
      <EmergencyModal onNavigateToNearby={() => setCurrentSection('nearby')} />

      {/* Telehealth Video Consultation Room */}
      {activeVideoConsultation && (
        <VideoConsultationModal
          appointment={activeVideoConsultation}
          onClose={endVideoConsultation}
        />
      )}

      {/* Record Health Parameter Modal */}
      <AddVitalModal
        isOpen={addVitalOpen}
        onClose={() => setAddVitalOpen(false)}
        initialType={addVitalType}
      />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isLoggedIn, authView } = useAuth();

  // If not authenticated or currently in an auth view (login, register, forgot/reset password)
  if (!isLoggedIn || authView !== 'authenticated') {
    switch (authView) {
      case 'register':
        return <RegisterPage />;
      case 'forgot_password':
        return <ForgotPasswordPage />;
      case 'reset_password':
        return <ResetPasswordPage />;
      case 'login':
      default:
        return <LoginPage />;
    }
  }

  return <MainLayout />;
};

export function App() {
  return (
    <AuthProvider>
      <HealthcareProvider>
        <AppContent />
      </HealthcareProvider>
    </AuthProvider>
  );
}

export default App;
