import { motion } from 'framer-motion'
import { GraduationCap, Target, Shield, Users, Code, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Link } from 'react-router-dom'

export default function About() {
  const { language } = useLanguage()

  const goals = [
    {
      icon: Target,
      text: language === 'ar'
        ? 'إعادة تصميم نظام تسجيل المقررات بواجهة حديثة وسهلة الاستخدام'
        : 'Redesigning the course registration system with a modern and easy-to-use interface',
    },
    {
      icon: Users,
      text: language === 'ar'
        ? 'تحسين تجربة المستخدم وتسهيل عملية التسجيل'
        : 'Improving user experience and facilitating the registration process',
    },
    {
      icon: Shield,
      text: language === 'ar'
        ? 'توفير نظام آمن وموثوق لحماية بيانات الطلاب'
        : 'Providing a secure and reliable system to protect student data',
    },
    {
      icon: Code,
      text: language === 'ar'
        ? 'تطبيق أفضل الممارسات في تطوير الأنظمة الحديثة'
        : 'Applying best practices in modern system development',
    },
    {
      icon: Globe,
      text: language === 'ar'
        ? 'دعم كامل للغتين العربية والإنجليزية مع تصميم متجاوب'
        : 'Full support for Arabic and English languages with responsive design',
    },
  ]

  const technologies = [
    { name: 'Supabase', icon: '🗄️' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'React', icon: '⚛️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              KKU
            </span>
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {language === 'ar' ? 'حول النظام' : 'About the System'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {language === 'ar'
              ? 'نظام تسجيل المقررات الجامعي هو مشروع تخرج متكامل تم تطويره لجامعة الملك خالد بهدف تحسين تجربة تسجيل المقررات للطلاب والمشرفين والأداريين.'
              : 'The University Course Registration System is a comprehensive graduation project developed for King Khalid University to improve the course registration experience for students, advisors, and administrators.'}
          </p>
        </motion.div>
      </section>

      {/* Project Info */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'الجامعة' : 'University'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'جامعة الملك خالد' : 'King Khalid University'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'الكلية' : 'College'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'كلية إدارة الأعمال' : 'College of Business Administration'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <Code className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'القسم' : 'Department'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'المعلوماتية الإدارية' : 'Management Information Systems'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <Target className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'سنة التخرج' : 'Graduation Year'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">2025-2026</p>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'أهداف المشروع' : 'Project Goals'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'ar'
              ? 'الأهداف الرئيسية التي يسعى المشروع لتحقيقها'
              : 'The main goals that the project seeks to achieve'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300">{goal.text}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Technologies Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>
            © 2025 {language === 'ar' ? 'جامعة الملك خالد' : 'King Khalid University'}.{' '}
            {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </p>
        </div>
      </footer>
    </div>
  )
}

