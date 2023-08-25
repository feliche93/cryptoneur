import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	plugins: [require('daisyui'), tailwindcssAnimate],
	daisyui: {
		themes: ["light", "dark"],
	},
};

export default config;
