/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // fontFamily: {
    //   courier: ['Courier', 'monospace'],
    //   source: ['Courier Prime', 'monospace'],
    // },
    boxShadow: {
      'right-bottom': '10px 10px 10px rgba(0, 0, 0, 0.5)',
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
};
