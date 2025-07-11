<script>
	import { enhance } from '$app/forms';
	import Nav from '$lib/components/Nav.svelte';
	import { toISODate } from '$lib/utils/date.js';
	import toast, { Toaster } from 'svelte-5-french-toast';

	let { data, form } = $props();
	let { user_profile } = $derived(data);

	$effect(() => {
		if (form?.success) {
			toast.success(form?.success, {
				position: 'bottom-right'
			});
		} else if (form?.error) {
			toast.error(form?.error, {
				position: 'bottom-right'
			});
		}
	});
</script>

<Toaster />

<Nav />

<div class="mx-auto max-w-7xl px-6">
	{#if user_profile.length > 0}
		<div class="mb-10">
			<h2 class="text-2xl font-bold">User Profile</h2>
			<div class="flow-root">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table class="min-w-full divide-y divide-gray-300">
							<colgroup>
								<col class="w-full sm:w-2/12" />
								<col class="lg:w-2/12" />
								<col class="lg:w-2/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
							</colgroup>
							<thead>
								<tr>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Id</th
									>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Name</th
									>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Email</th
									>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Phone</th
									>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Role</th
									>
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>Address</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Bio</th
									>
									<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
										>Created</th
									>
									<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
										<span class="sr-only">Edit</span>
									</th>
									<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
										<span class="sr-only">Delete</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each user_profile as item (item?.id)}
									<tr>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.id}</td
										>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.name}</td
										>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.email}</td
										>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.phone}</td
										>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.role}</td
										>
										<td
											class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
											>{item?.address}</td
										>
										<td
											class="w-40 max-w-xs truncate px-3 py-4 text-sm whitespace-nowrap text-gray-500"
											>{item?.bio}</td
										>
										<td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500"
											>{toISODate(item?.created_at)}</td
										>
										<td
											class="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
										>
											<button
												type="button"
												aria-label="Edit record"
												class="cursor-pointer text-indigo-600 hover:text-indigo-900"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-5"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
													/></svg
												>
											</button>
										</td>
										<td
											class="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
										>
											<button
												type="button"
												aria-label="Delete record"
												class="cursor-pointer text-red-600 hover:text-red-400"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-5"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
													/></svg
												>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<form method="POST" use:enhance>
		<h2 class="mb-2 text-2xl font-bold">User Bio</h2>
		<div class="space-y-6">
			<div>
				<label for="name" class="sr-only">Name</label>
				<input type="text" name="name" id="name" placeholder="Name" class="w-full rounded-md" />
			</div>
			<div>
				<label for="email" class="sr-only">Email</label>
				<input type="email" name="email" id="email" placeholder="Email" class="w-full rounded-md" />
			</div>
			<div>
				<label for="phone" class="sr-only">Phone</label>
				<input type="text" name="phone" id="phone" placeholder="Phone" class="w-full rounded-md" />
			</div>
			<div>
				<label for="role" class="sr-only">Job Role</label>
				<input type="text" name="role" id="role" placeholder="role" class="w-full rounded-md" />
			</div>
			<div>
				<label for="address" class="sr-only">Address</label>
				<input
					type="text"
					name="address"
					id="address"
					placeholder="address"
					class="w-full rounded-md"
				/>
			</div>
			<div>
				<label for="bio" class="sr-only">Bio</label>
				<textarea name="bio" id="bio" rows="3" placeholder="About me..." class="w-full rounded-md"
				></textarea>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="rounded-md border border-gray-900 px-2 py-1">Submit</button>
			</div>
			{#if form?.requestFormData?.errors}
				<div>
					{#each Object.values(form?.requestFormData?.errors).flat() as item, i (i)}
						<p class="text-red-500">{item}</p>
					{/each}
				</div>
			{/if}
		</div>
	</form>
</div>
