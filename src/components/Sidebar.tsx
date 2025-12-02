import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Calculator,
  Clock,
  User,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useState } from 'react'

export default function Sidebar() {
  const { userProfile, signOut } = useAuth()
  const { t, language } = useLanguage()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const role = userProfile?.role

  const studentNavItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
    { path: '/student/courses', icon: BookOpen, label: 'nav.courses' },
    { path: '/student/register', icon: FileText, label: 'nav.register' },
    { path: '/student/schedule', icon: Calendar, label: 'nav.schedule' },
    { path: '/student/weekly-schedule', icon: Clock, label: 'nav.weeklySchedule' },
    { path: '/student/transcript', icon: GraduationCap, label: 'nav.transcript' },
    { path: '/student/gpa-calculator', icon: Calculator, label: 'nav.gpaCalculator' },
    { path: '/student/requests', icon: FileText, label: 'nav.requests' },
    { path: '/student/profile', icon: User, label: 'nav.profile' },
    { path: '/student/chat', icon: MessageSquare, label: 'nav.chat' },
  ]

  const advisorNavItems = [
    { path: '/advisor/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
    { path: '/advisor/requests', icon: FileText, label: 'nav.requests' },
    { path: '/advisor/students', icon: Users, label: 'nav.students' },
  ]

  const adminNavItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
    { path: '/admin/courses', icon: BookOpen, label: 'nav.courses' },
    { path: '/admin/students', icon: Users, label: 'nav.students' },
    { path: '/admin/majors-levels', icon: Settings, label: 'nav.majorsLevels' },
    { path: '/admin/settings', icon: Settings, label: 'nav.settings' },
    { path: '/admin/notifications', icon: Bell, label: 'nav.notifications' },
  ]

  const navItems =
    role === 'student'
      ? studentNavItems
      : role === 'advisor'
      ? advisorNavItems
      : adminNavItems

  const handleLogout = async () => {
    await signOut()
  }

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
          KKU System
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {userProfile?.full_name}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.label)}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">{sidebarContent}</aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <motion.aside
          initial={{ x: language === 'ar' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: language === 'ar' ? '100%' : '-100%' }}
          className="lg:hidden fixed inset-y-0 left-0 z-40 w-64"
        >
          {sidebarContent}
        </motion.aside>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

