/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        Blue:"#413bdc",
        White:"#fbfafd",
        Purple:"#7775c3"
      }
    },
  },
  plugins: [],
}

