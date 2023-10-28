import { Color } from './color';

export const colorParser = (color: string): Color => {
	color = color.replace('#', '');
	return {
		r: parseInt(color.substring(0, 2), 16),
		g: parseInt(color.substring(2, 4), 16),
		b: parseInt(color.substring(4, 6), 16),
	};
};
