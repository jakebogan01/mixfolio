<script>
	import { fade, scale } from 'svelte/transition';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { z } from 'zod';
	import { goto, invalidateAll } from '$app/navigation';
	import { user } from '$lib/stores/user.svelte.js';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let showDeleteModal = $state(false);

	const emailSchema = z.object({
		email: z
			.string({ message: 'Please enter a valid email address' })
			.email({ message: 'Please enter a valid email address' })
	});

	const passwordSchema = z
		.object({
			password: z
				.string({ message: 'Please enter a password' })
				.min(8, 'Must be 8 or more characters long')
				.max(71, 'No more than 71 characters'),
			passwordConfirm: z.string()
		})
		.refine((data) => data.password === data.passwordConfirm, {
			message: 'Passwords must match',
			path: ['passwordConfirm']
		});

	const { form: emailForm } = createForm({
		initialValues: { email: data?.pb?.authStore?.record?.email || null },
		extend: [validator({ schema: emailSchema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				const res = await fetch('/api/account/update-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						userId: data?.pb?.authStore?.record?.id,
						newEmail: values.email
					})
				});

				const result = await res.json();
				if (res.ok) {
					user.model = null;
					data?.pb?.authStore.clear();
					await goto('/', { state: { type: 'success', message: 'Successfully updated email!' } });
					await invalidateAll();
				} else {
					console.error('Failed to update email:', result.error);
				}
			} catch (error) {
				console.dir(error, { depth: null });
			}
		}
	});

	const { form: passwordForm } = createForm({
		initialValues: {
			password: null,
			passwordConfirm: null
		},
		extend: [validator({ schema: passwordSchema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				const res = await fetch('/api/account/update-password', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						userId: data?.pb?.authStore?.record?.id,
						password: values.password,
						passwordConfirm: values.passwordConfirm
					})
				});

				const result = await res.json();
				if (res.ok) {
					user.model = null;
					data?.pb?.authStore.clear();
					await goto('/', {
						state: { type: 'success', message: 'Successfully updated password!' }
					});
					await invalidateAll();
				} else {
					console.error('Failed to update password:', result.error);
				}
			} catch (error) {
				console.dir(error, { depth: null });
			}
		}
	});

	const deleteUser = async () => {
		try {
			const res = await fetch('/api/account/delete-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: data?.pb?.authStore?.record?.id,
					profileId: data?.userProfile?.id
				})
			});

			const result = await res.json();
			if (res.ok) {
				user.model = null;
				data?.pb?.authStore.clear();
				await goto('/', {
					state: { type: 'success', message: 'Successfully deleted your account!' }
				});
				await invalidateAll();
			} else {
				console.error('Failed to delete user:', result.error);
			}
		} catch (error) {
			console.dir(error, { depth: null });
		}
	};
</script>

<div class="relative h-30 w-full overflow-hidden rounded-xl xl:h-50">
	<div
		class="from-primary-from-theme-light to-secondary-to-theme-light dark:to-secondary-to-theme-dark absolute inset-0 h-full w-full bg-gradient-to-tr dark:from-gray-950"
	></div>
</div>
<div
	class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border bg-white bg-clip-border shadow-md lg:mx-4"
>
	<div class="px-4 pt-4 pb-8">
		<div class="divide-light-border-theme-light dark:divide-light-border-theme-dark divide-y">
			{#if !data?.userProfile?.oauth}
				<div
					class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold">Change email</h2>
						<p class="text-light-text-theme-light dark:text-light-text-theme-dark mt-1 text-sm/6">
							Update your email associated with your account.
						</p>
					</div>

					<form class="md:col-span-2" use:emailForm>
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
							<div class="col-span-full">
								<label for="email" class="block text-sm/6 font-medium">Email address</label>
								<div class="mt-2">
									<input
										id="email"
										type="email"
										name="email"
										aria-invalid="true"
										required
										autocomplete="email"
										minlength="4"
										maxlength="255"
										aria-label="Email address"
										aria-describedby="email-validation"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
								<div
									id="email-validation"
									class="text-sm text-red-500"
									data-felte-reporter-dom-for="email"
									aria-live="polite"
									data-felte-reporter-dom-single-message
								></div>
							</div>
						</div>

						<div class="mt-8 flex">
							<Button
								type="submit"
								text="Save"
								class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
							/>
						</div>
					</form>
				</div>

				<div
					class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold">Change password</h2>
						<p class="mt-1 text-sm/6 text-gray-400">
							Update your password associated with your account.
						</p>
					</div>

					<form class="md:col-span-2" use:passwordForm>
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
							<div class="col-span-full">
								<label for="password" class="block text-sm/6 font-medium">New password</label>
								<div class="mt-2">
									<input
										id="password"
										autocomplete="current-password"
										type="password"
										name="password"
										aria-invalid="true"
										required
										minlength="8"
										maxlength="71"
										aria-label="Password"
										aria-describedby="password-validation"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
								<div
									id="password-validation"
									class="text-sm text-red-500"
									data-felte-reporter-dom-for="password"
									aria-live="polite"
									data-felte-reporter-dom-single-message
								></div>
							</div>

							<div class="col-span-full">
								<label for="passwordConfirm" class="block text-sm/6 font-medium"
									>Confirm password</label
								>
								<div class="mt-2">
									<input
										name="passwordConfirm"
										id="passwordConfirm"
										autocomplete="current-password"
										type="password"
										aria-invalid="true"
										required
										minlength="8"
										maxlength="71"
										aria-label="Confirm Password"
										aria-describedby="passwordConfirm-validation"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
								<div
									id="passwordConfirm-validation"
									class="text-sm text-red-500"
									data-felte-reporter-dom-for="passwordConfirm"
									aria-live="polite"
									data-felte-reporter-dom-single-message
								></div>
							</div>
						</div>

						<div class="mt-8 flex">
							<Button
								type="submit"
								text="Save"
								class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
							/>
						</div>
					</form>
				</div>
			{/if}

			<div
				class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
			>
				<div>
					<h2 class="text-base/7 font-semibold">Delete account</h2>
					<p class="mt-1 text-sm/6 text-gray-400">
						No longer want to use our service? You can delete your account here. This action is not
						reversible. All information related to this account will be deleted permanently.
					</p>
				</div>

				<form class="flex items-start md:col-span-2">
					<Button
						callBack={() => (showDeleteModal = true)}
						text="Yes, delete my account"
						class="bg-red-500 sm:hover:bg-red-400"
					/>
				</form>
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
							<h3 id="dialog-title" class="text-base font-semibold text-gray-900">
								Delete project
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									Are you sure you want to delete this project? This project will be permanently
									removed from our servers forever. This action cannot be undone.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<Button
							callBack={deleteUser}
							text="Delete"
							class="bg-red-500 sm:ml-3 sm:hover:hover:bg-red-400"
						/>
						<Button
							callBack={() => (showDeleteModal = false)}
							text="Cancel"
							class="text-dark-text-theme-light!  border-light-border-theme-dark h-9 border bg-white"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
