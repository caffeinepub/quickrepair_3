import { useState } from 'react';
import { X, User, Phone, MapPin, Loader2 } from 'lucide-react';
import { useRegisterUser } from '../hooks/useQueries';

const SERVICE_AREAS = [
  'Mahipalpur Extension',
  'Mahipalpur Village',
  'Aerocity',
  'Vasant Kunj',
  'Rangpuri',
  'Nagal Dewat',
];

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [error, setError] = useState('');

  const registerUser = useRegisterUser();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }
    if (!area) {
      setError('Please select your service area.');
      return;
    }

    try {
      await registerUser.mutateAsync({ name: name.trim(), phone: phone.trim(), area });
      onClose();
    } catch {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
          >
            <User className="w-6 h-6" style={{ color: '#0d0d0d' }} />
          </div>
          <h2 className="text-xl font-bold text-white">Complete Your Profile</h2>
          <p className="text-sm text-gray-400 mt-1">
            Help us serve you better by sharing a few details.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  // @ts-ignore
                  '--tw-ring-color': '#FFD700',
                }}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                }}
              />
            </div>
          </div>

          {/* Service Area */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Service Area
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              />
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white outline-none transition-all focus:ring-2 appearance-none"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  color: area ? 'white' : '#6b7280',
                }}
              >
                <option value="" disabled style={{ color: '#6b7280' }}>
                  Select your area
                </option>
                {SERVICE_AREAS.map((a) => (
                  <option key={a} value={a} style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm" style={{ color: '#FF8C42' }}>
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={registerUser.isPending}
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF8C42)',
                color: '#0d0d0d',
              }}
            >
              {registerUser.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
