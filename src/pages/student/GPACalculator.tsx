import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Plus, Trash2, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface CourseInput {
  id: string
  name: string
  credits: number
  grade: string
}

export default function StudentGPACalculator() {
  const { language } = useLanguage()
  const [courses, setCourses] = useState<CourseInput[]>([
    { id: '1', name: '', credits: 3, grade: 'A' },
  ])
  const [gpa, setGpa] = useState(0)

  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']

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
    return gradeMap[grade] || 0
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    courses.forEach((course) => {
      if (course.name && course.credits > 0) {
        const gradePoints = getGradePoints(course.grade)
        totalPoints += gradePoints * course.credits
        totalCredits += course.credits
      }
    })

    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0)
  }

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        name: '',
        credits: 3,
        grade: 'A',
      },
    ])
  }

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id))
    }
  }

  const updateCourse = (id: string, field: keyof CourseInput, value: string | number) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === 'ar' ? 'حاسبة المعدل التراكمي' : 'GPA Calculator'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {language === 'ar'
            ? 'احسب معدلك التراكمي بناءً على المقررات والدرجات'
            : 'Calculate your GPA based on courses and grades'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Form */}
        <div className="lg:col-span-2 space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'اسم المقرر' : 'Course Name'}
                  </label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder={language === 'ar' ? 'أدخل اسم المقرر' : 'Enter course name'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الساعات' : 'Credits'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={course.credits}
                    onChange={(e) =>
                      updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'ar' ? 'الدرجة' : 'Grade'}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            onClick={addCourse}
            className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-600 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة مقرر' : 'Add Course'}
          </button>

          <button
            onClick={calculateGPA}
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            {language === 'ar' ? 'حساب المعدل' : 'Calculate GPA'}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center"
          >
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <p className="text-sm opacity-90 mb-2">
              {language === 'ar' ? 'المعدل التراكمي' : 'GPA'}
            </p>
            <p className="text-6xl font-bold">{gpa.toFixed(2)}</p>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {language === 'ar' ? 'مقياس الدرجات' : 'Grade Scale'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">A+, A</span>
                <span className="font-semibold text-gray-900 dark:text-white">4.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">A-</span>
                <span className="font-semibold text-gray-900 dark:text-white">3.7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">B+</span>
                <span className="font-semibold text-gray-900 dark:text-white">3.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">B</span>
                <span className="font-semibold text-gray-900 dark:text-white">3.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">B-</span>
                <span className="font-semibold text-gray-900 dark:text-white">2.7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">C+</span>
                <span className="font-semibold text-gray-900 dark:text-white">2.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">C</span>
                <span className="font-semibold text-gray-900 dark:text-white">2.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">D</span>
                <span className="font-semibold text-gray-900 dark:text-white">1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">F</span>
                <span className="font-semibold text-gray-900 dark:text-white">0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

