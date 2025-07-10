/**
 * Converts a human-readable date string (e.g., "June 14, 2023")
 * to an ISO 8601 date string in YYYY-MM-DD format.
 *
 * @param dateString - A human-readable date string
 * @returns A string in "YYYY-MM-DD" format, or an empty string if invalid
 */
export function toISODate(dateString) {
	try {
		return new Date(dateString).toISOString().split('T')[0];
		// eslint-disable-next-line no-unused-vars
	} catch (e) {
		console.error('Invalid date string passed to toISODate:', dateString);
		return '';
	}
}
