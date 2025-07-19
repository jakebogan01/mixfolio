<script>
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import Logo from '$lib/components/Logo.svelte';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';

	let { hideOnMobile = false, toggleMenu = () => {} } = $props();
</script>

<aside transition:fly|local={{ duration: 200, easing: linear, x:-288, opacity: 1 }} class="fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 space-y-2 {hideOnMobile ? 'hidden xl:block' : 'xl:hidden'}">
	<button type="button" onclick={toggleMenu} class="xl:hidden flex w-full items-center gap-4 rounded-xl bg-gray-900 px-4 py-3 font-sans font-medium leading-relaxed text-white sm:transition-colors select-none active:bg-red-400 disabled:pointer-events-none cursor-pointer sm:hover:bg-red-500 relative z-100">
		<span class="sr-only">Close main menu</span>
		<Icon name="close" class="size-5" stroke="none" />
		Close
	</button>
	<div class="rounded-xl bg-gray-900 h-[calc(100vh-90px)] xl:h-full relative z-100 flex flex-col">
		<div class="relative">
			<div class="[&>[data-slot=section]+[data-slot=section]]:mt-2.5 flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5">
				<span class="relative">
					<button type="button" class="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-[0.4375rem] text-center align-middle font-sans text-white sm:transition-colors select-none sm:hover:bg-white/10 disabled:pointer-events-none cursor-pointer">
						<Logo class="w-25 fill-white" disableAnimations={true} disableLink={(e)=>e.preventDefault()} />
						<Icon name="down-arrow" class="size-4" fill="none" />
					</button>
				</span>
			</div>
		</div>
		<div class="m-4 flex-1 overflow-y-auto">
			<ul class="mb-4 flex flex-col gap-1">
				{#each navLinks as item (item.id)}
					<li>
						<a href={item.link}>
							<button class="flex w-full items-center bg-gradient-to-tr gap-4 rounded-lg px-4 py-3 text-center align-middle font-sans font-medium leading-relaxed text-white sm:transition-colors select-none disabled:pointer-events-none cursor-pointer {page.route.id.endsWith(item.text.toLowerCase()) ? 'from-purple-600 to-violet-400' : 'bg-gray-900 sm:hover:bg-white/10'}" type="button">
								<Icon name={item.icon} class="size-5" stroke="none" />
								{item.text}
							</button>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</aside>