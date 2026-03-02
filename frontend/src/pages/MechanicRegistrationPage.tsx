import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Loader2, ArrowLeft, UserCog } from 'lucide-react';
import { useSubmitMechanicRegistration } from '../hooks/useQueries';
import { playSuccessSound } from '../utils/playSuccessSound';

// ── GPay-style Success Overlay ────────────────────────────────────────────────
interface SuccessOverlayProps {
  visible: boolean;
  onClose: () => void;
}

function SuccessOverlay({ visible, onClose }: SuccessOverlayProps) {
  if (!visible) return null;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const overlay = (
    <div
      className="booking-success-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Registration successful"
    >
      <div className="booking-success-card" onClick={(e) => e.stopPropagation()}>
        <div className="booking-success-icon-wrap">
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="booking-success-svg"
          >
            <circle cx="65" cy="65" r="60" fill="rgba(34,197,94,0.10)" />
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="#22c55e"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform="rotate(-90 65 65)"
              className="booking-success-circle"
            />
            <polyline
              points="38,67 56,85 92,46"
              stroke="#ffffff"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="booking-success-check"
            />
          </svg>
        </div>
        <div className="booking-success-text-wrap">
          <p className="booking-success-title">Registration Successful!</p>
          <p className="booking-success-subtitle">We'll contact you soon.</p>
          <p className="booking-success-hint">✅ हम जल्द ही आपसे संपर्क करेंगे।</p>
        </div>
        <button className="booking-success-dismiss" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

// ── Form Field Helpers ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  backgroundColor: '#0f2233',
  border: '1px solid #1e3a52',
  color: '#ffffff',
};

const labelClass = 'block text-xs font-semibold uppercase tracking-wider mb-1.5';
const inputClass =
  'w-full px-4 py-3 rounded-xl text-sm placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-orange-400';

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MechanicRegistrationPage() {
  const submitMutation = useSubmitMechanicRegistration();
  const formRef = useRef<HTMLFormElement>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    experience: '',
    address: '',
    age: '',
    preferredArea: '',
    whyJoin: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^\d{10,15}$/.test(formData.phone.trim()))
      newErrors.phone = 'Enter a valid phone number (10–15 digits).';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type.';
    if (!formData.experience) newErrors.experience = 'Please select your experience.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save to backend canister (best-effort, don't block form submission)
    try {
      await submitMutation.mutateAsync({
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        serviceType: formData.serviceType,
        experience: formData.experience,
        address: formData.address.trim(),
        age: formData.age ? parseInt(formData.age, 10) : 0,
        preferredArea: formData.preferredArea,
        whyJoin: formData.whyJoin.trim(),
      });
    } catch {
      // Silently continue — formsubmit.co will still receive the data
    }

    // Show GPay-style success animation + sound
    playSuccessSound();
    setShowSuccess(true);

    // After 2.5 seconds, submit the actual HTML form to formsubmit.co
    setTimeout(() => {
      setShowSuccess(false);
      if (formRef.current) {
        formRef.current.submit();
      }
    }, 2500);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a2b3c' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ backgroundColor: '#071e2b', borderColor: '#1e3a52' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <span className="font-black text-xl" style={{ color: '#FFD700' }}>Quick</span>
            <span className="font-black text-xl" style={{ color: '#FF8C42' }}>Repair</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-20">
        {/* Page Title */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, #FF8C42, #FFD700)' }}
          >
            <UserCog className="w-8 h-8" style={{ color: '#0a2b3c' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            👨‍🔧 Mechanic Registration
          </h1>
          <p className="text-gray-300 text-base max-w-md mx-auto">
            Join the QuickRepair team and start earning. Fill in your details below and we'll get in touch.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: '#071e2b', border: '1px solid #1e3a52' }}
        >
          {/* This form posts to formsubmit.co */}
          <form
            ref={formRef}
            action="https://formsubmit.co/pandeyxkanha@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Hidden fields for formsubmit.co */}
            <input type="hidden" name="_subject" value="👨‍🔧 New Mechanic Registration" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://quickrepair-84g.caffeine.xyz/mechanic-thankyou.html"
            />
            {/* Honeypot */}
            <input type="text" name="_honey" style={{ display: 'none' }} />

            {/* Full Name */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Full Name <span style={{ color: '#FF8C42' }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
                style={{
                  ...inputStyle,
                  borderColor: errors.fullName ? '#ff6b6b' : '#1e3a52',
                }}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs" style={{ color: '#ff6b6b' }}>{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Phone Number <span style={{ color: '#FF8C42' }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={inputClass}
                style={{
                  ...inputStyle,
                  borderColor: errors.phone ? '#ff6b6b' : '#1e3a52',
                }}
              />
              {errors.phone && (
                <p className="mt-1 text-xs" style={{ color: '#ff6b6b' }}>{errors.phone}</p>
              )}
            </div>

            {/* Email (optional) */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Email <span className="text-gray-500 normal-case font-normal">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Service Type */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Service Type <span style={{ color: '#FF8C42' }}>*</span>
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={inputClass}
                style={{
                  ...inputStyle,
                  borderColor: errors.serviceType ? '#ff6b6b' : '#1e3a52',
                }}
              >
                <option value="">Select service type</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Fan/Cooler Repair">Fan/Cooler Repair</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Mechanic">Mechanic</option>
              </select>
              {errors.serviceType && (
                <p className="mt-1 text-xs" style={{ color: '#ff6b6b' }}>{errors.serviceType}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Experience <span style={{ color: '#FF8C42' }}>*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClass}
                style={{
                  ...inputStyle,
                  borderColor: errors.experience ? '#ff6b6b' : '#1e3a52',
                }}
              >
                <option value="">Select experience</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1–3 years</option>
                <option value="3-5 years">3–5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
              {errors.experience && (
                <p className="mt-1 text-xs" style={{ color: '#ff6b6b' }}>{errors.experience}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Address in Mahipalpur <span style={{ color: '#FF8C42' }}>*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your full address in Mahipalpur"
                rows={3}
                className={`${inputClass} resize-none`}
                style={{
                  ...inputStyle,
                  borderColor: errors.address ? '#ff6b6b' : '#1e3a52',
                }}
              />
              {errors.address && (
                <p className="mt-1 text-xs" style={{ color: '#ff6b6b' }}>{errors.address}</p>
              )}
            </div>

            {/* Age (optional) */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Age <span className="text-gray-500 normal-case font-normal">(optional)</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 28"
                min="18"
                max="70"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Preferred Area */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Preferred Area <span className="text-gray-500 normal-case font-normal">(optional)</span>
              </label>
              <select
                name="preferredArea"
                value={formData.preferredArea}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select preferred area</option>
                <option value="Mahipalpur Extension">Mahipalpur Extension</option>
                <option value="Mahipalpur Village">Mahipalpur Village</option>
                <option value="Aerocity">Aerocity</option>
                <option value="Dwarka Sector 1">Dwarka Sector 1</option>
                <option value="Dwarka Sector 2">Dwarka Sector 2</option>
                <option value="Any Area">Any Area</option>
              </select>
            </div>

            {/* Why Join (optional) */}
            <div>
              <label className={labelClass} style={{ color: '#FFD700' }}>
                Why do you want to join?{' '}
                <span className="text-gray-500 normal-case font-normal">(optional)</span>
              </label>
              <textarea
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself and why you want to join QuickRepair..."
                rows={3}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-4 rounded-xl text-base font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#FF8C42',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(255,140,66,0.35)',
                }}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  '📝 Register as Mechanic'
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 pt-1">
              By registering, you agree to be contacted by the QuickRepair team.
            </p>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '💰', title: 'Good Earnings', desc: 'Earn per job, flexible hours' },
            { icon: '📍', title: 'Local Work', desc: 'Work near Mahipalpur area' },
            { icon: '🤝', title: 'Team Support', desc: 'Full support from our team' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: '#071e2b', border: '1px solid #1e3a52' }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Success Overlay */}
      <SuccessOverlay visible={showSuccess} onClose={handleSuccessClose} />
    </div>
  );
}
