<script>
	import 'tippy.js/dist/tippy.css';
	import Nav from '$lib/components/Nav.svelte';
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
	let userProfile = $derived(data?.record || {});

	$inspect(data.slug.slug);

	const schema = z.object({
		avatar: z
			.instanceof(File, { message: 'Please upload a file' })
			.refine((f) => f.size < 52_428_800, 'File cannot exceed 50 MB')
			.refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
				message: 'Only .jpeg, .jpg, or .png files are allowed'
			})
			.optional(),
		name: z.string().min(1, 'The name field cannot be empty').trim(),
		phone: z.string().min(1, 'The phone field cannot be empty').trim(),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		role: z.string().min(1, 'The role field cannot be empty').trim(),
		address: z.string().min(1, 'The address field cannot be empty').trim(),
		slug: z.string().min(1, 'The url field cannot be empty').trim(),
		bio: z.string().min(1, 'The bio field cannot be empty').trim()
	});

	const { form, errors, reset, setFields, resetField } = createForm({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			address: '',
			slug: '',
			bio: '',
			role: ''
		},
		extend: [validator({ schema }), reporter()],
		onSubmit: async (values) => {
			try {
				if (!userProfile?.id) {
					values.user_id = data.pb.authStore.record.id;
					const user_profile = await data.pb.collection('user_profile').create(values);
					if (!user_profile) console.error('❌ Failed to create record:');
				} else {
					const record = data.pb.collection('user_profile').update(userProfile?.id, values);
					console.log('Values have been updated.');
				}
				reset();
				await invalidate('user_profile');
			} catch (err) {
				console.dir(err, { depth: null });
				console.error('❌ Failed to create record:', err);
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
			const user_profile = data.pb.collection('user_profile').delete(userProfile?.id);
			if (!user_profile) console.error('❌ Failed to delete record:');
			await invalidate('user_profile');
		} catch (err) {
			console.dir(err, { depth: null });
			console.error('❌ Failed to delete record:', err);
		}
	};

	const dataReset = {
		name: 'Change',
		phone: 'Change',
		email: 'email@gmail.com',
		address: 'Change',
		slug: 'Change',
		bio: 'Change',
		role: 'Change'
	};

	const editRecord = async () => {
		setFields({
			name: userProfile?.name,
			email: userProfile?.email,
			phone: userProfile?.phone,
			address: userProfile?.address,
			slug: userProfile?.slug,
			bio: userProfile?.bio,
			role: userProfile?.role
		});
		editingUserProfileImage = true;
		await invalidate('user_profile');
	};
</script>

<Nav slug={data.slug.slug} />

<div class="mx-auto max-w-7xl px-6">
	{#if Object.keys(userProfile).length !== 0}
		<div class="mb-10">
			<h2 class="text-2xl font-bold">Your Profile</h2>
			<div class="flow-root">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table class="min-w-full divide-y divide-gray-300">
							<colgroup>
								<col class="w-full sm:w-1/12" />
								<col class="lg:w-1/12" />
								<col class="lg:w-1/12" />
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
										>Avatar</th
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
									<th
										scope="col"
										class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
										>URL</th
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
								<tr>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.id}</td
									>
									<td class="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
										<div class="flex items-center">
											<div class="size-11 shrink-0">
												<img
													class="size-11 rounded-full object-cover"
													src={userProfile?.avatar_url
														? userProfile?.avatar_url
														: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
													alt="User avatar"
												/>
											</div>
										</div>
									</td>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.name}</td
									>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.email}</td
									>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.phone}</td
									>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.role}</td
									>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>{userProfile?.address}</td
									>
									<td
										class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0"
										>mixfolio.com/{userProfile?.slug}</td
									>
									<td
										class="w-40 max-w-xs truncate px-3 py-4 text-sm whitespace-nowrap text-gray-500"
										>{userProfile?.bio}</td
									>
									<td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500"
										>{userProfile?.created}</td
									>
									<td
										class="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
									>
										<button
											onclick={() => {
												editRecord();
											}}
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
											onclick={() => {
												deleteRecord();
											}}
											type="submit"
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
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	{/if}

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
							? userProfile?.avatar_url
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
			<!--{#if form?.requestFormData?.errors}-->
			<!--	<div>-->
			<!--		{#each Object.values(form?.requestFormData?.errors).flat() as item, i (i)}-->
			<!--			<p class="text-red-500">{item}</p>-->
			<!--		{/each}-->
			<!--	</div>-->
			<!--{/if}-->
		</div>
	</form>
</div>
