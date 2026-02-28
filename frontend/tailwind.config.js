/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'oklch(82% 0.18 85)',
          foreground: 'oklch(15% 0.02 260)',
        },
        secondary: {
          DEFAULT: 'oklch(70% 0.16 55)',
          foreground: 'oklch(15% 0.02 260)',
        },
        destructive: {
          DEFAULT: 'oklch(55% 0.22 25)',
          foreground: 'oklch(95% 0.01 260)',
        },
        muted: {
          DEFAULT: 'oklch(22% 0.02 260)',
          foreground: 'oklch(65% 0.02 260)',
        },
        accent: {
          DEFAULT: 'oklch(82% 0.18 85)',
          foreground: 'oklch(15% 0.02 260)',
        },
        popover: {
          DEFAULT: 'oklch(16% 0.025 260)',
          foreground: 'oklch(95% 0.01 260)',
        },
        card: {
          DEFAULT: 'oklch(16% 0.025 260)',
          foreground: 'oklch(95% 0.01 260)',
          light: 'oklch(99% 0.002 260)',
          'light-foreground': 'oklch(15% 0.02 260)',
        },
        // Brand colors
        brand: {
          yellow: '#FFD700',
          orange: '#FF8C42',
        },
        // Surface shades
        surface: {
          50: 'oklch(18% 0.02 260)',
          100: 'oklch(20% 0.025 260)',
          200: 'oklch(24% 0.025 260)',
          300: 'oklch(30% 0.03 260)',
          400: 'oklch(45% 0.03 260)',
          500: 'oklch(55% 0.03 260)',
          600: 'oklch(65% 0.03 260)',
          700: 'oklch(75% 0.02 260)',
          800: 'oklch(85% 0.01 260)',
          900: 'oklch(92% 0.01 260)',
        },
        // White card
        'white-card': 'oklch(99% 0.002 260)',
        'white-card-border': 'oklch(88% 0.01 260)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'card': '0 2px 12px oklch(8% 0.02 260 / 0.15)',
        'card-hover': '0 8px 32px oklch(8% 0.02 260 / 0.25)',
        'white-card': '0 4px 24px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)',
        'white-card-hover': '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
        'glow-yellow': '0 0 20px rgba(255, 215, 0, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 140, 66, 0.3)',
      },
      keyframes: {
        slideUpFadeIn: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.6' },
          '33%': { transform: 'translateY(-20px) rotate(120deg)', opacity: '1' },
          '66%': { transform: 'translateY(-10px) rotate(240deg)', opacity: '0.8' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'slide-up': 'slideUpFadeIn 0.7s ease forwards',
        'bounce-in': 'bounceIn 0.6s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'particle': 'particleFloat 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
