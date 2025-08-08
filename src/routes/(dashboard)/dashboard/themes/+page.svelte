<script>
	import ThemeViewer from '$lib/components/dashboard/themes/ThemeViewer.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let menuOpen = $state(false);
	let themeId = $state(null);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="space-y-12">
	<div
		class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative mt-6 flex flex-col rounded-xl border bg-white bg-clip-border"
	>
		<div
			class="from-primary-from-theme-light to-secondary-to-theme-light relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 dark:from-gray-950 dark:to-gray-950"
		>
			<h6 class="block text-base leading-relaxed font-semibold tracking-normal text-white">
				Themes
			</h6>
		</div>

		<div class="px-4 pb-5 sm:px-6 lg:px-8">
			<ul
				role="list"
				class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
			>
				{#each data?.themes as theme (theme?.id)}
					<li class="relative">
						<div class="group overflow-hidden rounded-lg">
							<img
								src={theme?.theme_image_url ||
									'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'}
								alt={theme?.title}
								class="pointer-events-none aspect-video w-full rounded-lg border-2 object-cover group-hover:opacity-75 {theme?.id ===
								data?.userProfile?.expand?.preferences?.theme_id
									? 'border-primary-btn-bg-theme-light'
									: 'border-light-border-theme-light dark:border-light-border-theme-dark'}"
							/>
							<Button
								callBack={() => {
									toggleMenu();
									themeId = theme?.id;
								}}
								defaultStyles="absolute inset-0 focus:outline-hidden cursor-pointer"
							>
								<span class="sr-only">{theme?.title || 'Title unavailable'}</span>
							</Button>
						</div>
						<p class="pointer-events-none mt-2 block truncate text-sm font-medium">
							{theme?.title || 'Title unavailable'}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

{#if menuOpen}
	<ThemeViewer {data} {themeId} {toggleMenu} />
{/if}
