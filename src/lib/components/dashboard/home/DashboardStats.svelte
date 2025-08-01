<script>
	import { trackingData } from '$lib/stores/trackingData.svelte.js';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
	const fields = [
		data?.userProfile?.name,
		data?.userProfile?.biography,
		data?.userProfile?.avatar,
		data?.userProfile?.expand?.projects?.length > 0,
		data?.userProfile?.expand?.testimonials?.length > 0,
		data?.userProfile?.expand?.clients?.length > 0
	];
	const total = fields.length;
	const filled = fields.filter(Boolean).length;
	const completion = Math.round((filled / total) * 100);

	let popularProject = $derived(
		trackingData.events?.length > 0
			? trackingData.events.reduce((max, item) => (item.total > max.total ? item : max))
			: null
	);

	let stats = $derived([
		{
			id: 1,
			title: 'Profile Completion',
			value: `${completion}&percnt;`,
			icon: 'checkmark'
		},
		{
			id: 2,
			title: 'Page Visits',
			value: trackingData.metrics[0]?.y.toLocaleString('en-US') || 0,
			icon: 'eye'
		},
		{
			id: 3,
			title: 'Total Projects',
			value: `${data?.userProfile?.expand?.projects?.length || 0}/8`,
			icon: 'stacks'
		},
		{
			id: 4,
			title: 'Popular Project',
			value: popularProject?.propertyName || 'None',
			icon: 'like'
		}
	]);
</script>

{#if !data?.userProfile?.expand?.preferences?.hide_analytics}
	<div class="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
		{#each stats as stat (stat.id)}
			<div
				class="border-light-border text-dark-text relative flex flex-col rounded-xl border bg-white bg-clip-border"
			>
				<div
					class="absolute mx-4 mt-4 grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border text-white"
				>
					<Icon name={stat.icon} class="size-6 text-white" stroke="none" />
				</div>
				<div class="py-4 pr-4 pl-18 text-right">
					<p class="block font-sans text-sm leading-normal font-normal">{stat.title}</p>
					<h4
						class="ml-auto block max-w-70 truncate font-sans text-2xl leading-snug font-semibold tracking-normal"
					>
						{@html stat.value}
					</h4>
				</div>
			</div>
		{/each}
	</div>
{/if}
