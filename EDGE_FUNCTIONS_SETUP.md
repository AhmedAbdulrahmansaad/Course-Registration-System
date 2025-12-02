# إعداد Edge Functions للمساعد الذكي / AI Chatbot Edge Functions Setup

## المتطلبات / Requirements

- Supabase CLI مثبت
- حساب OpenAI مع API Key
- مشروع Supabase نشط

## خطوات الإعداد / Setup Steps

### 1. تثبيت Supabase CLI / Install Supabase CLI

```bash
npm install -g supabase
```

### 2. تسجيل الدخول / Login

```bash
supabase login
```

### 3. ربط المشروع / Link Project

```bash
supabase link --project-ref your-project-ref
```

يمكنك العثور على `project-ref` في إعدادات المشروع في Supabase Dashboard.

### 4. نشر Edge Function / Deploy Edge Function

```bash
supabase functions deploy ai-chatbot
```

### 5. إضافة متغيرات البيئة / Add Environment Variables

1. اذهب إلى Supabase Dashboard
2. اذهب إلى Project Settings > Edge Functions
3. أضف متغير البيئة التالي:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: مفتاح OpenAI API الخاص بك

### 6. اختبار Edge Function / Test Edge Function

يمكنك اختبار Edge Function من Supabase Dashboard:
1. اذهب إلى Edge Functions
2. اختر `ai-chatbot`
3. استخدم Test function لإرسال طلب تجريبي

## هيكل Edge Function / Edge Function Structure

```
supabase/functions/ai-chatbot/
└── index.ts
```

## استخدام Edge Function في الكود / Using Edge Function in Code

```typescript
const { data, error } = await supabase.functions.invoke('ai-chatbot', {
  body: {
    message: 'Your message here',
    language: 'ar' or 'en',
    conversationHistory: [...]
  }
})
```

## ملاحظات الأمان / Security Notes

- **لا تضع OpenAI API Key في الكود الأمامي**
- Edge Function يحمي المفاتيح من التعرض
- جميع الطلبات تمر عبر Supabase Edge Functions

## استكشاف الأخطاء / Troubleshooting

### الخطأ: Function not found
- تأكد من نشر Edge Function بشكل صحيح
- تحقق من اسم Function

### الخطأ: OpenAI API error
- تحقق من صحة OpenAI API Key
- تحقق من رصيد حساب OpenAI
- تحقق من سجلات Edge Functions

### الخطأ: CORS error
- تأكد من إضافة نطاقك في Supabase CORS settings

