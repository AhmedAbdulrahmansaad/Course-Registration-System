import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, Edit, Trash2, GraduationCap } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'

interface Major {
  id: string
  name: string
  code: string
}

export default function AdminMajorsLevels() {
  const { language } = useLanguage()
  const [majors, setMajors] = useState<Major[]>([])
  const [levels, setLevels] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8])
  const [loading, setLoading] = useState(true)
  const [showMajorModal, setShowMajorModal] = useState(false)
  const [editingMajor, setEditingMajor] = useState<Major | null>(null)
  const [majorForm, setMajorForm] = useState({ name: '', code: '' })

  useEffect(() => {
    fetchMajors()
  }, [])

  const fetchMajors = async () => {
    try {
      // In a real app, you'd have a majors table
      // For now, we'll use system_settings to store majors
      const { data } = await supabase
        .from('system_settings')
        .select('*')
        .eq('key', 'majors')
        .single()

      if (data) {
        setMajors((data.value as any) || [])
      }
    } catch (error) {
      console.error('Error fetching majors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveMajor = async () => {
    try {
      const updatedMajors = editingMajor
        ? majors.map((m) => (m.id === editingMajor.id ? { ...majorForm, id: editingMajor.id } : m))
        : [...majors, { ...majorForm, id: Date.now().toString() }]

      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key: 'majors',
          value: updatedMajors,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setMajors(updatedMajors)
      setShowMajorModal(false)
      setEditingMajor(null)
      setMajorForm({ name: '', code: '' })
    } catch (error: any) {
      console.error('Error saving major:', error)
      alert(error.message || 'Failed to save major')
    }
  }

  const handleDeleteMajor = async (id: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return

    try {
      const updatedMajors = majors.filter((m) => m.id !== id)
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          key: 'majors',
          value: updatedMajors,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      setMajors(updatedMajors)
    } catch (error: any) {
      console.error('Error deleting major:', error)
      alert(error.message || 'Failed to delete major')
    }
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
            {language === 'ar' ? 'إدارة التخصصات والمستويات' : 'Manage Majors & Levels'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {language === 'ar'
              ? 'إدارة التخصصات والمستويات الأكاديمية'
              : 'Manage academic majors and levels'}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMajor(null)
            setMajorForm({ name: '', code: '' })
            setShowMajorModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة تخصص' : 'Add Major'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Majors */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'التخصصات' : 'Majors'}
            </h2>
          </div>
          <div className="space-y-3">
            {majors.map((major) => (
              <div
                key={major.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {major.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'الكود' : 'Code'}: {major.code}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingMajor(major)
                      setMajorForm({ name: major.name, code: major.code })
                      setShowMajorModal(true)
                    }}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMajor(major.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {majors.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'لا توجد تخصصات' : 'No majors'}
              </p>
            )}
          </div>
        </div>

        {/* Levels */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'المستويات' : 'Levels'}
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {levels.map((level) => (
              <div
                key={level}
                className="p-4 bg-primary-100 dark:bg-primary-900 rounded-lg text-center"
              >
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {level}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'ar' ? 'مستوى' : 'Level'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Major Modal */}
      {showMajorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingMajor
                ? language === 'ar'
                  ? 'تعديل تخصص'
                  : 'Edit Major'
                : language === 'ar'
                ? 'إضافة تخصص'
                : 'Add Major'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'اسم التخصص' : 'Major Name'}
                </label>
                <input
                  type="text"
                  value={majorForm.name}
                  onChange={(e) => setMajorForm({ ...majorForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'كود التخصص' : 'Major Code'}
                </label>
                <input
                  type="text"
                  value={majorForm.code}
                  onChange={(e) => setMajorForm({ ...majorForm, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowMajorModal(false)
                    setEditingMajor(null)
                    setMajorForm({ name: '', code: '' })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleSaveMajor}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

