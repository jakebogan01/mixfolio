<script>
	import { z } from 'zod';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
	import { toISODate } from '$lib/utils/date.js';
	import Button from '$lib/components/global/Button.svelte';

	let { data, projectId, viewProject, toggleMenu = () => {} } = $props();
	let fileInput = $state(null);
	let project = $state(null);
	let updatingProject = $state(false);
	let showDeleteModal = $state(false);
	let buttonDisabled = $state(false);

	onMount(() => {
		if (projectId) {
			project = data?.userProfile?.expand?.projects.find((project) => project?.id === projectId);
		}
	});

	const schema = z.object({
		project_image: z
			.instanceof(File)
			.optional()
			.refine((file) => !file || file.size < 52_428_800, {
				message: 'File cannot exceed 50 MB'
			})
			.refine((file) => !file || ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
				message: 'Only .jpeg, .jpg, or .png files are allowed'
			}),
		title: z
			.string({ message: 'This field is required' })
			.min(5, { message: 'Must be 5 or more characters long' }),
		link: z.string({ message: 'This field is required' }).url({ message: 'Invalid url' }),
		description: z
			.string({ message: 'This field is required' })
			.min(5, { message: 'Must be 5 or more characters long' })
	});

	const { form, reset, setFields } = createForm({
		initialValues: {
			title: null,
			link: null,
			description: null
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				buttonDisabled = true;
				if (updatingProject) {
					if (showImageCropper.objectUrl) values.image = showImageCropper.objectUrl;
					await data.pb.collection('projects').update(projectId, values);
				} else {
					if (showImageCropper.objectUrl) values.image = showImageCropper.objectUrl;
					values.profile_id = data?.userProfile?.id;
					const user_projects = await data.pb.collection('projects').create(values);
					const currentProjectIds = data?.userProfile?.expand?.projects || [];
					const updatedProjectIds = [
						...currentProjectIds.map((p) => (typeof p === 'string' ? p : p.id)),
						user_projects.id
					];
					await data.pb
						.collection('profiles')
						.update(data?.userProfile?.id, { projects: updatedProjectIds });
				}
				toggleMenu();
				reset();
				showImageCropper.objectUrl = null;
				showImageCropper.resultEl = null;
				await invalidate('user_profile');
			} catch (error) {
				console.dir(error?.message, { depth: null });
			}
		}
	});

	const deleteProject = async () => {
		try {
			await data.pb.collection('projects').delete(projectId);
			projectId = null;
			toggleMenu();
			showDeleteModal = false;
			await invalidate('user_profile');
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	};

	const handleProjectUpdate = () => {
		viewProject = false;
		updatingProject = true;
		setFields({
			title: project?.title,
			link: project?.link,
			description: project?.description
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
										{viewProject ? 'View Your Project' : 'Create New Project'}
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
							{#if viewProject}
								<div>
									<div class="pb-1 sm:pb-6">
										<div>
											<div
												class="h-60 bg-white bg-contain bg-center bg-no-repeat dark:bg-transparent"
												style="background-image: url({project?.project_image_url})"
											></div>
											<div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
												<div class="sm:flex-1">
													<div>
														<div class="flex items-center">
															<h3
																class="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white"
															>
																{project?.title || 'Title unavailable'}
															</h3>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
										<dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">Bio</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-white">
													{project?.description || 'Description unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">Link</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-white">
													{project?.link || 'Link unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
													Created on
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-white">
													{toISODate(project?.created) || 'Date unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
													Last updated
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-white">
													{toISODate(project?.updated) || 'Date unavailable'}
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
												<div class="flex items-center gap-x-8">
													<img
														bind:this={showImageCropper.resultEl}
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt="Cropped result"
														class="size-24 flex-none rounded-lg bg-gray-800 object-cover"
													/>
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
												<label
													for="title"
													class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
													>Project name</label
												>
												<div class="mt-2">
													<input
														id="title"
														type="text"
														name="title"
														class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
														aria-invalid="true"
														required
														minlength="5"
														maxlength="255"
														aria-label="Project title"
														aria-describedby="title-validation"
													/>
												</div>
												<div
													id="title-validation"
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for="title"
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
											<div>
												<label
													for="link"
													class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
													>Project link</label
												>
												<div class="mt-2">
													<input
														id="link"
														type="url"
														name="link"
														pattern="https://.*"
														class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
														aria-invalid="true"
														required
														minlength="5"
														maxlength="255"
														aria-label="Project link"
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
											<div>
												<label
													for="description"
													class="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
													>Description</label
												>
												<div class="mt-2">
													<textarea
														rows="3"
														type="text"
														name="description"
														id="description"
														class="dark:bg-primary-theme-dark dark:outline-light-border-theme-dark col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:text-white"
														aria-invalid="true"
														required
														minlength="5"
														maxlength="255"
														aria-label="Project description"
														aria-describedby="description-validation"
													></textarea>
												</div>
												<div
													id="description-validation"
													class="mt-1 text-sm text-red-500"
													data-felte-reporter-dom-for="description"
													aria-live="polite"
													data-felte-reporter-dom-single-message
												></div>
											</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
						<div class="flex px-4 py-4 {viewProject ? 'justify-between' : 'justify-end'}">
							{#if viewProject}
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
									class="text-dark-text-theme-light! bg-white"
								/>
								{#if viewProject}
									<Button
										callBack={handleProjectUpdate}
										text="Update"
										class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-4"
									/>
								{:else}
									<Button
										disabled={buttonDisabled}
										type="submit"
										class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark ml-4 h-9 w-[4.5625rem]"
									>
										{#if buttonDisabled}
											<span class="loader"></span>
										{:else}
											Save
										{/if}
									</Button>
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
								Delete project
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500 dark:text-gray-400">
									Are you sure you want to delete this project? This project will be permanently
									removed from our servers forever. This action cannot be undone.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<Button
							callBack={deleteProject}
							text="Delete"
							class="bg-red-500 sm:ml-3 sm:hover:hover:bg-red-400"
						/>
						<Button
							callBack={() => (showDeleteModal = false)}
							text="Cancel"
							class="text-dark-text-theme-light! bg-white"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
