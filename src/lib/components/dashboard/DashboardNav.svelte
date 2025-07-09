<script>
	import { page } from '$app/state';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import Icon from '$lib/components/Icon.svelte';

	let { menuOpen = false, toggleMenu } = $props();
</script>

<div class="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
	<div class="flex w-full flex-col items-center py-6">
		<div class="flex shrink-0 items-center">
			<img
				class="h-8 w-auto"
				src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
				alt="Your Company"
			/>
		</div>
		<div class="mt-6 w-full flex-1 space-y-1 px-2">
			{#each navLinks as item (item.id)}
				<a
					href={item.link}
					class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium {page
						.url.pathname === item.link
						? 'bg-indigo-800 text-white'
						: 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}"
					aria-current={page.url.pathname === item.link ? 'page' : false}
				>
					<Icon
						name={item.icon}
						stroke="currentColor"
						fill="none"
						class="size-6 {page.url.pathname === item.link
							? 'text-white'
							: 'text-indigo-300 group-hover:text-white'}"
					/>
					<span class="mt-2">{item.text}</span>
				</a>
			{/each}
		</div>
	</div>
</div>

{#if menuOpen}
	<div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-600/75" aria-hidden="true"></div>
		<div class="fixed inset-0 z-40 flex">
			<div class="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
				<div class="absolute top-1 right-0 -mr-14 p-1">
					<button
						onclick={toggleMenu}
						type="button"
						class="flex size-12 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-hidden"
					>
						<svg
							class="size-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
						<span class="sr-only">Close sidebar</span>
					</button>
				</div>

				<div class="flex shrink-0 items-center px-4">
					<img
						class="h-8 w-auto"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
						alt="Your Company"
					/>
				</div>
				<div class="mt-5 h-0 flex-1 overflow-y-auto px-2">
					<nav class="flex h-full flex-col">
						<div class="space-y-1">
							{#each navLinks as item (item.id)}
								<a
									href={item.link}
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<Icon
										name={item.icon}
										stroke="currentColor"
										fill="none"
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
									/>
									<span>{item.text}</span>
								</a>
							{/each}
						</div>
					</nav>
				</div>
			</div>

			<div class="w-14 shrink-0" aria-hidden="true"></div>
		</div>
	</div>
{/if}
