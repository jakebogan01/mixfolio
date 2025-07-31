<script>
	import { z } from 'zod';
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/global/Button.svelte';

	let { data, clientId, viewClient, toggleMenu = () => {} } = $props();
	let previewInput = $state(null);
	let fileInput = $state(null);
	let isDragging = $state(false);
	let showPreviewImage = $state(true);
	let client = $state(null);
	let updatingClient = $state(false);
	let showDeleteModal = $state(false);

	onMount(() => {
		if (clientId) {
			client = data?.userProfile?.expand?.clients.find((client) => client?.id === clientId);
		}
	});

	const schema = z.object({
		client_image: z
			.instanceof(File)
			.optional()
			.refine((file) => !file || file.size < 52_428_800, {
				message: 'File cannot exceed 50 MB'
			})
			.refine((file) => !file || ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
				message: 'Only .jpeg, .jpg, or .png files are allowed'
			}),
		name: z
			.string({ message: 'This field is required' })
			.min(5, { message: 'Must be 5 or more characters long' })
			.max(255, { message: 'No more than 255 characters long' }),
		link: z.string({ message: 'This field is required' }).url({ message: 'Invalid url' })
	});

	const { form, reset, setFields } = createForm({
		initialValues: {
			name: null,
			link: null
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				if (updatingClient) {
					values.image = fileInput?.files?.[0];
					await data.pb.collection('clients').update(clientId, values);
				} else {
					values.image = fileInput?.files?.[0];
					values.profile_id = data?.userProfile?.id;
					const user_clients = await data.pb.collection('clients').create(values);
					const currentClientIds = data?.userProfile?.expand?.clients || [];
					const updatedClientIds = [
						...currentClientIds.map((p) => (typeof p === 'string' ? p : p.id)),
						user_clients.id
					];
					await data.pb
						.collection('profiles')
						.update(data?.userProfile?.id, { clients: updatedClientIds });
				}
				toggleMenu();
				reset();
				await invalidate('user_profile');
			} catch (error) {
				console.dir(error?.message, { depth: null });
			}
		}
	});

	const showLogoPreview = (event) => {
		const files = event.target.files || event.dataTransfer.files;
		if (files.length > 0) {
			previewInput.src = URL.createObjectURL(files[0]);
			showPreviewImage = false;
			isDragging = false;
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		isDragging = true;
	};

	const handleDragLeave = () => {
		isDragging = false;
	};

	const handleDrop = (event) => {
		event.preventDefault();
		showLogoPreview(event);
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			fileInput.files = files;
			showLogoPreview(event);
			isDragging = false;
		}
	};

	const deleteClient = async () => {
		try {
			await data.pb.collection('clients').delete(clientId);
			clientId = null;
			toggleMenu();
			showDeleteModal = false;
			await invalidate('user_profile');
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	};

	const handleClientUpdate = () => {
		viewClient = false;
		updatingClient = true;
		setFields({
			name: client?.name,
			link: client?.link
		});
	};
</script>

<div role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="relative z-50">
	<div class="fixed inset-0"></div>
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<div
					in:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					out:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					class="border-light-border pointer-events-auto w-screen max-w-md border-l"
				>
					<form
						class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						enctype="multipart/form-data"
						use:form
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">
										{viewClient ? 'View Client' : 'Create New Client'}
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											onclick={toggleMenu}
											class="bg-secondary-btn-bg relative cursor-pointer rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
										>
											<span class="absolute -inset-2.5"></span>
											<span class="sr-only">Close panel</span>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												data-slot="icon"
												aria-hidden="true"
												class="size-6"
											>
												<path
													d="M6 18 18 6M6 6l12 12"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							{#if viewClient}
								<div>
									<div class="pb-1 sm:pb-6">
										<div>
											<div
												class="h-60 bg-white bg-contain bg-center bg-no-repeat"
												style="background-image: url({client?.client_image_url})"
											></div>
											<div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
												<div class="sm:flex-1">
													<div>
														<div class="flex items-center">
															<h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
																{client?.name || 'Name unavailable'}
															</h3>
														</div>
														<p class="text-sm text-gray-500">
															{client?.email || 'Email unavailable'}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
										<dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
													Company
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{client?.company || 'Comapny unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">Title</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{client?.role || 'Role unavailable'}
												</dd>
											</div>
										</dl>
									</div>
								</div>
							{:else}
								<div class="flex flex-1 flex-col justify-between">
									<div class="divide-y divide-gray-200 px-4 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											<div>
												<label for="client_image" class="sr-only">User client_image</label>
												<input
													type="file"
													bind:this={fileInput}
													onchange={showLogoPreview}
													name="client_image"
													id="client_image"
													accept=".jpeg,.jpg,.png"
													class="sr-only"
													hidden
												/>
												<div class="items-center justify-between space-y-4">
													<div
														class="overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
													>
														<img
															src={updatingClient
																? client?.client_image_url
																: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
															bind:this={previewInput}
															loading="eager"
															alt="User client_image preview"
															class="pointer-events-none aspect-video ${client?.client_image_url
																? `object-contain object-center`
																: `object-cover object-top`}"
														/>
													</div>
													<button
														type="button"
														onclick={() => fileInput.click()}
														ondragenter={handleDragOver}
														ondragover={handleDragOver}
														ondragleave={handleDragLeave}
														ondrop={handleDrop}
														class="relative block min-h-41 w-full rounded-lg border-2 border-dashed p-8 text-center {isDragging
															? 'border-indigo-600 bg-indigo-100'
															: 'border-gray-400'}"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 24 24"
															fill="currentColor"
															class="text-light-text/70 mx-auto size-12"
															><path
																fill-rule="evenodd"
																d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
																clip-rule="evenodd"
															/></svg
														>
														<span class="text-light-text mt-2 block text-sm font-semibold">
															Drag &amp; drop<br />
															<span class="text-light-text text-xs font-medium">(Optional)</span>
														</span>
													</button>
												</div>
												<div
													id="client_image-validation"
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for="client_image"
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
											<div>
												<label for="name" class="block text-sm/6 font-medium text-gray-900"
													>Company Name</label
												>
												<div class="mt-2">
													<input
														id="name"
														type="text"
														name="name"
														class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
														aria-invalid="true"
														required
														minlength="5"
														maxlength="255"
														aria-label="Client name"
														aria-describedby="name-validation"
													/>
												</div>
												<div
													id="name-validation"
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for="name"
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
											<div>
												<label for="link" class="block text-sm/6 font-medium text-gray-900"
													>Company link</label
												>
												<div class="mt-2">
													<input
														id="link"
														type="url"
														name="link"
														pattern="https://.*"
														class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
														aria-invalid="true"
														required
														minlength="5"
														maxlength="255"
														aria-label="Clients link"
														aria-describedby="link-validation"
													/>
												</div>
												<div
													id="link-validation"
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for="link"
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
						<div class="flex px-4 py-4 {viewClient ? 'justify-between' : 'justify-end'}">
							{#if viewClient}
								<Button
									callBack={() => (showDeleteModal = true)}
									text="Delete"
									class="bg-red-500 sm:hover:bg-red-400"
								/>
							{/if}
							<div class="flex shrink-0 justify-end">
								<Button
									callBack={toggleMenu}
									text="Cancel"
									class="text-dark-text! border-light-border border bg-white"
								/>
								{#if viewClient}
									<Button
										callBack={handleClientUpdate}
										text="Update"
										class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover ml-4"
									/>
								{:else}
									<Button
										type="submit"
										text="Save"
										class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover ml-4"
									/>
								{/if}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showDeleteModal}
	<div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="relative z-100">
		<div
			transition:fade
			aria-hidden="true"
			class="fixed inset-0 bg-black/40 transition-opacity"
		></div>
		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					transition:scale
					class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
				>
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								data-slot="icon"
								aria-hidden="true"
								class="size-6 text-red-600"
							>
								<path
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 id="dialog-title" class="text-base font-semibold text-gray-900">Delete client</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									Are you sure you want to delete this client? This client will be permanently
									removed from our servers forever. This action cannot be undone.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<Button
							callBack={deleteClient}
							text="Delete"
							class="bg-red-500 sm:ml-3 sm:hover:hover:bg-red-400"
						/>
						<Button
							callBack={() => (showDeleteModal = false)}
							text="Cancel"
							class="text-dark-text! border-light-border border bg-white"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
