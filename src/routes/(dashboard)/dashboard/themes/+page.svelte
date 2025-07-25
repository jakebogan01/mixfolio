<script>
	import { onMount } from 'svelte';
	import { debounce } from '$lib/utils/misc.js';
	import iro from '@jaames/iro';

	let { data } = $props();
	let wheelPicker;
	let isOverriding = false;

	const BASE_COLOR = '#924999';         // 🎨 default color for color wheel
	const lightColor = '#ffffff';         // 🌓 override color: light mode
	const darkColor = '#000000';          // 🌑 override color: dark mode

	let existingPrefId;
	let userId;

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
		} catch (error) {
			console.error('❌ Failed to update preferences:', error);
		}
	}, 500);

	function setLightColor() {
		isOverriding = true;
		debouncedUpdate(lightColor);
		wheelPicker.color.set(BASE_COLOR);
	}

	function setDarkColor() {
		isOverriding = true;
		debouncedUpdate(darkColor);
		wheelPicker.color.set(BASE_COLOR);
	}

	onMount(() => {
		existingPrefId = data?.userProfile?.expand?.preferences?.id;
		userId = data?.userProfile?.id;

		let savedColor = data?.userProfile?.expand?.preferences?.portfolio_color;

		if (savedColor === '#ffffff' || savedColor === '#000000') {
			savedColor = '#924999';
		} else{
			savedColor = data?.userProfile?.expand?.preferences?.portfolio_color;
		}

		wheelPicker = new iro.ColorPicker('#wheelPicker', {
			width: 250,
			color: savedColor,
			borderWidth: 1,
			borderColor: '#fff',
			layout: [
				{
					component: iro.ui.Slider,
					options: { sliderType: 'hue' }
				}
			]
		});

		wheelPicker.on('color:change', (color) => {
			if (isOverriding) {
				isOverriding = false;
				return;
			}
			debouncedUpdate(color.hexString);
		});
	});
</script>
<div class="space-y-12">
	<div class="relative mt-6 flex flex-col rounded-xl border border-gray-300 bg-white text-gray-700">
		<div class="relative mx-4 -mt-6 mb-8 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 p-6 text-white shadow-lg">
			<h6 class="text-base font-semibold tracking-normal">Themes</h6>
		</div>

		<div class="px-4 sm:px-6 lg:px-8">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 pb-8 align-middle sm:px-6 lg:px-8">
					<p class="text-sm font-normal">Select a color</p>
					<div class="inline-flex items-center space-x-4">
						<div class="ColorPicker" id="wheelPicker"></div>
						</div>
						<p class="text-sm font-normal">Light or Dark Mode</p>

						<button type="button" on:click={setLightColor} class="text-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									 stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
								<path stroke-linecap="round" stroke-linejoin="round"
											d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
							</svg>
						</button>

						<button type="button" on:click={setDarkColor} class="text-gray-900">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
									 class="w-6 h-6">
								<path fill-rule="evenodd"
											d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
											clip-rule="evenodd" />
							</svg>
						</button>
					</div>
				</div>
			</div>
	</div>
</div>
