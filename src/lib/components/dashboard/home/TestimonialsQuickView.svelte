<script>
	import { goto } from '$app/navigation';
	import { PROJECTS, TESTIMONIALS } from '$lib/utils/constants.js';
	import Button from '$lib/components/global/Button.svelte';

	let { userProfile } = $props();
</script>

<div
	class="border-light-border text-dark-text relative flex flex-col rounded-xl border bg-white bg-clip-border py-10"
>
	{#if userProfile?.expand?.testimonials?.length}
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="pb-2 sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900">Testimonials</h6>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
				<Button
					callBack={() => goto(TESTIMONIALS, { state: { create: true } })}
					text="Add testimonial"
					class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
				/>
			</div>
		</div>
		<div class="mt-6 max-h-72 overflow-y-auto px-4 text-base/7 font-semibold sm:px-6 lg:px-8">
			<ul role="list" class="space-y-5 divide-y divide-gray-100">
				{#each userProfile?.expand?.testimonials as testimonial (testimonial?.id)}
					<li class="flex items-center justify-between gap-x-6">
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
						<button
							type="button"
							onclick={() =>
								goto(TESTIMONIALS, { state: { view: true, testimonialId: testimonial?.id } })}
							class="bg-secondary-btn-bg sm:hover:bg-secondary-btn-hover cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold text-white sm:transition-colors"
							>View</button
						>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="flex h-full min-h-100 items-center justify-center p-6">
			<div class="flex flex-col items-center space-y-2">
				<p class="text-dark-text mt-2 text-sm">You do not have any testimonials.</p>
				<Button
					callBack={() => goto(TESTIMONIALS, { state: { create: true } })}
					text="Add testimonial"
					class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
				/>
			</div>
		</div>
	{/if}
</div>
