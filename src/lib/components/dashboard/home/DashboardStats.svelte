<script>
	import Icon from '$lib/components/Icon.svelte';

	let { userProfile } = $props();
	let numOfPageVisits = 2536;
	let stats = [
		{
			id: 1,
			title: 'Profile Completion',
			value: `${53}&percnt;`,
			icon: 'checkmark'
		},
		{
			id: 2,
			title: 'Page Visits',
			value: numOfPageVisits.toLocaleString('en-US'),
			icon: 'eye'
		},
		{
			id: 3,
			title: 'Total Projects',
			value: `${userProfile?.expand?.projects?.length || 0}/8`,
			icon: 'stacks'
		},
		{
			id: 4,
			title: 'Popular Project',
			value: 'Simple Calculator',
			icon: 'like'
		}
	];
</script>

<div class="mb-6 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
	{#each stats as stat (stat.id)}
		<div
			class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
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
