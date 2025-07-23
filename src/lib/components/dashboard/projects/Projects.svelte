<script>
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { invalidate } from '$app/navigation';

	let { data, toggleMenu = () => {} } = $props();
	let previewInput, fileInput;
	let isDragging = $state(false);
	let showPreviewImage = $state(true);

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
		title: z.string().min(1, 'The project title field cannot be empty').trim(),
		description: z.string().min(1, 'The description field cannot be empty').trim()
	});

	const { form, reset } = createForm({
		initialValues: {
			title: null,
			description: null
		},
		extend: [validator({ schema })],
		onSubmit: async (values) => {
			try {
				values.image = fileInput?.files?.[0];
				const user_projects = await data.pb.collection('projects').create(values);
				if (!user_projects) console.log('❌ Failed to create record');
				const currentProjectIds = data?.userProfile?.expand?.projects || [];
				const updatedProjectIds = [
					...currentProjectIds.map((p) => (typeof p === 'string' ? p : p.id)),
					user_projects.id
				];
				const user_profile_update = await data.pb
					.collection('profiles')
					.update(data?.userProfile?.id, { projects: updatedProjectIds });
				if (!user_profile_update) console.error('❌ Failed to create record');
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
</script>

<div role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="relative z-50">
	<div class="fixed inset-0 bg-black/40"></div>
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<div class="pointer-events-auto w-screen max-w-md">
					<form
						onsubmit={(event) => event.preventDefault()}
						class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						enctype="multipart/form-data"
						use:form
					>
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-gray-900 px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">
										Create New Project
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
														class="pointer-events-none aspect-video object-cover"
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
													class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
												/>
											</div>
										</div>
										<div>
											<label
												for="project-description"
												class="block text-sm/6 font-medium text-gray-900">Description</label
											>
											<div class="mt-2">
												<textarea
													rows="3"
													type="text"
													name="description"
													id="description"
													class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
												></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex shrink-0 justify-end px-4 py-4">
							<button
								type="button"
								onclick={toggleMenu}
								class="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
								>Cancel</button
							>
							<button
								type="submit"
								class="ml-4 inline-flex cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>Save</button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
