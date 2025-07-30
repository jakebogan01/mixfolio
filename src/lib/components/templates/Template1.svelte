<script>
	import { onMount } from 'svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let el, section;

	let selectedColor = data?.expand?.preferences?.portfolio_color || '#924999';

	onMount(() => {
		colorPicker(selectedColor);
	});

	function colorPicker(selectedColor) {
		console.log(selectedColor);
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

	console.log(data);
	//$state(data?.expand?.testimonials[0] ||
	let chosenTestimonial = [];
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
				<li>
					<a
						href="#projects"
						target="_self"
						class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
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
				<li>
					<a
						href="#testimonials"
						target="_self"
						class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
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
				<li>
					<a
						href="#resume"
						target="_self"
						class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							class="h-5 w-5"
							><path
								fill-rule="evenodd"
								d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
								clip-rule="evenodd"
							></path></svg
						>Resume</a
					>
				</li>
			</ul>
			<button
				class="hover:/10 active:/20 relative ml-auto inline-block h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
				type="button"
				><span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
					><svg
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
					></span
				></button
			>
		</div>
		<div class="block w-full basis-full overflow-hidden" style="height:0px">
			<div class="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
				<ul class="flex flex-col gap-4">
					<li>
						<a
							href="#"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								class="h-5 w-5"
								><path
									d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
								></path></svg
							>Page</a
						>
					</li>
					<li>
						<a
							href="#"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
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
							>Account</a
						>
					</li>
					<li>
						<a
							href="#"
							target="_self"
							class="flex items-center gap-2 font-sans text-base leading-relaxed font-medium antialiased"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								class="h-5 w-5"
								><path
									fill-rule="evenodd"
									d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
									clip-rule="evenodd"
								></path></svg
							>Docs</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<header class=" p-8">
		<div
			class="container mx-auto grid h-full min-h-[60vh] w-full grid-cols-1 items-center gap-10 lg:grid-cols-2"
		>
			<div class="row-start-2 lg:row-auto">
				<h1
					class=" mb-4 block font-sans text-3xl !leading-tight font-semibold tracking-normal antialiased lg:text-5xl"
				>
					Welcome to {data.name}'s <br /> Portfolio!
				</h1>
				<p
					class="! mb-4 block font-sans text-xl leading-relaxed font-normal text-inherit antialiased md:pr-16 xl:pr-28"
				>
					{@html data.biography}
				</p>
			</div>
			<img
				alt="team work"
				loading="lazy"
				width="1024"
				height="1024"
				decoding="async"
				data-nimg="1"
				class="borderImg h-[36rem] w-full rounded-xl object-cover"
				style="color:transparent"
				src={data.avatar_url}
			/>
		</div>
	</header>
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
					Whether you have a mobile app idea that needs to come to life or a website that requires a
					facelift, I'm here to turn your digital dreams into reality.
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
								><a href={project?.link || '/404'} target="_blank">see details</a></button
							>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

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
							{#each data?.expand?.testimonials as testimonial, i (testimonial?.id)}
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
					{#each data?.expand?.clients?.slice() as clients, i (clients?.id)}
						<img
							width="158"
							height="48"
							src={clients.client_image_url ||
								'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/home-decor-1.jpeg'}
							alt="Transistor"
							class="max-h-30 object-contain"
						/>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="px-8 py-24" id="resume">
		<div class="container mx-auto grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div class="col-span-1">
				<h2
					class=" block font-sans text-4xl leading-[1.3] font-semibold tracking-normal antialiased"
				>
					My Resume
				</h2>
				<p
					class="! mt-3 mb-4 block w-9/12 font-sans text-base leading-relaxed font-normal text-inherit antialiased"
				>
					Highly skilled and creative Web Developer with 5+ years of experience in crafting visually
					stunning and functionally robust websites and web applications.
				</p>
				<button
					class="hover:/10 active:/20 flex items-center gap-2 rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase transition-all select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
					>view more<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
						stroke-width="3"
						class="h-3.5 w-3.5"
						><path
							fill-rule="evenodd"
							d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
							clip-rule="evenodd"
						></path></svg
					></button
				>
			</div>
			<div class="col-span-1 grid gap-y-6 pr-0 lg:ml-auto lg:pr-12 xl:pr-32">
				<div class="flex items-start gap-4">
					<div
						class="icon relative flex h-12 w-12 shrink-0 flex-col items-center justify-center !rounded-lg rounded-xl bg-clip-border shadow-md shadow-gray-900/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							class="h-6 w-6"
							stroke-width="2"
							><path
								d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"
							></path></svg
						>
					</div>
					<p
						class="! block w-full font-sans text-base leading-relaxed font-normal text-inherit antialiased"
					>
						Bachelor of Science in Computer Science
					</p>
				</div>
				<div class="flex items-start gap-4">
					<div
						class="icon relative flex h-12 w-12 shrink-0 flex-col items-center justify-center !rounded-lg rounded-xl bg-clip-border shadow-md shadow-gray-900/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							class="h-6 w-6"
							stroke-width="2"
							><path
								d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z"
							></path></svg
						>
					</div>
					<p
						class="! block w-full font-sans text-base leading-relaxed font-normal text-inherit antialiased"
					>
						Certified Web Developer
					</p>
				</div>
				<div class="flex items-start gap-4">
					<div
						class="icon relative flex h-12 w-12 shrink-0 flex-col items-center justify-center !rounded-lg rounded-xl bg-clip-border shadow-md shadow-gray-900/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
							class="h-6 w-6"
							stroke-width="2"
							><path
								fill-rule="evenodd"
								d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
								clip-rule="evenodd"
							></path></svg
						>
					</div>
					<p
						class="! block w-full font-sans text-base leading-relaxed font-normal text-inherit antialiased"
					>
						Frontend Framework Proficiency Certification
					</p>
				</div>
			</div>
		</div>
	</section>

	<footer class="mt-10 px-8 pt-20">
		<div class="container mx-auto">
			<div
				class="mt-16 flex flex-wrap items-center justify-center gap-y-4 border-t border-gray-200 py-6 md:justify-between"
			>
				<p
					class="! block text-center font-sans text-base leading-relaxed font-normal text-inherit antialiased"
				>
					© <!-- -->2025<!-- --> Made with<!-- -->
					<a href="/home" target="_blank">MixFolio</a>
				</p>
				<ul class="flex items-center gap-8">
					<li>
						<a
							href="/home"
							class="hover: block font-sans text-sm leading-normal font-normal antialiased transition-colors"
							>Contact</a
						>
					</li>
					<li>
						<a
							href="mailto:{data.email}"
							class="hover: block font-sans text-sm leading-normal font-normal antialiased transition-colors"
							>Email</a
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
