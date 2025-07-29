<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import TestimonialForm from '$lib/components/dashboard/testimonials/TestimonialForm.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let menuOpen = $state(false);
	let viewTestimonial = $state(false);
	let testimonialId = $state(null);

	onMount(() => {
		if (page?.state?.create) {
			menuOpen = true;
			viewTestimonial = false;
		} else if (page?.state?.view) {
			menuOpen = true;
			viewTestimonial = true;
			testimonialId = page?.state?.testimonialId;
		}
	});

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="space-y-12">
	<div
		class="border-light-border text-dark-text relative mt-6 flex flex-col rounded-xl border bg-white bg-clip-border"
	>
		<div
			class="from-primary-from to-secondary-to relative mx-4 -mt-6 mb-8 overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border p-6 text-white shadow-lg shadow-gray-900/20"
		>
			<h6 class="block text-base leading-relaxed font-semibold tracking-normal text-white">
				Testimonials
			</h6>
		</div>
		{#if data?.userProfile?.expand?.testimonials?.length}
			<div class="px-4 sm:px-6 lg:px-8">
				{#if data?.userProfile?.expand?.testimonials?.length < 6}
					<div class="sm:flex sm:items-center sm:justify-end">
						<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<Button
								callBack={() => {
									toggleMenu();
									viewTestimonial = false;
								}}
								text="Add testimonial"
								class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
							/>
						</div>
					</div>
				{/if}
				<div class="mt-8 flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
											>Name</th
										>
										<th
											scope="col"
											class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
											>Company</th
										>
										<th
											scope="col"
											class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
											>Title</th
										>
										<th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-0">
											<span class="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white">
									{#each data?.userProfile?.expand?.testimonials as testimonial (testimonial?.id)}
										<tr>
											<td class="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
												<div class="flex items-center">
													<div class="size-11 shrink-0">
														{#if testimonial?.testimonial_image_url}
															<img
																src={testimonial?.testimonial_image_url}
																alt={testimonial?.testimonial_image_url || 'User avatar'}
																class="size-11 rounded-full"
															/>
														{:else}
															<span
																class="inline-block size-11 overflow-hidden rounded-full bg-gray-200"
															>
																<svg
																	viewBox="0 0 24 24"
																	fill="currentColor"
																	class="text-light-text size-full"
																	><path
																		d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
																	/></svg
																>
															</span>
														{/if}
													</div>
													<div class="ml-4">
														<div class="font-medium text-gray-900">
															{testimonial?.name || 'Name unavailable'}
														</div>
														<div class="mt-1 text-gray-500">
															{testimonial?.email || 'Email unavailable'}
														</div>
													</div>
												</div>
											</td>
											<td
												class="hidden px-3 py-5 text-sm whitespace-nowrap text-gray-500 sm:table-cell"
											>
												<div class="mt-1 text-gray-500">
													{testimonial?.company || 'Company unavailable'}
												</div>
											</td>
											<td
												class="hidden px-3 py-5 text-sm whitespace-nowrap text-gray-500 sm:table-cell"
												>{testimonial?.role || 'Role unavailable'}</td
											>
											<td
												class="relative py-5 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-0"
											>
												<Button
													callBack={() => {
														toggleMenu();
														viewTestimonial = true;
														testimonialId = testimonial?.id;
													}}
													text="View"
													class="bg-secondary-btn-bg sm:hover:bg-secondary-btn-hover ml-auto rounded-full! px-2.5! py-1! text-xs! font-normal!"
												>
													<span class="sr-only">, {testimonial?.name || 'Name unavailable'}</span>
												</Button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex h-full items-center justify-center pt-6 pb-16">
				<div class="flex flex-col items-center space-y-2">
					<p class="text-dark-text mt-2 text-sm">You do not have any testimonials.</p>
					<Button
						callBack={() => {
							toggleMenu();
							viewTestimonial = false;
						}}
						text="Add testimonial"
						class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
					/>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if menuOpen}
	<TestimonialForm {data} {testimonialId} {viewTestimonial} {toggleMenu} />
{/if}
