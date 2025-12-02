import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, GraduationCap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { Enrollment, Course } from '../../lib/database.types'

export default function StudentTranscript() {
  const { userProfile } = useAuth()
  const { t, language } = useLanguage()
  const [enrollments, setEnrollments] = useState<(Enrollment & { courses: Course })[]>([])
  const [loading, setLoading] = useState(true)
  const [gpa, setGpa] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)

  useEffect(() => {
    fetchTranscript()
  }, [])

  const fetchTranscript = async () => {
    if (!userProfile?.id) return

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses(*)
        `)
        .eq('user_id', userProfile.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })

      if (error) throw error

      const completedEnrollments = (data as any) || []
      setEnrollments(completedEnrollments)

      // Calculate GPA
      let totalPoints = 0
      let credits = 0

      completedEnrollments.forEach((enrollment: any) => {
        if (enrollment.grade && enrollment.courses) {
          const gradePoints = getGradePoints(enrollment.grade)
          const courseCredits = enrollment.courses.credit_hours || 0
          totalPoints += gradePoints * courseCredits
          credits += courseCredits
        }
      })

      setTotalCredits(credits)
      setGpa(credits > 0 ? totalPoints / credits : 0)
    } catch (error) {
      console.error('Error fetching transcript:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradePoints = (grade: string): number => {
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

  const handleDownload = () => {
    // Generate PDF or print transcript
    window.print()
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'السجل الأكاديمي' : 'Academic Transcript'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {language === 'ar'
              ? 'عرض جميع المقررات المكتملة والدرجات'
              : 'View all completed courses and grades'}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Download className="w-5 h-5" />
          {language === 'ar' ? 'تحميل' : 'Download'}
        </button>
      </div>

      {/* Student Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {language === 'ar' ? 'الاسم' : 'Name'}
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {userProfile?.full_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {language === 'ar' ? 'رقم الطالب' : 'Student ID'}
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {userProfile?.student_id || '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {language === 'ar' ? 'التخصص' : 'Major'}
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {userProfile?.major || '-'}
            </p>
          </div>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90 mb-2">
            {language === 'ar' ? 'المعدل التراكمي' : 'GPA'}
          </p>
          <p className="text-4xl font-bold">{gpa.toFixed(2)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90 mb-2">
            {language === 'ar' ? 'إجمالي الساعات' : 'Total Credits'}
          </p>
          <p className="text-4xl font-bold">{totalCredits}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-90 mb-2">
            {language === 'ar' ? 'المقررات المكتملة' : 'Completed Courses'}
          </p>
          <p className="text-4xl font-bold">{enrollments.length}</p>
        </motion.div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'ar' ? 'رمز المقرر' : 'Course Code'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'ar' ? 'اسم المقرر' : 'Course Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'ar' ? 'الساعات' : 'Credits'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'ar' ? 'الدرجة' : 'Grade'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {language === 'ar' ? 'النقاط' : 'Points'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {enrollments.map((enrollment) => {
                const gradePoints = enrollment.grade
                  ? getGradePoints(enrollment.grade)
                  : 0
                const courseCredits = enrollment.courses?.credit_hours || 0
                const points = gradePoints * courseCredits

                return (
                  <tr
                    key={enrollment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {enrollment.courses?.course_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {enrollment.courses?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {courseCredits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                      {enrollment.grade || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {enrollment.grade ? points.toFixed(2) : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {enrollments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'ar'
                ? 'لا توجد مقررات مكتملة'
                : 'No completed courses'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

