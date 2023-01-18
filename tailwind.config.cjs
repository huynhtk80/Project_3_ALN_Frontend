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
          primary: '#f1a104',
          secondary: '#00743f',
          accent: '#70ced0',
          neutral: '#25b396',
          'base-100': '#ffff',
          info: '#ffff',
          success: '#16a34a',
          warning: '#F8DA63',
          error: '#E23D32',
        },
      },
      {
        dark: {
          primary: '#f1a104',
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
