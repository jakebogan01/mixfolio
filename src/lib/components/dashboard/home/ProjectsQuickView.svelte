<script>
	import { DASHBOARD } from '$lib/utils/constants.js';
	import { toISODate } from '$lib/utils/date.js';
	import Icon from '$lib/components/Icon.svelte';
	import { goto } from '$app/navigation';

	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700 xl:col-span-2"
>
	{#if userProfile?.expand?.projects?.length}
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="pb-2 sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">Projects</h6>
			</div>
			{#if userProfile?.expand?.projects?.length < 8}
				<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
						onclick={() => goto(DASHBOARD, { state: { create: true } })}
						class="inline-flex cursor-pointer items-center rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-violet-400"
						>Add project</button
					>
				</div>
			{/if}
		</div>
		<div class="mt-6 max-h-92 overflow-y-auto">
			<table class="table-fixed text-left whitespace-nowrap">
				<colgroup>
					<col class="w-full sm:w-4/12" />
					<col class="lg:w-4/12" />
					<col class="lg:w-2/12" />
					<col class="lg:w-1/12" />
					<col class="lg:w-1/12" />
				</colgroup>
				<thead class="sticky top-0 border-b border-gray-300 text-sm/6 text-gray-900">
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
									<div class="truncate text-sm/6 font-medium text-gray-700">
										{project?.title || 'Title unavailable'}
									</div>
								</div>
							</td>
							<td class="py-4 pr-4 pl-0 sm:pr-8">
								<a
									href={project?.link || DASHBOARD}
									title="Copy link"
									class="text-gray-900 sm:hover:text-gray-900/75"
								>
									<Icon name="copy-link" class="size-6" stroke="none" />
								</a>
							</td>
							<td class="hidden py-4 pr-4 pl-0 text-sm/6 sm:block sm:pr-8 lg:pr-20">
								<p class="max-w-50 truncate text-gray-700">
									{project?.description || 'Description unavailable'}
								</p>
							</td>
							<td
								class="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-gray-700 sm:table-cell sm:pr-6 lg:pr-8"
							>
								<time datetime="2023-01-23T11:00"
									>{toISODate(project?.created) || 'Data unavailable'}</time
								>
							</td>
							<td class="py-4 pr-4 pl-0 text-right text-sm text-white sm:pr-6 lg:pr-8">
								<button
									type="button"
									class="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-2.5 py-1.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-gray-900/75"
									>Select<span class="sr-only">View {project?.name}</span></button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="flex h-full items-center justify-center">
			<div class="flex flex-col items-center space-y-2">
				<p class="mt-2 text-sm text-gray-700">You do not have any projects.</p>
				<button
					type="button"
					class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Add a project</button
				>
			</div>
		</div>
	{/if}
</div>
