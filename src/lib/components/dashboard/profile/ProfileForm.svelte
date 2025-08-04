<script>
	import { z } from 'zod';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { fly, fade, scale } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/global/Button.svelte';

	let { data, toggleMenu = () => {} } = $props();
	let showDeleteImage = $state(false);
	let buttonDisabled = $state(false);
	let resumeBtn;

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
		resume: z
			.instanceof(File)
			.optional()
			.refine((file) => !file || file.size < 102_400, {
				message: 'File cannot exceed 100 KB'
			})
			.refine((file) => !file || file.type === 'application/pdf', {
				message: 'Only .pdf files are allowed'
			}),
		name: z
			.string()
			.min(5, { message: 'Must be 5 or more characters long' })
			.max(255, { message: 'No more than 255 characters long' })
			.optional()
			.nullable(),
		phone: z
			.string()
			.min(7, 'Invalid phone number')
			.max(15, { message: 'No more than 15 characters long' })
			.optional()
			.nullable(),
		email: z
			.string()
			.email({ message: 'Please enter a valid email address' })
			.max(255, { message: 'No more than 255 characters long' })
			.optional()
			.nullable(),
		role: z.string().min(5, 'Must be 5 or more characters long').optional().nullable(),
		address: z.string().optional().nullable(),
		biography: z
			.string()
			.min(5, 'Must be 5 or more characters long')
			.max(500, { message: 'No more than 500 characters long' })
			.optional()
			.nullable()
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
				buttonDisabled = true;
				const hasAnyData = Object.values(values).some(
					(value) => value !== null && value !== undefined
				);
				if (!hasAnyData) {
					buttonDisabled = false;
					return;
				}
				if (showImageCropper.objectUrl) values.avatar = showImageCropper.objectUrl;
				await data.pb.collection('profiles').update(data?.userProfile?.id, values);
				toggleMenu();
				showImageCropper.objectUrl = null;
				showImageCropper.resultEl = null;
				await invalidate('user_profile');
			} catch (error) {
				console.dir(error?.message, { depth: null });
			}
		}
	});

	const deleteImage = async () => {
		try {
			await data.pb.collection('profiles').update(data?.userProfile?.id, {
				avatar: null
			});

			toggleMenu();
			showDeleteImage = false;
			await invalidate('profiles');
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	};

	let resumeName = $state('');
	const handleResume = () => {
		if (resumeBtn?.files[0]) resumeName = resumeBtn?.files[0]?.name;
	};

	const formatPhoneNumber = (value) => {
		if (!value) return value;
		const phoneNumber = value.replace(/\D/g, '');
		const phoneNumberLength = phoneNumber.length;
		if (phoneNumberLength < 4) return phoneNumber;
		if (phoneNumberLength < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
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
					class="border-light-border-theme-light dark:border-light-border-theme-dark pointer-events-auto w-screen max-w-md border-l"
				>
					<form
						class="dark:divide-light-border-theme-dark dark:bg-primary-theme-dark flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						enctype="multipart/form-data"
						use:form
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary px-4 py-6 sm:px-6 dark:bg-gray-950">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">
										Update Your Profile
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											onclick={toggleMenu}
											class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark relative cursor-pointer rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
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
											<div class="flex items-center gap-x-8">
												<button
													onclick={() => {
														if (data?.userProfile?.avatar_url) showDeleteImage = true;
													}}
													type="button"
													class="group relative cursor-pointer overflow-hidden rounded-lg"
												>
													<span
														class="absolute inset-0 flex items-center justify-center group-hover:bg-black/70"
													>
														<span class="text-white opacity-0 group-hover:opacity-100">Delete</span>
													</span>
													<img
														bind:this={showImageCropper.resultEl}
														src={data?.userProfile?.avatar_url ||
															'https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png'}
														alt="Cropped result"
														class="size-24 flex-none rounded-lg bg-gray-800 object-cover"
													/>
												</button>
												<div>
													<Button
														callBack={() => (showImageCropper.status = true)}
														text="Change avatar"
														class="bg-primary-btn-bg-theme-light sm:hover:bg-primary-btn-hover-theme-light"
													/>
													<p class="mt-2 text-xs/5 text-gray-400">JPG, JPEG or PNG. 50MB max.</p>
												</div>
											</div>
										</div>
										<div>
											<label for="name" class="sr-only">Your resume</label>
											<div class="mt-2 flex items-center space-x-4">
												<input
													bind:this={resumeBtn}
													onchange={handleResume}
													id="resume"
													type="file"
													name="resume"
													class="sr-only"
													aria-invalid="true"
													aria-label="Your resume"
													aria-describedby="resume-validation"
													accept=".pdf"
													hidden
												/>
												<Button
													callBack={() => resumeBtn.click()}
													text="Upload Resume"
													class="bg-secondary-btn-bg-theme-light hover:bg-secondary-btn-hover-theme-light dark:bg-secondary-btn-bg-theme-dark sm:dark:hover:bg-secondary-btn-hover-theme-dark min-w-33"
												/>
												<p
													class="block truncate leading-normal font-normal dark:text-white {resumeName?.length
														? 'text-sm dark:text-white'
														: 'text-xs/5 text-gray-400'}"
												>
													{resumeName?.length ? resumeName : 'PDF. 100KB max.'}
												</p>
											</div>
											<div
												id="resume-validation"
												class="mt-1 text-sm text-red-500"
												data-felte-reporter-dom-for="resume"
												aria-live="polite"
												data-felte-reporter-dom-single-message
											></div>
										</div>
										<div>
											<label
												for="name"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>Your name</label
											>
											<div class="mt-2">
												<input
													id="name"
													type="text"
													name="name"
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
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
											<label
												for="email"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>Your email</label
											>
											<div class="mt-2">
												<input
													id="email"
													type="email"
													name="email"
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
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
											<label
												for="phone"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>Your phone</label
											>
											<div class="mt-2">
												<input
													id="phone"
													type="text"
													name="phone"
													oninput={(e) => (e.target.value = formatPhoneNumber(e.target.value))}
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
													minlength="5"
													maxlength="15"
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
											<label
												for="role"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>Your job role</label
											>
											<div class="mt-2">
												<input
													id="role"
													type="text"
													name="role"
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
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
											<label
												for="address"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>Your address</label
											>
											<div class="mt-2">
												<input
													id="address"
													type="text"
													name="address"
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
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
											<label
												for="biography"
												class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
												>About me</label
											>
											<div class="mt-2">
												<textarea
													rows="3"
													type="text"
													name="biography"
													id="biography"
													class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
													aria-invalid="true"
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
								<Button
									callBack={toggleMenu}
									text="Cancel"
									class="text-dark-text-theme-light! bg-white"
								/>
								<Button
									disabled={buttonDisabled}
									type="submit"
									class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-4 flex h-9 w-[4.5625rem] items-center justify-center"
								>
									{#if buttonDisabled}
										<span class="loader"></span>
									{:else}
										Update
									{/if}
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showDeleteImage}
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
					class="dark:bg-primary-theme-dark relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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
							<h3 id="dialog-title" class="text-base font-semibold text-gray-900 dark:text-white">
								Delete profile photo
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500 dark:text-gray-400">
									Are you sure you want to delete your photo? This photo will be permanently removed
									from our servers forever. This action cannot be undone.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<Button
							callBack={deleteImage}
							text="Delete"
							class="bg-red-600 sm:ml-3 sm:hover:hover:bg-red-500"
						/>
						<Button
							callBack={() => (showDeleteImage = false)}
							text="Cancel"
							class="text-dark-text-theme-light! bg-white"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
