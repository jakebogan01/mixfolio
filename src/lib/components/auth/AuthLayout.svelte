<script>
	import { DASHBOARD, LOGIN, REGISTER } from '$lib/utils/constants.js';
	import 'tippy.js/dist/tippy.css';
	import { goto } from '$app/navigation';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporter from '@felte/reporter-tippy';
	import { z } from 'zod';
	import { user } from '$lib/stores/user.svelte';
	import Logo from '$lib/components/Logo.svelte';

	let { message, title, btnText, register = true, pb } = $props();
	let isPasswordVisible = $state(false),
		isConfirmPasswordVisible = $state(false),
		data = $state({ password: '', passwordConfirm: '' });

	const schema = register
		? z
				.object({
					email: z.string().email({ message: 'Please enter a valid email address' }),
					password: z
						.string()
						.min(8, 'More than 8 characters')
						.max(71, 'No more than 71 characters'),
					passwordConfirm: z.string()
				})
				.refine((data) => data.password === data.passwordConfirm, {
					message: 'Passwords must match',
					path: ['passwordConfirm']
				})
		: z.object({
				email: z.string().email({ message: 'Please enter a valid email address' }),
				password: z.string().min(8, 'More than 8 characters').max(71, 'No more than 71 characters')
			});

	const { form } = createForm({
		initialValues: {
			email: null,
			password: null,
			passwordConfirm: null
		},
		extend: [validator({ schema }), reporter()],
		onSubmit: async (values) => {
			try {
				if (register) {
					const record = await pb.collection('users').create(values);
					if (!record) console.error('❌ Unable to register user:', record);
					await pb.collection('users').authWithPassword(values.email, values.password);
					user.model = pb;
					console.log('✅ Auto-login after registration');
					await goto(DASHBOARD, { state: { message: 'Successfully registered' } });
				} else {
					delete values.passwordConfirm;
					const authData = await pb
						.collection('users')
						.authWithPassword(values.email, values.password);
					user.model = pb;
					console.log('✅ Logged in:', authData);
					await goto(DASHBOARD, { state: { message: 'Successfully logged in' } });
				}
			} catch (err) {
				console.error('❌ Auth error:', err);
			}
		}
	});
</script>

<div class="w-full max-w-md rounded-xl bg-white shadow-xl ring-1 ring-black/10">
	<form onsubmit={(event) => event.preventDefault()} class="p-7 sm:p-11" use:form>
		<div class="flex items-start">
			<Logo />
		</div>
		<h1 class="mt-8 text-base/6 font-medium">{message}!</h1>
		<p class="mt-1 text-sm/5 text-gray-600">{title}</p>
		<div class="mt-3 space-y-3">
			<label class="text-sm/5 font-medium" for="email">Email</label>
			<input
				required
				class="block w-full rounded-lg border border-transparent px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:text-sm/6"
				id="email"
				autocomplete="email"
				minlength="4"
				maxlength="255"
				aria-label="Email address"
				type="email"
				name="email"
			/>
		</div>
		<div class="mt-3 space-y-3">
			<label class="text-sm/5 font-medium" for="password">Password</label>
			<div class="flex rounded-md">
				{#if isPasswordVisible}
					<input
						type="text"
						bind:value={data.password}
						name="password"
						id="password"
						autocomplete="current-password"
						minlength="8"
						maxlength="71"
						required
						aria-label="Password"
						class="block w-full rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg border border-transparent px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:text-sm/6"
					/>
				{:else}
					<input
						type="password"
						bind:value={data.password}
						name="password"
						id="password"
						autocomplete="current-password"
						minlength="8"
						maxlength="71"
						required
						aria-label="Password"
						class="block w-full rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg border border-transparent px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:text-sm/6"
					/>
				{/if}
				<button
					onclick={() => (isPasswordVisible = !isPasswordVisible)}
					type="button"
					aria-label="Toggle password visibility"
					class="inline-flex cursor-pointer items-center rounded-r-lg px-3 text-slate-500 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:transition-colors sm:hover:bg-black sm:hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-4"
						><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path
							fill-rule="evenodd"
							d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
		</div>
		{#if register}
			<div class="mt-3 space-y-3">
				<label class="text-sm/5 font-medium" for="passwordConfirm">Confirm Password</label>
				<div class="flex rounded-md">
					{#if isConfirmPasswordVisible}
						<input
							bind:value={data.passwordConfirm}
							type="text"
							name="passwordConfirm"
							id="passwordConfirm"
							autocomplete="current-password"
							minlength="8"
							maxlength="71"
							required
							aria-label="Confirm Password"
							class="block w-full rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg border border-transparent px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:text-sm/6"
						/>
					{:else}
						<input
							bind:value={data.passwordConfirm}
							type="password"
							name="passwordConfirm"
							id="passwordConfirm"
							autocomplete="current-password"
							minlength="8"
							maxlength="71"
							required
							aria-label="Confirm Password"
							class="block w-full rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg border border-transparent px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:text-sm/6"
						/>
					{/if}
					<button
						onclick={() => (isConfirmPasswordVisible = !isConfirmPasswordVisible)}
						type="button"
						aria-label="Toggle password visibility"
						class="inline-flex cursor-pointer items-center rounded-r-lg px-3 text-slate-500 shadow-sm ring-1 ring-black/10 data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black sm:transition-colors sm:hover:bg-black sm:hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-4"
							><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path
								fill-rule="evenodd"
								d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
			</div>
		{/if}
		<div class="mt-8">
			<button
				type="submit"
				class="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-gray-950 px-4 py-[calc(--spacing(2)-1px)] text-base font-medium whitespace-nowrap text-white shadow-md data-disabled:bg-gray-950 data-disabled:opacity-40 data-hover:bg-gray-800"
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
