/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include root HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in src directory
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-blue": "0 4px 6px -1px rgba(59, 130, 246, 0.5)",
        "custom-red": "0 4px 6px -1px rgba(239, 68, 68, 0.5)",
        "custom-yellow": "0 4px 6px -1px rgba(234, 179, 8, 0.5)",
      },
    },
  },
  plugins: [],
};
