// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-black': '#0f1011',
        'sub-black': '#262626',
        'content-black': '#1A1A1A',
        'hover-black': '#2D2D2D',
        'gray-text': '#CCCCCC'
      }
    }
  },
  plugins: []
};
