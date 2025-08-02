<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import { handleToggleMenuFactory } from '$lib/utils/menuHandlers.js';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import { PORTFOLIO, SETTINGS, LOGOUT } from '$lib/utils/constants.js';
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import { fly } from 'svelte/transition';

	let { menuOpen, toggleMenu = () => {}, slug } = $props();
	let smallMenuOpen = $state(false);
	const handleToggleMenu = handleToggleMenuFactory(
		() => smallMenuOpen,
		(val) => (smallMenuOpen = val)
	);

	let currentRouteTop = 0;
	let highlight, nav;

	function updateHighlightToCurrentRoute() {
		const items = nav.querySelectorAll('.z-10');
		const currentRoute = page.route.id;

		items.forEach((item, index) => {
			const matchText = navLinks[index].text.toLowerCase();
			if (currentRoute.endsWith(matchText)) {
				currentRouteTop = item.offsetTop;
				highlight.style.transform = `translateY(${currentRouteTop}px)`;
			}
		});
	}

	onMount(() => {
		highlight = document.getElementById('highlight');
		nav = document.getElementById('verticalNav');

		const items = nav.querySelectorAll('.z-10');

		updateHighlightToCurrentRoute();

		let hoverTimeout;

		items.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				clearTimeout(hoverTimeout); // cancel previous hover
				hoverTimeout = setTimeout(() => {
					highlight.style.transform = `translateY(${item.offsetTop}px)`;
				}, 100); // adjust delay (ms) here
			});
		});

		nav.addEventListener('mouseleave', () => {
			clearTimeout(hoverTimeout);
			highlight.style.transform = `translateY(${currentRouteTop}px)`;
		});
	});

	afterNavigate(() => {
		updateHighlightToCurrentRoute();
	});
</script>

<aside
	class="fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 space-y-2 transition-transform duration-200 ease-linear {menuOpen
		? 'translate-x-0'
		: '-translate-x-80 xl:translate-x-0'}"
>
	<Button
		callBack={toggleMenu}
		defaultStyles="relative z-100 flex w-full cursor-pointer items-center gap-4 rounded-xl bg-secondary-btn-bg-theme-light dark:bg-primary-theme-dark px-4 py-3 leading-relaxed font-medium text-white select-none active:bg-red-400 disabled:pointer-events-none sm:transition-colors sm:hover:bg-red-500 xl:hidden dark:border dark:border-light-border-theme-dark"
	>
		<span class="sr-only">Close main menu</span>
		<Icon name="close" class="size-5" stroke="none" />
		Close
	</Button>
	<div
		class="bg-primary dark:bg-primary-theme-dark dark:border-light-border-theme-dark relative z-100 flex h-[calc(100vh-90px)] flex-col rounded-xl xl:h-full dark:border"
	>
		<div class="relative">
			<div
				class="relative flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
			>
				<Button
					callBack={handleToggleMenu}
					defaultStyles="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-[0.4375rem] text-center text-white select-none disabled:pointer-events-none sm:transition-colors sm:hover:bg-white/10 sm:dark:hover:bg-gray-900 {smallMenuOpen
						? 'bg-white/10'
						: 'bg-transparent'}"
				>
					<Logo
						class="w-25 fill-white"
						disableAnimations={true}
						disableLink={(e) => e.preventDefault()}
					/>
					<Icon
						name="down-arrow"
						class="size-5 {smallMenuOpen ? 'rotate-180' : 'rotate-0'} transition-transform"
						fill="none"
					/>
				</Button>
				{#if smallMenuOpen}
					<div
						role="menu"
						transition:fly
						tabindex="-1"
						aria-labelledby="menu-button"
						aria-orientation="vertical"
						class="absolute top-19 left-4 isolate z-25 w-64 origin-top-right overflow-y-auto rounded-lg border bg-zinc-800/75 p-1 shadow-lg ring-1 ring-white/10 outline outline-transparent backdrop-blur-xl ring-inset focus:outline-hidden"
					>
						<div role="none">
							<Button
								link={true}
								url="{PORTFOLIO}{slug}"
								tabindex="-1"
								id="menu-item-0"
								role="menuitem"
								defaultStyles="group group flex items-center space-x-2 rounded-lg px-3 py-1.5 text-sm text-white sm:hover:bg-blue-500"
							>
								<Icon
									name="view-portfolio"
									class="size-4 text-zinc-400 sm:group-hover:text-white"
									stroke="none"
								/>
								<span>My Portfolio</span>
							</Button>
							<a id="menu-item-1" role="menuitem" href={SETTINGS} tabindex="-1">
								<Button
									callBack={toggleMenu}
									defaultStyles="group group flex w-full cursor-pointer items-center space-x-2 rounded-lg px-3 py-1.5 text-sm text-white sm:hover:bg-blue-500"
								>
									<Icon
										name="settings"
										class="size-4 text-zinc-400 sm:group-hover:text-white"
										stroke="none"
									/>
									<span>Settings</span>
								</Button>
							</a>
						</div>
						<div class="mx-3.5 my-1 h-px border-0 bg-white/10 sm:mx-3" role="separator"></div>
						<div role="none">
							<Button
								role="menuitem"
								callBack={() => goto(LOGOUT)}
								defaultStyles="group group flex w-full cursor-pointer items-center space-x-2 rounded-lg px-3 py-1.5 text-sm text-white sm:hover:bg-blue-500"
							>
								<Icon
									name="logout"
									class="size-4 text-zinc-400 sm:group-hover:text-white"
									stroke="none"
								/>
								<span>Sign Out</span>
							</Button>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="m-4 flex-1 overflow-y-auto">
			<ul class="relative mb-4 flex flex-col gap-1" id="verticalNav">
				<div
					id="highlight"
					role="presentation"
					class="from-primary-from-theme-light dark:from-primary-from-theme-dark to-secondary-to-theme-light dark:to-secondary-to-theme-dark absolute left-0 z-0 h-12.5 w-full rounded-lg bg-gradient-to-tr transition-transform duration-500 ease-in-out"
					style="transform: translateY(0px);"
				></div>
				{#each navLinks as item (item.id)}
					<li class="z-20">
						<a href={item.link} class="z-10">
							<Button
								callBack={toggleMenu}
								defaultStyles="flex w-full cursor-pointer items-center gap-4 px-4 py-3 leading-relaxed font-medium text-white select-none"
							>
								<Icon name={item.icon} class="size-5" stroke="none" />
								{item.text}
							</Button>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</aside>
