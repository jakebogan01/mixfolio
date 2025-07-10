// src/lib/utils/successMessage.js
import toast from 'svelte-5-french-toast';

const COOKIE_NAME = '__success_toast__';

// Server: Set a success message in a cookie
export function createSuccessMessage(cookies, message) {
	if (!message) return;

	cookies.set(COOKIE_NAME, JSON.stringify({ message }), {
		path: '/',
		maxAge: 5,
		httpOnly: false
	});
}

// Server: Read and clear the message from cookie
export function readSuccessMessage(cookies) {
	const raw = cookies.get(COOKIE_NAME);
	if (!raw) return null;

	try {
		const parsed = JSON.parse(raw);
		cookies.delete(COOKIE_NAME, { path: '/' });
		return parsed.message ?? null;
	} catch {
		return null;
	}
}

// Client: Show the success toast from SSR data
export function showSuccessToast(data) {
	const message = data?.successMessage;
	if (!message) return;

	toast.success(message);
}
