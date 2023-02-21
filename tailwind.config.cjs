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
          primary: '#ECEFF4',
          secondary: '#2E3440',
          accent: '#1cb317',
          neutral: '#718096',
          'base-100': '#FFFFFF',
          info: '#81A1C1',
          success: '#48BB78',
          warning: '#F6AD55',
          error: '#E53E3E',
        },
      },
      {
        dark: {
          primary: '#2E3440',
          secondary: '#D8DEE9',
          accent: '#FFC300',
          neutral: '#A0AEC0',
          'base-100': '#0a1a36',
          info: '#81A1C1',
          success: '#48BB78',
          warning: '#F6AD55',
          error: '#E53E3E',
        },
      },
    ],
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
