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
                cyber: {
                    purple: '#a855f7',
                    cyan: '#06b6d4',
                    pink: '#ec4899',
                    blue: '#3b82f6',
                },
            },
            fontFamily: {
                mono: ['var(--font-mono)', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4' },
                    '100%': { boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4' },
                },
            },
        },
    },
    plugins: [],
}
