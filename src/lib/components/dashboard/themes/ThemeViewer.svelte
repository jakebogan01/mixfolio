<script>
	import iro from '@jaames/iro';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { debounce } from '$lib/utils/misc.js';
	import { toISODate } from '$lib/utils/date.js';
	import { page } from '$app/state';
	import Button from '$lib/components/global/Button.svelte';
	import { invalidate } from '$app/navigation';
	import { toastMessage } from '$lib/utils/toast.js';

	let { data, themeId, toggleMenu = () => {} } = $props();
	let theme = $state(null);
	let el;

	onMount(() => {
		if (themeId) {
			theme = data?.themes.find((theme) => theme?.id === themeId);
		}

		const existingColor = data?.userProfile?.expand?.preferences?.portfolio_color || '#924999';
		const existingPrefId = data?.userProfile?.expand?.preferences?.id;
		const userId = data?.userProfile?.id;

		const wheelPicker = new iro.ColorPicker('#wheelPicker', {
			width: 250,
			color: existingColor,
			borderWidth: 1,
			borderColor: '#fff',
			layout: [
				{
					component: iro.ui.Slider,
					options: { id: 'hue-slider', sliderType: 'hue' }
				}
			]
		});

		const debouncedUpdate = debounce(async (selectedColor) => {
			try {
				if (existingPrefId) {
					await data.pb.collection('preferences').update(existingPrefId, {
						portfolio_color: selectedColor
					});
					console.log('✅ Color updated:', selectedColor);
				} else {
					const newPref = await data.pb.collection('preferences').create({
						portfolio_color: selectedColor
					});
					await data.pb.collection('profiles').update(userId, {
						preferences: newPref.id
					});
					console.log('✅ Preferences created:', newPref.id);
				}
				el.contentWindow.location.reload(true);
			} catch (error) {
				console.dir(error, { depth: null });
			}
		}, 500);

		wheelPicker.on('color:change', (color) => {
			debouncedUpdate(color.hexString);
		});
	});

	const updateUserPreferences = async () => {
		try {
			await data.pb
				.collection('preferences')
				.update(data?.userProfile?.expand?.preferences?.id, { theme_id: theme?.id });
			toggleMenu();
			await invalidate('user_profile');
			toastMessage('success', 'Successfully updated your theme!');
		} catch (error) {
			console.dir(error, { depth: null });
		}
	};
</script>

<div role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="relative z-50">
	<div class="fixed inset-0"></div>
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
				<div
					in:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					out:fly|local={{ x: 448, opacity: 1, duration: 300 }}
					class="border-light-border pointer-events-auto w-screen max-w-md border-l"
				>
					<form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
						<div class="h-0 flex-1 overflow-y-auto">
							<div class="bg-primary px-4 py-6 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 id="drawer-title" class="text-base font-semibold text-white">View Theme</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											type="button"
											onclick={toggleMenu}
											class="bg-secondary-btn-bg relative cursor-pointer rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
										>
											<span class="absolute -inset-2.5"></span>
											<span class="sr-only">Close panel</span>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												data-slot="icon"
												aria-hidden="true"
												class="size-6"
											>
												<path
													d="M6 18 18 6M6 6l12 12"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div>
								<div class="pb-1 sm:pb-6">
									<div>
										<div
											class="h-60 bg-white bg-contain bg-center bg-no-repeat"
											style="background-image: url({theme?.theme_image_url})"
										></div>
										<div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
											<div class="sm:flex-1">
												<div>
													<div class="flex items-center">
														<h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
															{theme?.title || 'Title unavailable'}
														</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
									<dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
										<div>
											<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
												Added on
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
												{toISODate(theme?.created) || 'Date unavailable'}
											</dd>
										</div>
										<div>
											<dt class="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
												Theme picker
											</dt>
											<dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
												<div class="inline-flex items-center">
													<div class="ColorPicker" id="wheelPicker"></div>
												</div>
											</dd>
										</div>
										<div class="h-75 w-99">
											<iframe
												bind:this={el}
												src={`${page?.url?.origin}/portfolio/${data?.userProfile?.slug}`}
												class="pointer-events-auto h-200 w-320 origin-top-left scale-[0.32]"
												title="Portfolio Preview"
												scrolling="no"
											></iframe>
										</div>
									</dl>
								</div>
							</div>
						</div>
						<div class="flex shrink-0 justify-end px-4 py-4">
							<Button
								callBack={toggleMenu}
								text="Close"
								class="text-dark-text! border-light-border border bg-white"
							/>
							<Button
								callBack={updateUserPreferences}
								text="Select"
								class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover ml-4"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
