<script>
	import { DASHBOARD, LOGIN, REGISTER } from '$lib/utils/constants.js';
	import { goto } from '$app/navigation';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { z } from 'zod';
	import { user } from '$lib/stores/user.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { message, title, btnText, register = true, pb } = $props();
	let isPasswordVisible = $state(false);
	let isConfirmPasswordVisible = $state(false);

	const schema = register
		? z
				.object({
					email: z
						.string({ message: 'Please enter a valid email address' })
						.email({ message: 'Please enter a valid email address' }),
					password: z
						.string({ message: 'Please enter a password' })
						.min(8, 'Must be 8 or more characters long')
						.max(71, 'No more than 71 characters'),
					passwordConfirm: z.string()
				})
				.refine((data) => data.password === data.passwordConfirm, {
					message: 'Passwords must match',
					path: ['passwordConfirm']
				})
		: z.object({
				email: z
					.string({ message: 'Please enter a valid email address' })
					.email({ message: 'Please enter a valid email address' }),
				password: z
					.string()
					.min(8, 'Must be 8 or more characters long')
					.max(71, 'No more than 71 characters')
			});

	const { form } = createForm({
		initialValues: {
			email: null,
			password: null,
			passwordConfirm: null
		},
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				if (register) {
					const newUser = await pb.collection('users').create(values);
					await pb.collection('users').authWithPassword(values.email, values.password);
					let userPreferences = await pb.collection('preferences').create({ hide_portfolio: true });
					await pb
						.collection('profiles')
						.create({ user_id: newUser.id, preferences: userPreferences.id });
					user.model = pb;
					await goto(DASHBOARD, { state: { type: 'success', message: 'Successfully registered' } });
				} else {
					delete values.passwordConfirm;
					await pb.collection('users').authWithPassword(values.email, values.password);
					user.model = pb;
					await goto(DASHBOARD, { state: { type: 'success', message: 'Successfully logged in' } });
				}
			} catch (error) {
				console.dir(error?.message, { depth: null });
			}
		}
	});

	async function googleAuthTest() {
		try {
			const authData = await pb.collection('users').authWithOAuth2({
				provider: 'google',
				redirectUrl: 'https://helpassist.dev/api/oauth2-redirect'
			});

			const existingProfiles = await pb.collection('profiles').getFullList({
				filter: `user_id = "${authData?.record.id}"`,
				$autoCancel: false
			});

			if (existingProfiles.length === 0) {
				let userPreferences = await pb.collection('preferences').create({ hide_portfolio: true });
				await pb.collection('profiles').create({
					user_id: authData?.record.id,
					preferences: userPreferences.id,
					name: authData?.meta?.name,
					email: authData?.meta?.email
				});
			}

			user.model = pb;

			await goto(DASHBOARD, {
				state: { type: 'success', message: 'Successfully logged in with Google' }
			});
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	}

	async function githubAuthTest() {
		console.log('githubAuthTest');
		try {
			const authData = await pb.collection('users').authWithOAuth2({
				provider: 'github',
				redirectUrl: 'https://helpassist.dev/api/oauth2-redirect'
			});
			console.log('authData', authData);

			const existingProfiles = await pb.collection('profiles').getFullList({
				filter: `user_id = "${authData?.record.id}"`,
				$autoCancel: false
			});

			if (existingProfiles.length === 0) {
				let userPreferences = await pb.collection('preferences').create({ hide_portfolio: true });
				await pb.collection('profiles').create({
					user_id: authData?.record.id,
					preferences: userPreferences.id,
					name: authData?.meta?.name,
					email: authData?.meta?.email
				});
			}

			user.model = pb;
			await goto(DASHBOARD, {
				state: { type: 'success', message: 'Successfully logged in with github' }
			});
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	}
</script>

<div class="w-full max-w-md rounded-xl bg-white shadow-xl ring-1 ring-black/10">
	<form class="p-7 sm:p-11" use:form>
		<div class="flex items-start">
			<Logo />
		</div>
		<h1 class="mt-8 text-base/6 font-medium">{message}!</h1>
		<p class="mt-1 text-sm/5 text-gray-600">{title}</p>
		<div class="mt-3 space-y-3">
			<label for="email" class="block text-sm/5 font-medium">Email</label>
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
				class="col-start-1 row-start-1 block w-full rounded-lg border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
			/>
			<div
				id="email-validation"
				class="text-sm text-red-500"
				data-felte-reporter-dom-for="email"
				aria-live="polite"
				data-felte-reporter-dom-single-message
			></div>
		</div>
		<div class="mt-3 space-y-3">
			<label for="password" class="block text-sm/5 font-medium">Password</label>
			<div class="flex rounded-md">
				<input
					id="password"
					autocomplete="current-password"
					type={isPasswordVisible ? 'text' : 'password'}
					name="password"
					aria-invalid="true"
					required
					minlength="8"
					maxlength="71"
					aria-label="Password"
					aria-describedby="password-validation"
					class="col-start-1 row-start-1 block w-full rounded-l-lg rounded-r-none border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
				/>
				<button
					onclick={() => (isPasswordVisible = !isPasswordVisible)}
					type="button"
					aria-label="Toggle password visibility"
					class="text-light-text inline-flex cursor-pointer items-center rounded-l-none rounded-r-lg border border-transparent px-3 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:transition-colors sm:hover:bg-black sm:hover:text-white"
				>
					<Icon name="eye" class="size-4" stroke="none" />
				</button>
			</div>
			<div
				id="password-validation"
				class="text-sm text-red-500"
				data-felte-reporter-dom-for="password"
				aria-live="polite"
				data-felte-reporter-dom-single-message
			></div>
		</div>
		{#if register}
			<div class="mt-3 space-y-3">
				<label class="text-sm/5 font-medium" for="passwordConfirm">Confirm Password</label>
				<div class="flex rounded-md">
					<input
						name="passwordConfirm"
						id="passwordConfirm"
						autocomplete="current-password"
						type={isConfirmPasswordVisible ? 'text' : 'password'}
						aria-invalid="true"
						required
						minlength="8"
						maxlength="71"
						aria-label="Confirm Password"
						aria-describedby="passwordConfirm-validation"
						class="col-start-1 row-start-1 block w-full rounded-l-lg rounded-r-none border border-transparent bg-white py-1.5 pr-10 pl-3 text-base shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
					/>
					<button
						onclick={() => (isConfirmPasswordVisible = !isConfirmPasswordVisible)}
						type="button"
						aria-label="Toggle password visibility"
						class="text-light-text inline-flex cursor-pointer items-center rounded-l-none rounded-r-lg border border-transparent px-3 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:transition-colors sm:hover:bg-black sm:hover:text-white"
					>
						<Icon name="eye" class="size-4" stroke="none" />
					</button>
				</div>
				<div
					id="passwordConfirm-validation"
					class="text-sm text-red-500"
					data-felte-reporter-dom-for="passwordConfirm"
					aria-live="polite"
					data-felte-reporter-dom-single-message
				></div>
			</div>
		{/if}
		<div class="mt-8 mb-4">
			<button
				type="submit"
				class="bg-secondary-btn-bg sm:hover:bg-secondary-btn-hover inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-transparent px-4 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md data-disabled:bg-gray-950 data-disabled:opacity-40 sm:transition-colors"
				>{btnText}</button
			>
		</div>
		<hr />

		<div class="mt-4">
			<button
				type="button"
				onclick={googleAuthTest}
				class="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-transparent bg-blue-500 px-4 py-5 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md data-disabled:bg-gray-950 data-disabled:opacity-40 sm:transition-colors sm:hover:bg-gray-900/75"
				id="btn"
			>
				<svg
					class="mr-2 -ml-1 h-4 w-4"
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="google"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 488 512"
					><path
						fill="currentColor"
						d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
					></path></svg
				>{btnText} with Google
			</button>
		</div>
		<div class="mt-3">
			<button
				type="button"
				onclick={githubAuthTest}
				class="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-transparent bg-green-600 px-4 py-5 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md data-disabled:bg-gray-950 data-disabled:opacity-40 sm:transition-colors sm:hover:bg-gray-900/75"
				id="btn2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="mr-2"
					viewBox="0 0 1792 1792"
				>
					<path
						d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"
					></path>
				</svg>{btnText} with Github
			</button>
		</div>
	</form>
	{#if register}
		<div class="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
			Already a member? <a class="font-medium hover:text-gray-600" href={LOGIN}
				>Sign into your account</a
			>
		</div>
	{:else}
		<div class="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
			Not a member? <a class="font-medium hover:text-gray-600" href={REGISTER}>Create an account</a>
		</div>
	{/if}
</div>
