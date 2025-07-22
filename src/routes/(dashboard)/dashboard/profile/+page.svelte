<script>
	import Profile from '$lib/components/dashboard/profile/Profile.svelte';
	let { data } = $props();
</script>

<div
	class="relative h-72 w-full overflow-hidden rounded-xl bg-[url('https://demos.creative-tim.com/material-tailwind-dashboard-react/img/background-image.png')] bg-cover bg-center"
>
	<div class="absolute inset-0 h-full w-full bg-gray-900/75"></div>
</div>
<div
	class="relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700 shadow-md lg:mx-4"
>
	<div class="p-4">
		<div class="mb-10 flex flex-wrap items-start justify-between gap-6">
			<div class="flex items-center gap-6">
				<img
					src={data?.userProfile?.avatar_url
						? data?.userProfile?.avatar_url
						: 'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg'}
					alt="bruce-mars"
					class=" relative inline-block h-[74px] w-[74px] rounded-lg object-cover object-center shadow-lg"
				/>
				<div>
					<h5 class=" mb-1 block text-xl leading-snug font-semibold tracking-normal">
						{data?.userProfile?.name}
					</h5>
					<p class=" block text-sm leading-normal font-normal">{data?.userProfile?.role}</p>
				</div>
			</div>
			<button
				type="button"
				class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
				>Edit profile</button
			>
		</div>
		<div class="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2">
			<div
				class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
			>
				<div
					class="relative mx-0 mt-0 mb-4 overflow-hidden rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<h6 class="block text-base leading-relaxed font-semibold tracking-normal">
						Profile Information
					</h6>
				</div>
				<div class="p-0">
					<p class=" block text-sm leading-normal font-normal">
						{@html data?.userProfile?.biography}
					</p>
					<hr class="my-8 border-gray-300" />
					<ul class="flex flex-col gap-4 p-0">
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">Name:</p>
							<p class=" block text-sm leading-normal font-normal">{data?.userProfile?.name}</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">mobile:</p>
							<p class=" block text-sm leading-normal font-normal">{data?.userProfile?.phone}</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">email:</p>
							<p class=" block text-sm leading-normal font-normal">{data?.userProfile?.email}</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">location:</p>
							<p class=" block text-sm leading-normal font-normal">{data?.userProfile?.address}</p>
						</li>
						<li class="flex items-center gap-4">
							<p class=" block text-sm leading-normal font-semibold capitalize">social:</p>
							<div class="flex items-center gap-4">
								<!--Social icons go here-->
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<h6 class=" mb-3 block text-base leading-relaxed font-semibold tracking-normal">
					Platform Settings
				</h6>
				<div class="flex flex-col gap-12">
					<div>
						<p class=" mb-4 block text-xs font-semibold text-gray-500 uppercase">account</p>
						<div class="flex flex-col gap-6">
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone follows me"
									>Email me when someone follows me
								</label>
							</div>
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone answers on my post"
								>
									Email me when someone answers on my post
								</label>
							</div>
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" checked />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Email me when someone mentions me"
								>
									Email me when someone mentions me
								</label>
							</div>
						</div>
					</div>
					<div>
						<p class=" mb-4 block text-xs font-semibold text-gray-500 uppercase">application</p>
						<div class="flex flex-col gap-6">
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="New launches and projects"
								>
									New launches and projects
								</label>
							</div>
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" checked />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Monthly product updates"
								>
									Monthly product updates
								</label>
							</div>
							<div class="inline-flex items-center">
								<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
									<input type="checkbox" class="peer sr-only" />
									<span
										class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
									></span>
									<span
										class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
									></span>
								</label>
								<label
									class=" mt-px mb-0 ml-3 cursor-pointer text-sm font-normal select-none"
									for="Subscribe to newsletter"
								>
									Subscribe to newsletter
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Profile {data} />
