<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Toaster } from 'svelte-5-french-toast';
	import { toastMessage } from '$lib/utils/toast.js';

	let { children } = $props();

	onMount(() => {
		if (page?.state?.message) toastMessage(page.state.type, page.state.message);
	});
</script>

{@render children()}

<Toaster />
