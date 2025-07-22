<script>
	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700"
>
	{#if userProfile?.expand?.testimonials?.length}
		<div class="relative m-0 overflow-hidden rounded-xl bg-transparent p-6 text-gray-700">
			<h6 class=" mb-2 block font-sans text-base leading-relaxed font-semibold tracking-normal">
				My Testimonials
			</h6>
			<p class="mt-2 text-sm text-gray-700">A list of all your testimonials.</p>
		</div>
		<div class="max-h-72 overflow-y-auto p-6 pt-0">
			<ul role="list" class="divide-y divide-gray-100">
				{#each userProfile?.expand?.testimonials as testimonial (testimonial?.id)}
					<li class="flex items-center justify-between gap-x-6 py-5">
						<div class="flex min-w-0 gap-x-4">
							<img
								src={testimonial?.testimonial_image_url ||
									'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
								alt=""
								class="size-12 flex-none rounded-full bg-gray-50"
							/>
							<div class="min-w-0 flex-auto">
								<p class="text-sm/6 font-semibold text-gray-900">
									{testimonial?.name || 'Name unavailable'}
								</p>
								<p class="mt-1 truncate text-xs/5 text-gray-500">
									{testimonial?.email || 'Email unavailable'}
								</p>
							</div>
						</div>
						<a
							href="/"
							class="rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white sm:transition-colors sm:hover:bg-violet-400"
							>View</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="flex h-full min-h-100 items-center justify-center p-6">
			<div class="flex flex-col items-center space-y-2">
				<p class="mt-2 text-sm text-gray-700">You do not have any testimonials.</p>
				<button
					type="button"
					class="block cursor-pointer rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Add a testimonial</button
				>
			</div>
		</div>
	{/if}
</div>
