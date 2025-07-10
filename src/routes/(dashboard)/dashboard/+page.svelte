<script>
	import Nav from '$lib/components/Nav.svelte';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-5-french-toast';
	import { showSuccessToast } from '$lib/utils/cookieMessage.js';

	export let data;

	onMount(() => {
		showSuccessToast(data);
	});
</script>

<Nav />

<h1>Dashboard page</h1>
<Toaster/>
