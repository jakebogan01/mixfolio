<script>
	import Nav from '$lib/components/dashboard/Nav.svelte';
	import Search from '$lib/components/dashboard/Search.svelte';

	let { children, data } = $props();
	let menuOpen = $state(false);
	let scrolled = $state(false);

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

<div class="relative flex min-h-screen bg-gray-100 font-sans">
	<div class="absolute h-screen w-full max-w-7xl overflow-x-hidden">
		<div
			class="absolute -top-44 left-60 h-60 w-xl -rotate-10 rounded-full bg-linear-115 from-yellow-100 from-28% via-pink-400 via-70% to-purple-500 blur-3xl md:right-0"
		></div>
	</div>
	<Nav {menuOpen} {toggleMenu} slug={data.slug.slug} />
	<div class="ml-0 flex flex-1 flex-col p-4 transition-[margin] duration-200 ease-linear xl:ml-80">
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
