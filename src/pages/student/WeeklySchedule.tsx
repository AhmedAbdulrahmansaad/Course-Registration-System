import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { Enrollment, Course } from '../../lib/database.types'

interface ScheduleSlot {
  day: string
  time: string
  course: Course
  location: string
}

export default function StudentWeeklySchedule() {
  const { userProfile } = useAuth()
  const { language } = useLanguage()
  const [enrollments, setEnrollments] = useState<(Enrollment & { courses: Course })[]>([])
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([])

  const days = language === 'ar'
    ? ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

  const timeSlots = [
    '08:00 - 09:30',
    '09:30 - 11:00',
    '11:00 - 12:30',
    '12:30 - 14:00',
    '14:00 - 15:30',
    '15:30 - 17:00',
  ]

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    if (!userProfile?.id) return

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses(*)
        `)
        .eq('user_id', userProfile.id)
        .eq('status', 'enrolled')

      if (error) throw error

      const enrolledCourses = (data as any) || []
      setEnrollments(enrolledCourses)

      // Generate sample schedule (in real app, this would come from database)
      const generatedSchedule: ScheduleSlot[] = []
      enrolledCourses.forEach((enrollment: any, index: number) => {
        const dayIndex = index % 5
        const timeIndex = Math.floor(index / 5) % timeSlots.length
        generatedSchedule.push({
          day: days[dayIndex],
          time: timeSlots[timeIndex],
          course: enrollment.courses,
          location: `Building ${String.fromCharCode(65 + (index % 3))} - Room ${101 + (index % 10)}`,
        })
      })

      setSchedule(generatedSchedule)
    } catch (error) {
      console.error('Error fetching schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScheduleForDay = (day: string) => {
    return schedule.filter((slot) => slot.day === day)
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
          {language === 'ar' ? 'الجدول الأسبوعي' : 'Weekly Schedule'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {language === 'ar'
            ? 'عرض جدولك الأسبوعي للمقررات المسجلة'
            : 'View your weekly schedule for enrolled courses'}
        </p>
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'ar'
              ? 'لا توجد مقررات مسجلة'
              : 'No enrolled courses'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-600 dark:bg-primary-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {language === 'ar' ? 'الوقت' : 'Time'}
                  </th>
                  {days.map((day) => (
                    <th key={day} className="px-6 py-4 text-left text-sm font-semibold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {timeSlot}
                    </td>
                    {days.map((day) => {
                      const daySchedule = getScheduleForDay(day).find(
                        (s) => s.time === timeSlot
                      )
                      return (
                        <td key={day} className="px-6 py-4">
                          {daySchedule ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-primary-100 dark:bg-primary-900 rounded-lg p-3 border-l-4 border-primary-600 dark:border-primary-400"
                            >
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {daySchedule.course.course_code}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {daySchedule.course.name}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <span>{daySchedule.location}</span>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="h-20"></div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course List */}
      {enrollments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'المقررات المسجلة' : 'Enrolled Courses'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="font-semibold text-gray-900 dark:text-white">
                  {enrollment.courses?.course_code}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {enrollment.courses?.name}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {enrollment.courses?.credit_hours}{' '}
                    {language === 'ar' ? 'ساعة' : 'hours'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

