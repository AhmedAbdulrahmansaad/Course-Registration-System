import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.role': 'Role',
    'auth.studentId': 'Student ID',
    'auth.major': 'Major',
    'auth.level': 'Level',
    'auth.resetPassword': 'Reset Password',
    'auth.forgotPassword': 'Forgot Password?',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.register': 'Register',
    'nav.schedule': 'Schedule',
    'nav.weeklySchedule': 'Weekly Schedule',
    'nav.transcript': 'Transcript',
    'nav.gpaCalculator': 'GPA Calculator',
    'nav.requests': 'Requests',
    'nav.profile': 'Profile',
    'nav.chat': 'Chat',
    'nav.students': 'Students',
    'nav.majorsLevels': 'Majors & Levels',
    'nav.settings': 'Settings',
    'nav.notifications': 'Notifications',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.pending': 'Pending',
    'common.approved': 'Approved',
    'common.rejected': 'Rejected',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.gpa': 'GPA',
    'dashboard.totalCredits': 'Total Credits',
    'dashboard.enrolledCourses': 'Enrolled Courses',
    'dashboard.pendingRequests': 'Pending Requests',
    
    // Courses
    'courses.title': 'Courses',
    'courses.code': 'Course Code',
    'courses.name': 'Course Name',
    'courses.level': 'Level',
    'courses.credits': 'Credit Hours',
    'courses.major': 'Major',
    'courses.register': 'Register',
    'courses.enrolled': 'Enrolled',
    'courses.full': 'Full',
    
    // Requests
    'requests.title': 'Requests',
    'requests.type': 'Type',
    'requests.add': 'Add',
    'requests.drop': 'Drop',
    'requests.swap': 'Swap',
    'requests.message': 'Message',
    'requests.approve': 'Approve',
    'requests.reject': 'Reject',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.noNotifications': 'No notifications',
    'notifications.markAsRead': 'Mark as read',
    
    // Chat
    'chat.title': 'Chat Support',
    'chat.send': 'Send',
    'chat.typeMessage': 'Type a message...',
  },
  ar: {
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.role': 'الدور',
    'auth.studentId': 'رقم الطالب',
    'auth.major': 'التخصص',
    'auth.level': 'المستوى',
    'auth.resetPassword': 'إعادة تعيين كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.courses': 'المقررات',
    'nav.register': 'التسجيل',
    'nav.schedule': 'الجدول',
    'nav.weeklySchedule': 'الجدول الأسبوعي',
    'nav.transcript': 'السجل الأكاديمي',
    'nav.gpaCalculator': 'حاسبة المعدل',
    'nav.requests': 'الطلبات',
    'nav.profile': 'الملف الشخصي',
    'nav.chat': 'الدردشة',
    'nav.students': 'الطلاب',
    'nav.majorsLevels': 'التخصصات والمستويات',
    'nav.settings': 'الإعدادات',
    'nav.notifications': 'الإشعارات',
    'nav.logout': 'تسجيل الخروج',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.actions': 'الإجراءات',
    'common.status': 'الحالة',
    'common.pending': 'قيد الانتظار',
    'common.approved': 'موافق عليه',
    'common.rejected': 'مرفوض',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.gpa': 'المعدل التراكمي',
    'dashboard.totalCredits': 'إجمالي الساعات',
    'dashboard.enrolledCourses': 'المقررات المسجلة',
    'dashboard.pendingRequests': 'الطلبات المعلقة',
    
    // Courses
    'courses.title': 'المقررات',
    'courses.code': 'رمز المقرر',
    'courses.name': 'اسم المقرر',
    'courses.level': 'المستوى',
    'courses.credits': 'ساعات معتمدة',
    'courses.major': 'التخصص',
    'courses.register': 'تسجيل',
    'courses.enrolled': 'مسجل',
    'courses.full': 'ممتلئ',
    
    // Requests
    'requests.title': 'الطلبات',
    'requests.type': 'النوع',
    'requests.add': 'إضافة',
    'requests.drop': 'حذف',
    'requests.swap': 'تبديل',
    'requests.message': 'رسالة',
    'requests.approve': 'موافقة',
    'requests.reject': 'رفض',
    
    // Notifications
    'notifications.title': 'الإشعارات',
    'notifications.noNotifications': 'لا توجد إشعارات',
    'notifications.markAsRead': 'تمييز كمقروء',
    
    // Chat
    'chat.title': 'دعم الدردشة',
    'chat.send': 'إرسال',
    'chat.typeMessage': 'اكتب رسالة...',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language')
    return (stored as Language) || 'en'
  })

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
    html.setAttribute('lang', language)
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

