/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens — these resolve differently
        // depending on [data-theme="light"|"dark"] on <html>.
        // Prefer these in components over the raw 'brand' colors below.
        bg: 'var(--color-bg)',
        'bg-raised': 'var(--color-bg-raised)',
        surface: 'var(--color-surface)',
        'surface-sunken': 'var(--color-surface-sunken)',
        border: {
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          'on-accent': 'var(--color-text-on-accent)',
        },
        violet: {
          DEFAULT: 'var(--color-violet)',
          soft: 'var(--color-violet-soft)',
          dim: 'var(--color-violet-dim)',
        },
        teal: {
          DEFAULT: 'var(--color-teal)',
          dim: 'var(--color-teal-dim)',
        },
        coral: {
          DEFAULT: 'var(--color-coral)',
          dim: 'var(--color-coral-dim)',
        },
        amber: {
          DEFAULT: 'var(--color-amber)',
          dim: 'var(--color-amber-dim)',
        },
        overlay: {
          faint: 'var(--color-overlay-faint)',
          soft: 'var(--color-overlay-soft)',
          medium: 'var(--color-overlay-medium)',
          strong: 'var(--color-overlay-strong)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.375rem',
        '2xl': '1.75rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        full: '999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        raised: 'var(--shadow-raised)',
        'glow-violet': 'var(--shadow-glow-violet)',
      },
      transitionTimingFunction: {
        flow: 'cubic-bezier(0.32, 0.72, 0, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      width: {
        rail: '248px',
        'rail-collapsed': '84px',
      },
      maxWidth: {
        content: '1320px',
      },
      keyframes: {
        'pour-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'pour-in': 'pour-in 900ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'rise-in': 'rise-in 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 280ms ease-out forwards',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
