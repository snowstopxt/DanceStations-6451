import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontSize: {
      'h1-s': '2.0rem',
      'h1-l': '2.188rem',
      'h2-s': '1.125rem',
      'h2-l': '1.375rem',
      'h3-s': '1.0rem',
      'h3-l': '1.063rem',
      'body-s': '0.875rem',
      'body-l': '1.0rem',
      'button-s': '0.625rem',
      'button-l': '0.875rem',
    },
    colors: {
      'brand-purple': '#ccabd8',
      'brand-dark-purple': '#8474a1',
      'brand-teal': '#6ec6ca',
      'brand-dark-teal': '#08979d',
      'white': '#ffffff',
      'black': '#000000',
      'light-grey': '#F5F5F7',
      'dark-grey': '#8B8FA8',
  },
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
  },
},
  
  fontFamily: {
    'sans': ['Nunito'],
  },
  plugins: [],
  
};
export default config;
