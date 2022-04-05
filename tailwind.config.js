const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 3px 0 #999999',
        'dark-card': '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        'button-submit': '#40a9f3',
        card: '#f9f9f9',
        container: '#ededed',
        'dark-container': '#1f2022',
        'dark-card': '#121416',
        'dark-title': '#f9f9fa',
        'dark-temperature': '#dddddd',
        default: '#828282',
        'dark-default': '#cccccc',
        temperature: '#757575',
        title: '#212121',
      },
      minWidth: {
        card: '360px'
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite'
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant, e}) {
      
    })
  ],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
}
