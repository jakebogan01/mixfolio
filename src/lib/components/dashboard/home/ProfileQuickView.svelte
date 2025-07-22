<script>
	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
>
	<div class="py-10">
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">My Profile</h6>
				<p class="mt-2 text-sm text-gray-700">Your public information.</p>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
				<button
					type="button"
					class="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-violet-400"
					>View</button
				>
			</div>
		</div>
		<div class="mt-6 px-4 text-base/7 font-semibold sm:px-6 lg:px-8">
			<div class="line-clamp-2 text-sm leading-normal font-normal">
				{@html userProfile?.biography || 'Biography unavailable'}
			</div>
			<hr class="my-4 border-gray-300" />
			<ul class="flex flex-col gap-4 p-0">
				<li class="flex items-center gap-4">
					<p class=" block text-sm leading-normal font-semibold capitalize">Name:</p>
					<p class=" block text-sm leading-normal font-normal">
						{userProfile?.name || 'Name unavailable'}
					</p>
				</li>
				<li class="flex items-center gap-4">
					<p class=" block text-sm leading-normal font-semibold capitalize">mobile:</p>
					<p class=" block text-sm leading-normal font-normal">
						{userProfile?.phone || 'Phone number unavailable'}
					</p>
				</li>
				<li class="flex items-center gap-4">
					<p class=" block text-sm leading-normal font-semibold capitalize">email:</p>
					<p class=" block text-sm leading-normal font-normal">
						{userProfile?.email || 'Email unavailable'}
					</p>
				</li>
				<li class="flex items-center gap-4">
					<p class=" block text-sm leading-normal font-semibold capitalize">location:</p>
					<p class=" block text-sm leading-normal font-normal">
						{userProfile?.address || 'Address unavailable'}
					</p>
				</li>
				<li class="flex items-center gap-4">
					<p class=" block text-sm leading-normal font-semibold capitalize">social:</p>
					<div class="flex items-center gap-4"></div>
				</li>
			</ul>
		</div>
	</div>
</div>
