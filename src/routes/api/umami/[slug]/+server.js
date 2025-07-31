import { json } from '@sveltejs/kit';
import { getClient } from '@umami/api-client';
import {
	UMAMI_API_KEY,
	UMAMI_API_CLIENT_ENDPOINT,
	UMAMI_API_WEBSITE_ID
} from '$env/static/private';

export async function GET({ fetch, params }) {
	const slug = params.slug;
	if (!slug) {
		return json({ error: 'Missing slug' }, { status: 400 });
	}

	const client = getClient({
		apiKey: UMAMI_API_KEY,
		apiEndpoint: UMAMI_API_CLIENT_ENDPOINT,
		fetch
	});

	const now = Date.now();
	const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

	const [eventsResponse, metricsResponse] = await Promise.all([
		client.getEventDataEvents(UMAMI_API_WEBSITE_ID, {
			startAt: thirtyDaysAgo,
			endAt: now,
			limit: 100,
			sort: 'desc'
		}),
		client.getWebsiteMetrics(UMAMI_API_WEBSITE_ID, {
			startAt: thirtyDaysAgo,
			endAt: now,
			type: 'url'
		})
	]);

	if (!eventsResponse.ok || !metricsResponse.ok) {
		console.error('Umami error:', {
			events: eventsResponse.error,
			metrics: metricsResponse.error
		});

		return json(
			{
				events: [],
				metrics: [],
				error: {
					events: eventsResponse.error,
					metrics: metricsResponse.error
				}
			},
			{ status: 500 }
		);
	}

	const filteredEvents = eventsResponse.data.filter((e) => e.eventName === slug);
	const filteredMetrics = metricsResponse.data.filter((m) => {
		const parts = m.x.split('/');
		const lastSegment = parts[parts.length - 1];
		return lastSegment === slug;
	});

	return json({ slug, events: filteredEvents, metrics: filteredMetrics });
}
