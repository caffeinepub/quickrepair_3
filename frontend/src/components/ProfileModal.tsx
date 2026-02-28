import React, { useState } from 'react';
import { X, User, Phone, MapPin } from 'lucide-react';
import { useRegisterUser } from '../hooks/useQueries';

interface ProfileModalProps {
  onClose: () => void;
}

const serviceAreas = [
  'Mahipalpur', 'Dwarka', 'Vasant Kunj', 'Kapashera',
  'Palam', 'Uttam Nagar', 'Janakpuri', 'Rajouri Garden', 'Other',
];

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const registerUser = useRegisterUser();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\+?[\d\s\-]{8,15}$/.test(phone.trim())) newErrors.phone = 'Enter a valid phone number.';
    if (!area) newErrors.area = 'Please select your area.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await registerUser.mutateAsync({ name: name.trim(), phone: phone.trim(), area });
      onClose();
    } catch {
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md popup-enter">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-black"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
            >
              <User size={24} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 font-heading">Complete Your Profile</h2>
            <p className="text-gray-500 text-sm mt-1">Help us serve you better</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                  style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 99999"
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.phone ? 'border-red-400' : 'border-gray-200'
                  }`}
                  style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Area */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1.5">Service Area</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent appearance-none ${
                    errors.area ? 'border-red-400' : 'border-gray-200'
                  }`}
                  style={{ '--tw-ring-color': '#FFD700' } as React.CSSProperties}
                >
                  <option value="">Select your area</option>
                  {serviceAreas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                Skip for now
              </button>
              <button
                type="submit"
                disabled={registerUser.isPending}
                className="flex-1 py-3 rounded-xl font-bold text-black text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C42)' }}
              >
                {registerUser.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
