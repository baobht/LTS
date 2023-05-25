/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#4285f4',
			},
		},
	},
	plugins: [],
};
