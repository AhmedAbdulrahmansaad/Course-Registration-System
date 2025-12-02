import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, BookOpen, Save, Edit } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import { useForm } from 'react-hook-form'

interface ProfileForm {
  full_name: string
  student_id: string
  major: string
  level: number
}

export default function StudentProfile() {
  const { userProfile } = useAuth()
  const { language } = useLanguage()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      full_name: userProfile?.full_name || '',
      student_id: userProfile?.student_id || '',
      major: userProfile?.major || '',
      level: userProfile?.level || 1,
    },
  })

  const onSubmit = async (data: ProfileForm) => {
    if (!userProfile?.id) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: data.full_name,
          student_id: data.student_id,
          major: data.major,
          level: data.level,
        })
        .eq('id', userProfile.id)

      if (error) throw error

      setEditing(false)
      // Refresh user profile
      window.location.reload()
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {language === 'ar'
              ? 'إدارة معلوماتك الشخصية'
              : 'Manage your personal information'}
          </p>
        </div>
        {!editing && (
          <button
            onClick={() => {
              setEditing(true)
              reset({
                full_name: userProfile?.full_name || '',
                student_id: userProfile?.student_id || '',
                major: userProfile?.major || '',
                level: userProfile?.level || 1,
              })
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            <Edit className="w-5 h-5" />
            {language === 'ar' ? 'تعديل' : 'Edit'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {userProfile?.full_name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {userProfile?.email}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <GraduationCap className="w-4 h-4" />
              <span>
                {language === 'ar' ? 'طالب' : 'Student'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                {...register('full_name', { required: true })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={userProfile?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {language === 'ar'
                  ? 'لا يمكن تغيير البريد الإلكتروني'
                  : 'Email cannot be changed'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'رقم الطالب' : 'Student ID'}
                </label>
                <input
                  {...register('student_id', { required: true })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.student_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'ar' ? 'المستوى' : 'Level'}
                </label>
                <input
                  {...register('level', { required: true, min: 1, max: 8 })}
                  type="number"
                  min="1"
                  max="8"
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.level && (
                  <p className="text-red-500 text-sm mt-1">
                    {language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'التخصص' : 'Major'}
              </label>
              <input
                {...register('major', { required: true })}
                disabled={!editing}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.major && (
                <p className="text-red-500 text-sm mt-1">
                  {language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}
                </p>
              )}
            </div>

            {editing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {saving
                    ? language === 'ar'
                      ? 'جاري الحفظ...'
                      : 'Saving...'
                    : language === 'ar'
                    ? 'حفظ'
                    : 'Save'}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

