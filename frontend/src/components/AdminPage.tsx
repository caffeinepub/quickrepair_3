import { useState } from 'react';
import {
  Trash2,
  Loader2,
  Users,
  MessageSquare,
  Home,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  PaintBucket,
  ShieldCheck,
} from 'lucide-react';
import {
  useAllUsers,
  useAllFeedbackAdmin,
  useDeleteUser,
  useDeleteFeedback,
} from '../hooks/useQueries';
import type { Principal } from '@dfinity/principal';

const ADMIN_PASSWORD = 'Admin@123';
const SESSION_KEY = 'qr_admin_session';

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

const SERVICES = [
  {
    icon: Zap,
    name: 'Electrical Repair',
    description: 'Wiring, switches, sockets, MCB, fan installation & all electrical issues.',
    price: '₹199',
    color: '#FFD700',
  },
  {
    icon: Droplets,
    name: 'Plumbing',
    description: 'Pipe leaks, tap repair, drain cleaning, water heater & bathroom fittings.',
    price: '₹149',
    color: '#4FC3F7',
  },
  {
    icon: Wrench,
    name: 'Appliance Repair',
    description: 'AC, washing machine, refrigerator, microwave & all home appliances.',
    price: '₹249',
    color: '#FF8C42',
  },
  {
    icon: Hammer,
    name: 'Carpentry',
    description: 'Door/window repair, furniture assembly, cabinet fixing & woodwork.',
    price: '₹199',
    color: '#A5D6A7',
  },
  {
    icon: PaintBucket,
    name: 'Painting',
    description: 'Interior/exterior painting, wall putty, texture & waterproofing.',
    price: '₹299',
    color: '#CE93D8',
  },
];

// ── Login Form ────────────────────────────────────────────────────────────────
function AdminLoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a brief delay for UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onLogin();
      } else {
        setError('Wrong password. Please try again.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="font-black text-3xl" style={{ color: '#FFD700' }}>Quick</span>
            <span className="font-black text-3xl" style={{ color: '#FF8C42' }}>Repair</span>
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest"
            style={{ backgroundColor: '#1a1a1a', color: '#FFD700', border: '1px solid #2a2a2a' }}
          >
            ADMIN PANEL
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: '#111111', border: '1px solid #1e1e1e' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
            >
              <Lock className="w-5 h-5" style={{ color: '#0d0d0d' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Login</h1>
              <p className="text-xs text-gray-500">Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: error ? '1px solid #ff6b6b' : '1px solid #2a2a2a',
                    // @ts-ignore
                    '--tw-ring-color': '#FFD700',
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs font-medium" style={{ color: '#ff6b6b' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers, error: usersError } = useAllUsers();
  const { data: feedbacks = [], isLoading: feedbackLoading, refetch: refetchFeedback } = useAllFeedbackAdmin();

  const deleteUser = useDeleteUser();
  const deleteFeedback = useDeleteFeedback();

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<bigint | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'feedback' | 'services'>('users');

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

  const tabs = [
    { id: 'users' as const, label: 'Users', count: users.length, icon: Users, color: '#FFD700' },
    { id: 'feedback' as const, label: 'Feedback', count: feedbacks.length, icon: MessageSquare, color: '#FF8C42' },
    { id: 'services' as const, label: 'Services', count: SERVICES.length, icon: Wrench, color: '#4FC3F7' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Header */}
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
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#1a1a1a', color: '#ff6b6b', border: '1px solid #2a2a2a' }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage users, feedback, and services from one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-xl p-4 text-left transition-all hover:opacity-90"
                style={{
                  backgroundColor: activeTab === tab.id ? '#1a1a1a' : '#111111',
                  border: `1px solid ${activeTab === tab.id ? tab.color + '40' : '#1e1e1e'}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color: tab.color }} />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {tab.label}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{tab.count}</div>
              </button>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
          style={{ backgroundColor: '#111111', border: '1px solid #1e1e1e' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab.id ? '#1e1e1e' : 'transparent',
                  color: activeTab === tab.id ? tab.color : '#6b7280',
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Users Tab ── */}
        {activeTab === 'users' && (
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
              ) : usersError ? (
                <div className="text-center py-12 px-4">
                  <p className="text-sm font-medium mb-1" style={{ color: '#ff6b6b' }}>
                    Unable to load users
                  </p>
                  <p className="text-xs text-gray-500">
                    This feature requires Internet Identity admin authentication. Please log in with Internet Identity to view user data.
                  </p>
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
                              style={{
                                backgroundColor: '#2a1010',
                                color: '#ff6b6b',
                                border: '1px solid #3a1515',
                              }}
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
        )}

        {/* ── Feedback Tab ── */}
        {activeTab === 'feedback' && (
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
                              style={{
                                backgroundColor: '#2a1010',
                                color: '#ff6b6b',
                                border: '1px solid #3a1515',
                              }}
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
        )}

        {/* ── Services Tab ── */}
        {activeTab === 'services' && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5" style={{ color: '#4FC3F7' }} />
              <h2 className="text-lg font-semibold text-white">Available Services</h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#1a1a1a', color: '#4FC3F7', border: '1px solid #2a2a2a' }}
              >
                {SERVICES.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.name}
                    className="rounded-xl p-5 transition-all hover:opacity-90"
                    style={{ backgroundColor: '#111111', border: '1px solid #1e1e1e' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: service.color + '20', border: `1px solid ${service.color}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: service.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-sm font-bold text-white">{service.name}</h3>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color + '20', color: service.color }}
                          >
                            From {service.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ── Main AdminPage Component ──────────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  });

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLoginForm onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
