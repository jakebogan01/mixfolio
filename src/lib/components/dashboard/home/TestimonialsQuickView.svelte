<script>
	import { goto } from '$app/navigation';
	import { TESTIMONIALS } from '$lib/utils/constants.js';
	import Button from '$lib/components/global/Button.svelte';

	let { userProfile } = $props();
</script>

<div
	class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative flex flex-col overflow-x-hidden rounded-xl border bg-white bg-clip-border pt-10 pb-5 md:col-span-2 xl:col-span-1"
>
	{#if userProfile?.expand?.testimonials?.length}
		<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
			<div class="pb-2 sm:flex-auto">
				<h6 class="text-base font-semibold text-gray-900 dark:text-white">Testimonials</h6>
			</div>
			{#if userProfile?.expand?.testimonials?.length < 6}
				<div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
					<Button
						callBack={() => goto(TESTIMONIALS, { state: { create: true } })}
						text="Add testimonial"
						class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
					/>
				</div>
			{/if}
		</div>
		<div class="mt-5 flex-1 overflow-y-auto px-4 text-base/7 font-semibold sm:px-6 lg:px-8">
			<ul role="list" class="max-h-72 space-y-3.5">
				{#each userProfile?.expand?.testimonials as testimonial (testimonial?.id)}
					<li class="flex items-center justify-between gap-x-6">
						<div class="flex min-w-0 gap-x-4">
							<div class="min-w-0 flex-auto">
								<p class="text-sm/6 font-semibold text-gray-900 dark:text-white">
									{testimonial?.name || 'Name unavailable'}
								</p>
								<p class="truncate text-xs/5 text-gray-500 dark:text-gray-400">
									{testimonial?.email || 'Email unavailable'}
								</p>
							</div>
						</div>
						<Button
							callBack={() =>
								goto(TESTIMONIALS, { state: { create: true, testimonialId: testimonial?.id } })}
							text="View"
							class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark sm:hover:bg-secondary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark rounded-full! px-2.5! py-1! text-xs! font-normal!"
						/>
					</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="flex h-full min-h-100 items-center justify-center p-6">
			<div class="flex flex-col items-center space-y-2">
				<p class="text-dark-text-theme-light dark:text-dark-text-theme-dark mt-2 text-sm">
					You do not have any testimonials.
				</p>
				<Button
					callBack={() => goto(TESTIMONIALS, { state: { create: true } })}
					text="Add testimonial"
					class="bg-primary-btn-bg-theme-light dark:bg-primary-btn-bg-theme-dark sm:hover:bg-primary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
				/>
			</div>
		</div>
	{/if}
</div>
