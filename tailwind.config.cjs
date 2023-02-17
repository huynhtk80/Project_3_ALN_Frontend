/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('@tailwindcss/typography', '@tailwindcss/forms'),
    require('daisyui'),
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '1' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0.6' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        rotatein: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadein: 'fadein 5s linear',
        wiggle: 'wiggle 1s ease-in-out infinite',
        rotatein: 'rotatein .3s linear',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#f3f4f6',
          secondary: '#374151',
          accent: '#115e59',
          neutral: '#737373',
          'base-100': '#ffffff',
          info: '#38bdf8',
          success: '#16a34a',
          warning: '#eab308',
          error: '#dc2626',
        },
      },
      {
        dark: {
          primary: '#1e65a7',
          secondary: '#00743f',
          accent: '#1e65a7',
          neutral: '#25b396',
          'base-100': '#0a122e',
          info: '#ffff',
          success: '#16a34a',
          warning: '#F8DA63',
          error: '#E23D32',
        },
      },
    ],
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
