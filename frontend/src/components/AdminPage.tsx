import { useState } from 'react';
import { Trash2, Loader2, Users, MessageSquare, ShieldAlert, Home, RefreshCw } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useIsCallerAdmin,
  useAllUsers,
  useAllFeedbackAdmin,
  useDeleteUser,
  useDeleteFeedback,
} from '../hooks/useQueries';
import type { Principal } from '@dfinity/principal';

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function truncatePrincipal(p: Principal): string {
  const s = p.toString();
  if (s.length <= 16) return s;
  return `${s.slice(0, 8)}…${s.slice(-6)}`;
}

function StarDisplay({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? '#FFD700' : '#3a3a3a', fontSize: '14px' }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useAllUsers();
  const { data: feedbacks = [], isLoading: feedbackLoading, refetch: refetchFeedback } = useAllFeedbackAdmin();

  const deleteUser = useDeleteUser();
  const deleteFeedback = useDeleteFeedback();

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<bigint | null>(null);

  const handleDeleteUser = async (principal: Principal) => {
    const key = principal.toString();
    setDeletingUserId(key);
    try {
      await deleteUser.mutateAsync(principal);
    } catch (e) {
      console.error('Delete user failed:', e);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleDeleteFeedback = async (id: bigint) => {
    setDeletingFeedbackId(id);
    try {
      await deleteFeedback.mutateAsync(id);
    } catch (e) {
      console.error('Delete feedback failed:', e);
    } finally {
      setDeletingFeedbackId(null);
    }
  };

  // Loading state
  if (!isAuthenticated || adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#FFD700' }} />
          <p className="text-gray-400 text-sm">
            {!isAuthenticated ? 'Please sign in to continue…' : 'Checking permissions…'}
          </p>
          {!isAuthenticated && (
            <a
              href="/"
              className="mt-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
            >
              Go Home
            </a>
          )}
        </div>
      </div>
    );
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
          >
            <ShieldAlert className="w-8 h-8" style={{ color: '#FF8C42' }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 text-sm mb-6">
            You don't have permission to view this page. Only admins can access the admin panel.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: '#0d0d0d', borderColor: '#1e1e1e' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1">
              <span className="font-black text-xl" style={{ color: '#FFD700' }}>Quick</span>
              <span className="font-black text-xl" style={{ color: '#FF8C42' }}>Repair</span>
            </a>
            <span
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: '#FFD700', color: '#0d0d0d' }}
            >
              ADMIN
            </span>
          </div>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Manage registered users and customer feedback.</p>
        </div>

        {/* ── Registered Users Table ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: '#FFD700' }} />
              <h2 className="text-lg font-semibold text-white">Registered Users</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#1a1a1a', color: '#FFD700', border: '1px solid #2a2a2a' }}
              >
                {users.length}
              </span>
            </div>
            <button
              onClick={() => refetchUsers()}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid #1e1e1e', backgroundColor: '#111111' }}
          >
            {usersLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#FFD700' }} />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                No registered users yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e1e1e', backgroundColor: '#0d0d0d' }}>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Principal
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Service Area
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Signup Date
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(([principal, profile], idx) => (
                      <tr
                        key={principal.toString()}
                        style={{
                          borderBottom: idx < users.length - 1 ? '1px solid #1a1a1a' : 'none',
                        }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-gray-400">
                          {truncatePrincipal(principal)}
                        </td>
                        <td className="px-4 py-3 text-white font-medium">
                          {profile.name || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {profile.phone || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                          {profile.area || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {formatDate(profile.signupTime)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteUser(principal)}
                            disabled={deletingUserId === principal.toString()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: '#2a1010', color: '#ff6b6b', border: '1px solid #3a1515' }}
                          >
                            {deletingUserId === principal.toString() ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ── Customer Feedback Table ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" style={{ color: '#FF8C42' }} />
              <h2 className="text-lg font-semibold text-white">Customer Feedback</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#1a1a1a', color: '#FF8C42', border: '1px solid #2a2a2a' }}
              >
                {feedbacks.length}
              </span>
            </div>
            <button
              onClick={() => refetchFeedback()}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid #1e1e1e', backgroundColor: '#111111' }}
          >
            {feedbackLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#FF8C42' }} />
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                No feedback submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e1e1e', backgroundColor: '#0d0d0d' }}>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Reviewer
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((fb, idx) => (
                      <tr
                        key={fb.id.toString()}
                        style={{
                          borderBottom: idx < feedbacks.length - 1 ? '1px solid #1a1a1a' : 'none',
                        }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                          {fb.name}
                        </td>
                        <td className="px-4 py-3">
                          <StarDisplay count={fb.stars} />
                        </td>
                        <td className="px-4 py-3 text-gray-300 max-w-xs">
                          <span className="line-clamp-2">{fb.message}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                          {formatDate(fb.timestamp)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteFeedback(fb.id)}
                            disabled={deletingFeedbackId === fb.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: '#2a1010', color: '#ff6b6b', border: '1px solid #3a1515' }}
                          >
                            {deletingFeedbackId === fb.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
