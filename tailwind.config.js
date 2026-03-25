/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        mono: ['monospace'],
        ocr: ['ocr-a-std', 'monospace'],
      },
      fontSize: {
        terminal: '16px',
        'terminal-mobile': '10px',
      },
      animation: {
        blink: 'blink 0.65s step-end infinite',
        jitter: 'jittery 0.3s ease-in-out infinite',
        dotty: 'dotty 1s steps(1, end) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'white' },
        },
        jittery: {
          '10%': { transform: 'translate(-0.1px, -0.15px) scale(1, 1)' },
          '20%': { transform: 'translate(0.15px, 0.1px) scale(1, 1)' },
          '30%': { transform: 'translate(-0.2px, -0.25px) scale(1, 1)' },
          '40%': { transform: 'translate(0.05px, 0.1px) scale(1, 1)' },
          '50%': { transform: 'translate(-0.025px, -0.05px) scale(1, 1)' },
          '60%': { transform: 'translate(0px, 0.075px) scale(1, 1)' },
          '70%': { transform: 'translate(-0.075px, -0.1px) scale(1, 1)' },
          '80%': { transform: 'translate(0.075px, 0.125px) scale(1, 1)' },
          '90%': { transform: 'translate(-0.125px, -0.075px) scale(1, 1)' },
          '100%': { transform: 'translate(0.075px, 0.025px) scale(1, 1)' },
        },
        dotty: {
          '0%': { content: "'   '" },
          '25%': { content: "'. '" },
          '50%': { content: "'.. '" },
          '75%': { content: "'...'" },
          '100%': { content: "'   '" },
        },
      },
    },
  },
  plugins: [],
};
