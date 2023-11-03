const plugin = require('tailwindcss/plugin');

const rotateX = plugin(function ({ addUtilities }) {
	addUtilities({
		'.rotate-y-180': {
			transform: 'rotateY(180deg)',
		},
		'.h-content': {
			height: 'max-content',
		},
		'.translate-z-10': {
			transform: 'translateZ(20px)',
			boxShadow: 'black 1px 2px 3px ',
			background: 'black',
			perspective: 16,
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
