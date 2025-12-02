import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, User } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { supabase } from '../../lib/supabase'
import type { Request, Course, User as UserType } from '../../lib/database.types'

export default function AdvisorRequests() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState<
    (Request & { courses?: Course; users?: UserType })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    fetchRequests()
  }, [filter])

  const fetchRequests = async () => {
    try {
      let query = supabase
        .from('requests')
        .select(`
          *,
          courses(*),
          users!user_id(*)
        `)
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setRequests((data as any) || [])
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', requestId)

      if (error) throw error

      // If it's an add request, ensure enrollment exists
      const request = requests.find((r) => r.id === requestId)
      if (request?.type === 'add' && request.course_id) {
        await supabase.from('enrollments').upsert({
          user_id: request.user_id,
          course_id: request.course_id,
          status: 'enrolled',
        })
      }

      fetchRequests()
    } catch (error: any) {
      console.error('Error approving request:', error)
      alert(error.message || 'Failed to approve request')
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'rejected', updated_at: new Date().toISOString() })
        .eq('id', requestId)

      if (error) throw error
      fetchRequests()
    } catch (error: any) {
      console.error('Error rejecting request:', error)
      alert(error.message || 'Failed to reject request')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter((r) => r.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('requests.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage student course registration requests
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.users?.full_name} ({request.users?.student_id})
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {request.type.toUpperCase()} Request
                    </p>
                  </div>
                </div>

                {request.courses && (
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Course: {request.courses.course_code} - {request.courses.name}
                  </p>
                )}

                {request.message && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {request.message}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Created: {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'approved'
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : request.status === 'rejected'
                      ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  }`}
                >
                  {request.status}
                </span>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      title="Reject"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">No requests found</p>
        </div>
      )}
    </div>
  )
}

