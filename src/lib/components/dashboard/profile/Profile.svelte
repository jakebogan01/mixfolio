<script>
	import 'tippy.js/dist/tippy.css';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporter from '@felte/reporter-tippy';
	import { invalidate } from '$app/navigation';

	let { data } = $props();
	let editingUserProfileImage = $state(false);
	let previewInput, fileInput;
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
		name: z.string().min(1, 'The name field cannot be empty').trim(),
		phone: z.string().min(1, 'The phone field cannot be empty').trim(),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		role: z.string().min(1, 'The role field cannot be empty').trim(),
		address: z.string().min(1, 'The address field cannot be empty').trim(),
		slug: z.string().min(1, 'The url field cannot be empty').trim(),
		bio: z.string().min(1, 'The bio field cannot be empty').trim()
	});

	const { form, reset, setFields } = createForm({
		initialValues: {
			name: null,
			email: null,
			phone: null,
			address: null,
			slug: null,
			bio: null,
			role: null
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
				if (!data?.userProfile?.id) {
					values.user_id = data.pb.authStore.record.id;
					values.avatar = fileInput?.files?.[0];
					const newUserProfile = await data.pb.collection('profiles').create(values);
					if (!newUserProfile) console.error('❌ Failed to create record:');
				} else {
					values.avatar = fileInput?.files?.[0];
					const record = data.pb.collection('profiles').update(data?.userProfile?.id, values);
					if (!record) console.log('❌ No record found.');
				}
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

	const deleteRecord = async () => {
		try {
			const user_profile = data.pb.collection('user_profile').delete(data?.userProfile?.id);
			if (!user_profile) console.error('❌ Failed to delete record:');
			await invalidate('user_profile');
		} catch (err) {
			console.dir(err, { depth: null });
			console.error('❌ Failed to delete record:', err);
		}
	};

	const editRecord = async () => {
		editingUserProfileImage = true;
		setFields({
			name: data?.userProfile?.name,
			email: data?.userProfile?.email,
			phone: data?.userProfile?.phone,
			address: data?.userProfile?.address,
			slug: data?.userProfile?.slug,
			bio: data?.userProfile?.bio,
			role: data?.userProfile?.role
		});
		await invalidate('user_profile');
	};
</script>

<div class="mx-auto max-w-7xl px-6">
	<form onsubmit={(event) => event.preventDefault()} enctype="multipart/form-data" use:form>
		<h2 class="mb-2 text-2xl font-bold">User Bio</h2>
		<div class="space-y-6">
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
				<div class="flex items-center justify-between">
					<img
						src={editingUserProfileImage
							? data?.userProfile?.avatar_url ||
								'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
							: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
						bind:this={previewInput}
						loading="eager"
						alt="User avatar preview"
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
				<label for="name" class="sr-only">Name</label>
				<input type="text" name="name" id="name" placeholder="Name" class="w-full rounded-md" />
			</div>
			<div>
				<label for="email" class="sr-only">Email</label>
				<input type="email" name="email" id="email" placeholder="Email" class="w-full rounded-md" />
			</div>
			<div>
				<label for="phone" class="sr-only">Phone</label>
				<input
					type="text"
					name="phone"
					id="phone"
					placeholder="Phone"
					maxlength="12"
					class="w-full rounded-md"
				/>
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
				<label for="slug" class="sr-only">URL</label>
				<div>
					<div
						class="flex items-center overflow-hidden rounded-md pl-3 outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
					>
						<div class="shrink-0 text-gray-500 select-none">mixfolio.com/</div>
						<input
							type="text"
							name="slug"
							id="slug"
							class="focus:border-l-none block min-w-0 grow rounded-tr-md rounded-br-md border-l-0 pl-0 placeholder:!text-gray-400 focus:ring-0"
							placeholder="erin-martin"
						/>
					</div>
				</div>
			</div>

			<div>
				<label for="bio" class="sr-only">Bio</label>
				<textarea name="bio" id="bio" rows="3" placeholder="About me..." class="w-full rounded-md"
				></textarea>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="cursor-pointer rounded-md border border-gray-900 px-2 py-1"
					>Submit</button
				>
			</div>
		</div>
	</form>
</div>
