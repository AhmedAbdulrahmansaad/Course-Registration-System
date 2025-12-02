import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, FileText, TrendingUp } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { Enrollment, Course } from '../../lib/database.types'

export default function StudentDashboard() {
  const { userProfile } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    gpa: 0,
    totalCredits: 0,
    enrolledCourses: 0,
    pendingRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    if (!userProfile?.id) return

    try {
      // Fetch enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses(*)
        `)
        .eq('user_id', userProfile.id)
        .eq('status', 'enrolled')

      // Fetch pending requests
      const { data: requests } = await supabase
        .from('requests')
        .select('*')
        .eq('user_id', userProfile.id)
        .eq('status', 'pending')

      // Calculate GPA and total credits
      const { data: allEnrollments } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses(*)
        `)
        .eq('user_id', userProfile.id)
        .eq('status', 'completed')
        .not('grade', 'is', null)

      let totalPoints = 0
      let totalCredits = 0

      allEnrollments?.forEach((enrollment: any) => {
        const grade = enrollment.grade
        const credits = enrollment.courses?.credit_hours || 0
        const points = getGradePoints(grade) * credits
        totalPoints += points
        totalCredits += credits
      })

      const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0

      setStats({
        gpa: parseFloat(gpa.toFixed(2)),
        totalCredits: enrollments?.reduce((sum, e: any) => sum + (e.courses?.credit_hours || 0), 0) || 0,
        enrolledCourses: enrollments?.length || 0,
        pendingRequests: requests?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradePoints = (grade: string | null): number => {
    if (!grade) return 0
    const gradeMap: Record<string, number> = {
      'A+': 4.0,
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0,
    }
    return gradeMap[grade.toUpperCase()] || 0
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
      title: t('dashboard.gpa'),
      value: stats.gpa.toFixed(2),
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: t('dashboard.totalCredits'),
      value: stats.totalCredits,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: t('dashboard.enrolledCourses'),
      value: stats.enrolledCourses,
      icon: GraduationCap,
      color: 'bg-purple-500',
    },
    {
      title: t('dashboard.pendingRequests'),
      value: stats.pendingRequests,
      icon: FileText,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcome')}, {userProfile?.full_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's an overview of your academic progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

