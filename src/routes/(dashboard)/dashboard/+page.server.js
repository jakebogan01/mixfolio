import { getClient } from '@umami/api-client';
import {
	UMAMI_API_KEY,
	UMAMI_API_CLIENT_ENDPOINT,
	UMAMI_API_WEBSITE_ID
} from '$env/static/private';

export async function load({ fetch }) {
	const client = getClient({
		apiKey: UMAMI_API_KEY,
		apiEndpoint: UMAMI_API_CLIENT_ENDPOINT,
		fetch
	});

	const websiteId = UMAMI_API_WEBSITE_ID;

	// Calculate timestamps for last 30 days
	const now = Date.now();
	const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

	// Fetch events
	const eventsResponse = await client.getEventDataEvents(websiteId, {
		startAt: thirtyDaysAgo,
		endAt: now,
		limit: 50,
		sort: 'desc'
	});

	// Fetch metrics (e.g., views, visitors, etc.)
	const metricsResponse = await client.getWebsiteMetrics(websiteId, {
		startAt: thirtyDaysAgo,
		endAt: now,
		type: 'url' // or 'event', 'referrer', etc.
		// Add limit/sort if needed
	});

	if (!eventsResponse.ok || !metricsResponse.ok) {
		console.error('Umami error:', {
			eventsStatus: eventsResponse.status,
			eventsError: eventsResponse.error,
			metricsStatus: metricsResponse.status,
			metricsError: metricsResponse.error
		});

		return {
			events: [],
			metrics: [],
			error: {
				events: eventsResponse.error,
				metrics: metricsResponse.error
			}
		};
	}

	return {
		events: eventsResponse.data,
		metrics: metricsResponse.data
	};
}
