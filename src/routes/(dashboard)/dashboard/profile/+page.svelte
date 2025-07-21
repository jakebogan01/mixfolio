<script>
	// import Profile from '$lib/components/dashboard/profile/Profile.svelte';
	// let { data } = $props();
</script>

<!--<Profile {data} />-->

<div
	class="relative h-72 w-full overflow-hidden rounded-xl bg-[url('https://demos.creative-tim.com/material-tailwind-dashboard-react/img/background-image.png')] bg-cover bg-center"
>
	<div class="absolute inset-0 h-full w-full bg-gray-900/75"></div>
</div>
<div
	class="relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700 shadow-md lg:mx-4"
>
	<div class="p-4">
		<div class="mb-10 flex flex-wrap items-center justify-between gap-6">
			<div class="flex items-center gap-6">
				<img
					src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg"
					alt="bruce-mars"
					class=" relative inline-block h-[74px] w-[74px] rounded-lg object-cover object-center shadow-lg"
				/>
				<div>
					<h5 class=" mb-1 block text-xl leading-snug font-semibold tracking-normal">
						Richard Davis
					</h5>
					<p class=" block text-sm leading-normal font-normal">CEO / Co-Founder</p>
				</div>
			</div>
		</div>
		<div class="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
			<div>
				<h6 class=" mb-3 block text-base leading-relaxed font-semibold tracking-normal">
					Platform Settings
				</h6>
				<div class="flex flex-col gap-12">
					<div>
						<p class=" mb-4 block text-xs font-semibold text-gray-500 uppercase">account</p>
						<div class="flex flex-col gap-6">
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="Email me when someone follows me"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 before:absolute before:h-full before:w-full before:rounded-full before:bg-blue-500 before:content-[''] peer-checked:before:bg-red-500 checked:bg-gray-900"
										checked=""
									/><label
										for="Email me when someone follows me"
										class="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-gray-900 bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-white before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><span
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></span></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone follows me">Email me when someone follows me</label
								>
							</div>
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="Email me when someone answers on my post"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 peer-checked:before:bg-gray-900 checked:bg-gray-900"
									/><label
										for="Email me when someone answers on my post"
										class=" before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><div
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></div></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone answers on my post"
									>Email me when someone answers on my post</label
								>
							</div>
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="Email me when someone mentions me"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 peer-checked:before:bg-gray-900 checked:bg-gray-900"
										checked=""
									/><label
										for="Email me when someone mentions me"
										class=" before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><span
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></span></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone mentions me">Email me when someone mentions me</label
								>
							</div>
						</div>
					</div>
					<div>
						<p class=" mb-4 block text-xs font-semibold text-gray-500 uppercase">application</p>
						<div class="flex flex-col gap-6">
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="New launches and projects"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 peer-checked:before:bg-gray-900 checked:bg-gray-900"
									/><label
										for="New launches and projects"
										class=" before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><div
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></div></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="New launches and projects">New launches and projects</label
								>
							</div>
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="Monthly product updates"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 peer-checked:before:bg-gray-900 checked:bg-gray-900"
										checked=""
									/><label
										for="Monthly product updates"
										class=" before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><div
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></div></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Monthly product updates">Monthly product updates</label
								>
							</div>
							<div class="inline-flex items-center">
								<div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
									<input
										id="Subscribe to newsletter"
										type="checkbox"
										class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 peer-checked:border-gray-900 peer-checked:before:bg-gray-900 checked:bg-gray-900"
									/><label
										for="Subscribe to newsletter"
										class=" before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 peer-checked:translate-x-full peer-checked:border-gray-900 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity peer-checked:before:bg-gray-900 hover:before:opacity-10"
										><div
											class="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										></div></label
									>
								</div>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Subscribe to newsletter">Subscribe to newsletter</label
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
			>
				<div
					class="relative mx-0 mt-0 mb-4 flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<h6 class=" block text-base leading-relaxed font-semibold tracking-normal">
						Profile Information
					</h6>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
						class=" h-4 w-4 cursor-pointer"
						><path
							d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
						></path></svg
					>
				</div>
				<div class="p-0">
					<p class=" block text-sm leading-normal font-normal">
						Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally
						difficult paths, choose the one more painful in the short term (pain avoidance is
						creating an illusion of equality).
					</p>
					<hr class=" my-8" />
					<ul class="flex flex-col gap-4 p-0">
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">first name:</p>
							<p class=" block text-sm leading-normal font-normal">Alec M. Thompson</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">mobile:</p>
							<p class=" block text-sm leading-normal font-normal">(44) 123 1234 123</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">email:</p>
							<p class=" block text-sm leading-normal font-normal">alecthompson@mail.com</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">location:</p>
							<p class=" block text-sm leading-normal font-normal">USA</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">social:</p>
							<div class="flex items-center gap-4">
								<i class="fa-brands fa-facebook text-blue-700"></i><i
									class="fa-brands fa-twitter text-blue-400"
								></i><i class="fa-brands fa-instagram text-purple-500"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<h6 class=" mb-3 block text-base leading-relaxed font-semibold tracking-normal">
					Platform Settings
				</h6>
				<ul class="flex flex-col gap-6">
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<img
								src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/team-1.jpeg"
								alt="Sophie B."
								class=" relative inline-block h-12 w-12 rounded-lg object-cover object-center shadow-lg"
							/>
							<div>
								<p class=" mb-1 block text-sm leading-normal font-semibold">Sophie B.</p>
								<p class=" block text-xs font-normal">Hi! I need more information...</p>
							</div>
						</div>
						<button
							class="rounded-lg px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">reply</button
						>
					</div>
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<img
								src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/team-1.jpeg"
								alt="Alexander"
								class=" relative inline-block h-12 w-12 rounded-lg object-cover object-center shadow-lg"
							/>
							<div>
								<p class=" mb-1 block text-sm leading-normal font-semibold">Alexander</p>
								<p class=" block text-xs font-normal">Awesome work, can you...</p>
							</div>
						</div>
						<button
							class="rounded-lg px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">reply</button
						>
					</div>
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<img
								src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/team-1.jpeg"
								alt="Ivanna"
								class=" relative inline-block h-12 w-12 rounded-lg object-cover object-center shadow-lg"
							/>
							<div>
								<p class=" mb-1 block text-sm leading-normal font-semibold">Ivanna</p>
								<p class=" block text-xs font-normal">About files I can...</p>
							</div>
						</div>
						<button
							class="rounded-lg px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">reply</button
						>
					</div>
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<img
								src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/team-1.jpeg"
								alt="Peterson"
								class=" relative inline-block h-12 w-12 rounded-lg object-cover object-center shadow-lg"
							/>
							<div>
								<p class=" mb-1 block text-sm leading-normal font-semibold">Peterson</p>
								<p class=" block text-xs font-normal">Have a great afternoon...</p>
							</div>
						</div>
						<button
							class="rounded-lg px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">reply</button
						>
					</div>
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4">
							<img
								src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/team-1.jpeg"
								alt="Bruce Mars"
								class=" relative inline-block h-12 w-12 rounded-lg object-cover object-center shadow-lg"
							/>
							<div>
								<p class=" mb-1 block text-sm leading-normal font-semibold">Bruce Mars</p>
								<p class=" block text-xs font-normal">Hi! I need more information...</p>
							</div>
						</div>
						<button
							class="rounded-lg px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button">reply</button
						>
					</div>
				</ul>
			</div>
		</div>
	</div>
</div>
