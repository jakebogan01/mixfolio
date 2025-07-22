<script>
	import 'tippy.js/dist/tippy.css';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporter from '@felte/reporter-tippy';
	import { invalidate } from '$app/navigation';

	let { data } = $props();
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
		extend: [
			validator({ schema }),
			reporter({
				level: 'error',
				tippyProps: {
					allowHTML: false
				}
			})
		],
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

<div class="mx-auto max-w-7xl px-6">
	<form onsubmit={(event) => event.preventDefault()} enctype="multipart/form-data" use:form>
		<h2 class="mb-2 text-2xl font-bold">Projects</h2>
		<div class="space-y-6">
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
				<div class="flex items-center justify-between">
					<img
						src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
						bind:this={previewInput}
						loading="eager"
						alt="User project_image preview"
						width="245"
						height="164"
						class="mr-2 h-41 rounded-lg object-cover"
					/>
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
				<label for="title" class="sr-only">Project title</label>
				<input type="text" name="title" id="title" placeholder="Title" class="w-full rounded-md" />
			</div>
			<div>
				<label for="description" class="sr-only">Project description</label>
				<input
					type="text"
					name="description"
					id="description"
					placeholder="Description"
					class="w-full rounded-md"
				/>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="cursor-pointer rounded-md border border-gray-900 px-2 py-1"
					>Submit</button
				>
			</div>
		</div>
	</form>
</div>
