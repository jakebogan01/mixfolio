<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Toaster } from 'svelte-5-french-toast';
	import { toastMessage } from '$lib/utils/toast.js';
	import Nav from '$lib/components/dashboard/Nav.svelte';
	import Search from '$lib/components/dashboard/Search.svelte';

	let { children, data } = $props();
	let menuOpen = $state(false);
	let scrolled = $state(false);

	onMount(() => {
		if (page?.state?.message) toastMessage(page.state.type, page.state.message);
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

<div class="relative flex min-h-screen overflow-x-hidden bg-gray-100 pl-0 font-sans xl:pl-76">
	<div class="absolute h-screen w-full max-w-7xl overflow-x-hidden">
		<div
			class="absolute -top-44 left-60 z-0 h-60 w-xl -rotate-10 rounded-full bg-linear-115 from-yellow-100 from-28% via-pink-400 via-70% to-purple-500 blur-3xl md:right-0"
		></div>
	</div>
	<Nav {menuOpen} {toggleMenu} slug={data?.userProfile?.slug} />
	<div
		class="relative z-10 mx-auto flex max-w-400 flex-1 flex-col p-4 transition-[margin] duration-200 ease-linear"
	>
		<Search {menuOpen} {scrolled} {toggleMenu} />
		<main class="mt-12 flex flex-1 flex-col justify-between">
			<div>
				{@render children()}
			</div>
			<footer class="flex w-full justify-end gap-6 px-2 py-2">
				<p class=" text-sm leading-normal font-normal text-gray-500">
					© 2025, Created by MixFolio Team.
				</p>
			</footer>
		</main>
	</div>
</div>

<Toaster />
