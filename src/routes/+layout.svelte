<script>
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectAnalytics();
	injectSpeedInsights();

	let { children } = $props();
</script>

{@render children()}
