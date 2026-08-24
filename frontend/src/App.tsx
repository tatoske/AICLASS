import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './views/DashboardView';
import { CoursesView } from './views/CoursesView';
import { GradebookView } from './views/GradebookView';
import { TasksView } from './views/TasksView';
import { AttendanceView } from './views/AttendanceView';
import { ObserverView } from './views/ObserverView';
import { StrengthsView } from './views/StrengthsView';
import { PsicoView } from './views/PsicoView';
import { AdmissionsView } from './views/AdmissionsView';
import { FinanceView } from './views/FinanceView';
import { CanteenView } from './views/CanteenView';
import { InfirmaryView } from './views/InfirmaryView';
import { ChatView } from './views/ChatView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { UsersView } from './views/UsersView';
import { EnrollmentView } from './views/EnrollmentView';
import { ReportsView } from './views/ReportsView';
import { DashboardRectorView } from './views/DashboardRectorView';
import { InventoryView } from './views/InventoryView';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserSwitcher } from './components/UserSwitcher';
import { LoginView } from './views/LoginView';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <div className="flex justify-end p-4 border-b border-[var(--border-color)] bg-[var(--bg-dark)] sticky top-0 z-40">
            <UserSwitcher />
          </div>
          <Navbar title="AIClass Suite Educativa" subtitle="Plataforma de Gestión Escolar y Analítica Predictiva IA" />
          <main className="page-body">
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/dashboard-rector" element={<DashboardRectorView />} />
              <Route path="/courses" element={<CoursesView />} />
              <Route path="/gradebook" element={<GradebookView />} />
              <Route path="/tasks" element={<TasksView />} />
              <Route path="/attendance" element={<AttendanceView />} />
              <Route path="/observer" element={<ObserverView />} />
              <Route path="/strengths" element={<StrengthsView />} />
              <Route path="/psico" element={<PsicoView />} />
              <Route path="/admissions" element={<AdmissionsView />} />
              <Route path="/finance" element={<FinanceView />} />
              <Route path="/canteen" element={<CanteenView />} />
              <Route path="/infirmary" element={<InfirmaryView />} />
              <Route path="/chat" element={<ChatView />} />
              <Route path="/announcements" element={<AnnouncementsView />} />
              <Route path="/users" element={<UsersView />} />
              <Route path="/enrollment" element={<EnrollmentView />} />
              <Route path="/reports" element={<ReportsView />} />
              <Route path="/inventory" element={<InventoryView />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
