import { DASHBOARD, CONTENT } from '$lib/utils/constants.js';

export const navLinks = [
	{
		id: 1,
		link: DASHBOARD,
		text: 'Dashboard',
		icon: 'home'
	},
	{
		id: 2,
		link: CONTENT,
		text: 'Content',
		icon: 'user'
	},
	{
		id: 3,
		link: '/portfolio/erin-martin',
		text: 'View portfolio',
		icon: 'user'
	}
];
