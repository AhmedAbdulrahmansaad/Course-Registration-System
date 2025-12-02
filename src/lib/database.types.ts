export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          email: string
          role: 'student' | 'advisor' | 'admin'
          student_id: string | null
          major: string | null
          level: number | null
          created_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          role: 'student' | 'advisor' | 'admin'
          student_id?: string | null
          major?: string | null
          level?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          role?: 'student' | 'advisor' | 'admin'
          student_id?: string | null
          major?: string | null
          level?: number | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          course_code: string
          name: string
          level: number
          credit_hours: number
          major: string | null
          created_at: string
        }
        Insert: {
          id?: string
          course_code: string
          name: string
          level: number
          credit_hours: number
          major?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          course_code?: string
          name?: string
          level?: number
          credit_hours?: number
          major?: string | null
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: 'enrolled' | 'completed' | 'dropped'
          grade: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status?: 'enrolled' | 'completed' | 'dropped'
          grade?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: 'enrolled' | 'completed' | 'dropped'
          grade?: string | null
          created_at?: string
        }
      }
      requests: {
        Row: {
          id: string
          user_id: string
          type: 'add' | 'drop' | 'swap'
          course_id: string | null
          target_course_id: string | null
          status: 'pending' | 'approved' | 'rejected'
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'add' | 'drop' | 'swap'
          course_id?: string | null
          target_course_id?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'add' | 'drop' | 'swap'
          course_id?: string | null
          target_course_id?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Course = Database['public']['Tables']['courses']['Row']
export type Enrollment = Database['public']['Tables']['enrollments']['Row']
export type Request = Database['public']['Tables']['requests']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']

