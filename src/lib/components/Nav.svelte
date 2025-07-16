<script>
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import { goto } from '$app/navigation';
	let { slug } = $props();
</script>

<nav class="mb-8">
	<ul class="flex space-x-4">
		{#each navLinks as item (item.id)}
			<li>
				<a href={item.link}>{item.text}</a>
			</li>
		{/each}
		<li>
			<a href="/portfolio/{slug}">View Portfolio</a>
		</li>
		<li>
			<button type="button" onclick={() => goto('/logout')} class="cursor-pointer">Logout</button>
		</li>
	</ul>
</nav>
