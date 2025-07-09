import { DASHBOARD, CONTENT, THEMES, SETTINGS } from '$lib/utils/constants.js';

export const navLinks = [
	{
		id: 1,
		link: DASHBOARD,
		text: 'Home',
		icon: 'home'
	},
	{
		id: 2,
		link: CONTENT,
		text: 'Portfolio',
		icon: 'user'
	},
	{
		id: 3,
		link: THEMES,
		text: 'Themes',
		icon: 'adjustments'
	},
	{
		id: 4,
		link: SETTINGS,
		text: 'Settings',
		icon: 'cog'
	}
];
