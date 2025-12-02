import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Mail, GraduationCap, BookOpen, FileText } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { User, Enrollment, Course, Request } from '../../lib/database.types'

export default function AdvisorStudentDetails() {
  const { id } = useParams<{ id: string }>()
  const { language } = useLanguage()
  const [student, setStudent] = useState<User | null>(null)
  const [enrollments, setEnrollments] = useState<(Enrollment & { courses: Course })[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchStudentData()
    }
  }, [id])

  const fetchStudentData = async () => {
    if (!id) return

    try {
      const [studentRes, enrollmentsRes, requestsRes] = await Promise.all([
        supabase.from('users').select('*').eq('id', id).single(),
        supabase
          .from('enrollments')
          .select(`
            *,
            courses(*)
          `)
          .eq('user_id', id),
        supabase.from('requests').select('*').eq('user_id', id).order('created_at', { ascending: false }),
      ])

      if (studentRes.error) throw studentRes.error
      if (enrollmentsRes.error) throw enrollmentsRes.error
      if (requestsRes.error) throw requestsRes.error

      setStudent(studentRes.data)
      setEnrollments((enrollmentsRes.data as any) || [])
      setRequests(requestsRes.data || [])
    } catch (error) {
      console.error('Error fetching student data:', error)
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

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          {language === 'ar' ? 'الطالب غير موجود' : 'Student not found'}
        </p>
        <Link
          to="/advisor/students"
          className="mt-4 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'ar' ? 'العودة إلى قائمة الطلاب' : 'Back to Students List'}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/advisor/students"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'تفاصيل الطالب' : 'Student Details'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {student.full_name}
          </p>
        </div>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'الاسم' : 'Name'}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {student.full_name}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {student.email}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'رقم الطالب' : 'Student ID'}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {student.student_id || '-'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'المستوى' : 'Level'}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {student.level || '-'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enrollments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'ar' ? 'المقررات المسجلة' : 'Enrolled Courses'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  {language === 'ar' ? 'رمز المقرر' : 'Course Code'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  {language === 'ar' ? 'اسم المقرر' : 'Course Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  {language === 'ar' ? 'الساعات' : 'Credits'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {enrollment.courses?.course_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {enrollment.courses?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {enrollment.courses?.credit_hours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        enrollment.status === 'enrolled'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : enrollment.status === 'completed'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {enrollments.length === 0 && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {language === 'ar' ? 'لا توجد مقررات مسجلة' : 'No enrolled courses'}
          </p>
        )}
      </div>

      {/* Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'ar' ? 'الطلبات' : 'Requests'}
        </h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {request.type.toUpperCase()} Request
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'approved'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : request.status === 'rejected'
                      ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        {requests.length === 0 && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {language === 'ar' ? 'لا توجد طلبات' : 'No requests'}
          </p>
        )}
      </div>
    </div>
  )
}

