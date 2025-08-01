<script>
	import { CLIENTS, DASHBOARD, PROJECTS, TESTIMONIALS } from '$lib/utils/constants.js';
	import { trackingData } from '$lib/stores/trackingData.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import { fly } from 'svelte/transition';
	import { handleToggleMenuFactory } from '$lib/utils/menuHandlers.js';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { debounce } from '$lib/utils/misc.js';
	import { onMount } from 'svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { userProfile, menuOpen, scrolled, toggleMenu = () => {}, data } = $props();
	let searchTerm = $state('');
	let filteredProjects = $state(null);
	let filteredTestimonials = $state(null);
	let filteredClients = $state(null);
	let hasMatches = $state(null);
	let showHistory = $state(false);
	const handleToggleMenu = handleToggleMenuFactory(
		() => showHistory,
		(val) => (showHistory = val)
	);
	const match = (text = '') => text.toLowerCase().includes(searchTerm.toLowerCase());

	onMount(async () => {
		hasMatches =
			userProfile?.expand?.projects?.some((p) => match(p.title)) ||
			userProfile?.expand?.clients?.some((c) => match(c.name)) ||
			userProfile?.expand?.testimonials?.some((t) => match(t.name));
		filteredProjects =
			userProfile?.expand?.projects?.filter((project) =>
				project?.title?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
		filteredTestimonials =
			userProfile?.expand?.testimonials?.filter((testimonial) =>
				testimonial?.name?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
		filteredClients =
			userProfile?.expand?.clients?.filter((client) =>
				client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
	});

	const handleSearch = debounce(async () => {
		hasMatches =
			userProfile?.expand?.projects?.some((p) => match(p.title)) ||
			userProfile?.expand?.clients?.some((c) => match(c.name)) ||
			userProfile?.expand?.testimonials?.some((t) => match(t.name));
		filteredProjects =
			userProfile?.expand?.projects?.filter((project) =>
				project?.title?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
		filteredTestimonials =
			userProfile?.expand?.testimonials?.filter((testimonial) =>
				testimonial?.name?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
		filteredClients =
			userProfile?.expand?.clients?.filter((client) =>
				client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
			) || [];
	}, 500);

	const changeTheme = () => {
		if (!document.startViewTransition) {
			updateTheme();
			return;
		}

		document.startViewTransition(() => {
			updateTheme();
		});
	};

	const updateTheme = () => {
		darkMode.status = !darkMode.status;
	};
</script>

<nav
	class="sticky top-4 z-40 rounded-xl border bg-white px-4 py-3 shadow-md transition-shadow sm:duration-200 {scrolled
		? 'border-light-border xl:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]'
		: 'border-light-border xl:border-transparent xl:bg-transparent xl:shadow-transparent'}"
>
	<div class="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
		<div aria-label="Breadcrumb" class="flex">
			<ol role="list" class="flex items-center space-x-4">
				<li>
					<div>
						<Button
							link={true}
							url={DASHBOARD}
							defaultStyles="text-gray-900 sm:transition-colors sm:hover:text-purple-600"
						>
							<Icon name="home" class="size-5 shrink-0" stroke="none" />
							<span class="sr-only">Home</span>
						</Button>
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
			<div
				class="relative mr-auto md:w-56 {data?.userProfile?.expand?.preferences?.hide_notifications
					? ''
					: 'md:mr-4'}"
			>
				<div class="relative h-10 w-full min-w-50">
					<input
						type="search"
						id="search"
						class="peer h-full w-full rounded-md border border-gray-400/70 bg-transparent px-3 py-2.5 font-normal outline-0 transition-colors outline-none not-placeholder-shown:border-t-transparent focus:border focus:border-gray-900 focus:border-t-transparent focus:ring-0 focus:outline-0"
						oninput={handleSearch}
						bind:value={searchTerm}
						onblur={() => (searchTerm = '')}
						placeholder=" "
					/><label
						for="search"
						class="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full text-xs leading-tight font-normal text-gray-500 transition-all select-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-focus:text-xs peer-focus:leading-tight peer-focus:text-gray-900 peer-disabled:text-transparent before:pointer-events-none before:mt-[0.40625rem] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all peer-placeholder-shown:before:border-transparent peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:!border-gray-900 peer-disabled:before:border-transparent after:pointer-events-none after:mt-[0.40625rem] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-t-gray-400/70 after:transition-all peer-placeholder-shown:after:border-transparent peer-focus:after:border-t peer-focus:after:border-r peer-focus:after:!border-gray-900 peer-disabled:after:border-transparent"
						>Search
					</label>
				</div>
				{#if hasMatches && searchTerm.length > 0}
					<ul
						transition:fly={{ y: 20 }}
						class="border-light-border absolute z-10 mt-2 mr-2 max-h-60 w-74 overflow-auto rounded-md border bg-white py-1 pt-3 text-sm shadow-lg shadow-black/50"
						role="listbox"
					>
						{#if filteredProjects?.length}
							<li>
								<span class="pl-4 leading-normal font-semibold text-gray-900">Projects</span>
								<ul>
									{#each filteredProjects as project (project?.id)}
										<li
											class="hover:bg-primary-btn-bg cursor-pointer px-3 py-2 font-medium text-gray-600 select-none hover:text-white"
										>
											<button
												type="button"
												onclick={() => {
													searchTerm = '';
													goto(PROJECTS, { state: { view: true, projectId: project?.id } });
												}}
												class="cursor-pointer px-4 py-1"
											>
												{project?.title || 'Title unavailable'}
											</button>
										</li>
									{/each}
								</ul>
							</li>
						{/if}
						{#if filteredTestimonials?.length}
							<li>
								<span class="pl-4 leading-normal font-semibold text-gray-900">Testimonials</span>
								<ul>
									{#each filteredTestimonials as testimonial (testimonial?.id)}
										<li
											class="hover:bg-primary-btn-bg cursor-pointer px-3 py-2 font-medium text-gray-600 select-none hover:text-white"
										>
											<button
												type="button"
												onclick={() => {
													searchTerm = '';
													goto(TESTIMONIALS, {
														state: { view: true, testimonialId: testimonial?.id }
													});
												}}
												class="cursor-pointer px-4 py-1"
											>
												{testimonial?.name || 'Name unavailable'}
											</button>
										</li>
									{/each}
								</ul>
							</li>
						{/if}
						{#if filteredClients?.length}
							<li>
								<span class="pl-4 leading-normal font-semibold text-gray-900">Clients</span>
								<ul>
									{#each filteredClients as client (client?.id)}
										<li
											class="hover:bg-primary-btn-bg cursor-pointer px-3 py-2 font-medium text-gray-600 select-none hover:text-white"
										>
											<button
												type="button"
												onclick={() => {
													searchTerm = '';
													goto(CLIENTS, { state: { view: true, clientId: client?.id } });
												}}
												class="cursor-pointer px-4 py-1"
											>
												{client?.name || 'Name unavailable'}
											</button>
										</li>
									{/each}
								</ul>
							</li>
						{/if}
					</ul>
				{/if}
				{#if !filteredProjects?.length && !filteredClients?.length && !filteredTestimonials?.length && searchTerm}
					<ul
						class="border-light-border absolute z-10 mt-2 mr-2 max-h-60 w-74 overflow-auto rounded-md border bg-white py-1 pt-3 text-sm shadow-lg shadow-black/50"
						role="listbox"
					>
						<li class="cursor-pointer px-3 py-2 font-medium text-gray-600 select-none">
							No results found
						</li>
					</ul>
				{/if}
			</div>
			<Button
				callBack={toggleMenu}
				defaultStyles="relative size-10 max-h-10 max-w-10 cursor-pointer rounded-lg text-center select-none disabled:pointer-events-none sm:transition-colors sm:hover:bg-gray-200/90 xl:hidden"
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
			</Button>
			{#if !data?.userProfile?.expand?.preferences?.hide_notifications}
				<div class="relative">
					<Button
						callBack={handleToggleMenu}
						disabled={trackingData.events?.length === 0 && trackingData.metrics?.length === 0}
						defaultStyles="flex size-10 max-h-10 max-w-10 cursor-pointer items-center justify-center rounded-lg select-none sm:transition-colors transition-colors duration-200 disabled:text-gray-400 disabled:hover:text-gray-400 {showHistory
							? 'bg-gray-200/90 text-purple-600'
							: 'text-gray-900 bg-transparent sm:hover:bg-gray-200/90 sm:hover:text-purple-600'}"
					>
						<Icon name="notification" class="size-5" stroke="none" />
					</Button>
					{#if showHistory && (trackingData.events?.length || trackingData.metrics?.length)}
						<ul
							transition:fly={{ y: 20 }}
							class="border-light-border absolute -right-6 z-10 mt-2 mr-2 max-h-60 w-74 overflow-auto rounded-md border bg-white text-sm shadow-lg shadow-black/50"
							role="listbox"
						>
							{#each trackingData.events as event, i (i)}
								<li class="px-3 py-2 font-medium text-gray-500 select-none">
									Someone viewed your project
									<span class="text-dark-text font-semibold">{event?.propertyName}</span>
								</li>
							{/each}
							{#each trackingData.metrics as metric, i (i)}
								<li class="text-dark-text px-3 py-2 font-semibold select-none">
									Someone visited your portfolio
									<span class="text-dark-text sr-only font-semibold">{metric?.y}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
			<button type="button" class="cursor-pointer dark:text-white" onclick={changeTheme}>
				theme
			</button>
		</div>
	</div>
</nav>
