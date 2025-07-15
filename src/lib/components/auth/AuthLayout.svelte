<script>
	import { LOGIN, REGISTER } from '$lib/utils/constants.js';
	import 'tippy.js/dist/tippy.css';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporter from '@felte/reporter-tippy';
	import { z } from 'zod';
	import { user } from '$lib/stores/user.svelte';
	import { goto } from '$app/navigation';

	let { title, btnText, register = true, pb } = $props();

	const schema = z.object({
		email: z.string().email({ message: 'Please enter a valid email address' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' })
	});

	const { form, errors } = createForm({
		extend: [validator({ schema }), reporter()],
		onSubmit: async (values) => {
			// Client-side only logic
			try {
				if (register) {
					values.passwordConfirm = values.password;
					const record = await pb.collection('users').create(values);
					console.log('✅ Registered user:', record);
					// Optional: Log in immediately after registration
					await pb.collection('users').authWithPassword(values.email, values.password);
					user.model = pb;
					console.log('✅ Auto-login after registration');
					await goto('/dashboard', { state: { message: 'Successfully registered' } });
				} else {
					const authData = await pb
						.collection('users')
						.authWithPassword(values.email, values.password);
					user.model = pb;
					console.log('✅ Logged in:', authData);
					await goto('/dashboard', { state: { message: 'Successfully logged in' } });
				}
			} catch (err) {
				console.error('❌ Auth error:', err);
			}
		}
	});
</script>

<a href="/account">account</a>
<a href="/">Home</a>
<a href="/logout">logout</a>

<div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-sm space-y-10">
		<div>
			<img
				class="mx-auto h-10 w-auto"
				src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
			<h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{title}</h2>
		</div>
		<form onsubmit={(event) => event.preventDefault()} class="space-y-6" use:form>
			<div>
				<div class="col-span-2">
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						minlength="4"
						maxlength="255"
						aria-label="Email address"
						class="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						placeholder="Email address"
					/>
				</div>

				<div class="-mt-px">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						aria-label="Password"
						class="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{btnText}
				</button>
			</div>
		</form>

		<p class="text-center text-sm/6 text-gray-500">
			{#if register}
				Already a member?
				<a href={LOGIN} class="font-semibold text-indigo-600 hover:text-indigo-500">Login now</a>
			{:else}
				Not a member?
				<a href={REGISTER} class="font-semibold text-indigo-600 hover:text-indigo-500"
					>Register now</a
				>
			{/if}
		</p>
	</div>
</div>
