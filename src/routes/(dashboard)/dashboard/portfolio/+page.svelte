<script>
	import DashboardNav from '$lib/components/dashboard/DashboardNav.svelte';

	let { form } = $props();
	$inspect(form);

	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="flex h-full">
	<!-- Static sidebar for desktop -->
	<DashboardNav {menuOpen} {toggleMenu} />

	<div class="flex min-w-0 flex-1 flex-col overflow-hidden">
		<!-- Mobile top navigation -->
		<div class="lg:hidden">
			<div class="flex items-center justify-between bg-blue-600 px-4 py-2 sm:px-6">
				<div>
					<img
						class="h-8 w-auto"
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
						alt="Your Company"
					/>
				</div>
				<div>
					<button
						onclick={toggleMenu}
						type="button"
						class="-mr-3 inline-flex size-12 items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
					>
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
				</div>
			</div>
		</div>

		<main class="flex flex-1 overflow-hidden">
			<div class="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
				<!-- Breadcrumb -->
				<nav aria-label="Breadcrumb" class="border-b border-slate-200 bg-white xl:hidden">
					<div class="mx-auto flex max-w-3xl items-start px-4 py-3 sm:px-6 lg:px-8">
						<a
							href="#"
							class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-slate-900"
						>
							<svg
								class="size-5 text-slate-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									fill-rule="evenodd"
									d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Settings</span>
						</a>
					</div>
				</nav>

				<div class="flex flex-1 xl:overflow-hidden">
					<!-- Secondary sidebar -->
					<nav
						aria-label="Sections"
						class="hidden w-96 shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col"
					>
						<div class="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
							<p class="text-lg font-medium text-slate-900">Settings</p>
						</div>
						<div class="min-h-0 flex-1 overflow-y-auto">
							<!-- Current: "bg-blue-50/50", Default: "hover:bg-blue-50/50" -->
							<a
								href="#"
								class="flex border-b border-slate-200 bg-blue-50/50 p-6"
								aria-current="page"
							>
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Account</p>
									<p class="mt-1 text-slate-500">
										Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Notifications</p>
									<p class="mt-1 text-slate-500">
										Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Security</p>
									<p class="mt-1 text-slate-500">
										Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Appearance</p>
									<p class="mt-1 text-slate-500">
										Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Billing</p>
									<p class="mt-1 text-slate-500">
										Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor
										mauris.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Integrations</p>
									<p class="mt-1 text-slate-500">
										Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing
										pellentesque.
									</p>
								</div>
							</a>
							<a href="#" class="flex border-b border-slate-200 p-6 hover:bg-blue-50/50">
								<svg
									class="-mt-0.5 size-6 shrink-0 text-slate-400"
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
										d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<div class="ml-3 text-sm">
									<p class="font-medium text-slate-900">Additional Resources</p>
									<p class="mt-1 text-slate-500">
										Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus
										sit quis et.
									</p>
								</div>
							</a>
						</div>
					</nav>

					<!-- Main content -->
					<div class="flex-1 xl:overflow-y-auto">
						<div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
							<h1 class="text-3xl font-bold tracking-tight text-slate-900">Account</h1>

							<form class="mt-6 divide-y divide-slate-200">
								<div class="grid grid-cols-1 gap-y-6 pb-8 sm:grid-cols-6 sm:gap-x-6">
									<div class="sm:col-span-6">
										<h2 class="text-xl font-medium text-slate-900">Profile</h2>
										<p class="mt-1 text-sm text-slate-500">
											This information will be displayed publicly so be careful what you share.
										</p>
									</div>

									<div class="sm:col-span-3">
										<label for="first-name" class="block text-sm/6 font-medium text-slate-900"
											>First name</label
										>
										<input
											type="text"
											name="first-name"
											id="first-name"
											autocomplete="given-name"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>

									<div class="sm:col-span-3">
										<label for="last-name" class="block text-sm/6 font-medium text-slate-900"
											>Last name</label
										>
										<input
											type="text"
											name="last-name"
											id="last-name"
											autocomplete="family-name"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>

									<div class="sm:col-span-6">
										<label for="username" class="block text-sm/6 font-medium text-slate-900"
											>Username</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500"
											>
												<div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
													workcation.com/
												</div>
												<input
													type="text"
													name="username"
													id="username"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
													placeholder="janesmith"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-6">
										<label for="photo" class="block text-sm/6 font-medium text-slate-900"
											>Photo</label
										>
										<div class="mt-2 flex items-center">
											<img
												class="inline-block size-12 rounded-full"
												src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
												alt=""
											/>
											<div class="relative ml-4">
												<input
													id="user-photo"
													name="user-photo"
													type="file"
													class="peer absolute inset-0 size-full rounded-md opacity-0"
												/>
												<label
													for="user-photo"
													class="pointer-events-none block rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-slate-300 ring-inset peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600"
												>
													<span>Change</span>
													<span class="sr-only"> user photo</span>
												</label>
											</div>
											<button type="button" class="ml-6 text-sm/6 font-medium text-slate-900"
												>Remove</button
											>
										</div>
									</div>

									<div class="sm:col-span-6">
										<label for="description" class="block text-sm/6 font-medium text-slate-900"
											>Description</label
										>
										<div class="mt-2">
											<textarea
												id="description"
												name="description"
												rows="4"
												class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
											></textarea>
										</div>
										<p class="mt-3 text-sm text-slate-500">
											Brief description for your profile. URLs are hyperlinked.
										</p>
									</div>

									<div class="sm:col-span-6">
										<label for="url" class="block text-sm/6 font-medium text-slate-900">URL</label>
										<input
											type="text"
											name="url"
											id="url"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>
								</div>

								<div class="grid grid-cols-1 gap-y-6 py-8 sm:grid-cols-6 sm:gap-x-6">
									<div class="sm:col-span-6">
										<h2 class="text-xl font-medium text-slate-900">Personal Information</h2>
										<p class="mt-1 text-sm text-slate-500">
											This information will be displayed publicly so be careful what you share.
										</p>
									</div>

									<div class="sm:col-span-3">
										<label for="email-address" class="block text-sm/6 font-medium text-slate-900"
											>Email address</label
										>
										<input
											type="text"
											name="email-address"
											id="email-address"
											autocomplete="email"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>

									<div class="sm:col-span-3">
										<label for="phone-number" class="block text-sm/6 font-medium text-slate-900"
											>Phone number</label
										>
										<input
											type="text"
											name="phone-number"
											id="phone-number"
											autocomplete="tel"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>

									<div class="sm:col-span-3">
										<label for="country" class="block text-sm/6 font-medium text-slate-900"
											>Country</label
										>
										<div class="mt-2 grid grid-cols-1">
											<select
												id="country"
												name="country"
												autocomplete="country-name"
												class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
											>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
											<svg
												class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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

									<div class="sm:col-span-3">
										<label for="language" class="block text-sm/6 font-medium text-slate-900"
											>Language</label
										>
										<input
											type="text"
											name="language"
											id="language"
											class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
										/>
									</div>

									<p class="text-sm text-slate-500 sm:col-span-6">
										This account was created on <time datetime="2017-01-05T20:35:40"
											>January 5, 2017, 8:35:40 PM</time
										>.
									</p>
								</div>

								<div class="flex justify-end gap-x-3 pt-8">
									<button
										type="button"
										class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-slate-300 ring-inset hover:bg-slate-50"
										>Cancel</button
									>
									<button
										type="submit"
										class="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
										>Save</button
									>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
