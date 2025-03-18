/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {colors: {
        bg_dark: "#012a4a",  // Dark Blue
        bg_light: "#2a6f97", // Gray Blue
        accent: "#3B82F6",   // Bright Blue
        background: "#F1F5F9", // Light Gray
        textclr: "#2a6f97",     // Dark Gray
        card: "#FFFFFF",     // White
        hero: "#2563EB",     // Vibrant Blue
        footer: "#1F2937",   // Dark Gray
      },},
    },
    plugins: [],
  };
  
  