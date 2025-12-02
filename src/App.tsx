import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import StudentDashboard from './pages/student/Dashboard'
import StudentCourses from './pages/student/Courses'
import StudentRegister from './pages/student/Register'
import StudentSchedule from './pages/student/Schedule'
import StudentRequests from './pages/student/Requests'
import StudentChat from './pages/student/Chat'
import AdvisorDashboard from './pages/advisor/Dashboard'
import AdvisorRequests from './pages/advisor/Requests'
import AdvisorStudents from './pages/advisor/Students'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCourses from './pages/admin/Courses'
import AdminStudents from './pages/admin/Students'
import AdminSettings from './pages/admin/Settings'
import AdminNotifications from './pages/admin/Notifications'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    userProfile?.role === 'student' ? (
                      <Navigate to="/student/dashboard" replace />
                    ) : userProfile?.role === 'advisor' ? (
                      <Navigate to="/advisor/dashboard" replace />
                    ) : userProfile?.role === 'admin' ? (
                      <Navigate to="/admin/dashboard" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                
                {/* Student Routes */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/courses" element={<StudentCourses />} />
                <Route path="/student/register" element={<StudentRegister />} />
                <Route path="/student/schedule" element={<StudentSchedule />} />
                <Route path="/student/requests" element={<StudentRequests />} />
                <Route path="/student/chat" element={<StudentChat />} />
                
                {/* Advisor Routes */}
                <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
                <Route path="/advisor/requests" element={<AdvisorRequests />} />
                <Route path="/advisor/students" element={<AdvisorStudents />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

