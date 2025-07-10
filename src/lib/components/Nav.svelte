<script>
	import { enhance } from '$app/forms';
	import { LOGOUT } from '$lib/utils/constants.js';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
</script>

<nav class="mb-8">
	<ul class="flex space-x-4">
		{#each navLinks as item (item.id)}
			<li>
				<a href={item.link}>{item.text}</a>
			</li>
		{/each}
		<li>
			<form method="POST" action={LOGOUT} class="hidden md:block" use:enhance>
				<button type="submit" class="cursor-pointer">Logout</button>
			</form>
		</li>
	</ul>
</nav>
