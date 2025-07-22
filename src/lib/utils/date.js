export function toISODate(dateString) {
	try {
		const date = new Date(dateString);
		const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();

		return `${month}/${day}/${year}`;
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		console.error('Invalid date string passed to toISODate:', dateString);
		return '';
	}
}
