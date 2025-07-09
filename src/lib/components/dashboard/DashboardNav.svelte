<script>
	import { page } from '$app/state';
	import { navLinks } from '$lib/data/dashboard/navLinks.js';
	import Icon from '$lib/components/Icon.svelte';

	let { menuOpen = false, toggleMenu } = $props();
</script>

{#if menuOpen}
	<div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-slate-600/75" aria-hidden="true"></div>

		<div class="fixed inset-0 z-40 flex">
			<div class="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-hidden">
				<div class="absolute top-0 right-0 -mr-12 pt-4">
					<button
						onclick={toggleMenu}
						type="button"
						class="relative ml-1 flex size-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
					>
						<span class="absolute -inset-0.5"></span>
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

				<div class="pt-5 pb-4">
					<div class="flex shrink-0 items-center px-4">
						<img
							class="h-8 w-auto"
							src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600"
							alt="Your Company"
						/>
					</div>
					<nav aria-label="Sidebar" class="mt-5">
						<div class="space-y-1 px-2">
							{#each navLinks as item (item.id)}
								<a
									href={item.link}
									class="group flex items-center rounded-md p-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
								>
									<Icon
										name={item.icon}
										stroke="currentColor"
										fill="none"
										class="mr-4 size-6 text-slate-400 group-hover:text-slate-500"
									/>
									{item.text}
								</a>
							{/each}
						</div>
					</nav>
				</div>
				<div class="flex shrink-0 border-t border-slate-200 p-4">
					<a href="#" class="group block shrink-0">
						<div class="flex items-center">
							<div>
								<img
									class="inline-block size-10 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
									alt=""
								/>
							</div>
							<div class="ml-3">
								<p class="text-base font-medium text-slate-700 group-hover:text-slate-900">
									Lisa Marie
								</p>
								<p class="text-sm font-medium text-slate-500 group-hover:text-slate-700">
									Account Settings
								</p>
							</div>
						</div>
					</a>
				</div>
			</div>

			<div class="w-14 shrink-0" aria-hidden="true">
				<!-- Force sidebar to shrink to fit close icon -->
			</div>
		</div>
	</div>
{/if}

<div class="hidden lg:flex lg:shrink-0">
	<div class="flex w-20 flex-col">
		<div class="flex min-h-0 flex-1 flex-col overflow-y-auto bg-blue-600">
			<div class="flex-1">
				<div class="flex items-center justify-center bg-blue-700 py-4">
					<img
						class="h-8 w-auto"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
						alt="Your Company"
					/>
				</div>
				<nav aria-label="Sidebar" class="flex flex-col items-center space-y-3 py-6">
					{#each navLinks as item (item.id)}
						<a
							href={item.link}
							aria-current={page.url.pathname === item.link ? 'page' : false}
							class="flex items-center rounded-lg p-4 {page.url.pathname === item.link
								? 'bg-blue-700 text-white'
								: 'text-blue-200 hover:bg-blue-700 hover:text-white'}"
						>
							<Icon
								name={item.icon}
								stroke="currentColor"
								fill="none"
								class="size-6 {page.url.pathname === item.link
									? 'text-white'
									: 'text-indigo-300 group-hover:text-white'}"
							/>
							<span class="sr-only">{item.text}</span>
						</a>
					{/each}
				</nav>
			</div>
			<div class="flex shrink-0 pb-5">
				<a href="/" class="w-full shrink-0">
					<img
						class="mx-auto block size-10 rounded-full"
						src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
						alt=""
					/>
					<div class="sr-only">
						<p>Lisa Marie</p>
						<p>Account settings</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
