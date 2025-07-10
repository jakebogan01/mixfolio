<script>
	import { page } from '$app/state';
	import { onMount, onDestroy } from 'svelte';
	import { DotLottie } from '@lottiefiles/dotlottie-web';
	let dotLotties = $state({});

	let cleanup, testElement;

	onMount(() => {
		dotLotties = new DotLottie({
			canvas: testElement,
			src: '/404.lottie',
			autoplay: true,
			loop: true
		});
	});

	onDestroy(() => {
		cleanup?.();
	});
</script>

<!--<p>custom error page</p>-->
<!--<h1>{page.status}: {page.error.message}</h1>-->

<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
	<canvas
		bind:this={testElement}
		class="size-100"
		draggable="false"
		aria-label="Paintbrush icon representing web design"
	></canvas>
	<div class="text-center">
		<p class="text-base font-semibold text-indigo-600">Page {page.error.message}</p>
		<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
			{page.status}
		</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
			Sorry, we couldn’t find the page you’re looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>Go back home</a
			>
			<!--			<a href="/contact" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>-->
		</div>
	</div>
</main>
