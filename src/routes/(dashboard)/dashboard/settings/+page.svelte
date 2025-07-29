<script>
	import ProfileForm from '$lib/components/dashboard/profile/ProfileForm.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="relative h-30 w-full overflow-hidden rounded-xl xl:h-50">
	<div
		class="from-primary-from to-secondary-to absolute inset-0 h-full w-full bg-gradient-to-tr"
	></div>
</div>
<div
	class="border-light-border text-dark-text relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border bg-white bg-clip-border shadow-md lg:mx-4"
>
	<div class="px-4 pt-4 pb-8">
		<div class="divide-light-border divide-y">
			<div
				class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
			>
				<div>
					<h2 class="text-base/7 font-semibold">Change email</h2>
					<p class="text-light-text mt-1 text-sm/6">
						Update your email associated with your account.
					</p>
				</div>

				<form class="md:col-span-2">
					<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
						<div class="col-span-full">
							<label for="email" class="block text-sm/6 font-medium">Email address</label>
							<div class="mt-2">
								<input
									id="email"
									type="email"
									name="email"
									autocomplete="email"
									class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
								/>
							</div>
						</div>
					</div>

					<div class="mt-8 flex">
						<Button
							type="submit"
							text="Save"
							class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
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

				<form class="md:col-span-2">
					<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
						<div class="col-span-full">
							<label for="password" class="block text-sm/6 font-medium">Current password</label>
							<div class="mt-2">
								<input
									id="password"
									type="password"
									name="current_password"
									autocomplete="current-password"
									class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
								/>
							</div>
						</div>

						<div class="col-span-full">
							<label for="new-password" class="block text-sm/6 font-medium">New password</label>
							<div class="mt-2">
								<input
									id="new-password"
									type="password"
									name="new_password"
									autocomplete="new-password"
									class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
								/>
							</div>
						</div>

						<div class="col-span-full">
							<label for="confirm-password" class="block text-sm/6 font-medium"
								>Confirm password</label
							>
							<div class="mt-2">
								<input
									id="confirm-password"
									type="password"
									name="confirm_password"
									autocomplete="new-password"
									class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
								/>
							</div>
						</div>
					</div>

					<div class="mt-8 flex">
						<Button
							type="submit"
							text="Save"
							class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
						/>
					</div>
				</form>
			</div>

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
						type="submit"
						text="Yes, delete my account"
						class="bg-red-500 sm:hover:bg-red-400"
					/>
				</form>
			</div>
		</div>
	</div>
</div>

{#if menuOpen}
	<ProfileForm {data} {toggleMenu} />
{/if}
