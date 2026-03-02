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
  ShieldCheck,
  Plus,
  Pencil,
  X,
  Check,
  UserCog,
} from 'lucide-react';
import {
  useAllUsers,
  useAllFeedbackAdmin,
  useDeleteUser,
  useDeleteFeedback,
  useGetAllServices,
  useAddService,
  useUpdateService,
  useDeleteService,
  useGetMechanicRegistrations,
} from '../hooks/useQueries';
import type { Service, MechanicRegistration } from '../backend';
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

function formatDateFromNano(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

// ── Service Form (Add / Edit) ─────────────────────────────────────────────────
interface ServiceFormData {
  name: string;
  description: string;
  icon: string;
  startingPrice: string;
}

const EMPTY_FORM: ServiceFormData = { name: '', description: '', icon: '', startingPrice: '' };

interface ServiceFormProps {
  initial?: ServiceFormData;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

function ServiceForm({ initial = EMPTY_FORM, onSubmit, onCancel, isLoading, submitLabel }: ServiceFormProps) {
  const [form, setForm] = useState<ServiceFormData>(initial);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Service name is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    const price = parseInt(form.startingPrice, 10);
    if (isNaN(price) || price < 0) { setError('Enter a valid starting price.'); return; }
    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong.');
    }
  };

  const field = (label: string, key: keyof ServiceFormData, placeholder: string, type = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1"
        style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
        }}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {field('Service Name', 'name', 'e.g. Plumber')}
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Short description of the service"
          rows={2}
          className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1 resize-none"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
          }}
        />
      </div>
      {field('Icon (emoji or text)', 'icon', 'e.g. 🔧')}
      {field('Starting Price (₹)', 'startingPrice', 'e.g. 299', 'number')}
      {error && <p className="text-xs font-medium" style={{ color: '#ff6b6b' }}>{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#1a1a1a', color: '#9ca3af', border: '1px solid #2a2a2a' }}
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </form>
  );
}

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
  const { data: services = [], isLoading: servicesLoading, refetch: refetchServices } = useGetAllServices();
  const { data: mechanicRegs = [], isLoading: mechanicRegsLoading, refetch: refetchMechanicRegs } = useGetMechanicRegistrations();

  const deleteUser = useDeleteUser();
  const deleteFeedback = useDeleteFeedback();
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<bigint | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<bigint | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'feedback' | 'services' | 'mechanics'>('users');

  // Services CRUD state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

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

  const handleDeleteService = async (id: bigint) => {
    setDeletingServiceId(id);
    try {
      await deleteService.mutateAsync(id);
    } catch (e) {
      console.error('Delete service failed:', e);
    } finally {
      setDeletingServiceId(null);
    }
  };

  const handleAddService = async (data: ServiceFormData) => {
    await addService.mutateAsync({
      name: data.name.trim(),
      description: data.description.trim(),
      icon: data.icon.trim(),
      startingPrice: parseInt(data.startingPrice, 10),
    });
    setShowAddForm(false);
  };

  const handleUpdateService = async (data: ServiceFormData) => {
    if (!editingService) return;
    await updateService.mutateAsync({
      id: editingService.id,
      name: data.name.trim(),
      description: data.description.trim(),
      icon: data.icon.trim(),
      startingPrice: parseInt(data.startingPrice, 10),
    });
    setEditingService(null);
  };

  const tabs = [
    { id: 'users' as const, label: 'Users', count: users.length, icon: Users, color: '#FFD700' },
    { id: 'feedback' as const, label: 'Feedback', count: feedbacks.length, icon: MessageSquare, color: '#FF8C42' },
    { id: 'services' as const, label: 'Services', count: services.length, icon: Wrench, color: '#4FC3F7' },
    { id: 'mechanics' as const, label: 'Mechanics', count: mechanicRegs.length, icon: UserCog, color: '#4ade80' },
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
            Manage users, feedback, services, and mechanic registrations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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
          className="flex gap-1 p-1 rounded-xl mb-6 overflow-x-auto"
          style={{ backgroundColor: '#111111', border: '1px solid #1e1e1e' }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
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
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Principal</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Area</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(([principal, profile]) => {
                        const key = principal.toString();
                        const isDeleting = deletingUserId === key;
                        return (
                          <tr
                            key={key}
                            style={{ borderBottom: '1px solid #1a1a1a' }}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-4 py-3">
                              <code className="text-xs text-gray-400 font-mono">
                                {truncatePrincipal(principal)}
                              </code>
                            </td>
                            <td className="px-4 py-3 text-white font-medium">{profile.name}</td>
                            <td className="px-4 py-3 text-gray-300">{profile.phone}</td>
                            <td className="px-4 py-3 text-gray-300">{profile.area}</td>
                            <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(profile.signupTime)}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleDeleteUser(principal)}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.2)' }}
                              >
                                {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
                <div className="divide-y" style={{ borderColor: '#1a1a1a' }}>
                  {feedbacks.map((fb) => {
                    const isDeleting = deletingFeedbackId === fb.id;
                    return (
                      <div
                        key={fb.id.toString()}
                        className="px-4 py-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-white text-sm">{fb.name}</span>
                              <StarDisplay count={fb.stars} />
                              <span className="text-xs text-gray-500">{formatDate(fb.timestamp)}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{fb.message}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteFeedback(fb.id)}
                            disabled={isDeleting}
                            className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.2)' }}
                          >
                            {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Services Tab ── */}
        {activeTab === 'services' && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5" style={{ color: '#4FC3F7' }} />
                <h2 className="text-lg font-semibold text-white">Services</h2>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#1a1a1a', color: '#4FC3F7', border: '1px solid #2a2a2a' }}
                >
                  {services.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => refetchServices()}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
                {!showAddForm && !editingService && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)', color: '#0d0d0d' }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Service
                  </button>
                )}
              </div>
            </div>

            {/* Add Service Form */}
            {showAddForm && (
              <div
                className="rounded-xl p-5 mb-4"
                style={{ backgroundColor: '#111111', border: '1px solid #1e1e1e' }}
              >
                <h3 className="text-sm font-semibold text-white mb-4">Add New Service</h3>
                <ServiceForm
                  onSubmit={handleAddService}
                  onCancel={() => setShowAddForm(false)}
                  isLoading={addService.isPending}
                  submitLabel="Add Service"
                />
              </div>
            )}

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #1e1e1e', backgroundColor: '#111111' }}
            >
              {servicesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#4FC3F7' }} />
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No services added yet. Click "Add Service" to get started.
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: '#1a1a1a' }}>
                  {services.map((service) => {
                    const isDeleting = deletingServiceId === service.id;
                    const isEditing = editingService?.id === service.id;
                    return (
                      <div
                        key={service.id.toString()}
                        className="px-4 py-4 hover:bg-white/[0.02] transition-colors"
                      >
                        {isEditing ? (
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                              Editing: {service.name}
                            </h4>
                            <ServiceForm
                              initial={{
                                name: service.name,
                                description: service.description,
                                icon: service.icon,
                                startingPrice: service.startingPrice.toString(),
                              }}
                              onSubmit={handleUpdateService}
                              onCancel={() => setEditingService(null)}
                              isLoading={updateService.isPending}
                              submitLabel="Save Changes"
                            />
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <span className="text-2xl flex-shrink-0">{service.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold text-white text-sm">{service.name}</span>
                                  <span
                                    className="px-2 py-0.5 rounded text-xs font-bold"
                                    style={{ backgroundColor: 'rgba(79,195,247,0.1)', color: '#4FC3F7' }}
                                  >
                                    ₹{service.startingPrice.toString()}+
                                  </span>
                                </div>
                                <p className="text-gray-400 text-xs leading-relaxed">{service.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setEditingService(service);
                                  setShowAddForm(false);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                                style={{ backgroundColor: 'rgba(255,215,0,0.1)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.2)' }}
                              >
                                <Pencil className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.2)' }}
                              >
                                {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Note about authorization */}
            <div
              className="mt-4 rounded-xl p-4"
              style={{ backgroundColor: 'rgba(79,195,247,0.05)', border: '1px solid rgba(79,195,247,0.15)' }}
            >
              <p className="text-xs text-gray-400">
                <span style={{ color: '#4FC3F7' }}>ℹ️ Note:</span> Adding, editing, or deleting services requires Internet Identity admin authentication. If you see an "Unauthorized" error, please log in with your admin Internet Identity account first.
              </p>
            </div>
          </section>
        )}

        {/* ── Mechanic Registrations Tab ── */}
        {activeTab === 'mechanics' && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserCog className="w-5 h-5" style={{ color: '#4ade80' }} />
                <h2 className="text-lg font-semibold text-white">Mechanic Registrations</h2>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#1a1a1a', color: '#4ade80', border: '1px solid #2a2a2a' }}
                >
                  {mechanicRegs.length}
                </span>
              </div>
              <button
                onClick={() => refetchMechanicRegs()}
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
              {mechanicRegsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#4ade80' }} />
                </div>
              ) : mechanicRegs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No mechanic registrations yet.
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: '#1a1a1a' }}>
                  {mechanicRegs.map((reg, index) => (
                    <div
                      key={index}
                      className="px-4 py-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.1))', border: '1px solid rgba(74,222,128,0.2)' }}
                          >
                            <UserCog className="w-5 h-5" style={{ color: '#4ade80' }} />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{reg.name}</p>
                            <p className="text-xs text-gray-400">{reg.serviceType} · {reg.experience}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {formatDateFromNano(reg.timestamp)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <InfoCell label="Phone" value={reg.phone} highlight />
                        {reg.email && <InfoCell label="Email" value={reg.email} />}
                        <InfoCell label="Service Type" value={reg.serviceType} />
                        <InfoCell label="Experience" value={reg.experience} />
                        {Number(reg.age) > 0 && <InfoCell label="Age" value={`${reg.age} years`} />}
                        {reg.preferredArea && <InfoCell label="Preferred Area" value={reg.preferredArea} />}
                        <div className="sm:col-span-2 lg:col-span-3">
                          <InfoCell label="Address" value={reg.address} />
                        </div>
                        {reg.whyJoin && (
                          <div className="sm:col-span-2 lg:col-span-3">
                            <InfoCell label="Why Join" value={reg.whyJoin} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function InfoCell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{ backgroundColor: '#0d0d0d', border: '1px solid #1e1e1e' }}
    >
      <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">{label}</p>
      <p
        className="text-sm font-medium break-words"
        style={{ color: highlight ? '#4ade80' : '#e5e7eb' }}
      >
        {value}
      </p>
    </div>
  );
}

// ── Root Component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
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
