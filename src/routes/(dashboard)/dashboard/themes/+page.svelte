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

		<h1 class="sr-only">Themes</h1>

		<!-- Main content -->
		<div class="flex flex-1 items-stretch overflow-hidden">
			<main class="flex-1 overflow-y-auto">
				<div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
					<div class="flex">
						<h1 class="flex-1 text-2xl font-bold text-white">Themes</h1>
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

						<!--sdfsdf-->
						<div class="hidden bg-gray-900 py-6 sm:block">
							<div class="mx-auto max-w-7xl">
								<div class="grid grid-cols-1 sm:hidden">
									<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
									<select
										aria-label="Select a tab"
										class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-2 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
									>
										<option>My Account</option>
										<option>Company</option>
										<option selected>Team Members</option>
										<option>Billing</option>
									</select>
									<svg
										class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-400"
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
								<div class="items-starte hidden justify-between border-b border-white/10 sm:flex">
									<nav class="flex py-4">
										<ul
											role="list"
											class="flex min-w-full flex-none gap-x-8 px-2 text-sm/6 font-semibold text-gray-400"
										>
											<li>
												<a href="#" class="">My Account</a>
											</li>
											<li>
												<a href="#" class="">Company</a>
											</li>
											<li>
												<a href="#" class="text-indigo-400">Team Members</a>
											</li>
											<li>
												<a href="#" class="">Billing</a>
											</li>
										</ul>
									</nav>
									<div class="ml-6 hidden items-center rounded-lg p-0.5 sm:flex">
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
											class="ml-0.5 rounded-md p-1.5 text-gray-400 shadow-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset"
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
					</div>

					<!-- Gallery -->
					<section class="mt-8 pb-16" aria-labelledby="gallery-heading">
						<h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
						<ul
							role="list"
							class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
						>
							{#each Array(20) as _}
								<li class="relative">
									<div
										class="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
									>
										<img
											src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
											alt=""
											class="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
										/>
										<button type="button" class="absolute inset-0 focus:outline-hidden">
											<span class="sr-only">View details for IMG_4985.HEIC</span>
										</button>
									</div>
									<p
										class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-400"
									>
										IMG_4985.HEIC
									</p>
									<p class="pointer-events-none block text-sm font-medium text-gray-400">3.9 MB</p>
								</li>
							{/each}
						</ul>
					</section>
				</div>
			</main>

			<!-- Details sidebar -->
			<aside class="hidden w-96 overflow-y-auto border-l border-gray-700 p-8 lg:block">
				<div class="space-y-6 pb-16">
					<div>
						<img
							src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=512&amp;q=80"
							alt=""
							class="block aspect-10/7 w-full rounded-lg object-cover"
						/>
						<div class="mt-4 flex items-start justify-between">
							<div>
								<h2 class="text-base font-semibold text-gray-900">
									<span class="sr-only">Details for </span>IMG_4985.HEIC
								</h2>
								<p class="text-sm font-medium text-gray-500">3.9 MB</p>
							</div>
							<button
								type="button"
								class="relative ml-4 flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
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
									></path>
								</svg>
								<span class="sr-only">Favorite</span>
							</button>
						</div>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Information</h3>
						<dl class="mt-2 divide-y divide-gray-700 border-t border-b border-gray-700">
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Uploaded by</dt>
								<dd class="text-gray-900">Marie Culver</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Created</dt>
								<dd class="text-gray-900">June 8, 2020</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Last modified</dt>
								<dd class="text-gray-900">June 8, 2020</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Dimensions</dt>
								<dd class="text-gray-900">4032 x 3024</dd>
							</div>
							<div class="flex justify-between py-3 text-sm font-medium">
								<dt class="text-gray-500">Resolution</dt>
								<dd class="text-gray-900">72 x 72</dd>
							</div>
						</dl>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Description</h3>
						<div class="mt-2 flex items-center justify-between">
							<p class="text-sm text-gray-500 italic">Add a description to this image.</p>
							<button
								type="button"
								class="relative -mr-2 flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
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
									></path>
								</svg>
								<span class="sr-only">Add description</span>
							</button>
						</div>
					</div>
					<div>
						<h3 class="font-medium text-gray-900">Shared with</h3>
						<ul role="list" class="mt-2 divide-y divide-gray-700 border-t border-b border-gray-700">
							<li class="flex items-center justify-between py-3">
								<div class="flex items-center">
									<img
										src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=1024&amp;h=1024&amp;q=80"
										alt=""
										class="size-8 rounded-full"
									/>
									<p class="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
								</div>
								<button
									type="button"
									class="ml-6 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-hidden"
									>Remove<span class="sr-only"> Aimee Douglas</span></button
								>
							</li>
							<li class="flex items-center justify-between py-3">
								<div class="flex items-center">
									<img
										src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixqx=oilqXxSqey&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
										alt=""
										class="size-8 rounded-full"
									/>
									<p class="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
								</div>
								<button
									type="button"
									class="ml-6 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-hidden"
									>Remove<span class="sr-only"> Andrea McMillan</span></button
								>
							</li>
							<li class="flex items-center justify-between py-2">
								<button
									type="button"
									class="group -ml-1 flex items-center rounded-md p-1 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-hidden"
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
											></path>
										</svg>
									</span>
									<span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500"
										>Share</span
									>
								</button>
							</li>
						</ul>
					</div>
					<div class="flex">
						<button
							type="button"
							class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Download</button
						>
						<button
							type="button"
							class="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
							>Delete</button
						>
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>
