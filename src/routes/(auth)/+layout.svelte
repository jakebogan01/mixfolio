<script>
	import { Toaster } from 'svelte-5-french-toast';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { toastMessage } from '$lib/utils/toast.js';

	let { children } = $props();

	onMount(() => {
		if (page?.state?.message) toastMessage(page.state.type, page.state.message);
	});
</script>

<main class="overflow-hidden bg-gray-50">
	<div class="relative mx-auto max-w-7xl">
		<div
			class="absolute -top-44 -right-60 h-60 w-xl rotate-[-10deg] transform-gpu rounded-full bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] blur-3xl md:right-0"
		></div>
	</div>
	<div class="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
		{@render children()}
	</div>
</main>

<Toaster />
