module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 1px 3px 0 #999999'
      },
      colors: {
        card: '#f9f9f9',
        container: '#ededed',
        default: '#828282',
        temperature: '#757575',
        title: '#212121',
      },
      minWidth: {
        card: '360px'
      }
    },
  },
  plugins: [],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
}
