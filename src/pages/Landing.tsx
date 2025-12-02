import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, Shield, MessageSquare, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Landing() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()

  const features = [
    {
      icon: BookOpen,
      title: language === 'ar' ? 'تسجيل المقررات بسهولة' : 'Easy Course Registration',
      description: language === 'ar' 
        ? 'نظام سهل وبسيط لتسجيل المقررات مع التحقق التلقائي من المتطلبات'
        : 'Simple and easy course registration system with automatic prerequisite checking',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'إدارة شاملة' : 'Comprehensive Management',
      description: language === 'ar'
        ? 'لوحات تحكم متخصصة للطلاب والمشرفين والمديرين'
        : 'Specialized dashboards for students, advisors, and administrators',
    },
    {
      icon: Shield,
      title: language === 'ar' ? 'آمن وموثوق' : 'Secure & Reliable',
      description: language === 'ar'
        ? 'حماية كاملة لبيانات الطلاب مع تشفير متقدم'
        : 'Complete protection of student data with advanced encryption',
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'مساعد ذكي' : 'AI Assistant',
      description: language === 'ar'
        ? 'مساعد ذكي متاح 24/7 للإجابة على استفساراتك'
        : '24/7 AI assistant available to answer your questions',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-gold-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              KKU
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {language === 'ar' ? 'حول النظام' : 'About'}
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {language === 'ar' ? 'اتصل بنا' : 'Contact'}
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
            >
              {t('auth.login')}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'ar' ? (
                <>
                  نظام تسجيل المقررات
                  <span className="text-primary-600 dark:text-primary-400 block">
                    جامعة الملك خالد
                  </span>
                </>
              ) : (
                <>
                  Course Registration
                  <span className="text-primary-600 dark:text-primary-400 block">
                    King Khalid University
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {language === 'ar'
                ? 'نظام متكامل وحديث لتسجيل المقررات مع تجربة مستخدم استثنائية ودعم كامل للغتين العربية والإنجليزية'
                : 'A comprehensive and modern course registration system with exceptional user experience and full support for Arabic and English'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-semibold text-lg transition-colors"
              >
                {t('auth.login')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
              alt="University"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'ar'
              ? 'كل ما تحتاجه في نظام واحد متكامل'
              : 'Everything you need in one integrated system'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600 dark:bg-primary-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-gold-300">
                {language === 'ar' ? 'طالب نشط' : 'Active Students'}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-gold-300">
                {language === 'ar' ? 'مقرر متاح' : 'Available Courses'}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-gold-300">
                {language === 'ar' ? 'مشرف أكاديمي' : 'Academic Advisors'}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            {language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar'
              ? 'انضم إلى آلاف الطلاب الذين يستخدمون نظامنا لتسجيل المقررات'
              : 'Join thousands of students using our system for course registration'}
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            {language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-gold-500" />
                <span className="text-xl font-bold">KKU</span>
              </div>
              <p>
                {language === 'ar'
                  ? 'نظام تسجيل المقررات الجامعي - جامعة الملك خالد'
                  : 'University Course Registration System - King Khalid University'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-gold-500 transition-colors">
                    {language === 'ar' ? 'حول النظام' : 'About'}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold-500 transition-colors">
                    {language === 'ar' ? 'اتصل بنا' : 'Contact'}
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gold-500 transition-colors">
                    {t('auth.login')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}
              </h4>
              <p>
                {language === 'ar'
                  ? 'جامعة الملك خالد، أبها، المملكة العربية السعودية'
                  : 'King Khalid University, Abha, Saudi Arabia'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>
              © 2025 {language === 'ar' ? 'جامعة الملك خالد' : 'King Khalid University'}.{' '}
              {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

