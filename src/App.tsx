import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Landing from './pages/Landing'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import StudentDashboard from './pages/student/Dashboard'
import StudentCourses from './pages/student/Courses'
import StudentRegister from './pages/student/Register'
import StudentSchedule from './pages/student/Schedule'
import StudentRequests from './pages/student/Requests'
import StudentChat from './pages/student/Chat'
import StudentTranscript from './pages/student/Transcript'
import StudentGPACalculator from './pages/student/GPACalculator'
import StudentWeeklySchedule from './pages/student/WeeklySchedule'
import StudentProfile from './pages/student/Profile'
import AdvisorDashboard from './pages/advisor/Dashboard'
import AdvisorRequests from './pages/advisor/Requests'
import AdvisorStudents from './pages/advisor/Students'
import AdvisorStudentDetails from './pages/advisor/StudentDetails'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCourses from './pages/admin/Courses'
import AdminStudents from './pages/admin/Students'
import AdminSettings from './pages/admin/Settings'
import AdminNotifications from './pages/admin/Notifications'
import AdminMajorsLevels from './pages/admin/MajorsLevels'
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
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
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
                <Route path="/student/weekly-schedule" element={<StudentWeeklySchedule />} />
                <Route path="/student/requests" element={<StudentRequests />} />
                <Route path="/student/transcript" element={<StudentTranscript />} />
                <Route path="/student/gpa-calculator" element={<StudentGPACalculator />} />
                <Route path="/student/profile" element={<StudentProfile />} />
                <Route path="/student/chat" element={<StudentChat />} />
                
                {/* Advisor Routes */}
                <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
                <Route path="/advisor/requests" element={<AdvisorRequests />} />
                <Route path="/advisor/students" element={<AdvisorStudents />} />
                <Route path="/advisor/students/:id" element={<AdvisorStudentDetails />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/admin/majors-levels" element={<AdminMajorsLevels />} />
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

