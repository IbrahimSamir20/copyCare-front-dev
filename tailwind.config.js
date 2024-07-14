/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px', // Extra small screens
      sm: '640px', // Small screens (mobile)
      md: '768px', // Medium screens (tablets)
      lg: '1024px', // Large screens (laptops/desktops)
      xl: '1280px', // Extra large screens (large desktops)
      '1.25xl': '1366px', // Between xl and 2xl
      '1.5xl': '1440px', // Between xl and 2xl
      '1.75xl': '1600px', // Between xl and 2xl
      '2xl': '1536px', // 2x large screens (very large desktops)
      '2.25xl': '1600px', // Between 2xl and 3xl
      '2.5xl': '1680px', // Between 2xl and 3xl
      '2.75xl': '1760px', // Between 2xl and 3xl
      '3xl': '1920px', // 3x large screens (ultra large desktops)
      '3.25xl': '2048px', // Beyond 3xl
      '3.5xl': '2560px', // Beyond 3xl
      '3.75xl': '3840px', // Beyond 3xl (4K)
      '4xl': '5120px', // Beyond 3xl (5K)
      '5xl': '7680px', // Beyond 3xl (8K)
    },
    extend: {
      zIndex: {
        60: '60',
        70: '70',
      },
      colors: {
        primary: '#1D4ED8', // Blue
        secondary: '#10B981', // Green
        accent: '#F97316', // Orange
        success: '#10B981', // Green
        error: '#EF4444', // Red
        warning: '#F59E0B', // Orange
        info: '#3B82F6', // Blue variant
        textPrimary: '#1F2937', // Dark gray text
        textSecondary: '#6B7280', // Lighter gray text
        dark: {
          primary: '#2563EB', // Darker blue
          secondary: '#059669', // Darker green
          accent: '#EA580C', // Darker orange
          success: '#059669', // Darker green
          error: '#DC2626', // Darker red
          warning: '#D97706', // Darker orange
          info: '#2563EB', // Darker blue variant
          textPrimary: '#F3F4F6', // Light gray text
          textSecondary: '#9CA3AF', // Lighter gray text
          background: '#111827', // Dark background
          surface: '#1F2937', // Dark surface
        },
      },
      fontSize: {
        base: '16px', // Base font size
      },
      borderRadius: {
        DEFAULT: '4px', // Border radius
      },
    },
  },
  plugins: [],
};
