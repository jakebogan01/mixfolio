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
				<header>
					<!-- Secondary navigation -->
					<nav class="flex overflow-x-auto border-b border-white/10 py-4">
						<ul
							role="list"
							class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
						>
							<li>
								<a href="#" class="text-indigo-400">Overview</a>
							</li>
							<li>
								<a href="#" class="">Activity</a>
							</li>
							<li>
								<a href="#" class="">Settings</a>
							</li>
							<li>
								<a href="#" class="">Collaborators</a>
							</li>
							<li>
								<a href="#" class="">Notifications</a>
							</li>
						</ul>
					</nav>

					<!-- Heading -->
					<div
						class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
					>
						<div>
							<div class="flex items-center gap-x-3">
								<div class="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
									<div class="size-2 rounded-full bg-current"></div>
								</div>
								<h1 class="flex gap-x-3 text-base/7">
									<span class="font-semibold text-white">Planetaria</span>
									<span class="text-gray-600">/</span>
									<span class="font-semibold text-white">mobile-api</span>
								</h1>
							</div>
							<p class="mt-2 text-xs/6 text-gray-400">Deploys from GitHub via main branch</p>
						</div>
						<div
							class="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-400/30 ring-inset sm:order-0"
						>
							Production
						</div>
					</div>

					<!-- Stats -->
					<div class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
						<div class="border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8">
							<p class="text-sm/6 font-medium text-gray-400">Number of deploys</p>
							<p class="mt-2 flex items-baseline gap-x-2">
								<span class="text-4xl font-semibold tracking-tight text-white">405</span>
							</p>
						</div>
						<div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
							<p class="text-sm/6 font-medium text-gray-400">Average deploy time</p>
							<p class="mt-2 flex items-baseline gap-x-2">
								<span class="text-4xl font-semibold tracking-tight text-white">3.65</span>
								<span class="text-sm text-gray-400">mins</span>
							</p>
						</div>
						<div class="border-t border-white/5 px-4 py-6 sm:px-6 lg:border-l lg:px-8">
							<p class="text-sm/6 font-medium text-gray-400">Number of servers</p>
							<p class="mt-2 flex items-baseline gap-x-2">
								<span class="text-4xl font-semibold tracking-tight text-white">3</span>
							</p>
						</div>
						<div class="border-t border-white/5 px-4 py-6 sm:border-l sm:px-6 lg:px-8">
							<p class="text-sm/6 font-medium text-gray-400">Success rate</p>
							<p class="mt-2 flex items-baseline gap-x-2">
								<span class="text-4xl font-semibold tracking-tight text-white">98.5%</span>
							</p>
						</div>
					</div>
				</header>

				<section class="border-t border-white/10 pt-11">
					<h2 class="px-4 text-base/7 font-semibold text-white sm:px-6 lg:px-8">Latest activity</h2>
					<table class="mt-6 w-full text-left whitespace-nowrap">
						<colgroup>
							<col class="w-full sm:w-4/12" />
							<col class="lg:w-4/12" />
							<col class="lg:w-2/12" />
							<col class="lg:w-1/12" />
							<col class="lg:w-1/12" />
						</colgroup>
						<thead class="border-b border-white/10 text-sm/6 text-white">
							<tr>
								<th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">User</th>
								<th scope="col" class="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">Commit</th
								>
								<th
									scope="col"
									class="py-2 pr-4 pl-0 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
									>Status</th
								>
								<th scope="col" class="hidden py-2 pr-8 pl-0 font-semibold md:table-cell lg:pr-20"
									>Duration</th
								>
								<th
									scope="col"
									class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
									>Deployed at</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each Array(20) as _}
								<tr>
									<td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
										<div class="flex items-center gap-x-4">
											<img
												src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
												class="size-8 rounded-full bg-gray-800"
											/>
											<div class="truncate text-sm/6 font-medium text-white">Michael Foster</div>
										</div>
									</td>
									<td class="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
										<div class="flex gap-x-3">
											<div class="font-mono text-sm/6 text-gray-400">2d89f0c8</div>
											<span
												class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-gray-400/20 ring-inset"
												>main</span
											>
										</div>
									</td>
									<td class="py-4 pr-4 pl-0 text-sm/6 sm:pr-8 lg:pr-20">
										<div class="flex items-center justify-end gap-x-2 sm:justify-start">
											<time class="text-gray-400 sm:hidden" datetime="2023-01-23T11:00"
												>45 minutes ago</time
											>
											<div class="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
												<div class="size-1.5 rounded-full bg-current"></div>
											</div>
											<div class="hidden text-white sm:block">Completed</div>
										</div>
									</td>
									<td class="hidden py-4 pr-8 pl-0 text-sm/6 text-gray-400 md:table-cell lg:pr-20"
										>25s</td
									>
									<td
										class="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8"
									>
										<time datetime="2023-01-23T11:00">45 minutes ago</time>
									</td>
								</tr>
							{/each}
							<!-- More items... -->
						</tbody>
					</table>
				</section>
			</div>
		</div>
	</div>
</div>
