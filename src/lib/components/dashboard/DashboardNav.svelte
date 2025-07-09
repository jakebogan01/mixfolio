<script>
	import { page } from '$app/state';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import Icon from '$lib/components/Icon.svelte';

	let { menuOpen = false, toggleMenu } = $props();
</script>

<div
	class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4"
>
	<div class="flex h-16 shrink-0 items-center justify-center">
		<img
			class="h-8 w-auto"
			src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
			alt="Your Company"
		/>
	</div>
	<nav class="mt-8">
		<ul role="list" class="flex flex-col items-center space-y-1">
			{#each navLinks as item (item.id)}
				<li>
					<a
						href={item.link}
						class="group flex gap-x-3 rounded-md p-3 {page.url.pathname === item.link
							? 'bg-gray-800 text-white'
							: 'text-gray-400 hover:bg-gray-800 hover:text-white'}"
					>
						<Icon
							name={item.icon}
							stroke="currentColor"
							fill="none"
							class="size-6 shrink-0 {page.url.pathname === item.link
								? 'text-white'
								: 'text-gray-400 group-hover:text-white'}"
						/>
						<span class="sr-only">{item.text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

{#if menuOpen}
	<div class="relative z-100 lg:hidden" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>
		<div class="fixed inset-0 flex">
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<div class="absolute top-0 left-full flex w-16 justify-center pt-5">
					<button onclick={toggleMenu} type="button" class="-m-2.5 p-2.5">
						<span class="sr-only">Close sidebar</span>
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
					</button>
				</div>

				<div
					class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
				>
					<div class="flex h-16 shrink-0 items-center">
						<img
							class="h-8 w-auto"
							src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company"
						/>
					</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="-mx-2 flex-1 space-y-1">
							{#each navLinks as item (item.id)}
								<li>
									<a
										href={item.link}
										class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold {page.url
											.pathname === item.link
											? 'bg-gray-800 text-white'
											: 'text-gray-400 hover:bg-gray-800 hover:text-white'}"
									>
										<Icon
											name={item.icon}
											stroke="currentColor"
											fill="none"
											class="size-6 shrink-0 {page.url.pathname === item.link
												? 'text-white'
												: 'text-gray-400 group-hover:text-white'}"
										/>
										{item.text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
{/if}
