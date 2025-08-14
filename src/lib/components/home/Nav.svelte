<script>
	import { navLinks } from '$lib/data/home/navLinks.js';
	import { LOGIN, DASHBOARD, REGISTER } from '$lib/utils/constants.js';

	let { currentUser } = $props();
</script>

<nav class="relative hidden lg:flex">
	{#each navLinks as item (item.id)}
		<div class="group/item relative flex">
			<a
				class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
				href={item.link}>{item.text}</a
			>
		</div>
	{/each}
	<div class="group/item relative flex">
		{#if currentUser}
			<a
				class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
				href={DASHBOARD}>Dashboard</a
			>
		{:else}
			<a
				class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
				href={REGISTER}>Register</a
			>
			<a
				class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
				href={LOGIN}>Login</a
			>
		{/if}
	</div>
</nav>
