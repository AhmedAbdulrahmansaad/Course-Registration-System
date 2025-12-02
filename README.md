# KKU Course Registration System

A complete full-stack web application for managing course registration at King Khalid University (KKU). Built with React, TypeScript, Vite, TailwindCSS, and Supabase.

## Features

### Authentication
- User sign up with email and password
- Login and logout functionality
- Password reset via email
- Role-based access control (Student, Advisor, Admin)

### Student Features
- **Dashboard**: View GPA, total credits, enrolled courses, and pending requests
- **Courses**: Browse all available courses
- **Register**: Register for courses (creates enrollment requests)
- **Schedule**: View enrolled courses schedule
- **Requests**: Track add/drop/swap requests status
- **Chat**: Real-time chat support with admin

### Advisor Features
- **Dashboard**: Overview of pending requests and students
- **Requests**: View and approve/reject student course requests
- **Students**: View all student information

### Admin Features
- **Dashboard**: System-wide statistics
- **Courses**: Create, edit, and delete courses
- **Students**: Manage student accounts
- **Settings**: Configure system settings (registration periods, credit limits, etc.)
- **Notifications**: Send notifications to all students or specific students

### Additional Features
- Dark/Light mode toggle
- Arabic/English language support with RTL/LTR
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Real-time updates with Supabase subscriptions

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with dark mode support
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account and project
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kku-course-registration-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and anon/public key

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the SQL script to create all tables and RLS policies

### 6. Configure Supabase Auth

1. Go to Authentication > URL Configuration in Supabase dashboard
2. Add your local development URL: `http://localhost:5173`
3. Add your production URL (e.g., `https://your-app.vercel.app`)
4. Set the redirect URLs for password reset

### 7. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

Make sure to update the Supabase auth redirect URLs with your Vercel domain.

## Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/                 # Utilities and configs
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   ├── student/        # Student pages
│   │   ├── advisor/        # Advisor pages
│   │   └── admin/          # Admin pages
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── supabase/
│   └── migrations/         # Database migrations
├── public/                 # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Database Schema

### Tables

1. **users** - User profiles (linked to Supabase auth)
2. **courses** - Course catalog
3. **enrollments** - Student course enrollments
4. **requests** - Add/drop/swap requests
5. **notifications** - System notifications
6. **system_settings** - Application settings
7. **chat_messages** - Support chat messages

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Admins have full access
- Advisors can view students and requests
- Public read access for courses

## Default Roles

When signing up, you can choose from:
- **Student**: Can register for courses, view schedule, make requests
- **Advisor**: Can approve/reject student requests, view students
- **Admin**: Full system access

## Features in Detail

### Dark Mode
Toggle between light and dark themes. Preference is saved in localStorage.

### Internationalization
Switch between English and Arabic. Arabic includes RTL (right-to-left) layout support.

### Real-time Updates
Uses Supabase real-time subscriptions for:
- Chat messages
- Request status updates
- Notifications

## Troubleshooting

### Authentication Issues
- Ensure Supabase auth is properly configured
- Check redirect URLs in Supabase dashboard
- Verify environment variables are set correctly

### Database Errors
- Make sure all migrations have been run
- Check RLS policies are correctly set
- Verify user roles are assigned correctly

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`
- Verify all environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for King Khalid University

