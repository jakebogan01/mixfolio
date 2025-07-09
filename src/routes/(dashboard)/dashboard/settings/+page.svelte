<script>
	import DashboardNav from '$lib/components/dashboard/DashboardNav.svelte';

	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="flex h-full bg-gray-900">
	<!-- Narrow sidebar -->
	<DashboardNav {menuOpen} {toggleMenu} />

	<!-- Content area -->
	<div class="flex flex-1 flex-col overflow-hidden lg:pl-20">
		<div class="w-full">
			<div
				class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8"
			>
				<button onclick={toggleMenu} type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
					<span class="sr-only">Open sidebar</span>
					<svg
						class="size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>

				<!-- Separator -->
				<div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

				<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
					<form class="grid flex-1 grid-cols-1" action="#" method="GET">
						<input
							type="search"
							name="search"
							aria-label="Search"
							class="col-start-1 row-start-1 block size-full border-none bg-transparent pl-8 text-base text-gray-900 ring-0 outline-hidden placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
							placeholder="Search"
						/>
						<svg
							class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path
								fill-rule="evenodd"
								d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
								clip-rule="evenodd"
							/>
						</svg>
					</form>
					<div class="flex items-center gap-x-4 lg:gap-x-6">
						<button
							type="button"
							class="-mx-2.5 cursor-pointer p-2.5 text-gray-400 hover:text-gray-500"
						>
							<span class="sr-only">View notifications</span>
							<svg
								class="size-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
								/>
							</svg>
						</button>

						<!-- Separator -->
						<div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-700" aria-hidden="true"></div>

						<!-- Profile dropdown -->
						<div class="relative">
							<button
								type="button"
								class="-mx-2.5 cursor-pointer p-2.5 text-gray-400 hover:text-gray-500"
							>
								<span class="sr-only">Logout</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-6"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
									/></svg
								>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<h1 class="sr-only">Settings</h1>

		<!-- Main content -->
		<div class="flex flex-1 items-stretch divide-y divide-white/5 overflow-hidden">
			<div class="flex-1 overflow-y-auto">
				<header class="border-b border-white/5">
					<!-- Secondary navigation -->
					<nav class="flex overflow-x-auto py-4">
						<ul
							role="list"
							class="flex min-w-full flex-none justify-center gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
						>
							<li>
								<a href="#" class="text-indigo-400">Account</a>
							</li>
							<li>
								<a href="#" class="">Notifications</a>
							</li>
							<li>
								<a href="#" class="">Billing</a>
							</li>
							<li>
								<a href="#" class="">Teams</a>
							</li>
							<li>
								<a href="#" class="">Integrations</a>
							</li>
						</ul>
					</nav>
				</header>

				<div
					class="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold text-white">Personal Information</h2>
						<p class="mt-1 text-sm/6 text-gray-400">
							Use a permanent address where you can receive mail.
						</p>
					</div>

					<form class="md:col-span-2">
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div class="col-span-full flex items-center gap-x-8">
								<img
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
									class="size-24 flex-none rounded-lg bg-gray-800 object-cover"
								/>
								<div>
									<button
										type="button"
										class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white/20"
										>Change avatar</button
									>
									<p class="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
								</div>
							</div>

							<div class="sm:col-span-3">
								<label for="first-name" class="block text-sm/6 font-medium text-white"
									>First name</label
								>
								<div class="mt-2">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>

							<div class="sm:col-span-3">
								<label for="last-name" class="block text-sm/6 font-medium text-white"
									>Last name</label
								>
								<div class="mt-2">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="family-name"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="email" class="block text-sm/6 font-medium text-white"
									>Email address</label
								>
								<div class="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autocomplete="email"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="username" class="block text-sm/6 font-medium text-white">Username</label
								>
								<div class="mt-2">
									<div
										class="flex items-center overflow-hidden rounded-md border-t border-r-0 border-b border-l bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500"
									>
										<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
											example.com/
										</div>
										<input
											type="text"
											name="username"
											id="username"
											class="block min-w-0 grow border-t-0 border-r border-b-0 border-l-0 bg-transparent py-1.5 pr-3 pl-1 text-base text-white ring-0 placeholder:text-gray-500 focus:ring-0 focus:outline-none sm:text-sm/6"
											placeholder="janesmith"
										/>
									</div>
								</div>
							</div>

							<div class="col-span-full">
								<label for="timezone" class="block text-sm/6 font-medium text-white">Timezone</label
								>
								<div class="mt-2 grid grid-cols-1">
									<select
										id="timezone"
										name="timezone"
										class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									>
										<option>Pacific Standard Time</option>
										<option>Eastern Standard Time</option>
										<option>Greenwich Mean Time</option>
									</select>
									<svg
										class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
										viewBox="0 0 16 16"
										fill="currentColor"
										aria-hidden="true"
										data-slot="icon"
									>
										<path
											fill-rule="evenodd"
											d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
											clip-rule="evenodd"
										/>
									</svg>
								</div>
							</div>
						</div>

						<div class="mt-8 flex">
							<button
								type="submit"
								class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>Save</button
							>
						</div>
					</form>
				</div>

				<div
					class="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold text-white">Change password</h2>
						<p class="mt-1 text-sm/6 text-gray-400">
							Update your password associated with your account.
						</p>
					</div>

					<form class="md:col-span-2">
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div class="col-span-full">
								<label for="current-password" class="block text-sm/6 font-medium text-white"
									>Current password</label
								>
								<div class="mt-2">
									<input
										id="current-password"
										name="current_password"
										type="password"
										autocomplete="current-password"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="new-password" class="block text-sm/6 font-medium text-white"
									>New password</label
								>
								<div class="mt-2">
									<input
										id="new-password"
										name="new_password"
										type="password"
										autocomplete="new-password"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>

							<div class="col-span-full">
								<label for="confirm-password" class="block text-sm/6 font-medium text-white"
									>Confirm password</label
								>
								<div class="mt-2">
									<input
										id="confirm-password"
										name="confirm_password"
										type="password"
										autocomplete="new-password"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>
						</div>

						<div class="mt-8 flex">
							<button
								type="submit"
								class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>Save</button
							>
						</div>
					</form>
				</div>

				<div
					class="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold text-white">Log out other sessions</h2>
						<p class="mt-1 text-sm/6 text-gray-400">
							Please enter your password to confirm you would like to log out of your other sessions
							across all of your devices.
						</p>
					</div>

					<form class="md:col-span-2">
						<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div class="col-span-full">
								<label for="logout-password" class="block text-sm/6 font-medium text-white"
									>Your password</label
								>
								<div class="mt-2">
									<input
										id="logout-password"
										name="password"
										type="password"
										autocomplete="current-password"
										class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
									/>
								</div>
							</div>
						</div>

						<div class="mt-8 flex">
							<button
								type="submit"
								class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>Log out other sessions</button
							>
						</div>
					</form>
				</div>

				<div
					class="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
				>
					<div>
						<h2 class="text-base/7 font-semibold text-white">Delete account</h2>
						<p class="mt-1 text-sm/6 text-gray-400">
							No longer want to use our service? You can delete your account here. This action is
							not reversible. All information related to this account will be deleted permanently.
						</p>
					</div>

					<form class="flex items-start md:col-span-2">
						<button
							type="submit"
							class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400"
							>Yes, delete my account</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
