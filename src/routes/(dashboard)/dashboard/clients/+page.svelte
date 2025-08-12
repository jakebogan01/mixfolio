<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ClientForm from '$lib/components/dashboard/clients/ClientForm.svelte';
	import Button from '$lib/components/global/Button.svelte';

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
		class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative mt-6 flex flex-col rounded-xl border bg-white bg-clip-border"
	>
		<div
			class="from-primary-from-theme-light to-secondary-to-theme-light relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20 dark:from-gray-950 dark:to-gray-950"
		>
			<h6 class="block text-base leading-relaxed font-semibold tracking-normal text-white">
				Clients
			</h6>
		</div>
		{#if data?.userProfile?.expand?.clients?.length}
			<div class="px-4 sm:px-6 lg:px-8">
				{#if data?.userProfile?.expand?.clients?.length < 6}
					<div class="sm:flex sm:items-center sm:justify-end">
						<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<Button
								callBack={() => {
									toggleMenu();
									viewClient = false;
								}}
								text="Add client"
								class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
							/>
						</div>
					</div>
				{/if}
				<div class="mt-8 flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table
								class="dark:divide-light-border-theme-dark min-w-full divide-y divide-gray-300"
							>
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-gray-400"
											>Logo</th
										>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-400"
											>Name</th
										>
										<th
											scope="col"
											class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell dark:text-gray-400"
											>Link</th
										>
										<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
											<span class="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody
									class="dark:divide-light-border-theme-dark dark:bg-primary-theme-dark divide-y divide-gray-200 bg-white"
								>
									{#each data?.userProfile?.expand?.clients as client (client?.id)}
										<tr>
											<td class="size-12 shrink-0 py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
												<div class="w-12 shrink-0 bg-gray-100 rounded-lg">
													<img
														src={client?.client_image_url ||
															'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
														alt={client?.name || 'Name unavailable'}
														class="pointer-events-none w-full rounded-lg object-cover"
													/>
												</div>
											</td>
											<td class="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
												<div class="mt-1 text-gray-500 dark:text-white">
													{client?.name || 'Name unavailable'}
												</div>
											</td>
											<td
												class="hidden px-3 py-5 text-sm whitespace-nowrap text-gray-500 sm:table-cell dark:text-white"
												>{client?.link || 'Link unavailable'}</td
											>
											<td
												class="relative py-5 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-0"
											>
												<Button
													callBack={() => {
														toggleMenu();
														viewClient = true;
														clientId = client?.id;
													}}
													text="View"
													class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark sm:hover:bg-secondary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-auto rounded-full! px-2.5! py-1! text-xs! font-normal!"
												>
													<span class="sr-only">, {client?.name || 'Name unavailable'}</span>
												</Button>
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
					<p class="text-dark-text-theme-light dark:text-dark-text-theme-dark mt-2 text-sm">
						You do not have any clients.
					</p>
					<Button
						callBack={() => {
							toggleMenu();
							viewClient = false;
						}}
						text="Add client"
						class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
					/>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if menuOpen}
	<ClientForm {data} {clientId} {viewClient} {toggleMenu} />
{/if}
