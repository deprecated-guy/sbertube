const plugin = require('tailwindcss/plugin');

const rotateX = plugin(function ({ addUtilities }) {
	addUtilities({
		'.rotate-y-180': {
			transform: 'rotateY(180deg)',
		},
		'.h-content': {
			height: 'max-content',
		},
	});
});

module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [rotateX],
};
