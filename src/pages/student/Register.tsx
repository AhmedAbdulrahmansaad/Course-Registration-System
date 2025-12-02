import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { Course, Enrollment } from '../../lib/database.types'

export default function StudentRegister() {
  const { userProfile } = useAuth()
  const { t } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    if (!userProfile?.id) return

    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        supabase.from('courses').select('*').order('course_code'),
        supabase
          .from('enrollments')
          .select(`
            *
          `)
          .eq('user_id', userProfile.id)
          .eq('status', 'enrolled'),
      ])

      if (coursesRes.error) throw coursesRes.error
      if (enrollmentsRes.error) throw enrollmentsRes.error

      setCourses(coursesRes.data || [])
      setEnrollments(enrollmentsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (courseId: string) => {
    if (!userProfile?.id) return

    setRegistering(courseId)
    setMessage(null)

    try {
      // Check if already enrolled
      const existing = enrollments.find((e) => e.course_id === courseId)
      if (existing) {
        setMessage({ type: 'error', text: 'You are already enrolled in this course' })
        setRegistering(null)
        return
      }

      // Create enrollment
      const { error } = await supabase.from('enrollments').insert({
        user_id: userProfile.id,
        course_id: courseId,
        status: 'enrolled',
      })

      if (error) throw error

      // Create add request
      await supabase.from('requests').insert({
        user_id: userProfile.id,
        type: 'add',
        course_id: courseId,
        status: 'pending',
      })

      setMessage({ type: 'success', text: 'Registration request submitted successfully' })
      fetchData()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to register' })
    } finally {
      setRegistering(null)
    }
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.course_id === courseId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('nav.register')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Register for courses for the upcoming semester
        </p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const enrolled = isEnrolled(course.id)
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {course.course_code}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Level {course.level}
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {course.name}
              </h4>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{course.credit_hours}</span> credit hours
                </div>
              </div>

              <button
                onClick={() => handleRegister(course.id)}
                disabled={enrolled || registering === course.id}
                className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  enrolled
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                {enrolled
                  ? t('courses.enrolled')
                  : registering === course.id
                  ? t('common.loading')
                  : t('courses.register')}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

