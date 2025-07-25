<script>
	import { goto } from '$app/navigation';
	import { CLIENTS } from '$lib/utils/constants.js';

	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700 md:col-span-2 xl:col-span-1"
>
	{#if userProfile?.expand?.clients?.length}
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="pb-2 sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">Clients</h6>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
				<button
					type="button"
					onclick={() => goto(CLIENTS, { state: { create: true } })}
					class="inline-flex cursor-pointer items-center rounded-md bg-purple-600 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-violet-400"
					>Add client</button
				>
			</div>
		</div>
		<div class="mt-6 max-h-72 overflow-y-auto px-4 text-base/7 font-semibold sm:px-6 lg:px-8">
			<ul role="list" class="space-y-5 divide-y divide-gray-100">
				{#each userProfile?.expand?.clients as client (client?.id)}
					<li class="flex items-center justify-between gap-x-6">
						<div class="flex min-w-0 gap-x-4">
							<img
								src={client?.client_image_url ||
									'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
								alt=""
								class="size-12 flex-none rounded bg-gray-50"
							/>
							<div class="min-w-0 flex-auto">
								<p class="text-sm/6 font-semibold text-gray-900">
									{client?.name || 'Name unavailable'}
								</p>
								<p class="mt-1 truncate text-xs/5 text-gray-500">
									{client?.link || 'Link unavailable'}
								</p>
							</div>
						</div>
						<button
							type="button"
							onclick={() => goto(CLIENTS, { state: { view: true, clientId: client?.id } })}
							class="cursor-pointer rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white sm:transition-colors sm:hover:bg-gray-900/75"
							>View</button
						>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="flex h-full min-h-100 items-center justify-center p-6">
			<div class="flex flex-col items-center space-y-2">
				<p class="mt-2 text-sm text-gray-700">You do not have any clients.</p>
				<button
					type="button"
					onclick={() => goto(CLIENTS, { state: { create: true } })}
					class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Add a client</button
				>
			</div>
		</div>
	{/if}
</div>
