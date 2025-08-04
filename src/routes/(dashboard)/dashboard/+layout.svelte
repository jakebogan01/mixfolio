<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { trackingData } from '$lib/stores/trackingData.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import { Toaster } from 'svelte-5-french-toast';
	import { toastMessage } from '$lib/utils/toast.js';
	import Nav from '$lib/components/dashboard/Nav.svelte';
	import Search from '$lib/components/dashboard/Search.svelte';
	import ImageCropper from '$lib/components/dashboard/ImageCropper.svelte';

	let { children, data } = $props();
	let menuOpen = $state(false);
	let scrolled = $state(false);

	onMount(async () => {
		if (page?.state?.message) toastMessage(page.state.type, page.state.message);

		try {
			const res = await fetch(`/api/umami/${data?.userProfile?.slug}`);

			if (res.ok) {
				let data = await res.json();
				((trackingData.metrics = data?.metrics || []), (trackingData.events = data?.events || []));
			}
		} catch (error) {
			console.dir(error, { depth: null });
		}
	});

	$effect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			if (scrolled !== isScrolled) {
				scrolled = isScrolled;
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div
	class="relative flex min-h-screen bg-gray-100 pl-0 font-sans xl:pl-76 dark:bg-gray-900 {darkMode.status
		? 'dark'
		: ''}"
>
	<div class="absolute left-0 h-screen w-full max-w-7xl overflow-x-hidden">
		<div
			class="z-0 h-60 w-xl translate-x-60 -translate-y-44 -rotate-10 rounded-full bg-linear-115 from-yellow-100 from-28% via-pink-400 via-70% to-purple-500 blur-3xl
			 md:right-0 xl:translate-x-90 dark:bg-none"
		></div>
	</div>
	<Nav {menuOpen} {toggleMenu} slug={data?.userProfile?.slug} />
	<div
		class="relative z-10 mx-auto flex max-w-400 flex-1 flex-col p-4 transition-[margin] duration-200 ease-linear"
	>
		<Search userProfile={data?.userProfile} {menuOpen} {scrolled} {toggleMenu} {data} />
		<main class="mt-12 flex flex-1 flex-col justify-between">
			<div>
				{@render children()}
			</div>
			<footer class="flex w-full justify-end gap-6 px-2 py-2">
				<p class=" text-sm leading-normal font-normal text-gray-500 dark:text-gray-600">
					© {new Date().getFullYear()}, Created by <a href="/" class="hover:underline">MixFolio</a>
					Team.
				</p>
			</footer>
		</main>
	</div>
</div>

{#if showImageCropper.status}
	<ImageCropper />
{/if}

<Toaster />
