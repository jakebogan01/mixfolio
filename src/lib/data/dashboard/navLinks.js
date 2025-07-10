import { DASHBOARD, CONTENT } from '$lib/utils/constants.js';

export const navLinks = [
	{
		id: 1,
		link: '/',
		text: 'Home',
		icon: 'user'
	},
	{
		id: 2,
		link: DASHBOARD,
		text: 'Dashboard',
		icon: 'home'
	},
	{
		id: 3,
		link: CONTENT,
		text: 'Content',
		icon: 'user'
	},
	{
		id: 4,
		link: '/portfolio/erin-martin',
		text: 'View portfolio',
		icon: 'user'
	}
];
