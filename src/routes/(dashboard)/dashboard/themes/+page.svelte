<script>
	// import { onMount } from 'svelte';
	// import { debounce } from '$lib/utils/misc.js';
	// import iro from '@jaames/iro';
	import ThemeViewer from '$lib/components/dashboard/themes/ThemeViewer.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let menuOpen = $state(false);
	let themeId = $state(null);
	// let wheelPicker;
	// let isOverriding = false;

	// const BASE_COLOR = '#924999'; // 🎨 default color for color wheel
	// const lightColor = '#ffffff'; // 🌓 override color: light mode
	// const darkColor = '#000000'; // 🌑 override color: dark mode

	// let existingPrefId;
	// let userId;
	//
	// const debouncedUpdate = debounce(async (selectedColor) => {
	// 	try {
	// 		if (existingPrefId) {
	// 			await data.pb.collection('preferences').update(existingPrefId, {
	// 				portfolio_color: selectedColor
	// 			});
	// 			console.log('✅ Color updated:', selectedColor);
	// 		} else {
	// 			const newPref = await data.pb.collection('preferences').create({
	// 				portfolio_color: selectedColor
	// 			});
	// 			await data.pb.collection('profiles').update(userId, {
	// 				preferences: newPref.id
	// 			});
	// 			console.log('✅ Preferences created:', newPref.id);
	// 		}
	// 	} catch (error) {
	// 		console.error('❌ Failed to update preferences:', error);
	// 	}
	// }, 500);

	// function setLightColor() {
	// 	isOverriding = true;
	// 	debouncedUpdate(lightColor);
	// 	wheelPicker.color.set(BASE_COLOR);
	// }
	//
	// function setDarkColor() {
	// 	isOverriding = true;
	// 	debouncedUpdate(darkColor);
	// 	wheelPicker.color.set(BASE_COLOR);
	// }

	// onMount(() => {
	// 	existingPrefId = data?.userProfile?.expand?.preferences?.id;
	// 	userId = data?.userProfile?.id;
	//
	// 	let savedColor = data?.userProfile?.expand?.preferences?.portfolio_color;
	//
	// 	if (savedColor === '#ffffff' || savedColor === '#000000') {
	// 		savedColor = '#924999';
	// 	} else {
	// 		savedColor = data?.userProfile?.expand?.preferences?.portfolio_color;
	// 	}
	//
	// 	wheelPicker = new iro.ColorPicker('#wheelPicker', {
	// 		width: 250,
	// 		color: savedColor,
	// 		borderWidth: 1,
	// 		borderColor: '#fff',
	// 		layout: [
	// 			{
	// 				component: iro.ui.Slider,
	// 				options: { sliderType: 'hue' }
	// 			}
	// 		]
	// 	});
	//
	// 	wheelPicker.on('color:change', (color) => {
	// 		if (isOverriding) {
	// 			isOverriding = false;
	// 			return;
	// 		}
	// 		debouncedUpdate(color.hexString);
	// 	});
	// });

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="space-y-12">
	<div
		class="border-light-border text-dark-text relative mt-6 flex flex-col rounded-xl border bg-white"
	>
		<div
			class="from-primary-from to-secondary-to relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr p-6 text-white shadow-lg"
		>
			<h6 class="text-base font-semibold tracking-normal">Themes</h6>
		</div>

		<div class="px-4 pb-5 sm:px-6 lg:px-8">
			<ul
				role="list"
				class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
			>
				{#each data?.themes as theme (theme?.id)}
					<li class="relative">
						<div class="group overflow-hidden rounded-lg bg-gray-300">
							<img
								src={theme?.theme_image_url ||
									'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'}
								alt={theme?.title}
								class="pointer-events-none w-full object-cover group-hover:opacity-75"
							/>
							<Button
								callBack={() => {
									toggleMenu();
									themeId = theme?.id;
								}}
								defaultStyles="absolute inset-0 focus:outline-hidden cursor-pointer"
							>
								<span class="sr-only">{theme?.title || 'Title unavailable'}</span>
							</Button>
						</div>
						<p class="pointer-events-none mt-2 block truncate text-sm font-medium">
							{theme?.title || 'Title unavailable'}
						</p>
					</li>
				{/each}
			</ul>

			<!--			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">-->
			<!--				<div class="inline-block min-w-full py-2 pb-8 align-middle sm:px-6 lg:px-8">-->
			<!--					<p class="text-sm font-normal">Select a color</p>-->
			<!--					<div class="inline-flex items-center space-x-4">-->
			<!--						<div class="ColorPicker" id="wheelPicker"></div>-->
			<!--					</div>-->
			<!--					<p class="text-sm font-normal">Light or Dark Mode</p>-->

			<!--					<button type="button" on:click={setLightColor} class="text-dark-text">-->
			<!--						<svg-->
			<!--							xmlns="http://www.w3.org/2000/svg"-->
			<!--							fill="none"-->
			<!--							viewBox="0 0 24 24"-->
			<!--							stroke-width="1.5"-->
			<!--							stroke="currentColor"-->
			<!--							class="h-6 w-6"-->
			<!--						>-->
			<!--							<path-->
			<!--								stroke-linecap="round"-->
			<!--								stroke-linejoin="round"-->
			<!--								d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"-->
			<!--							/>-->
			<!--						</svg>-->
			<!--					</button>-->

			<!--					<button type="button" on:click={setDarkColor} class="text-gray-900">-->
			<!--						<svg-->
			<!--							xmlns="http://www.w3.org/2000/svg"-->
			<!--							fill="currentColor"-->
			<!--							viewBox="0 0 24 24"-->
			<!--							class="h-6 w-6"-->
			<!--						>-->
			<!--							<path-->
			<!--								fill-rule="evenodd"-->
			<!--								d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"-->
			<!--								clip-rule="evenodd"-->
			<!--							/>-->
			<!--						</svg>-->
			<!--					</button>-->
			<!--				</div>-->
			<!--			</div>-->
		</div>
	</div>
</div>

{#if menuOpen}
	<ThemeViewer {data} {themeId} {toggleMenu} />
{/if}
