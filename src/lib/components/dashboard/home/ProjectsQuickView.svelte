<script>
	import { PROJECTS } from '$lib/utils/constants.js';
	import { toISODate } from '$lib/utils/date.js';
	import Icon from '$lib/components/Icon.svelte';
	import { goto } from '$app/navigation';
	import { toastMessage } from '$lib/utils/toast.js';
	import Button from '$lib/components/global/Button.svelte';

	let { userProfile } = $props();

	const copyToClipboard = async (link) => {
		if (!link) return;
		try {
			await navigator.clipboard.writeText(link);
			toastMessage('success', 'Successfully copied project link!');
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	};
</script>

<div
	class="border-light-border text-dark-text relative flex flex-col overflow-hidden rounded-xl border bg-white bg-clip-border pt-10 pb-5 xl:col-span-2"
>
	{#if userProfile?.expand?.projects?.length}
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="pb-2 sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">Projects</h6>
			</div>
			{#if userProfile?.expand?.projects?.length < 8}
				<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<Button
						callBack={() => goto(PROJECTS, { state: { create: true } })}
						text="Add project"
						class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
					/>
				</div>
			{/if}
		</div>
		<div class="mt-5 max-h-92 flex-1 overflow-y-auto">
			<table class="table-fixed text-left whitespace-nowrap">
				<colgroup>
					<col class="w-full sm:w-4/12" />
					<col class="lg:w-4/12" />
					<col class="lg:w-2/12" />
					<col class="lg:w-1/12" />
					<col class="lg:w-1/12" />
				</colgroup>
				<thead class="border-light-border sticky top-0 border-b text-sm/6 text-gray-900">
					<tr class="bg-white">
						<th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">Project</th>
						<th scope="col" class="py-2 pr-8 pl-0 font-semibold">Link</th>
						<th
							scope="col"
							class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-8 sm:text-left lg:pr-20"
							>Description</th
						>
						<th
							scope="col"
							class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
							>Created</th
						>
						<th scope="col" class="relative py-2 pr-4 pl-0 sm:pr-6 lg:pr-8">
							<span class="sr-only">Select</span>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-300">
					{#each userProfile?.expand?.projects as project (project?.id)}
						<tr>
							<td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
								<div class="flex items-center gap-x-4">
									<img
										src={project?.project_image_url ||
											'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg'}
										alt={project?.name || 'Project name unavailable'}
										class="size-8 rounded bg-gray-800"
									/>
									<div class="text-dark-text truncate text-sm/6 font-medium">
										{project?.title || 'Title unavailable'}
									</div>
								</div>
							</td>
							<td class="py-4 pr-4 pl-0 sm:pr-8">
								<button
									type="button"
									onclick={() => {
										copyToClipboard(project?.link);
									}}
									aria-label="Copy project link"
									class="cursor-pointer text-gray-900 sm:hover:text-gray-900/75"
								>
									<Icon name="copy-link" class="size-6" stroke="none" />
								</button>
							</td>
							<td class="hidden py-4 pr-4 pl-0 text-sm/6 sm:block sm:pr-8 lg:pr-20">
								<p class="text-dark-text max-w-50 truncate">
									{project?.description || 'Description unavailable'}
								</p>
							</td>
							<td
								class="text-dark-text hidden py-4 pr-4 pl-0 text-right text-sm/6 sm:table-cell sm:pr-6 lg:pr-8"
							>
								<time datetime="2023-01-23T11:00"
									>{toISODate(project?.created) || 'Data unavailable'}</time
								>
							</td>
							<td class="py-4 pr-4 pl-0 text-right text-sm text-white sm:pr-6 lg:pr-8">
								<Button
									callBack={() => goto(PROJECTS, { state: { view: true, projectId: project?.id } })}
									text="Select"
									class="bg-secondary-btn-bg sm:hover:bg-secondary-btn-hover"
								>
									<span class="sr-only">View {project?.name}</span>
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="flex h-full items-center justify-center">
			<div class="flex flex-col items-center space-y-2">
				<p class="text-dark-text mt-2 text-sm">You do not have any projects.</p>
				<Button
					callBack={() => goto(PROJECTS, { state: { create: true } })}
					text="Add project"
					class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
				/>
			</div>
		</div>
	{/if}
</div>
