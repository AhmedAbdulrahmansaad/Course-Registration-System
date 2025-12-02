import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'

export default function AdvisorDashboard() {
  const { userProfile } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    pendingRequests: 0,
    totalStudents: 0,
    approvedRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [requestsRes, studentsRes] = await Promise.all([
        supabase.from('requests').select('*'),
        supabase.from('users').select('*').eq('role', 'student'),
      ])

      const requests = requestsRes.data || []
      const students = studentsRes.data || []

      setStats({
        pendingRequests: requests.filter((r) => r.status === 'pending').length,
        totalStudents: students.length,
        approvedRequests: requests.filter((r) => r.status === 'approved').length,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Clock,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Approved Requests',
      value: stats.approvedRequests,
      icon: FileText,
      color: 'bg-green-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcome')}, {userProfile?.full_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Advisor Dashboard Overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

