# نظام تسجيل المقررات الجامعي - KKU Course Registration System

<div dir="rtl">

## نظرة عامة / Overview

نظام متكامل وحديث لتسجيل المقررات الجامعية تم تطويره كـ مشروع تخرج لجامعة الملك خالد. النظام يوفر تجربة مستخدم استثنائية مع دعم كامل للغتين العربية والإنجليزية.

A comprehensive and modern university course registration system developed as a graduation project for King Khalid University. The system provides an exceptional user experience with full support for Arabic and English languages.

---

## معلومات المشروع الأكاديمية / Academic Project Information

- **الجامعة / University**: جامعة الملك خالد / King Khalid University
- **الكلية / College**: كلية إدارة الأعمال / College of Business Administration
- **القسم / Department**: المعلوماتية الإدارية / Management Information Systems
- **التخصص / Major**: نظم المعلومات الإدارية / Management Information Systems
- **نوع المشروع / Project Type**: مشروع تخرج / Graduation Project
- **سنة التخرج / Graduation Year**: 2025-2026

---

## المميزات الرئيسية / Key Features

### 🔐 المصادقة / Authentication
- تسجيل الدخول والخروج / Login and Logout
- إنشاء حساب للطلاب فقط / Student-only Sign Up
- إعادة تعيين كلمة المرور / Password Reset
- التحكم في الوصول بناءً على الأدوار / Role-based Access Control

### 👨‍🎓 لوحة الطالب / Student Dashboard
- **لوحة التحكم / Dashboard**: عرض المعدل التراكمي، إجمالي الساعات، المقررات المسجلة / View GPA, total credits, enrolled courses
- **المقررات / Courses**: تصفح جميع المقررات المتاحة / Browse all available courses
- **التسجيل / Register**: تسجيل المقررات مع التحقق من المتطلبات / Register for courses with prerequisite checking
- **الجدول / Schedule**: عرض المقررات المسجلة / View enrolled courses
- **الجدول الأسبوعي / Weekly Schedule**: عرض الجدول الأسبوعي / View weekly schedule
- **السجل الأكاديمي / Transcript**: عرض جميع المقررات المكتملة والدرجات / View all completed courses and grades
- **حاسبة المعدل / GPA Calculator**: حساب المعدل التراكمي / Calculate GPA
- **الطلبات / Requests**: تتبع حالة طلبات التسجيل / Track registration request status
- **الملف الشخصي / Profile**: إدارة المعلومات الشخصية / Manage personal information
- **الدردشة / Chat**: محادثة مباشرة مع الدعم / Direct chat with support

### 👨‍🏫 لوحة المشرف / Advisor Dashboard
- **لوحة التحكم / Dashboard**: نظرة عامة على الطلبات والطلاب / Overview of requests and students
- **الطلبات / Requests**: الموافقة/الرفض على طلبات الطلاب / Approve/Reject student requests
- **قائمة الطلاب / Students**: عرض جميع الطلاب / View all students
- **تفاصيل الطالب / Student Details**: عرض تفاصيل كل طالب / View individual student details

### 👨‍💼 لوحة المدير / Admin Dashboard
- **لوحة التحكم / Dashboard**: إحصائيات النظام / System statistics
- **إدارة المقررات / Manage Courses**: إضافة/تعديل/حذف المقررات / Add/Edit/Delete courses
- **إدارة الطلاب / Manage Students**: إدارة حسابات الطلاب / Manage student accounts
- **التخصصات والمستويات / Majors & Levels**: إدارة التخصصات والمستويات الأكاديمية / Manage academic majors and levels
- **الإعدادات / Settings**: تكوين إعدادات النظام / Configure system settings
- **الإشعارات / Notifications**: إرسال إشعارات للطلاب / Send notifications to students

### 🤖 المساعد الذكي / AI Assistant
- مساعد ذكي متكامل يعمل عبر OpenAI API / Integrated AI assistant powered by OpenAI API
- يعمل عبر Edge Functions لحماية المفاتيح / Operates through Edge Functions for key security
- دعم كامل للعربية والإنجليزية / Full support for Arabic and English
- واجهة محادثة حديثة / Modern chat interface

### 🎨 التصميم / Design
- تصميم حديث واحترافي / Modern and professional design
- دعم الوضع الليلي والنهاري / Dark/Light mode support
- دعم كامل للغات العربية (RTL) والإنجليزية (LTR) / Full support for Arabic (RTL) and English (LTR)
- ألوان جامعة الملك خالد الرسمية / Official KKU colors (Green: #184A2C, Gold: #D4AF37)
- خطوط احترافية / Professional fonts (Cairo/Tajawal for Arabic, Inter/Poppins for English)
- تصميم متجاوب على جميع الأجهزة / Responsive design for all devices
- تأثيرات Animations سلسة / Smooth animations

---

## التقنيات المستخدمة / Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS (Custom design, no UI libraries)
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions + RLS)
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI API (via Edge Functions)

---

## متطلبات التشغيل / Prerequisites

- Node.js 18+ و npm/yarn
- حساب Supabase ومشروع
- حساب OpenAI (للمساعد الذكي)
- Git

---

## خطوات الإعداد / Setup Instructions

### 1. استنساخ المستودع / Clone Repository

```bash
git clone <repository-url>
cd kku-course-registration-system
```

### 2. تثبيت التبعيات / Install Dependencies

```bash
npm install
```

### 3. إعداد Supabase / Set Up Supabase

1. أنشئ مشروع جديد على [supabase.com](https://supabase.com)
2. اذهب إلى Project Settings > API
3. انسخ Project URL و anon key

### 4. إعداد Edge Functions / Set Up Edge Functions

1. قم بتثبيت Supabase CLI:
```bash
npm install -g supabase
```

2. سجل الدخول إلى Supabase:
```bash
supabase login
```

3. اربط المشروع:
```bash
supabase link --project-ref your-project-ref
```

4. انشر Edge Function:
```bash
supabase functions deploy ai-chatbot
```

5. أضف متغيرات البيئة في Supabase Dashboard:
   - اذهب إلى Project Settings > Edge Functions
   - أضف `OPENAI_API_KEY` مع مفتاح OpenAI API الخاص بك

### 5. تكوين متغيرات البيئة / Configure Environment Variables

أنشئ ملف `.env` في المجلد الرئيسي:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. إعداد قاعدة البيانات / Set Up Database

1. اذهب إلى Supabase Dashboard > SQL Editor
2. انسخ محتوى `supabase/migrations/001_initial_schema.sql`
3. نفذ السكريبت لإنشاء الجداول وسياسات RLS

### 7. إضافة بيانات المقررات / Seed Courses Data

1. اذهب إلى SQL Editor
2. انسخ محتوى `supabase/seed_courses.sql`
3. نفذ السكريبت لإضافة المقررات التجريبية

**ملاحظة مهمة**: لا توجد حسابات تجريبية. جميع الحسابات تُنشأ من خلال صفحة Sign Up داخل النظام.

### 8. تكوين المصادقة / Configure Authentication

1. اذهب إلى Authentication > URL Configuration
2. أضف رابط التطوير المحلي: `http://localhost:5173`
3. أضف رابط الإنتاج (مثل: `https://your-app.vercel.app`)
4. اضبط روابط إعادة التوجيه لإعادة تعيين كلمة المرور

### 9. تشغيل الخادم المحلي / Run Development Server

```bash
npm run dev
```

التطبيق سيكون متاحاً على `http://localhost:5173`

---

## بناء للإنتاج / Building for Production

```bash
npm run build
```

البناء للإنتاج سيكون في مجلد `dist`

---

## النشر على Vercel / Deploy to Vercel

1. ادفع الكود إلى GitHub
2. استورد المشروع في Vercel
3. أضف متغيرات البيئة:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. انشر!

تأكد من تحديث روابط إعادة التوجيه في Supabase مع نطاق Vercel الخاص بك.

---

## هيكل المشروع / Project Structure

```
├── src/
│   ├── components/          # المكونات القابلة لإعادة الاستخدام
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── AIChatbot.tsx
│   ├── contexts/            # React Contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/                 # الأدوات والإعدادات
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   ├── pages/               # صفحات التطبيق
│   │   ├── Landing.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── auth/            # صفحات المصادقة
│   │   ├── student/          # صفحات الطالب
│   │   ├── advisor/         # صفحات المشرف
│   │   └── admin/           # صفحات المدير
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── functions/           # Edge Functions
│   │   └── ai-chatbot/
│   ├── migrations/         # هجرات قاعدة البيانات
│   │   └── 001_initial_schema.sql
│   └── seed_courses.sql     # بيانات المقررات
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## مخطط قاعدة البيانات / Database Schema

### الجداول / Tables

1. **users** - ملفات المستخدمين (مرتبطة بـ Supabase auth)
2. **courses** - كتالوج المقررات
3. **enrollments** - تسجيلات الطلاب في المقررات
4. **requests** - طلبات الإضافة/الحذف/التبديل
5. **notifications** - إشعارات النظام
6. **system_settings** - إعدادات التطبيق
7. **chat_messages** - رسائل الدردشة

### Row Level Security (RLS)

جميع الجداول لديها RLS مفعل مع السياسات المناسبة:
- المستخدمون يمكنهم الوصول فقط لبياناتهم
- المديرون لديهم وصول كامل
- المشرفون يمكنهم عرض الطلاب والطلبات
- الوصول العام للقراءة للمقررات

---

## الأدوار الافتراضية / Default Roles

عند التسجيل، يمكنك الاختيار من:
- **طالب / Student**: يمكنه تسجيل المقررات، عرض الجدول، إنشاء الطلبات
- **مشرف / Advisor**: يمكنه الموافقة/الرفض على طلبات الطلاب، عرض الطلاب
- **مدير / Admin**: وصول كامل للنظام

**ملاحظة**: التسجيل متاح للطلاب فقط. حسابات المشرفين والمديرين تُنشأ يدوياً في Supabase.

---

## المميزات التفصيلية / Features in Detail

### الوضع الليلي / Dark Mode
التبديل بين الوضع الليلي والنهاري. التفضيل يُحفظ في localStorage.

### الترجمة / Internationalization
التبديل بين الإنجليزية والعربية. العربية تتضمن دعم RTL (من اليمين لليسار).

### التحديثات الفورية / Real-time Updates
يستخدم Supabase real-time subscriptions لـ:
- رسائل الدردشة
- تحديثات حالة الطلبات
- الإشعارات

### المساعد الذكي / AI Assistant
- يعمل عبر OpenAI API
- يتم استدعاء API عبر Edge Function لحماية المفاتيح
- دعم كامل للعربية والإنجليزية
- واجهة محادثة حديثة مع تأثيرات typing

---

## استكشاف الأخطاء / Troubleshooting

### مشاكل المصادقة / Authentication Issues
- تأكد من تكوين Supabase auth بشكل صحيح
- تحقق من روابط إعادة التوجيه في Supabase dashboard
- تحقق من تعيين متغيرات البيئة بشكل صحيح

### أخطاء قاعدة البيانات / Database Errors
- تأكد من تشغيل جميع الهجرات
- تحقق من تعيين سياسات RLS بشكل صحيح
- تحقق من تعيين أدوار المستخدمين بشكل صحيح

### أخطاء البناء / Build Errors
- امسح `node_modules` وأعد التثبيت: `rm -rf node_modules && npm install`
- تحقق من أخطاء TypeScript: `npm run build`
- تحقق من تعيين جميع متغيرات البيئة

### مشاكل Edge Functions / Edge Functions Issues
- تأكد من نشر Edge Function بشكل صحيح
- تحقق من إضافة `OPENAI_API_KEY` في Supabase
- تحقق من سجلات Edge Functions في Supabase Dashboard

---

## المساهمة / Contributing

1. Fork المستودع
2. أنشئ فرع للميزة
3. قم بتغييراتك
4. أرسل Pull Request

---

## الترخيص / License

هذا المشروع مرخص تحت رخصة MIT.

---

## الدعم / Support

للأسئلة والمشاكل، يرجى فتح issue على GitHub.

---

## شكر خاص / Special Thanks

تم تطوير هذا المشروع كجزء من مشروع تخرج لجامعة الملك خالد.

---

**تم البناء بـ ❤️ لجامعة الملك خالد**

</div>
