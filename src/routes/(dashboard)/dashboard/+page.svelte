<script>
	import DashboardNav from '$lib/components/dashboard/DashboardNav.svelte';

	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="flex h-full">
	<DashboardNav {menuOpen} {toggleMenu} />

	<div class="flex flex-1 flex-col overflow-hidden">
		<header class="w-full">
			<div class="relative z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white shadow-xs">
				<button
					onclick={toggleMenu}
					type="button"
					class="border-r border-gray-200 px-4 text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset md:hidden"
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
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
						/>
					</svg>
				</button>
				<div class="flex flex-1 justify-between px-4 sm:px-6">
					<div class="flex flex-1">
						<form class="grid flex-1 grid-cols-1" action="#" method="GET">
							<input
								type="search"
								name="search"
								aria-label="Search"
								class="col-start-1 row-start-1 block size-full border-none bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
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
					</div>
					<div class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
						<!-- Profile dropdown -->
						<div class="relative shrink-0">
							<div>
								<button
									type="button"
									class="relative flex rounded-full bg-white text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true"
								>
									<span class="absolute -inset-1.5"></span>
									<span class="sr-only">Open user menu</span>
									<img
										class="size-8 rounded-full"
										src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
										alt=""
									/>
								</button>
							</div>

							<!--
							  Dropdown menu, show/hide based on menu state.

							  Entering: "transition ease-out duration-100"
								From: "transform opacity-0 scale-95"
								To: "transform opacity-100 scale-100"
							  Leaving: "transition ease-in duration-75"
								From: "transform opacity-100 scale-100"
								To: "transform opacity-0 scale-95"
							-->
							<div
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								tabindex="-1"
							>
								<!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
								<a
									href="/"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-0">Your profile</a
								>
								<a
									href="/"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-1">Sign out</a
								>
							</div>
						</div>

						<button
							type="button"
							class="relative rounded-full bg-indigo-600 p-1.5 text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							<span class="absolute -inset-1.5"></span>
							<svg
								class="size-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
								/>
							</svg>
							<span class="sr-only">Add file</span>
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Main content -->
		<main class="flex-1 items-stretch overflow-hidden">
			<div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
				<h1 class="sr-only">Profile</h1>
				<!-- Main 3 column grid -->
				<div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
					<!-- Left column -->
					<div class="grid grid-cols-1 gap-4 lg:col-span-2">
						<!-- Welcome panel -->
						<section aria-labelledby="profile-overview-title">
							<div class="overflow-hidden rounded-lg bg-white shadow-sm">
								<h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
								<div class="bg-white p-6">
									<div class="sm:flex sm:items-center sm:justify-between">
										<div class="sm:flex sm:space-x-5">
											<div class="shrink-0">
												<img
													class="mx-auto size-20 rounded-full"
													src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</div>
											<div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
												<p class="text-sm font-medium text-gray-600">Welcome back,</p>
												<p class="text-xl font-bold text-gray-900 sm:text-2xl">Chelsea Hagon</p>
												<p class="text-sm font-medium text-gray-600">Human Resources Manager</p>
											</div>
										</div>
										<div class="mt-5 flex justify-center sm:mt-0">
											<a
												href="/"
												class="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
												>View profile</a
											>
										</div>
									</div>
								</div>
								<div
									class="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
								>
									<div class="px-6 py-5 text-center text-sm font-medium">
										<span class="text-gray-900">12</span>
										<span class="text-gray-600">Vacation days left</span>
									</div>
									<div class="px-6 py-5 text-center text-sm font-medium">
										<span class="text-gray-900">4</span>
										<span class="text-gray-600">Sick days left</span>
									</div>
									<div class="px-6 py-5 text-center text-sm font-medium">
										<span class="text-gray-900">2</span>
										<span class="text-gray-600">Personal days left</span>
									</div>
								</div>
							</div>
						</section>

						<!-- Actions panel -->
						<section aria-labelledby="quick-links-title">
							<div
								class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-sm sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"
							>
								<h2 class="sr-only" id="quick-links-title">Quick links</h2>
								<div
									class="group relative rounded-tl-lg rounded-tr-lg bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset sm:rounded-tr-none"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-teal-50 p-3 text-teal-700 ring-4 ring-white"
										>
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
													d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Request time off
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
								<div
									class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset sm:rounded-tr-lg"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-purple-50 p-3 text-purple-700 ring-4 ring-white"
										>
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
													d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Benefits
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
								<div
									class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-sky-50 p-3 text-sky-700 ring-4 ring-white"
										>
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
													d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Schedule a one-on-one
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
								<div
									class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-yellow-50 p-3 text-yellow-700 ring-4 ring-white"
										>
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
													d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Payroll
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
								<div
									class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset sm:rounded-bl-lg"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-rose-50 p-3 text-rose-700 ring-4 ring-white"
										>
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
													d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Submit an expense
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
								<div
									class="group relative rounded-br-lg rounded-bl-lg bg-white p-6 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-inset sm:rounded-bl-none"
								>
									<div>
										<span
											class="inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-700 ring-4 ring-white"
										>
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
													d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
												/>
											</svg>
										</span>
									</div>
									<div class="mt-8">
										<h3 class="text-lg font-medium">
											<a href="/" class="focus:outline-hidden">
												<!-- Extend touch target to entire panel -->
												<span class="absolute inset-0" aria-hidden="true"></span>
												Training
											</a>
										</h3>
										<p class="mt-2 text-sm text-gray-500">
											Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit
											repellendus qui ut at blanditiis et quo et molestiae.
										</p>
									</div>
									<span
										class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
										aria-hidden="true"
									>
										<svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
											/>
										</svg>
									</span>
								</div>
							</div>
						</section>
					</div>

					<!-- Right column -->
					<div class="grid grid-cols-1 gap-4">
						<!-- Announcements -->
						<section aria-labelledby="announcements-title">
							<div class="overflow-hidden rounded-lg bg-white shadow-sm">
								<div class="p-6">
									<h2 class="text-base font-medium text-gray-900" id="announcements-title">
										Announcements
									</h2>
									<div class="mt-6 flow-root">
										<ul role="list" class="-my-5 divide-y divide-gray-200">
											<li class="py-5">
												<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
													<h3 class="text-sm font-semibold text-gray-800">
														<a href="/" class="hover:underline focus:outline-hidden">
															<!-- Extend touch target to entire panel -->
															<span class="absolute inset-0" aria-hidden="true"></span>
															Office closed on July 2nd
														</a>
													</h3>
													<p class="mt-1 line-clamp-2 text-sm text-gray-600">
														Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut
														earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex
														tempora neque cum consectetur dolores.
													</p>
												</div>
											</li>
											<li class="py-5">
												<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
													<h3 class="text-sm font-semibold text-gray-800">
														<a href="/" class="hover:underline focus:outline-hidden">
															<!-- Extend touch target to entire panel -->
															<span class="absolute inset-0" aria-hidden="true"></span>
															New password policy
														</a>
													</h3>
													<p class="mt-1 line-clamp-2 text-sm text-gray-600">
														Alias inventore ut autem optio voluptas et repellendus. Facere totam
														quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime
														ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est
														sit autem mollitia.
													</p>
												</div>
											</li>
											<li class="py-5">
												<div class="relative focus-within:ring-2 focus-within:ring-cyan-500">
													<h3 class="text-sm font-semibold text-gray-800">
														<a href="/" class="hover:underline focus:outline-hidden">
															<!-- Extend touch target to entire panel -->
															<span class="absolute inset-0" aria-hidden="true"></span>
															Office closed on July 2nd
														</a>
													</h3>
													<p class="mt-1 line-clamp-2 text-sm text-gray-600">
														Tenetur libero voluptatem rerum occaecati qui est molestiae
														exercitationem. Voluptate quisquam iure assumenda consequatur ex et
														recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et.
														Consequatur quis dignissimos voluptatem nisi.
													</p>
												</div>
											</li>
										</ul>
									</div>
									<div class="mt-6">
										<a
											href="/"
											class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
											>View all</a
										>
									</div>
								</div>
							</div>
						</section>

						<!-- Recent Hires -->
						<section aria-labelledby="recent-hires-title">
							<div class="overflow-hidden rounded-lg bg-white shadow-sm">
								<div class="p-6">
									<h2 class="text-base font-medium text-gray-900" id="recent-hires-title">
										Recent Hires
									</h2>
									<div class="mt-6 flow-root">
										<ul role="list" class="-my-5 divide-y divide-gray-200">
											<li class="py-4">
												<div class="flex items-center space-x-4">
													<div class="shrink-0">
														<img
															class="size-8 rounded-full"
															src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
															alt=""
														/>
													</div>
													<div class="min-w-0 flex-1">
														<p class="truncate text-sm font-medium text-gray-900">
															Leonard Krasner
														</p>
														<p class="truncate text-sm text-gray-500">@leonardkrasner</p>
													</div>
													<div>
														<a
															href="/"
															class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
															>View</a
														>
													</div>
												</div>
											</li>
											<li class="py-4">
												<div class="flex items-center space-x-4">
													<div class="shrink-0">
														<img
															class="size-8 rounded-full"
															src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
															alt=""
														/>
													</div>
													<div class="min-w-0 flex-1">
														<p class="truncate text-sm font-medium text-gray-900">Floyd Miles</p>
														<p class="truncate text-sm text-gray-500">@floydmiles</p>
													</div>
													<div>
														<a
															href="/"
															class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
															>View</a
														>
													</div>
												</div>
											</li>
											<li class="py-4">
												<div class="flex items-center space-x-4">
													<div class="shrink-0">
														<img
															class="size-8 rounded-full"
															src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
															alt=""
														/>
													</div>
													<div class="min-w-0 flex-1">
														<p class="truncate text-sm font-medium text-gray-900">Emily Selman</p>
														<p class="truncate text-sm text-gray-500">@emilyselman</p>
													</div>
													<div>
														<a
															href="/"
															class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
															>View</a
														>
													</div>
												</div>
											</li>
											<li class="py-4">
												<div class="flex items-center space-x-4">
													<div class="shrink-0">
														<img
															class="size-8 rounded-full"
															src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
															alt=""
														/>
													</div>
													<div class="min-w-0 flex-1">
														<p class="truncate text-sm font-medium text-gray-900">Kristin Watson</p>
														<p class="truncate text-sm text-gray-500">@kristinwatson</p>
													</div>
													<div>
														<a
															href="/"
															class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
															>View</a
														>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<div class="mt-6">
										<a
											href="/"
											class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
											>View all</a
										>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
