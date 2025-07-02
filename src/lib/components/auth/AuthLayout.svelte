<script>
	import { LOGIN, REGISTER } from '$lib/utils/constants.js';
	let { title, action, btnText, register = true } = $props();
</script>

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
		<form class="space-y-6" method="POST" {action}>
			<div>
				<div class="col-span-2">
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
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
						required
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
					>{btnText}</button
				>
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
