<script>
	import { z } from 'zod';
	import { fly } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';

	let { data, toggleMenu = () => {} } = $props();
	let previewInput = $state(null);
	let fileInput = $state(null);
	let isDragging = $state(false);
	let showPreviewImage = $state(true);

	const schema = z.object({
		avatar: z
			.instanceof(File)
			.optional()
			.refine((file) => !file || file.size < 52_428_800, {
				message: 'File cannot exceed 50 MB'
			})
			.refine((file) => !file || ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
				message: 'Only .jpeg, .jpg, or .png files are allowed'
			}),
		name: z
			.string({ message: 'This filed is required' })
			.min(5, { message: 'Must be 5 or more characters long' })
			.max(255, { message: 'No more than 255 characters long' }),
		phone: z.string({ message: 'This filed is required' }).min(7, 'Invalid phone number'),
		email: z
			.string({ message: 'This filed is required' })
			.email({ message: 'Please enter a valid email address' })
			.max(255, { message: 'No more than 255 characters long' }),
		role: z
			.string({ message: 'This filed is required' })
			.min(5, 'Must be 5 or more characters long'),
		address: z.string({ message: 'This filed is required' }),
		biography: z
			.string({ message: 'This filed is required' })
			.min(5, 'Must be 5 or more characters long')
			.max(500, { message: 'No more than 500 characters long' })
	});

	const { form } = createForm({
		initialValues: {
			name: data?.userProfile?.name || null,
			email: data?.userProfile?.email || null,
			phone: data?.userProfile?.phone || null,
			address: data?.userProfile?.address || null,
			role: data?.userProfile?.role || null,
			biography: data?.userProfile?.biography || null
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				values.avatar = fileInput?.files?.[0];
				await data.pb.collection('profiles').update(data?.userProfile?.id, values);
				toggleMenu();
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
										Update Your Profile
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
							<div class="flex flex-1 flex-col justify-between">
								<div class="divide-y divide-gray-200 px-4 sm:px-6">
									<div class="space-y-6 pt-6 pb-5">
										<div>
											<label for="avatar" class="sr-only">User avatar</label>
											<input
												type="file"
												bind:this={fileInput}
												onchange={showLogoPreview}
												name="avatar"
												id="avatar"
												accept=".jpeg,.jpg,.png"
												class="sr-only"
												hidden
											/>
											<div class="items-center justify-between space-y-4">
												<div
													class="overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
												>
													<img
														src={data?.userProfile?.avatar_url ||
															'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
														alt={data?.userProfile?.name || 'User avatar'}
														bind:this={previewInput}
														loading="eager"
														class="pointer-events-none aspect-[8/6] object-cover object-top"
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
										</div>
										<div>
											<label for="name" class="block text-sm/6 font-medium text-gray-900"
												>Your name</label
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
													aria-label="Your name"
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
											<label for="email" class="block text-sm/6 font-medium text-gray-900"
												>Your email</label
											>
											<div class="mt-2">
												<input
													id="email"
													type="email"
													name="email"
													class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
													aria-invalid="true"
													required
													minlength="5"
													maxlength="255"
													aria-label="Your email address"
													aria-describedby="email-validation"
												/>
											</div>
											<div
												id="email-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="email"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
										<div>
											<label for="phone" class="block text-sm/6 font-medium text-gray-900"
												>Your phone</label
											>
											<div class="mt-2">
												<input
													id="phone"
													type="text"
													name="phone"
													class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
													aria-invalid="true"
													required
													minlength="5"
													maxlength="255"
													aria-label="Your phone number"
													aria-describedby="phone-validation"
												/>
											</div>
											<div
												id="phone-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="phone"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
										<div>
											<label for="role" class="block text-sm/6 font-medium text-gray-900"
												>Your job role</label
											>
											<div class="mt-2">
												<input
													id="role"
													type="text"
													name="role"
													class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
													aria-invalid="true"
													required
													minlength="5"
													maxlength="255"
													aria-label="Your job role"
													aria-describedby="role-validation"
												/>
											</div>
											<div
												id="role-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="role"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
										<div>
											<label for="address" class="block text-sm/6 font-medium text-gray-900"
												>Your address</label
											>
											<div class="mt-2">
												<input
													id="address"
													type="text"
													name="address"
													class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
													aria-invalid="true"
													required
													minlength="5"
													maxlength="255"
													aria-label="Your address"
													aria-describedby="address-validation"
												/>
											</div>
											<div
												id="address-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="address"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
										<div>
											<label for="biography" class="block text-sm/6 font-medium text-gray-900"
												>About me</label
											>
											<div class="mt-2">
												<textarea
													rows="3"
													type="text"
													name="biography"
													id="biography"
													class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
													aria-invalid="true"
													required
													minlength="5"
													maxlength="500"
													aria-label="About you"
													aria-describedby="biography-validation"
												></textarea>
											</div>
											<div
												id="biography-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="biography"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-end px-4 py-4">
							<div class="flex shrink-0 justify-end">
								<button
									type="button"
									onclick={toggleMenu}
									class="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
									>Cancel</button
								>
								<button
									type="submit"
									class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover ml-4 inline-flex cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>Save</button
								>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
