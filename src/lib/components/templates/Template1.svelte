<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	let el, section;

	let selectedColor = data?.expand?.preferences?.portfolio_color || '#924999';

	onMount(() => {
		colorPicker(selectedColor);
	});

	function colorPicker(selectedColor) {
		const lightness = getLightnessFromHex(selectedColor);
		el.setAttribute(
			'style',
			`
		--base-color: ${selectedColor};
		--text-color: ${lightness > 60 ? 'black' : 'white'}		`
		);
	}

	function getLightnessFromHex(hex) {
		hex = hex.replace(/^#/, '');

		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);

		const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

		return +(brightness * 100).toFixed(2);
	}

	let chosenTestimonial = $state([]);

	if (data.expand?.testimonials?.length > 0) {
		chosenTestimonial = data?.expand?.testimonials[0];
	} else {
		chosenTestimonial = [];
	}

	let userPreferences = data?.expand?.preferences;
	let mobileMenu = $state(false);

	function setMobileMenu() {
		mobileMenu = !mobileMenu;
	}

	let userHasContent =
		(!userPreferences?.hide_testimonials && data?.expand?.testimonials?.length > 0) ||
		(!userPreferences?.hide_projects && data?.expand?.projects?.length > 0) ||
		(!userPreferences?.hide_clients && data?.expand?.clients?.length > 0);
</script>

<!--<label for="base-color-input">-->
<!--	Background:-->
<!--	<p>Selected color: <span style="color: {color}">{color}</span></p>-->
<!--	<input type="color" id="base-color-input" list="presetColors" oninput={colorPicker} />-->
<!--	<datalist id="presetColors">-->
<!--		<option value="#ff0000">Red</option>-->
<!--		<option value="#00ff00">Green</option>-->
<!--		<option value="#0000ff">Blue</option>-->
<!--		<option value="#ffff00">Yellow</option>-->
<!--		<option value="#ffa500">Orange</option>-->
<!--	</datalist>-->
<!--</label>-->

<div id="template-1" bind:this={el}>
	<nav class="sticky top-0 z-50 block w-full max-w-full rounded-none px-4 py-4">
		<div class="container mx-auto flex items-center justify-between">
			<p class=" block font-sans text-lg font-bold antialiased">
				<a href="">{data.name}</a>
			</p>
			<ul class="ml-10 hidden items-center gap-8 lg:flex" bind:this={section}>
				{#if !userPreferences?.hide_projects && data?.expand?.projects?.length > 0}
					<li>
						<a
							href="#projects"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								class="h-5 w-5"
								><path
									d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
								></path></svg
							>Projects</a
						>
					</li>
				{/if}
				{#if !userPreferences?.hide_clients && data?.expand?.clients?.length > 0}
					<li>
						<a
							href="#clients"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
									clip-rule="evenodd"
								/>
								<path
									d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"
								/>
							</svg>
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
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								class="h-5 w-5"
								><path
									fill-rule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
									clip-rule="evenodd"
								></path></svg
							>Testimonials</a
						>
					</li>
				{/if}
			</ul>
			<button
				class="hover:/10 active:/20 relative ml-auto inline-block h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
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
				<div class="block w-full basis-full">
					<div class="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
						<ul class="flex flex-col gap-4">
							{#if !userPreferences?.hide_projects && data?.expand?.projects?.length > 0}
								<li>
									<a
										href="#projects"
										target="_self"
										class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											aria-hidden="true"
											class="h-5 w-5"
											><path
												d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
											></path></svg
										>Projects</a
									>
								</li>
							{/if}
							{#if !userPreferences?.hide_clients && data?.expand?.clients?.length > 0}
								<li>
									<a
										href="#clients"
										target="_self"
										class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased hover:underline"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-6"
										>
											<path
												fill-rule="evenodd"
												d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
												clip-rule="evenodd"
											/>
											<path
												d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"
											/>
										</svg>
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
										><svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											aria-hidden="true"
											class="h-5 w-5"
											><path
												fill-rule="evenodd"
												d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
												clip-rule="evenodd"
											></path></svg
										>Testimonials</a
									>
								</li>
							{/if}
						</ul>
					</div>
				</div>
			{/if}
		{/if}
	</nav>
	<header class=" p-8">
		{#if data.avatar_url}
			<div
				class="container mx-auto grid h-full min-h-[60vh] w-full grid-cols-1 items-center gap-10 lg:grid-cols-2"
			>
				<div class="row-start-2 lg:row-auto">
					<h1
						class=" mb-4 block font-sans text-3xl !leading-tight font-semibold tracking-normal antialiased lg:text-5xl"
					>
						Welcome to {data?.name}'s <br /> Portfolio!
					</h1>
					<p
						class="! mb-4 block font-sans text-xl leading-relaxed font-normal text-inherit antialiased md:pr-16 xl:pr-28"
					>
						{@html data?.biography}
					</p>
				</div>
				<img
					alt="team work"
					loading="lazy"
					width="1024"
					height="1024"
					decoding="async"
					data-nimg="1"
					class="borderImg w-full rounded-xl object-cover"
					style="color:transparent"
					src={data?.avatar_url}
				/>
			</div>
		{:else}<div class="container mx-auto flex min-h-[60vh] w-full items-center justify-center">
				<div class="text-center">
					<h1 class="mb-4 font-sans text-4xl font-semibold tracking-normal antialiased lg:text-5xl">
						Welcome to {data?.name}'s <br /> Portfolio!
					</h1>
					<p class="mb-4 font-sans text-xl leading-relaxed font-normal text-inherit antialiased">
						{@html data?.biography}
					</p>
				</div>
			</div>
		{/if}
	</header>

	{#if !userPreferences?.hide_projects}
		{#if data?.expand?.projects?.length > 0}
			<section class="px-8 py-28" id="projects">
				<div class="container mx-auto mb-20 text-center">
					<h2
						class="mb-4 block font-sans text-4xl leading-[1.3] font-semibold tracking-normal antialiased"
					>
						My Projects
					</h2>
					<p
						class="mx-auto block w-full px-4 font-sans text-xl leading-relaxed font-normal text-inherit antialiased lg:w-8/12"
					>
						Whether you have a mobile app idea that needs to come to life or a website that requires
						a facelift, I'm here to turn your digital dreams into reality.
					</p>
				</div>

				<div
					class="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4"
				>
					<!--				rounded-xl bg-clip-border-->
					{#each data?.expand?.projects.slice().reverse() as project, i (project?.id)}
						<div class="relative flex flex-col shadow-none">
							<div class="relative mx-0 mt-0 mb-6 h-48 overflow-hidden bg-clip-border shadow-lg">
								<img
									alt={project?.title}
									loading="lazy"
									width="768"
									height="768"
									decoding="async"
									class="borderImg h-full w-full rounded-xl object-cover"
									style="color:transparent"
									src={project?.project_image_url ||
										'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/home-decor-1.jpeg'}
								/>
							</div>
							<div class="p-0">
								<a href={project?.link || '#'} class="transition-colors">
									<h5
										class="mb-2 block font-sans text-xl leading-snug font-semibold tracking-normal text-inherit antialiased"
									>
										{project?.title || `Project #${i + 1}`}
									</h5>
								</a>
								<p
									class="mb-6 block font-sans text-base leading-relaxed font-normal text-inherit antialiased"
								>
									{project?.description || 'No description provided.'}
								</p>
								<button
									class="rounded-lg px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									onclick={() => window.umami?.track(`${project?.title}`, { project: 'visited' })}
									><a href={project?.link || '/404'} target="_blank">see details</a></button
								>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/if}

	{#if !userPreferences?.hide_testimonials}
		{#if data?.expand?.testimonials?.length > 0}
			<section class="px-8 py-12 lg:py-24" id="testimonials">
				<div class="container mx-auto max-w-screen-lg">
					<div class="container mx-auto mb-20 text-center">
						<h2
							class="mb-4 block font-sans text-4xl leading-[1.3] font-semibold tracking-normal antialiased"
						>
							Testimonials
						</h2>
						<p
							class="mx-auto block w-full px-4 font-sans text-xl leading-relaxed font-normal text-inherit antialiased lg:w-8/12"
						>
							Discover what clients have to say about their experiences working with me. My client's
							satisfaction is my greatest achievement!
						</p>
					</div>
					<div
						class="relative flex flex-col rounded-xl bg-transparent bg-clip-border py-8 shadow-none lg:flex-row"
					>
						<div class="h-full w-full justify-between p-6 lg:!flex lg:gap-10">
							<div class="mb-10 w-full lg:mb-0">
								<h3
									class=" mb-4 block font-sans text-3xl leading-snug font-bold tracking-normal antialiased lg:max-w-xs"
								>
									{chosenTestimonial?.name || 'Name'}
								</h3>
								<p
									class="mb-3 block w-full font-sans text-base leading-relaxed font-normal text-inherit antialiased lg:w-8/12"
								>
									{chosenTestimonial?.quote || 'Quote'}
								</p>
								<h6
									class=" leading-relanpxed mb-0.5 block font-sans text-base font-semibold tracking-normal antialiased"
								>
									{chosenTestimonial?.company || 'Company'}
								</h6>
								<p
									class="mb-5 block font-sans text-sm leading-normal font-normal text-inherit antialiased"
								>
									{chosenTestimonial?.role || 'Role'}
								</p>

								<div class="flex items-center gap-4">
									{#each data?.expand?.testimonials as testimonial (testimonial?.id)}
										<button
											onclick={() => {
												chosenTestimonial = testimonial;
											}}
											class="rounded-md"
										>
											<img
												src={testimonial?.testimonial_image_url ||
													'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/home-decor-1.jpeg'}
												alt="spotify"
												class="relative inline-block h-9 w-9 cursor-pointer rounded-md object-cover object-center opacity-50"
											/>
										</button>
									{/each}
								</div>
							</div>

							<div class="h-[21rem] w-full shrink-0 rounded-lg sm:w-[18rem]">
								<img
									alt="testimonial image"
									loading="lazy"
									width="768"
									height="768"
									decoding="async"
									data-nimg="1"
									class="h-full w-full rounded-lg object-cover"
									style="color:transparent"
									src={chosenTestimonial?.testimonial_image_url ||
										'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/home-decor-1.jpeg'}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		{/if}
	{/if}

	{#if !userPreferences?.hide_clients}
		{#if data?.expand?.clients?.length > 0}
			<section class="px-8 py-12 lg:py-24" id="testimonials">
				<div class="container mx-auto max-w-screen-lg">
					<div class="container mx-auto mb-20 text-center">
						<h2
							class="mb-4 block font-sans text-4xl leading-[1.3] font-semibold tracking-normal antialiased"
						>
							Clients
						</h2>
						<p
							class="mx-auto block w-full px-4 font-sans text-xl leading-relaxed font-normal text-inherit antialiased lg:w-8/12"
						>
							Trusted by the world’s most innovative teams
						</p>
						<div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-5">
							{#each data?.expand?.clients?.slice() as clients (clients?.id)}
								<img
									width="158"
									height="48"
									src={clients?.client_image_url ||
										'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/home-decor-1.jpeg'}
									alt="Transistor"
									class="max-h-30 object-contain"
								/>
							{/each}
						</div>
					</div>
				</div>
			</section>
		{/if}
	{/if}

	<footer class="mt-10 px-8 pt-20">
		<div class="container mx-auto">
			<div
				class="mt-16 flex flex-wrap items-center justify-center gap-y-4 border-t border-gray-200 py-6 md:justify-between"
			>
				<p
					class="! block text-center font-sans text-base leading-relaxed font-normal text-inherit antialiased"
				>
					© 2025 Made with
					<a href="/home" target="_blank">MixFolio</a>
				</p>
				<ul class="flex items-center gap-8">
					<li>
						<a
							href="mailto:{data?.email}"
							class="text block font-sans text-sm leading-normal font-normal hover:underline"
							>Contact {data?.name}</a
						>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</div>

<!--css color picker code-->

<style>
	#template-1 {
		--base-color: #2a6788;
		--surface-color: oklch(from var(--base-color) 30% c h);
		--brand-color: okclh(from var(--base-color) calc(1 * 3) calc(c * 5) h);
		--text-color: white;
		--secondary-text-color: oklch(from var(--text-color) l c h / 0.6);
		--third-text-color: white;

		background: var(--base-color);
		color: var(--text-color);

		button {
			background: var(--surface-color);
			color: var(--third-text-color);
		}

		button:hover {
			background: var(--text-color);
			color: var(--surface-color);
		}

		.borderImg {
			border: 3px solid var(--surface-color);
		}

		.sticky {
			background: var(--surface-color);
			color: var(--third-text-color);
		}

		.icon {
			background: var(--surface-color);
		}
	}
</style>
