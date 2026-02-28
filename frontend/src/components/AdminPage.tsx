import React from 'react';
import { Trash2, RefreshCw, Shield, Users, MessageSquare } from 'lucide-react';
import { useIsCallerAdmin, useAllUsers, useAllFeedbackAdmin, useDeleteUser, useDeleteFeedback } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: users = [], isLoading: usersLoading } = useAllUsers();
  const { data: feedbackList = [], isLoading: feedbackLoading } = useAllFeedbackAdmin();
  const deleteUser = useDeleteUser();
  const deleteFeedback = useDeleteFeedback();

  if (!identity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4" style={{ color: '#FFD700' }} />
          <h2 className="text-2xl font-bold text-white font-heading mb-2">Authentication Required</h2>
          <p className="text-white/60">Please sign in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield size={48} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-white font-heading mb-2">Access Denied</h2>
          <p className="text-white/60">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-black"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white font-heading">Admin Dashboard</h1>
              <p className="text-white/50 text-sm">Manage users and feedback</p>
            </div>
          </div>
          <button
            onClick={() => queryClient.invalidateQueries()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all text-sm"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-surface-100 rounded-2xl border border-white/10 mb-8 overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-white/10">
            <Users size={18} style={{ color: '#FFD700' }} />
            <h2 className="text-lg font-bold text-white font-heading">Registered Users</h2>
            <span className="ml-auto text-white/40 text-sm">{users.length} total</span>
          </div>

          {usersLoading ? (
            <div className="p-8 text-center text-white/40">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-white/40">No registered users yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Name</th>
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Phone</th>
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Area</th>
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Principal</th>
                    <th className="text-right px-5 py-3 text-white/50 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(([principal, profile]) => (
                    <tr key={principal.toString()} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-white font-medium">{profile.name}</td>
                      <td className="px-5 py-3 text-white/70">{profile.phone}</td>
                      <td className="px-5 py-3 text-white/70">{profile.area}</td>
                      <td className="px-5 py-3 text-white/40 font-mono text-xs">
                        {principal.toString().slice(0, 12)}...
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => deleteUser.mutate(principal)}
                          disabled={deleteUser.isPending}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all disabled:opacity-50"
                          aria-label="Delete user"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Feedback Table */}
        <div className="bg-surface-100 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-white/10">
            <MessageSquare size={18} style={{ color: '#FFD700' }} />
            <h2 className="text-lg font-bold text-white font-heading">Customer Feedback</h2>
            <span className="ml-auto text-white/40 text-sm">{feedbackList.length} total</span>
          </div>

          {feedbackLoading ? (
            <div className="p-8 text-center text-white/40">Loading feedback...</div>
          ) : feedbackList.length === 0 ? (
            <div className="p-8 text-center text-white/40">No feedback submitted yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Name</th>
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Rating</th>
                    <th className="text-left px-5 py-3 text-white/50 font-medium">Message</th>
                    <th className="text-right px-5 py-3 text-white/50 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackList.map((feedback) => (
                    <tr key={feedback[0].toString()} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-5 py-3 text-white font-medium">{feedback[1]}</td>
                      <td className="px-5 py-3">
                        <span style={{ color: '#FFD700' }}>{'★'.repeat(Number(feedback[2]))}</span>
                      </td>
                      <td className="px-5 py-3 text-white/70 max-w-xs truncate">{feedback[3]}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => deleteFeedback.mutate(feedback[0])}
                          disabled={deleteFeedback.isPending}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all disabled:opacity-50"
                          aria-label="Delete feedback"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
