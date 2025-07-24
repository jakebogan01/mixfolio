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
					.string({ message: 'Please confirm a password' })
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
					await pb.collection('profiles').create({ user_id: newUser.id });
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
					class="inline-flex cursor-pointer items-center rounded-l-none rounded-r-lg border border-transparent px-3 text-gray-400 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:transition-colors sm:hover:bg-black sm:hover:text-white"
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
						class="inline-flex cursor-pointer items-center rounded-l-none rounded-r-lg border border-transparent px-3 text-gray-400 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 sm:transition-colors sm:hover:bg-black sm:hover:text-white"
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
		<div class="mt-8">
			<button
				type="submit"
				class="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-transparent bg-gray-900 px-4 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md data-disabled:bg-gray-950 data-disabled:opacity-40 sm:transition-colors sm:hover:bg-gray-900/75"
				>{btnText}</button
			>
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
