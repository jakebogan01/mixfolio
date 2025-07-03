<script>
	import DashboardNav from '$lib/components/dashboard/DashboardNav.svelte';

	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full overflow-hidden">
  ```
-->
<div class="flex h-full">
	<!-- Narrow sidebar -->
	<DashboardNav />

	{#if menuOpen}
		<!--
	  Mobile menu

	  Off-canvas menu for mobile, show/hide based on off-canvas menu state.
	-->
		<div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
			<!--
			  Off-canvas menu backdrop, show/hide based on off-canvas menu state.

			  Entering: "transition-opacity ease-linear duration-300"
				From: "opacity-0"
				To: "opacity-100"
			  Leaving: "transition-opacity ease-linear duration-300"
				From: "opacity-100"
				To: "opacity-0"
			-->
			<div class="fixed inset-0 bg-gray-600/75" aria-hidden="true"></div>

			<div class="fixed inset-0 z-40 flex">
				<!--
				  Off-canvas menu, show/hide based on off-canvas menu state.

				  Entering: "transition ease-in-out duration-300 transform"
					From: "-translate-x-full"
					To: "translate-x-0"
				  Leaving: "transition ease-in-out duration-300 transform"
					From: "translate-x-0"
					To: "-translate-x-full"
				-->
				<div class="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
					<!--
					  Close button, show/hide based on off-canvas menu state.

					  Entering: "ease-in-out duration-300"
						From: "opacity-0"
						To: "opacity-100"
					  Leaving: "ease-in-out duration-300"
						From: "opacity-100"
						To: "opacity-0"
					-->
					<div class="absolute top-1 right-0 -mr-14 p-1">
						<button
							onclick={toggleMenu}
							type="button"
							class="flex size-12 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-hidden"
						>
							<svg
								class="size-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
							<span class="sr-only">Close sidebar</span>
						</button>
					</div>

					<div class="flex shrink-0 items-center px-4">
						<img
							class="h-8 w-auto"
							src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
							alt="Your Company"
						/>
					</div>
					<div class="mt-5 h-0 flex-1 overflow-y-auto px-2">
						<nav class="flex h-full flex-col">
							<div class="space-y-1">
								<!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-800 hover:text-white" -->
								<a
									href="#"
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<!-- Current: "text-white", Default: "text-indigo-300 group-hover:text-white" -->
									<svg
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
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
											d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
										/>
									</svg>
									<span>Home</span>
								</a>
								<a
									href="#"
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<svg
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
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
											d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
										/>
									</svg>
									<span>All Files</span>
								</a>
								<a
									href="#"
									class="group flex items-center rounded-md bg-indigo-800 px-3 py-2 text-sm font-medium text-white"
									aria-current="page"
								>
									<svg
										class="mr-3 size-6 text-white"
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
									<span>Photos</span>
								</a>
								<a
									href="#"
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<svg
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
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
											d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
										/>
									</svg>
									<span>Shared</span>
								</a>
								<a
									href="#"
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<svg
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
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
											d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
										/>
									</svg>
									<span>Albums</span>
								</a>
								<a
									href="#"
									class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
								>
									<svg
										class="mr-3 size-6 text-indigo-300 group-hover:text-white"
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
									<span>Settings</span>
								</a>
							</div>
						</nav>
					</div>
				</div>

				<div class="w-14 shrink-0" aria-hidden="true">
					<!-- Dummy element to force sidebar to shrink to fit close icon -->
				</div>
			</div>
		</div>
	{/if}

	<!-- Content area -->
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
									href="#"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-0">Your profile</a
								>
								<a
									href="#"
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
								<form action="#" class="relative">
									<div
										class="rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
									>
										<label for="comment" class="sr-only">Add your comment</label>
										<textarea
											rows="3"
											name="comment"
											id="comment"
											class="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
											placeholder="Add your comment..."
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
