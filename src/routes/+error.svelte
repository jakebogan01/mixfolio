<script>
	import { page } from '$app/state';
	import { onMount, onDestroy } from 'svelte';
	import { DotLottie } from '@lottiefiles/dotlottie-web';
	let dotLotties = $state({});

	let cleanup, testElement;

	onMount(() => {
		let source;
		if (page.status === 404) {
			source = '/404.lottie';
		} else {
			source = '/default.lottie';
		}

		dotLotties = new DotLottie({
			canvas: testElement,
			src: source,
			autoplay: true,
			loop: true
		});
	});

	onDestroy(() => {
		cleanup?.();
	});
</script>

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
		<canvas
		bind:this={testElement}
		class="size-100"
		draggable="false"
		aria-label="Paintbrush icon representing web design"
	></canvas>
	<div class="text-center">
		<p class="text-base font-semibold text-indigo-600">{page.error.message}</p>
		<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
			OOPS
		</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
			Looks like we ran into an error, sorry about that.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Go back home</a
			>
		</div>
	</div>
</main>
