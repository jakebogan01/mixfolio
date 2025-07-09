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
		<div class="flex flex-1 items-stretch overflow-hidden">
			<main class="flex-1 overflow-y-auto">
				<div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
					<div class="flex">
						<h1 class="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
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

					<!-- Tabs -->
					<div class="mt-3 sm:mt-2">
						<div class="grid grid-cols-1 sm:hidden">
							<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
							<select
								aria-label="Select a tab"
								class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
							>
								<option selected>Recently Viewed</option>
								<option>Recently Added</option>
								<option>Favorited</option>
							</select>
							<svg
								class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
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
						<div class="hidden sm:block">
							<div class="flex items-center border-b border-gray-200">
								<nav class="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
									<!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
									<a
										href="/"
										aria-current="page"
										class="border-b-2 border-indigo-500 px-1 py-4 text-sm font-medium whitespace-nowrap text-indigo-600"
										>Recently Viewed</a
									>
									<a
										href="/"
										class="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
										>Recently Added</a
									>
									<a
										href="/"
										class="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
										>Favorited</a
									>
								</nav>
								<div class="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
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
						</div>
					</div>

					<!-- Gallery -->
					<section class="mt-8 pb-16" aria-labelledby="gallery-heading">
						<h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
						<ul
							role="list"
							class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
						>
							{#each Array(20) as _}
								<li class="relative">
									<!-- Current: "ring-2 ring-indigo-500 ring-offset-2", Default: "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100" -->
									<div
										class="group block w-full overflow-hidden rounded-lg bg-gray-100 ring-2 ring-indigo-500 ring-offset-2"
									>
										<!-- Current: "", Default: "group-hover:opacity-75" -->
										<img
											src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
											alt=""
											class="pointer-events-none aspect-10/7 object-cover"
										/>
										<button type="button" class="absolute inset-0 focus:outline-hidden">
											<span class="sr-only">View details for IMG_4985.HEIC</span>
										</button>
									</div>
									<p
										class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"
									>
										IMG_4985.HEIC
									</p>
									<p class="pointer-events-none block text-sm font-medium text-gray-500">3.9 MB</p>
								</li>
							{/each}
							<!-- More files... -->
						</ul>
					</section>
				</div>
			</main>

			<!-- Details sidebar -->
			<aside class="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
				<div class="space-y-6 pb-16">
					<div>
						<img
							src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
							alt=""
							class="block aspect-10/7 w-full rounded-lg object-cover"
						/>
						<div class="mt-4 flex items-start justify-between">
							<div>
								<h2 class="text-lg font-medium text-gray-900">
									<span class="sr-only">Details for </span>IMG_4985.HEIC
								</h2>
								<p class="text-sm font-medium text-gray-500">3.9 MB</p>
							</div>
							<button
								type="button"
								class="relative ml-4 flex size-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
							>
								<span class="absolute -inset-1.5"></span>
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
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
									/>
								</svg>
								<span class="sr-only">Favorite</span>
							</button>
						</div>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Information</h3>
						<dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Uploaded by</dt>
								<dd class="whitespace-nowrap text-gray-900">Marie Culver</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Created</dt>
								<dd class="whitespace-nowrap text-gray-900">June 8, 2020</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Last modified</dt>
								<dd class="whitespace-nowrap text-gray-900">June 8, 2020</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Dimensions</dt>
								<dd class="whitespace-nowrap text-gray-900">4032 x 3024</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Resolution</dt>
								<dd class="whitespace-nowrap text-gray-900">72 x 72</dd>
							</div>
						</dl>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Description</h3>
						<div class="mt-2 flex items-center justify-between">
							<p class="text-sm text-gray-500 italic">Add a description to this image.</p>
							<button
								type="button"
								class="relative flex size-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
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
										d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z"
									/>
								</svg>
								<span class="sr-only">Add description</span>
							</button>
						</div>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Shared with</h3>
						<ul role="list" class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
							<li class="flex items-center justify-between py-3">
								<div class="flex items-center">
									<img
										src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
										alt=""
										class="size-8 rounded-full"
									/>
									<p class="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
								</div>
								<button
									type="button"
									class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
									>Remove<span class="sr-only"> Aimee Douglas</span></button
								>
							</li>
							<li class="flex items-center justify-between py-3">
								<div class="flex items-center">
									<img
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
										class="size-8 rounded-full"
									/>
									<p class="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
								</div>
								<button
									type="button"
									class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
									>Remove<span class="sr-only"> Andrea McMillan</span></button
								>
							</li>

							<li class="flex items-center justify-between py-2">
								<button
									type="button"
									class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
								>
									<span
										class="flex size-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400"
									>
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
									</span>
									<span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500"
										>Share</span
									>
								</button>
							</li>
						</ul>
					</div>
					<div class="flex gap-x-3">
						<button
							type="button"
							class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Download</button
						>
						<button
							type="button"
							class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
							>Delete</button
						>
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>
