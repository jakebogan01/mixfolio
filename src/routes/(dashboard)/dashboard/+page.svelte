<script>
	import Nav from '$lib/components/Nav.svelte';
	import { Toaster } from 'svelte-5-french-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { toastMessage } from '$lib/utils/toast.js';

	onMount(() => {
		if (page?.state?.message) toastMessage('success', page?.state?.message);
	});

	let { data } = $props();
	console.log(data.slug.slug);
</script>

<Nav slug={data.slug.slug} />

<Toaster />
