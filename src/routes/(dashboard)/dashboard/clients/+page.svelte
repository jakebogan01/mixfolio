<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ClientForm from '$lib/components/dashboard/clients/ClientForm.svelte';

	let { data } = $props();
	let menuOpen = $state(false);
	let viewClient = $state(false);
	let clientId = $state(null);

	onMount(() => {
		if (page?.state?.create) {
			menuOpen = true;
			viewClient = false;
		} else if (page?.state?.view) {
			menuOpen = true;
			viewClient = true;
			clientId = page?.state?.clientId;
		}
	});

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="space-y-12">
	<div
		class="relative mt-6 flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
	>
		<div
			class="relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20"
		>
			<h6 class="block text-base leading-relaxed font-semibold tracking-normal text-white">
				Clients
			</h6>
		</div>
		{#if data?.userProfile?.expand?.clients?.length}
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="sm:flex sm:items-center sm:justify-end">
					<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							type="button"
							onclick={() => {
								toggleMenu();
								viewClient = false;
							}}
							class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
							>Add client</button
						>
					</div>
				</div>
				<div class="mt-8 flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
											>Logo</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Link</th
										>
										<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
											<span class="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white">
									{#each data?.userProfile?.expand?.clients as client (client?.id)}
										<tr>
											<td class="size-11 shrink-0 py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
												<div class="size-11 shrink-0">
													<img
														src={client?.client_image_url
															? client?.client_image_url
															: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'}
														alt=""
														class="pointer-events-none aspect-10/7 object-cover"
													/>
												</div>
											</td>
											<td class="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
												<div class="mt-1 text-gray-500">
													{client?.name || 'Name unavailable'}
												</div>
											</td>
											<td class="px-3 py-5 text-sm whitespace-nowrap text-gray-500"
												>{client?.link || 'Link unavailable'}</td
											>
											<td
												class="relative py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
											>
												<button
													type="button"
													onclick={() => {
														toggleMenu();
														viewClient = true;
														clientId = client?.id;
													}}
													class="cursor-pointer text-gray-900 hover:text-violet-400"
												>
													View
													<span class="sr-only">, {client?.name || 'Name unavailable'}</span
													></button
												>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex h-full items-center justify-center pt-6 pb-16">
				<div class="flex flex-col items-center space-y-2">
					<p class="mt-2 text-sm text-gray-700">You do not have any clients.</p>
					<button
						type="button"
						onclick={() => {
							toggleMenu();
							viewClient = false;
						}}
						class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Add a client</button
					>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if menuOpen}
	<ClientForm {data} {clientId} {viewClient} {toggleMenu} />
{/if}
