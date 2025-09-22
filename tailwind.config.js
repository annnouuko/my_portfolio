/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#020202',
        'custom-emerald': '#4FA695',
        'custom-gray': '#1D1D1D',
        'custom-gray1': '#191919',
        'custom-gray2': '#0F1816',
      },
      fontFamily: {
        handjet: ['Handjet', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
      },
      aspectRatio: {
        'square': '1 / 1',
        'video': '16 / 9',
        // Добавьте свои дополнительные соотношения, если нужно
      },
      objectFit: {
        'cover': 'cover',
        'contain': 'contain',
        'fill': 'fill',
        'none': 'none',
        'scale-down': 'scale-down',
      },
    },
  },
  plugins: [],
};
