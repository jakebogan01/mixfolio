<script>
	import { onMount } from 'svelte';
	import { showImageCropper } from '$lib/stores/showImageCropper.svelte.js';
	import { darkMode } from '$lib/stores/darkMode.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let canvasEl, uploadEl, cropBtnEl, zoomInBtnEl, zoomOutBtnEl;
	let ctx;

	const FRAME_SIZE = 600;
	const ZOOM_FACTOR_STEP = 1.05;

	let img = $state(new Image());
	let imgX = $state(0),
		imgY = $state(0),
		scale = $state(1);
	let lastX = $state(0),
		lastY = $state(0);
	let dragging = $state(false);
	let lastTouchDist = $state(null);
	let objectUrl = $state(null);

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function getInitialScale() {
		const scaleX = canvasEl.width / img.width;
		const scaleY = canvasEl.height / img.height;
		return Math.min(scaleX, scaleY, 1); // don't upscale beyond 1 (native size)
	}

	function clampPosition(x, y, scale) {
		// Calculate image display width and height at current scale
		const dispW = img.width * scale;
		const dispH = img.height * scale;

		// crop frame boundaries relative to canvas
		const frameLeft = (canvasEl.width - FRAME_SIZE) / 2;
		const frameTop = (canvasEl.height - FRAME_SIZE) / 2;
		const frameRight = frameLeft + FRAME_SIZE;
		const frameBottom = frameTop + FRAME_SIZE;

		// min/max allowed imgX/imgY so image covers the crop frame

		// Because imgX/imgY is image top-left position, clamp so the image edges don't go inside crop frame:
		const minX = frameRight - dispW; // image right edge must be >= frame right
		const maxX = frameLeft; // image left edge must be <= frame left

		const minY = frameBottom - dispH; // image bottom edge must be >= frame bottom
		const maxY = frameTop; // image top edge must be <= frame top

		return {
			x: clamp(x, minX, maxX),
			y: clamp(y, minY, maxY)
		};
	}

	function draw() {
		if (!ctx) return;

		// Clamp position so image covers crop frame
		const pos = clampPosition(imgX, imgY, scale);
		imgX = pos.x;
		imgY = pos.y;

		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		ctx.save();
		ctx.translate(imgX, imgY);
		ctx.scale(scale, scale);
		ctx.drawImage(img, 0, 0);
		ctx.restore();
	}

	function handleImageLoad() {
		scale = getInitialScale();
		// center image in canvas
		imgX = canvasEl.width / 2 - (img.width * scale) / 2;
		imgY = canvasEl.height / 2 - (img.height * scale) / 2;
		draw();
	}

	img.onload = handleImageLoad;

	function getTouchDist(e) {
		const [t1, t2] = e.touches;
		return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
	}

	function zoomAt(mx, my, factor) {
		const newScale = scale * factor;

		// Set min/max zoom levels (to avoid too small or huge zoom)
		const MIN_SCALE = getInitialScale();
		const MAX_SCALE = 4;

		if (newScale < MIN_SCALE) {
			scale = MIN_SCALE;
		} else if (newScale > MAX_SCALE) {
			scale = MAX_SCALE;
		} else {
			scale = newScale;
		}

		const wx = (mx - imgX) / scale;
		const wy = (my - imgY) / scale;

		imgX = mx - wx * scale;
		imgY = my - wy * scale;

		draw();
	}

	// When dragging: after updating imgX, imgY clamp position
	function onDragMove(dx, dy) {
		imgX += dx;
		imgY += dy;
		// clamp to crop frame edges
		const pos = clampPosition(imgX, imgY, scale);
		imgX = pos.x;
		imgY = pos.y;
		draw();
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d');

		if (showImageCropper?.resultEl?.src?.startsWith('blob:')) {
			img.onload = () => {
				scale = getInitialScale();
				imgX = canvasEl.width / 2 - (img.width * scale) / 2;
				imgY = canvasEl.height / 2 - (img.height * scale) / 2;
				draw();
			};

			// Set the image source to load the blob
			img.src = showImageCropper.resultEl.src;
		}

		canvasEl.addEventListener('mousedown', (e) => {
			dragging = true;
			lastX = e.offsetX;
			lastY = e.offsetY;
		});

		canvasEl.addEventListener('mousemove', (e) => {
			if (!dragging) return;
			const dx = e.offsetX - lastX;
			const dy = e.offsetY - lastY;
			onDragMove(dx, dy);
			lastX = e.offsetX;
			lastY = e.offsetY;
		});

		canvasEl.addEventListener('mouseup', () => (dragging = false));
		canvasEl.addEventListener('mouseleave', () => (dragging = false));

		canvasEl.addEventListener(
			'wheel',
			(e) => {
				e.preventDefault();
				zoomAt(e.offsetX, e.offsetY, e.deltaY < 0 ? ZOOM_FACTOR_STEP : 1 / ZOOM_FACTOR_STEP);
			},
			{ passive: false }
		);

		canvasEl.addEventListener(
			'touchstart',
			(e) => {
				if (e.touches.length === 1) {
					lastX = e.touches[0].clientX;
					lastY = e.touches[0].clientY;
					dragging = true;
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
					onDragMove(dx, dy);
					lastX = e.touches[0].clientX;
					lastY = e.touches[0].clientY;
				} else if (e.touches.length === 2) {
					const dist = getTouchDist(e);
					if (lastTouchDist) {
						const zoomFactor = dist / lastTouchDist;
						zoomAt(canvasEl.width / 2, canvasEl.height / 2, zoomFactor);
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

	function handleUpload() {
		const file = uploadEl.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			img.onload = () => {
				scale = getInitialScale(); // ⬅️ use correct zoomed-out scale
				imgX = canvasEl.width / 2 - (img.width * scale) / 2;
				imgY = canvasEl.height / 2 - (img.height * scale) / 2;
				draw();
			};
			img.src = reader.result;
		};
		reader.readAsDataURL(file);
	}

	function handleZoomIn() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, ZOOM_FACTOR_STEP);
	}

	function handleZoomOut() {
		zoomAt(canvasEl.width / 2, canvasEl.height / 2, 1 / ZOOM_FACTOR_STEP);
	}

	function handleCrop() {
		if (!uploadEl?.files[0]) return;
		const cropX = (canvasEl.width - FRAME_SIZE) / 2;
		const cropY = (canvasEl.height - FRAME_SIZE) / 2;
		const sx = (cropX - imgX) / scale;
		const sy = (cropY - imgY) / scale;
		const sw = FRAME_SIZE / scale;
		const sh = FRAME_SIZE / scale;

		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = FRAME_SIZE;
		tempCanvas.height = FRAME_SIZE;
		const tempCtx = tempCanvas.getContext('2d');
		tempCtx.drawImage(img, sx, sy, sw, sh, 0, 0, FRAME_SIZE, FRAME_SIZE);

		tempCanvas.toBlob((blob) => {
			if (!blob) return;
			showImageCropper.objectUrl = blob;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
			objectUrl = URL.createObjectURL(blob);
			showImageCropper.resultEl.src = objectUrl;
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
	role="dialog"
	aria-modal="true"
	aria-labelledby="dialog-title"
	class="relative z-100 {darkMode.status ? 'dark' : ''}"
>
	<div aria-hidden="true" class="fixed inset-0 bg-black/60 transition-opacity"></div>
	<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
		<div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
			<div
				class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:max-w-3xl"
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
							bind:this={zoomInBtnEl}
							onclick={handleZoomIn}
						>
							<Icon name="plus" class="size-5" stroke="none" />
						</button>
						<hr class="border-light-border-theme-light/70 dark:border-light-border-theme-dark" />
						<button
							class="flex size-8 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
							aria-label="Zoom Out"
							bind:this={zoomOutBtnEl}
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
							bind:this={cropBtnEl}
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
