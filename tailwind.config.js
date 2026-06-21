module.exports = {
  content: ['./*.html', './assets/*.js'],
  theme: {
    extend: {
      colors: {
        parchment: '#F4EDE0',
        'parchment-dim': '#EBE1D0',
        'parchment-deep': '#E2D6C0',
        forest: '#1E3A2F',
        'forest-dark': '#16291F',
        stone: '#7D6348',
        ink: '#110F08',
        sand: '#A89880',
        clay: '#C2603A',
        'clay-dark': '#A84E2B',
      },
      fontFamily: {
        sans: ['"General Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"General Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0) rotate(var(--tw-rotate,0))' }, '50%': { transform: 'translateY(-14px) rotate(var(--tw-rotate,0))' } },
        floatslow: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-22px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatslow: 'floatslow 9s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
};
