<script>
	import DashboardNav from '$lib/components/dashboard/DashboardNav.svelte';

	let { form } = $props();
	$inspect(form);

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
		<div class="flex flex-1 items-stretch overflow-hidden">
			<main class="flex-1 overflow-y-auto">
				<div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
					<div class="flex">
						<h1 class="flex-1 text-2xl font-bold text-gray-900">About</h1>
						<div class="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
							<button
								type="button"
								class="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset"
							>
								<svg
									class="size-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Use list view</span>
							</button>
							<button
								type="button"
								class="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset"
							>
								<svg
									class="size-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="sr-only">Use grid view</span>
							</button>
						</div>
					</div>

					<!-- Gallery -->
					<section class="mt-8 pb-16" aria-labelledby="gallery-heading">
						<h2 id="gallery-heading" class="sr-only">Form</h2>
						<div class="flex items-start space-x-4">
							<div class="min-w-0 flex-1">
								<form action="?/about" method="POST" class="relative">
									<div
										class="rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
									>
										<label for="about" class="sr-only">about</label>
										<textarea
											rows="3"
											name="about"
											id="about"
											class="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
											placeholder="Add your about..."
										></textarea>

										<!-- Spacer element to match the height of the toolbar -->
										<div class="py-2" aria-hidden="true">
											<!-- Matches height of button in toolbar (1px border + 36px content height) -->
											<div class="py-px">
												<div class="h-9"></div>
											</div>
										</div>
									</div>

									<div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pr-2 pl-3">
										<div class="shrink-0">
											<button
												type="submit"
												class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>Post</button
											>
										</div>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	</div>
</div>
