<script>
	import { z } from 'zod';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
	import { toISODate } from '$lib/utils/date.js';

	let { data, projectId, viewProject, toggleMenu = () => {} } = $props();
	let previewInput, fileInput;
	let isDragging = $state(false);
	let showPreviewImage = $state(true);
	let project = $state(null);

	onMount(() => {
		if (projectId) {
			project = data?.userProfile?.expand?.projects.find((project) => project.id === projectId);
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
			.string({ message: 'This filed is required' })
			.min(5, { message: 'Must be 5 or more characters long' }),
		link: z.string({ message: 'This filed is required' }).url({ message: 'Invalid url' }),
		description: z
			.string({ message: 'This filed is required' })
			.min(5, { message: 'Must be 5 or more characters long' })
	});

	const { form, reset } = createForm({
		initialValues: {
			title: null,
			link: null,
			description: null
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				values.image = fileInput?.files?.[0];
				const user_projects = await data.pb.collection('projects').create(values);
				const currentProjectIds = data?.userProfile?.expand?.projects || [];
				const updatedProjectIds = [
					...currentProjectIds.map((p) => (typeof p === 'string' ? p : p.id)),
					user_projects.id
				];
				await data.pb
					.collection('profiles')
					.update(data?.userProfile?.id, { projects: updatedProjectIds });
				reset();
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

	// const deleteRecord = async () => {
	// 	try {
	// 		const user_projects = data.pb.collection('projects').delete(userProjects?.id);
	// 		if (!user_projects) console.error('❌ Failed to delete record:');
	// 		await invalidate('projects');
	// 	} catch (err) {
	// 		console.dir(err, { depth: null });
	// 		console.error('❌ Failed to delete record:', err);
	// 	}
	// };

	// const editRecord = async () => {
	// 	editinguserProjectsImage = true;
	// 	setFields({
	// 		title: userProjects?.title,
	// 		description: userProjects?.description
	// 	});
	// 	await invalidate('user_projects');
	// };

	const deleteProject = async () => {
		try {
			await data.pb.collection('projects').delete(projectId);
			projectId = null;
			toggleMenu();
			await invalidate('user_profile');
		} catch (error) {
			console.dir(error?.message, { depth: null });
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
					class="pointer-events-auto w-screen max-w-md border-l border-gray-300"
				>
					<form
						class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						enctype="multipart/form-data"
						use:form
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-gray-900 px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">
										{viewProject ? 'View Your Project' : 'Create New Project'}
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											onclick={toggleMenu}
											class="relative cursor-pointer rounded-md bg-gray-900 text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
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
											<div class="relative h-40 sm:h-56">
												<img
													src={project?.project_image_url
														? project?.project_image_url
														: 'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'}
													alt=""
													class="absolute size-full object-cover"
												/>
											</div>
											<div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
												<div class="sm:flex-1">
													<div>
														<div class="flex items-center">
															<h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
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
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{project?.description || 'Description unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">Link</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{project?.link || 'Link unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
													Created on
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
													{toISODate(project?.created) || 'Date unavailable'}
												</dd>
											</div>
											<div>
												<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
													Last updated
												</dt>
												<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
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
												<label for="project_image" class="sr-only">User project_image</label>
												<input
													type="file"
													bind:this={fileInput}
													onchange={showLogoPreview}
													name="project_image"
													id="project_image"
													accept=".jpeg,.jpg,.png"
													class="sr-only"
													hidden
												/>
												<div class="items-center justify-between space-y-4">
													<div
														class="overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
													>
														<img
															src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
															bind:this={previewInput}
															loading="eager"
															alt="User project_image preview"
															class="pointer-events-none sr-only aspect-video object-cover"
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
															class="mx-auto size-12 text-gray-400/70"
															><path
																fill-rule="evenodd"
																d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
																clip-rule="evenodd"
															/></svg
														>
														<span class="mt-2 block text-sm font-semibold text-gray-400">
															Drag &amp; drop<br />
															<span class="text-xs font-medium text-gray-400">(Optional)</span>
														</span>
													</button>
												</div>
											</div>
											<div>
												<label for="title" class="block text-sm/6 font-medium text-gray-900"
													>Project name</label
												>
												<div class="mt-2">
													<input
														id="title"
														type="text"
														name="title"
														class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
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
												<label for="link" class="block text-sm/6 font-medium text-gray-900"
													>Project link</label
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
												<label for="description" class="block text-sm/6 font-medium text-gray-900"
													>Description</label
												>
												<div class="mt-2">
													<textarea
														rows="3"
														type="text"
														name="description"
														id="description"
														class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
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
								<button
									type="button"
									onclick={deleteProject}
									class="inline-flex cursor-pointer justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:hover:bg-red-400"
									>Delete</button
								>
							{/if}
							<div class="flex shrink-0 justify-end">
								<button
									type="button"
									onclick={toggleMenu}
									class="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
									>Cancel</button
								>
								{#if viewProject}
									<button
										type="button"
										class="ml-4 inline-flex cursor-pointer justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:hover:bg-violet-400"
										>Update</button
									>
								{:else}
									<button
										type="submit"
										class="ml-4 inline-flex cursor-pointer justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:hover:bg-violet-400"
										>Save</button
									>
								{/if}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
