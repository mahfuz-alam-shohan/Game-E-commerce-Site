// International Design System
export function getDesignSystemStyles(): string {
  return `
    :root {
      /* Color System */
      --primary: #6366f1;
      --primary-dark: #4f46e5;
      --primary-light: #818cf8;
      --secondary: #ec4899;
      --accent: #10b981;
      --neutral: #6b7280;
      --success: #22c55e;
      --warning: #f59e0b;
      --error: #ef4444;
      
      /* Neutral Scale */
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
      
      /* Typography Scale */
      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 1.875rem;
      --text-4xl: 2.25rem;
      --text-5xl: 3rem;
      --text-6xl: 3.75rem;
      
      /* Spacing Scale */
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.25rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-10: 2.5rem;
      --space-12: 3rem;
      --space-16: 4rem;
      --space-20: 5rem;
      --space-24: 6rem;
      
      /* Border Radius */
      --radius-sm: 0.25rem;
      --radius: 0.5rem;
      --radius-md: 0.75rem;
      --radius-lg: 1rem;
      --radius-xl: 1.5rem;
      --radius-2xl: 2rem;
      --radius-full: 9999px;
      
      /* Shadows */
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      
      /* Transitions */
      --transition-fast: 150ms ease;
      --transition: 200ms ease;
      --transition-slow: 300ms ease;
      
      /* Z-Index */
      --z-dropdown: 1000;
      --z-sticky: 1020;
      --z-fixed: 1030;
      --z-modal-backdrop: 1040;
      --z-modal: 1050;
      --z-popover: 1060;
      --z-tooltip: 1070;
      --z-toast: 1080;
    }

    /* Responsive Breakpoints */
    @media (max-width: 640px) {
      :root {
        --text-xs: 0.875rem;
        --text-sm: 1rem;
        --text-base: 1.125rem;
      }
    }

    /* Dark Mode */
    @media (prefers-color-scheme: dark) {
      :root {
        --primary: #818cf8;
        --primary-dark: #6366f1;
        --gray-50: #111827;
        --gray-100: #1f2937;
        --gray-200: #374151;
        --gray-300: #4b5563;
        --gray-400: #6b7280;
        --gray-500: #9ca3af;
        --gray-600: #d1d5db;
        --gray-700: #e5e7eb;
        --gray-800: #f3f4f6;
        --gray-900: #f9fafb;
      }
    }
  `;
}
