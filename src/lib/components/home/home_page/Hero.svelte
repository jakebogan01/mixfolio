<script>
	import { fade, slide } from 'svelte/transition';
	import { quadIn, quadOut } from 'svelte/easing';
	import { Application } from '@splinetool/runtime';
	import { navLinks } from '$lib/data/home/navLinks.js';
	import { LOGIN, DASHBOARD } from '$lib/utils/constants.js';
	import Logo from '$lib/components/Logo.svelte';
	import Nav from '$lib/components/home/Nav.svelte';

	let { currentUser } = $props();

	let menuOpen = $state(false),
		canvas;

	const toggleMenu = () => (menuOpen = !menuOpen);

	import { onMount } from 'svelte';

	onMount(() => {
		const app = new Application(canvas);
		app.load('/home/robot.spline');
	});
</script>

<div class="relative">
	<div
		class="absolute inset-2 bottom-0 overflow-hidden rounded-4xl bg-linear-115 from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] ring-1 ring-black/5 ring-inset sm:bg-linear-145 xl:inset-6"
	>
		<div class="hidden h-full w-full lg:block">
			<canvas
				bind:this={canvas}
				class="absolute block w-full"
				aria-label="Interactive robot"
				draggable="false"
			></canvas>
		</div>
	</div>
	<div class="relative px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-7xl">
			<header
				class="pt-12 transition-[height] duration-300 sm:pt-16 {menuOpen
					? 'h-82 lg:h-auto'
					: 'h-32 lg:h-auto'}"
			>
				<div>
					<div
						class="group/row relative isolate flex justify-between pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]"
					>
						<div
							aria-hidden="true"
							class="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
						>
							<div class="absolute inset-x-0 top-0 border-t border-black/5"></div>
							<div class="absolute inset-x-0 top-2 border-t border-black/5"></div>
							<div
								class="absolute inset-x-0 bottom-0 hidden border-b border-black/5 group-last/row:block"
							></div>
							<div
								class="absolute inset-x-0 bottom-2 hidden border-b border-black/5 group-last/row:block"
							></div>
						</div>
						<div class="relative flex gap-6">
							<div class="group/item relative py-3">
								<svg
									viewBox="0 0 15 15"
									aria-hidden="true"
									class="absolute -top-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:block"
								>
									<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
								</svg>
								<svg
									viewBox="0 0 15 15"
									aria-hidden="true"
									class="absolute -top-2 -right-2 size-[15px] fill-black/10"
								>
									<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
								</svg>
								<svg
									viewBox="0 0 15 15"
									aria-hidden="true"
									class="absolute -bottom-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:group-last/row:block"
								>
									<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
								</svg>
								<svg
									viewBox="0 0 15 15"
									aria-hidden="true"
									class="absolute -right-2 -bottom-2 hidden size-[15px] fill-black/10 group-last/row:block"
								>
									<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
								</svg>
								<Logo />
							</div>
						</div>
						<Nav {currentUser} />
						<button
							class="flex size-12 cursor-pointer items-center justify-center self-center rounded-lg sm:hover:bg-black/5 lg:hidden"
							aria-label="Open main menu"
							type="button"
							onclick={toggleMenu}
							aria-expanded="false"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>
				</div>
				{#if menuOpen}
					<div
						in:fade|local={{ duration: 250, easing: quadIn }}
						out:fade|local={{ duration: 250, easing: quadOut }}
						class="lg:hidden"
					>
						<div class="flex flex-col gap-6 py-4">
							{#each navLinks as item (item.id)}
								<div transition:slide|global={{ duration: 250, easing: quadOut }}>
									<a class="text-base font-medium text-gray-950" href={item.link}>{item.text}</a>
								</div>
							{/each}
							{#if currentUser}
								<div transition:slide={{ duration: 250, easing: quadOut }}>
									<a class="text-base font-medium text-gray-950" href={DASHBOARD}>Dashboard</a>
								</div>
							{:else}
								<div transition:slide={{ duration: 250, easing: quadOut }}>
									<a class="text-base font-medium text-gray-950" href={LOGIN}>Login</a>
								</div>
							{/if}
						</div>
						<div class="absolute left-1/2 w-screen -translate-x-1/2">
							<div class="absolute inset-x-0 top-0 border-t border-black/5"></div>
							<div class="absolute inset-x-0 top-2 border-t border-black/5"></div>
						</div>
					</div>
				{/if}
			</header>
			<div class="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
				<h1
					class="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-[#6a17bb]"
				>
					Mix It, Own It
				</h1>
				<p class="mt-8 max-w-lg font-medium text-gray-950/75 sm:text-2xl/8">
					Build a standout portfolio in minutes.<br />Share it to impress anywhere, anytime.
				</p>
				<div class="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
					{#if currentUser}
					<a
						class="relative inline-flex items-center justify-center rounded-full border border-transparent bg-gray-950 px-4 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md sm:transition-colors sm:hover:bg-[#6a17bb]"
						href={DASHBOARD}>Edit your page</a
					>{:else}
						<a
							class="relative inline-flex items-center justify-center rounded-full border border-transparent bg-gray-950 px-4 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md sm:transition-colors sm:hover:bg-[#6a17bb]"
							href={LOGIN}>Get started</a
						>
						{/if}

					<!--<a-->
					<!--	class="relative inline-flex items-center justify-center rounded-full border border-transparent bg-white/15 px-4 py-[calc(&#45;&#45;spacing(2)-1px)] text-base font-medium whitespace-nowrap text-gray-950 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] sm:transition-colors sm:hover:bg-transparent"-->
					<!--	href="/pricing">See pricing</a-->
					<!--&gt;-->
				</div>
			</div>
		</div>
	</div>
</div>
