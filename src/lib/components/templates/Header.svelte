<script>
	import { slide, fade } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	let section,wrapper;
	let userPreferences = data?.expand?.preferences;
	let mobileMenu = $state(false);
	let userResume = $state(false);

	let { data } = $props();

	function setMobileMenu() {
		mobileMenu = !mobileMenu;
	}

	let userHasContent =
		(!userPreferences?.hide_testimonials && data?.expand?.testimonials?.length > 0) ||
		(!userPreferences?.hide_projects && data?.expand?.projects?.length > 0) ||
		(!userPreferences?.hide_clients && data?.expand?.clients?.length > 0);

	if (data?.resume_url !== null) {
		userResume = true
	}
	console.log(data);
</script>

<nav class="sticky top-0 z-50 block w-full max-w-full rounded-none px-4 py-4">
		<div class="container mx-auto flex items-center justify-between">
			<p class="block font-sans text-lg font-bold antialiased">
				<a href="">{data?.name}</a>
			</p>
			<ul class="ml-10 hidden items-center gap-8 lg:flex" bind:this={section}>
				{#if !userPreferences?.hide_projects && data?.expand?.projects?.length > 0}
					<li>
						<a
							href="#projects"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
							><Icon name="projects" class="h-4 w-4 " stroke="none"/>
							Projects</a
						>
					</li>
				{/if}
				{#if !userPreferences?.hide_clients && data?.expand?.clients?.length > 0}
					<li>
						<a
							href="#clients"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
							><Icon name="clients" class="h-4 w-4 " stroke="none"/>
							Clients</a
						>
					</li>
				{/if}
				{#if !userPreferences?.hide_testimonials && data?.expand?.testimonials?.length > 0}
					<li>
						<a
							href="#testimonials"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
							><Icon name="testimonials" class="h-4 w-4 " stroke="none"/>
							Testimonials</a
						>
					</li>
				{/if}
				{#if userResume}
					<li>
						<a
							href={data?.resume_url}
							target="_blank"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
						><Icon name="resume" class="h-4 w-4 "/>
							Resume</a
						>
					</li>
				{/if}
			</ul>

			<button
				class="relative ml-auto inline-block h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
				type="button"
				onclick={setMobileMenu}
				><span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
					{#if userHasContent}
						{#if !mobileMenu}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								stroke-width="2"
								class="h-6 w-6"
								><path
									fill-rule="evenodd"
									d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
									clip-rule="evenodd"
								></path></svg
							>{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					{/if}
				</span></button
			>
		</div>

		{#if userHasContent}
			{#if mobileMenu}
				<div class="lg:hidden">
					<div
						bind:this={wrapper}
						transition:slide
						class="overflow-hidden transition-[height] duration-300"
						style="height: {mobileMenu ? `${wrapper?.scrollHeight}px` : '0px'}"
					>
						<div
							transition:fade
							class="container mx-auto mt-4 mb-3 border-t border-gray-200 px-2 pt-4"
						>
							<ul class="flex flex-col gap-4">
								{#if !userPreferences?.hide_projects && data?.expand?.projects?.length > 0}
									<li>
										<a
											href="#projects"
											target="_self"
											class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
											><Icon name="projects" class="h-4 w-4 " stroke="none" />
											Projects</a
										>
									</li>
								{/if}
								{#if !userPreferences?.hide_clients && data?.expand?.clients?.length > 0}
									<li>
										<a
											href="#clients"
											target="_self"
											class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
											><Icon name="clients" class="h-4 w-4 " stroke="none"/>
											Clients</a
										>
									</li>
								{/if}
								{#if !userPreferences?.hide_testimonials && data?.expand?.testimonials?.length > 0}
									<li>
										<a
											href="#testimonials"
											target="_self"
											class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
											><Icon name="testimonials" class="h-4 w-4 " stroke="none"/>
											Testimonials</a
										>
									</li>
								{/if}
								{#if userResume}
									<li>
										<a
											href={data?.resume_url}
											target="_blank"
											class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
										><Icon name="resume" class="h-4 w-4 " />
											Resume</a
										>
									</li>
								{/if}

							</ul>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	</nav>
<style>

    .sticky {
        background: var(--surface-color);
        color: var(--third-text-color);
    }

</style>