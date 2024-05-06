/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Override the default scale to use pixels
        xs: "12px", // Extra small: 12px
        sm: "14px", // Small: 14px
        base: "16px", // Base: 16px
        lg: "18px", // Large: 18px
        xl: "20px", // Extra large: 20px
        "2xl": "24px", // 2 Extra large: 24px
      },
    },
  },
  plugins: [],
};
