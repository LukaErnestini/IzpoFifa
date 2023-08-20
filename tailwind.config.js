/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				fifafont: ['Archivo Black', 'sans-serif']
			}
		}
	},
	daisyui: {
		themes: ['dark']
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
