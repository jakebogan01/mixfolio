<script>
	import { DASHBOARD } from '$lib/utils/constants.js';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';

	let { menuOpen, scrolled, toggleMenu = () => {} } = $props();
</script>

<nav
	class="sticky top-4 z-40 rounded-xl border bg-white px-4 py-3 shadow-md transition-shadow sm:duration-200 {scrolled
		? 'border-gray-300 xl:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]'
		: 'border-gray-300 xl:border-transparent xl:bg-transparent xl:shadow-transparent'}"
>
	<div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
		<div aria-label="Breadcrumb" class="flex">
			<ol role="list" class="flex items-center space-x-4">
				<li>
					<div>
						<a href={DASHBOARD} class="text-gray-900 sm:transition-colors sm:hover:text-purple-600">
							<Icon name="home" class="size-5 shrink-0" stroke="none" />
							<span class="sr-only">Home</span>
						</a>
					</div>
				</li>
				<li>
					<div class="flex items-center text-gray-900">
						<Icon name="right-arrow" class="size-5 shrink-0" stroke="none" />
						<span class="ml-4 text-sm leading-normal font-medium capitalize"
							>{page.route.id.split('/').filter(Boolean).pop()}</span
						>
					</div>
				</li>
			</ol>
		</div>

		<div class="flex items-center">
			<div class="mr-auto md:mr-4 md:w-56">
				<div class="relative h-10 w-full min-w-50">
					<input
						type="search"
						id="search"
						class="peer h-full w-full rounded-md border border-gray-400/70 bg-transparent px-3 py-2.5 font-normal outline-0 transition-colors outline-none not-placeholder-shown:border-t-transparent focus:border focus:border-gray-900 focus:border-t-transparent focus:ring-0 focus:outline-0"
						placeholder=" "
					/><label
						for="search"
						class="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full text-xs leading-tight font-normal text-gray-500 transition-all select-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-focus:text-xs peer-focus:leading-tight peer-focus:text-gray-900 peer-disabled:text-transparent before:pointer-events-none before:mt-[0.40625rem] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all peer-placeholder-shown:before:border-transparent peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:!border-gray-900 peer-disabled:before:border-transparent after:pointer-events-none after:mt-[0.40625rem] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-t-gray-400/70 after:transition-all peer-placeholder-shown:after:border-transparent peer-focus:after:border-t peer-focus:after:border-r peer-focus:after:!border-gray-900 peer-disabled:after:border-transparent"
						>Search
					</label>
				</div>
			</div>
			<button
				onclick={toggleMenu}
				type="button"
				class="relative size-10 max-h-10 max-w-10 cursor-pointer rounded-lg text-center select-none disabled:pointer-events-none sm:transition-colors sm:hover:bg-gray-200/90 xl:hidden"
			>
				<span class="sr-only">Toggle main menu</span>
				<span
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-slate-500"
				>
					{#if menuOpen}
						<Icon name="dashboard-close-menu" class="size-6" stroke="none" />
					{:else}
						<Icon name="dashboard-menu" class="size-6" stroke="none" />
					{/if}
				</span>
			</button>
			<div class="relative">
				<button
					type="button"
					class="flex size-10 max-h-10 max-w-10 cursor-pointer items-center justify-center rounded-lg text-gray-900 select-none disabled:pointer-events-none sm:transition-colors sm:hover:bg-gray-200/90 sm:hover:text-purple-600"
				>
					<Icon name="notification" class="size-5" stroke="none" />
				</button>
			</div>
		</div>
	</div>
</nav>
