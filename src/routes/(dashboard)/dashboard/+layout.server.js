/**
 * This file is necessary to ensure protection of all routes in the `private`
 * directory. It makes the routes in this directory _dynamic_ routes, which
 * send a server request, and thus trigger `hooks.server.ts`.
 **/
import { readSuccessMessage } from '$lib/utils/cookieMessage.js';

export const load = async ({ cookies }) => {
	const successMessage = readSuccessMessage(cookies);
	return { successMessage };
};
