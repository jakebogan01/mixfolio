<script>
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let canvasEl, uploadEl;
	let ctx;

	const FRAME_SIZE = 600;
	const ZOOM_STEP = 1.05;
	const MAX_SCALE = 4;

	// Image state
	let img = new Image();
	let appScale = 1;
	let minScale = 1;
	let offsetX = 0;
	let offsetY = 0;

	// Interaction state
	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let lastTouchDist = null;

	// Utility
	const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

	// Compute the minimum appScale to fully cover the crop frame
	function computeMinScale() {
		return Math.min(1, Math.max(FRAME_SIZE / img.width, FRAME_SIZE / img.height));
	}

	// Center image in the canvas at current appScale
	function centerImage() {
		offsetX = (canvasEl.width - img.width * appScale) / 2;
		offsetY = (canvasEl.height - img.height * appScale) / 2;
	}

	// Clamp offsets so crop frame is always covered
	function clampOffsets() {
		const dispW = img.width * appScale;
		const dispH = img.height * appScale;
		const left = (canvasEl.width - FRAME_SIZE) / 2;
		const top = (canvasEl.height - FRAME_SIZE) / 2;
		const right = left + FRAME_SIZE;
		const bottom = top + FRAME_SIZE;

		offsetX = clamp(offsetX, right - dispW, left);
		offsetY = clamp(offsetY, bottom - dispH, top);
	}

	// Draw image onto canvas
	function draw() {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.save();
		clampOffsets();
		ctx.translate(offsetX, offsetY);
		ctx.scale(appScale, appScale);
		ctx.drawImage(img, 0, 0);
		ctx.restore();
	}

	// Load and initialize image
	function setupImage(src) {
		img = new Image();
		img.onload = () => {
			minScale = computeMinScale();
			appScale = minScale;
			centerImage();
			draw();
		};
		img.src = src;
	}

	// Zoom around a point
	function zoomAt(dx, dy, factor) {
		const newScale = clamp(appScale * factor, minScale, MAX_SCALE);
		const imgX = (dx - offsetX) / appScale;
		const imgY = (dy - offsetY) / appScale;
		appScale = newScale;
		offsetX = dx - imgX * appScale;
		offsetY = dy - imgY * appScale;
		draw();
	}

	// Touch distance for pinch
	function getTouchDist(e) {
		const [a, b] = e.touches;
		return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
	}

	// Handle drag movements
	function onDrag(dx, dy) {
		offsetX += dx;
		offsetY += dy;
		draw();
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		canvasEl.width = 1000;
		canvasEl.height = 1000;

		if (showImageCropper.resultEl?.src?.startsWith('blob:')) {
			setupImage(showImageCropper.resultEl.src);
		}

		// Mouse events
		canvasEl.addEventListener('mousedown', (e) => {
			dragging = true;
			lastX = e.offsetX;
			lastY = e.offsetY;
		});
		canvasEl.addEventListener('mousemove', (e) => {
			if (!dragging) return;
			const dx = e.offsetX - lastX;
			const dy = e.offsetY - lastY;
			lastX = e.offsetX;
			lastY = e.offsetY;
			onDrag(dx, dy);
		});
		window.addEventListener('mouseup', () => (dragging = false));

		// Wheel zoom
		canvasEl.addEventListener(
			'wheel',
			(e) => {
				e.preventDefault();
				zoomAt(e.offsetX, e.offsetY, e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
			},
			{ passive: false }
		);

		// Touch events
		canvasEl.addEventListener(
			'touchstart',
			(e) => {
				if (e.touches.length === 1) {
					dragging = true;
					lastX = e.touches[0].clientX;
					lastY = e.touches[0].clientY;
				} else if (e.touches.length === 2) {
					lastTouchDist = getTouchDist(e);
				}
			},
			{ passive: false }
		);

		canvasEl.addEventListener(
			'touchmove',
			(e) => {
				e.preventDefault();
				if (e.touches.length === 1 && dragging) {
					const dx = e.touches[0].clientX - lastX;
					const dy = e.touches[0].clientY - lastY;
					lastX = e.touches[0].clientX;
					lastY = e.touches[0].clientY;
					onDrag(dx, dy);
				} else if (e.touches.length === 2) {
					const dist = getTouchDist(e);
					if (lastTouchDist) {
						zoomAt(canvasEl.width / 2, canvasEl.height / 2, dist / lastTouchDist);
					}
					lastTouchDist = dist;
				}
			},
			{ passive: false }
		);

		canvasEl.addEventListener('touchend', () => {
			dragging = false;
			lastTouchDist = null;
		});
	});

	// File upload
	function handleUpload() {
		const file = uploadEl.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setupImage(reader.result);
		reader.readAsDataURL(file);
	}

	// Zoom buttons
	function handleZoomIn() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, ZOOM_STEP);
	}
	function handleZoomOut() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, 1 / ZOOM_STEP);
	}

	// Crop and export
	function handleCrop() {
		const cx = (canvasEl.width - FRAME_SIZE) / 2;
		const cy = (canvasEl.height - FRAME_SIZE) / 2;
		const sx = (cx - offsetX) / appScale;
		const sy = (cy - offsetY) / appScale;
		const sw = FRAME_SIZE / appScale;
		const sh = FRAME_SIZE / appScale;

		const temp = document.createElement('canvas');
		temp.width = FRAME_SIZE;
		temp.height = FRAME_SIZE;
		temp.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, FRAME_SIZE, FRAME_SIZE);
		temp.toBlob((blob) => {
			if (!blob) return;
			if (showImageCropper.objectUrl) URL.revokeObjectURL(showImageCropper.objectUrl);
			showImageCropper.objectUrl = blob;
			showImageCropper.resultEl.src = URL.createObjectURL(blob);
			showImageCropper.status = false;
		}, 'image/jpeg');
	}
</script>

<input
	bind:this={uploadEl}
	type="file"
	accept=".jpeg,.jpg,.png"
	class="sr-only"
	onchange={handleUpload}
	aria-label="Upload an image to crop"
	hidden
/>

<div
	transition:fade
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialog-title"
	class="relative z-100 {darkMode.status ? 'dark' : ''}"
>
	<div aria-hidden="true" class="fixed inset-0 bg-black/60 transition-opacity"></div>
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
			<div
				transition:scale
				class="dark:bg-primary-theme-dark relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:max-w-3xl"
			>
				<div
					class="relative aspect-square w-full max-w-[600px] touch-none overflow-hidden bg-black/90"
				>
					<canvas
						bind:this={canvasEl}
						width="1000"
						height="1000"
						class="size-full"
						aria-label="Image cropper canvas"
					></canvas>
					<div
						class="pointer-events-none absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] sm:size-90"
						aria-hidden="true"
					></div>

					<div
						class="absolute top-4 left-4 z-50 flex flex-col overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm"
					>
						<button
							class="flex size-8 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
							aria-label="Zoom In"
							onclick={handleZoomIn}
						>
							<Icon name="plus" class="size-5" stroke="none" />
						</button>
						<hr class="border-light-border-theme-light/70 dark:border-light-border-theme-dark" />
						<button
							class="flex size-8 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
							aria-label="Zoom Out"
							onclick={handleZoomOut}
						>
							<Icon name="minus" class="size-5" stroke="none" />
						</button>
					</div>
				</div>

				<div
					class="dark:bg-primary-theme-dark! flex items-center justify-between gap-4 border-t bg-white px-6 py-4"
				>
					<Button
						callBack={() => (showImageCropper.status = false)}
						text="Cancel"
						class="text-dark-text-theme-light! border-light-border-theme-dark h-9 border bg-white"
					/>
					<div class="flex gap-2">
						<Button
							callBack={() => uploadEl.click()}
							text="Choose image"
							class="bg-secondary-btn-bg-theme-light dark:bg-secondary-btn-bg-theme-dark sm:hover:bg-secondary-btn-hover-theme-light sm:dark:hover:bg-secondary-btn-hover-theme-dark"
						/>
						<Button
							disable={!uploadEl?.files[0]}
							callBack={handleCrop}
							text="Save"
							class="bg-primary-btn-bg-theme-light sm:hover:bg-primary-btn-hover-theme-light"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
