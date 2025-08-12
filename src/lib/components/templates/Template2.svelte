<script>
	import { onMount } from 'svelte';

	import Footer from '$lib/components/templates/Footer.svelte';
	import Header from '$lib/components/templates/Header.svelte';
	import Button from '$lib/components/global/Button.svelte';
	import { DASHBOARD } from '$lib/utils/constants.js';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
	let el, isWhite;

	let selectedColor = data?.expand?.preferences?.portfolio_color || '#924999';

	onMount(() => {
		colorPicker(selectedColor);
	});

	let userPreferences = data?.expand?.preferences;

	function colorPicker(selectedColor) {
		const lightness = getLightnessFromHex(selectedColor);

		if (selectedColor === '#ffffff') {
			isWhite = true;
		}

		el.setAttribute(
			'style',
			`
		--base-color: ${selectedColor};
		--text-color: ${lightness > 60 ? 'black' : 'white'};
		--button-hover-color: ${isWhite ? '#cccccc' : 'white'};`
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


</script>

<div id="template-1" bind:this={el}>
	<Header data={data}/>
	<div class="flex flex-col md:flex-row items-center gap-4 container mx-auto mt-12 mb-12 xl:w-3/5 p-10">
		<img class="w-3/4 h-3/4 borderImg rounded-full md:w-1/3" src={data?.avatar_url} alt={data?.name}/>
	<div class="container mx-auto md:ml-10">
		<h1 class="text-5xl">
			{#if data?.name}
			Welcome to {data?.name}'s Portfolio!
			{/if}
		</h1>
		<h2 class="text-xl my-6 ">
			{@html data?.biography}
		</h2>
		{#if data?.resume_url && !data?.socials || Object.keys(data.socials).length === 0}
			<a href={data?.resume_url} target="_blank">
				<button
					class="button rounded-lg px-4 py-2 text-center align-middle uppercase font-semibold text-sm shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
					type="button"
				>View Resume</button>
			</a>
		{/if}
		<div class="mt-2">
		{#each ['linkedin', 'github', 'instagram', 'facebook'] as network}
			{#if data?.socials?.[network]}
			<button class="button rounded-full px-3 py-3 mr-4 text-center align-middle font-semibold text-sm shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
						<a
							href={data.socials?.[network]}
							target="_blank"
							class="flex items-center rounded"
						>	<Icon name={[network]} class="w-5 h-5" stroke="none" />
						</a>
			</button>
				{/if}
		{/each}
		</div>
	</div>
	</div>

	{#if !userPreferences?.hide_projects}
		{#if data?.expand?.projects?.length > 0}
			<section class="px-8 py-12" id="projects">
				<div class="container mx-auto mb-10 text-center">
					<h2
						class="mb-4 block text-4xl tracking-normal antialiased"
					>My Work
					</h2>
				</div>
				<div
					class="container mx-auto lg:px-50 grid grid-cols-1 gap-x-10 gap-y-20  md:grid-cols-3 xl:grid-cols-4"
				>
					{#each data?.expand?.projects.slice().reverse() as project, i (project?.id)}
						<div class="relative flex flex-col shadow-none">
							<div class="relative mx-0 mt-0 mb-3 overflow-hidden bg-clip-border rounded-4xl shadow-lg">
								<a href={project?.link || '#'} target="_blank">
									<img
										alt={project?.title}
										loading="lazy"
										width="768"
										decoding="async"
										class="borderImg h-full w-full rounded-4xl object-cover"
										style="color:transparent"
										src={project?.project_image_url ||
										'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
										onclick={() =>
										window.umami?.track(`${data?.slug}`, { [project?.title]: 'visited' })}/>
								</a>
							</div>

							<div class="p-0">
								<a href={project?.link || '#'} target="_blank" class="transition-colors">
									<h5
										class="mb-2 block font-bold leading-snug tracking-normal text-center antialiased"
									>
										{project?.title || `Project #${i + 1}`}
									</h5>
								</a>
								<p
									class="mb-6 block leading-relaxed text-center antialiased"
								>
									{project?.description || 'No description provided.'}
								</p>
								<div class=" flex justify-center items-center">
								<button
									class="button rounded-lg px-4 py-2 text-center align-middle text-xs font-bold uppercase shadow-md shadow-gray-900/10 transition-all select-none hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									onclick={() =>
										window.umami?.track(`${data?.slug}`, { [project?.title]: 'visited' })}
								><a href={project?.link || '/404'} target="_blank">see details</a></button
								></div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	{/if}

	{#if !userPreferences?.hide_clients}
		{#if data?.expand?.clients?.length > 0}
			<section class="px-8 py-12 lg:py-24" id="clients">
				<div class="container mx-auto max-w-screen-lg">
					<div class="container mx-auto mb-10 text-center">
						<h2
							class="mb-4 block text-4xl tracking-normal antialiased"
						>My Clients
						</h2>
					</div>
						<div class="mx-auto mt-5 flex max-w-6xl flex-wrap justify-center gap-5">
							{#each data?.expand?.clients?.slice() as clients (clients?.id)}
								<a href={clients?.link} target="_blank">
									<img
										src={clients?.client_image_url ||
										'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
										alt="Client"
										class="max-h-40 object-contain rounded-full"
									/></a>
							{/each}
						</div>
				</div>
			</section>
		{/if}
	{/if}

	{#if !userPreferences?.hide_testimonials}
		{#if data?.expand?.testimonials?.length > 0}
			<section class="px-8 py-12 lg:py-24" id="testimonials">
				<div class="container mx-auto max-w-screen-lg">
					<div class="container mx-auto mb-10 text-center">
						<h2
							class="mb-4 block text-4xl tracking-normal antialiased"
						>Testimonials
						</h2>
					</div>
					<div
						class="relative flex flex-col rounded-xl bg-transparent bg-clip-border shadow-none lg:flex-row">
						<div class="h-full w-10/12 p-6 flex flex-col lg:flex-row lg:gap-10 justify-center items-center mx-auto">

							<div class="shrink-0 rounded-lg sm:w-[18rem] mb-4">
								<img
									alt="testimonial image"
									loading="lazy"
									height="500"
									width="500"
									decoding="async"
									class="borderImg h-full w-full rounded-full object-cover"
									src={chosenTestimonial?.testimonial_image_url ||
                'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
								/>
							</div>

							<div class="mb-10 lg:mb-0">
								<h3 class="mb-4 block text-3xl font-bold leading-snug tracking-normal antialiased lg:max-w-xs">
									{chosenTestimonial?.name || 'Name'}
								</h3>
								<p class="mb-3 block text-base leading-relaxed text-inherit antialiased">
									{chosenTestimonial?.quote || 'Quote'}
								</p>
								<h6 class="mb-0.5 block text-base font-bold tracking-normal antialiased">
									{chosenTestimonial?.company || 'Company'}
								</h6>
								<p class="mb-5 block text-sm leading-normal text-inherit antialiased">
									{chosenTestimonial?.role || 'Role'}
								</p>

								<div class="flex items-center gap-4">
									{#each data?.expand?.testimonials as testimonial (testimonial?.id)}
										<button
											onclick={() => { chosenTestimonial = testimonial; }}
											class="button rounded-full "
										>
											<img
												src={testimonial?.testimonial_image_url ||
                            'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
												alt="testimonial thumbnail"
												class="h-9 w-9 rounded-full object-cover object-center opacity-50"
											/>
										</button>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		{/if}
	{/if}

	<Footer data={data} />

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
        --button-hover-color: white;

        background: var(--base-color);
        color: var(--text-color);

        button {
            background: var(--surface-color);
            color: var(--third-text-color);
        }

        button:hover {
            background: var(--button-hover-color);
            color: var(--surface-color);
        }

        .borderImg {
            border: 3px solid var(--surface-color);
        }

    }
</style>
