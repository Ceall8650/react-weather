module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
}
