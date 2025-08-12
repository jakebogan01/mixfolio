<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ProjectForm from '$lib/components/dashboard/projects/ProjectForm.svelte';
	import Button from '$lib/components/global/Button.svelte';

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

<div class="relative h-30 w-full overflow-hidden rounded-xl xl:h-50">
	<div
		class="from-primary-from-theme-light to-secondary-to-theme-light dark:to-secondary-to-theme-dark absolute inset-0 h-full w-full bg-gradient-to-tr dark:from-gray-950"
	></div>
</div>
<div
	class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border bg-white bg-clip-border shadow-md lg:mx-4"
>
	<div class="px-4 pt-4 pb-8">
		<div class="text-base/7 font-semibold sm:flex sm:items-start">
			{#if data?.userProfile?.expand?.projects?.length}
				<div class="pb-2 sm:flex-auto">
					<h6 class="text-base font-semibold text-gray-900 dark:text-white">Projects</h6>
				</div>
			{/if}
			{#if data?.userProfile?.expand?.projects?.length < 8}
				<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<Button
						callBack={() => {
							toggleMenu();
							viewProject = false;
						}}
						text="Add project"
						class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
					/>
				</div>
			{/if}
		</div>
		{#if data?.userProfile?.expand?.projects?.length}
			<ul
				role="list"
				class="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
			>
				{#each data?.userProfile?.expand?.projects as project, i (project?.id)}
					<li class="relative">
						<div
							class="overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 w-3/4 focus-within:ring-offset-gray-100"
						>
							<img
								src={project?.project_image_url ||
									'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
								alt=""
								class="pointer-events-none aspect-square object-cover"
							/>
						</div>
						<p class="mt-4 block text-sm leading-normal font-normal dark:text-gray-300">
							Project #{i + 1}
						</p>
						<h5 class=" my-1 block truncate text-xl leading-snug font-semibold tracking-normal">
							{project?.title}
						</h5>
						<p class=" block truncate text-sm leading-normal font-normal dark:text-gray-400">
							{project?.description}
						</p>
						<div class="mt-3">
							<Button
								callBack={() => {
									toggleMenu();
									viewProject = true;
									projectId = project?.id;
								}}
								text="view project"
								class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark sm:hover:bg-secondary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
							/>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="flex h-full items-center justify-center pt-10 pb-8">
				<div class="flex flex-col items-center space-y-2">
					<p class="text-dark-text-theme-light dark:text-dark-text-theme-dark mt-2 text-sm">
						You do not have any projects.
					</p>
					<Button
						callBack={() => {
							toggleMenu();
							viewProject = false;
						}}
						text="Add project"
						class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
					/>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if menuOpen}
	<ProjectForm {data} {projectId} {viewProject} {toggleMenu} />
{/if}
