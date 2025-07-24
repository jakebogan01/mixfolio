<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Projects from '$lib/components/dashboard/projects/Projects.svelte';

	let { data } = $props();
	let menuOpen = $state(false);
	let viewProject = $state(false);
	let projectId = $state(null);

	onMount(() => {
		if (page?.state?.create) {
			menuOpen = true;
			viewProject = false;
		} else if (page?.state?.view) {
			menuOpen = true;
			viewProject = true;
			projectId = page?.state?.projectId;
		}
	});

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div
	class="relative h-50 w-full overflow-hidden rounded-xl bg-[url('https://demos.creative-tim.com/material-tailwind-dashboard-react/img/background-image.png')] bg-cover bg-center"
>
	<div class="absolute inset-0 h-full w-full bg-gray-900/75"></div>
</div>
<div
	class="relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700 shadow-md lg:mx-4"
>
	<div class="px-4 pt-4 pb-8">
		<div class="text-base/7 font-semibold sm:flex sm:items-start">
			<div class="sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">Projects</h6>
				<p class=" block text-sm leading-normal font-normal">Manage all of your projects here.</p>
			</div>
			{#if data?.userProfile?.expand?.projects?.length < 8}
				<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
						onclick={() => {
							toggleMenu();
							viewProject = false;
						}}
						class="inline-flex cursor-pointer items-center rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-violet-400"
						>Add project</button
					>
				</div>
			{/if}
		</div>
		<ul
			role="list"
			class="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
		>
			{#each data?.userProfile?.expand?.projects as project, i (project?.id)}
				<li class="relative">
					<div
						class="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
					>
						<img
							src={project?.project_image_url
								? project?.project_image_url
								: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'}
							alt=""
							class="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
						/>
					</div>
					<p class="mt-4 block text-sm leading-normal font-normal">Project #{i + 1}</p>
					<h5 class=" my-1 block truncate text-xl leading-snug font-semibold tracking-normal">
						{project?.title}
					</h5>
					<p class=" block truncate text-sm leading-normal font-normal">
						{project?.description}
					</p>
					<div class="mt-3">
						<button
							type="button"
							onclick={() => {
								toggleMenu();
								viewProject = true;
								projectId = project?.id;
							}}
							class="cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-center align-middle text-xs font-bold text-white uppercase transition-all select-none hover:bg-gray-900/75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							>view project
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

{#if menuOpen}
	<Projects {data} {projectId} {viewProject} {toggleMenu} />
{/if}
