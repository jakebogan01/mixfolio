<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let canvasEl, uploadEl;
	let ctx;
	let animFrame;

	const FRAME_SIZE = 600;
	const ASPECT_RATIO = 1;
	const FRAME_WIDTH = FRAME_SIZE * ASPECT_RATIO;
	const FRAME_HEIGHT = FRAME_SIZE;
	const ZOOM_STEP = 1.05;
	const MAX_SCALE = 4;

	let img;
	let appScale = 1;
	let minScale = 1;
	let offsetX = 0;
	let offsetY = 0;

	let dragging = false;
	let lastX = 0;
	let lastY = 0;
	let lastTouchDist = null;
	let lastTouchMid = null;

	const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

	function computeMinScale() {
		return Math.max(FRAME_WIDTH / img.width, FRAME_HEIGHT / img.height);
	}

	function centerImage() {
		offsetX = (canvasEl.width - img.width * appScale) / 2;
		offsetY = (canvasEl.height - img.height * appScale) / 2;
	}

	function clampOffsets() {
		const dispW = img.width * appScale;
		const dispH = img.height * appScale;
		const left = (canvasEl.width - FRAME_WIDTH) / 2;
		const top = (canvasEl.height - FRAME_HEIGHT) / 2;
		offsetX = clamp(offsetX, left + FRAME_WIDTH - dispW, left);
		offsetY = clamp(offsetY, top + FRAME_HEIGHT - dispH, top);
	}

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

	function setupImage(src) {
		// Clean up previous image
		img = new Image();
		img.onload = () => {
			minScale = computeMinScale();
			appScale = minScale;
			centerImage();
			draw();
		};
		img.src = src;
	}

	function zoomAt(x, y, factor) {
		const newScale = clamp(appScale * factor, minScale, MAX_SCALE);
		const imgX = (x - offsetX) / appScale;
		const imgY = (y - offsetY) / appScale;
		appScale = newScale;
		offsetX = x - imgX * appScale;
		offsetY = y - imgY * appScale;
		draw();
	}

	function getTouchDist(e) {
		const [a, b] = e.touches;
		return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
	}

	function getTouchMid(e) {
		const [a, b] = e.touches;
		return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
	}

	function onDrag(dx, dy) {
		offsetX += dx;
		offsetY += dy;
		draw();
	}

	function addListeners() {
		canvasEl.addEventListener('mousedown', onMouseDown);
		canvasEl.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
		canvasEl.addEventListener('wheel', onWheel, { passive: false });
		canvasEl.addEventListener('touchstart', onTouchStart, { passive: false });
		canvasEl.addEventListener('touchmove', onTouchMove, { passive: false });
		canvasEl.addEventListener('touchend', onTouchEnd);
	}

	function removeListeners() {
		canvasEl.removeEventListener('mousedown', onMouseDown);
		canvasEl.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
		canvasEl.removeEventListener('wheel', onWheel);
		canvasEl.removeEventListener('touchstart', onTouchStart);
		canvasEl.removeEventListener('touchmove', onTouchMove);
		canvasEl.removeEventListener('touchend', onTouchEnd);
	}

	function onMouseDown(e) {
		dragging = true;
		lastX = e.offsetX;
		lastY = e.offsetY;
		cancelAnimationFrame(animFrame);
	}
	function onMouseMove(e) {
		if (!dragging) return;
		const dx = e.offsetX - lastX;
		const dy = e.offsetY - lastY;
		lastX = e.offsetX;
		lastY = e.offsetY;
		onDrag(dx, dy);
	}
	function onMouseUp() {
		dragging = false;
	}
	function onWheel(e) {
		e.preventDefault();
		zoomAt(e.offsetX, e.offsetY, e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
	}

	function onTouchStart(e) {
		if (e.touches.length === 1) {
			dragging = true;
			lastX = e.touches[0].clientX - canvasEl.getBoundingClientRect().left;
			lastY = e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
			cancelAnimationFrame(animFrame);
		} else if (e.touches.length === 2) {
			lastTouchDist = getTouchDist(e);
			lastTouchMid = getTouchMid(e);
		}
	}
	function onTouchMove(e) {
		e.preventDefault();
		if (e.touches.length === 1 && dragging) {
			const x = e.touches[0].clientX - canvasEl.getBoundingClientRect().left;
			const y = e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
			const dx = x - lastX;
			const dy = y - lastY;
			lastX = x;
			lastY = y;
			onDrag(dx, dy);
		} else if (e.touches.length === 2) {
			const dist = getTouchDist(e);
			const mid = getTouchMid(e);
			if (lastTouchDist) {
				zoomAt(
					mid.x - canvasEl.getBoundingClientRect().left,
					mid.y - canvasEl.getBoundingClientRect().top,
					dist / lastTouchDist
				);
			}
			if (lastTouchMid) {
				const mdx = mid.x - lastTouchMid.x;
				const mdy = mid.y - lastTouchMid.y;
				onDrag(mdx, mdy);
			}
			lastTouchDist = dist;
			lastTouchMid = mid;
		}
	}
	function onTouchEnd() {
		dragging = false;
		lastTouchDist = null;
		lastTouchMid = null;
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		canvasEl.width = 1000;
		canvasEl.height = 1000;
		setupImage(showImageCropper.resultEl?.src || '');
		addListeners();
	});

	onDestroy(() => {
		removeListeners();
		cancelAnimationFrame(animFrame);
		// revoke blob if any
		if (showImageCropper.objectUrl) {
			URL.revokeObjectURL(showImageCropper.objectUrl);
		}
		img = null;
	});

	function handleUpload() {
		const file = uploadEl.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setupImage(reader.result);
		reader.readAsDataURL(file);
	}

	function handleZoomIn() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, ZOOM_STEP);
	}

	function handleZoomOut() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, 1 / ZOOM_STEP);
	}

	function handleCrop() {
		const left = (canvasEl.width - FRAME_WIDTH) / 2;
		const top = (canvasEl.height - FRAME_HEIGHT) / 2;
		const sx = (left - offsetX) / appScale;
		const sy = (top - offsetY) / appScale;
		const sw = FRAME_WIDTH / appScale;
		const sh = FRAME_HEIGHT / appScale;

		const temp = document.createElement('canvas');
		temp.width = FRAME_WIDTH;
		temp.height = FRAME_HEIGHT;
		temp.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
		temp.toBlob((blob) => {
			if (!blob) return;
			if (showImageCropper.objectUrl) URL.revokeObjectURL(showImageCropper.objectUrl);
			showImageCropper.objectUrl = blob;
			showImageCropper.resultEl.src = URL.createObjectURL(blob);
			showImageCropper.status = false;
		}, 'image/png');
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
