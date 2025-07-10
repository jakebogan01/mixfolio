<script>
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
</script>

<nav class="mb-8">
	<ul class="flex space-x-4">
		{#each navLinks as item (item.id)}
			<li>
				<a href={item.link}>{item.text}</a>
			</li>
		{/each}
	</ul>
</nav>
