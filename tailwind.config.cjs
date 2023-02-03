/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('@tailwindcss/typography', '@tailwindcss/forms'),
    require('daisyui'),
  ],
  theme: {},
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
          'base-100': '#192e5b',
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
