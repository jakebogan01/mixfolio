<script>
	// import Projects from '$lib/components/dashboard/projects/Projects.svelte';
	// let { data } = $props();
</script>

<!--<Projects {data} />-->

<div
	class="relative h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center"
>
	<div class="absolute inset-0 h-full w-full bg-gray-900/75"></div>
</div>
<div
	class="relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border text-gray-700 shadow-md lg:mx-4"
>
	<div class="p-4">
		<div class="px-4 pb-4">
			<h6 class=" mb-2 block text-base leading-relaxed font-semibold tracking-normal">Projects</h6>
			<p class=" block text-sm leading-normal font-normal">Architects design houses</p>
			<div class="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
				<div
					class="relative flex flex-col justify-between rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<div class="flex flex-col">
						<div
							class="relative mx-0 mt-0 mb-4 h-64 overflow-hidden rounded-xl bg-gray-900 bg-clip-border text-white shadow-lg shadow-gray-900/20 xl:h-40"
						>
							<img
								src="/material-tailwind-dashboard-react/img/home-decor-1.jpeg"
								alt="Modern"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="p-6 px-1 py-0">
							<p class=" block text-sm leading-normal font-normal">Project #1</p>
							<h5 class=" mt-1 mb-2 block text-xl leading-snug font-semibold tracking-normal">
								Modern
							</h5>
							<p class=" block text-sm leading-normal font-normal">
								As Uber works through a huge amount of internal management turmoil.
							</p>
						</div>
					</div>
					<div class="mt-6 flex grow items-end justify-between p-6 px-1 py-0">
						<a href="/"
							><button
								class="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button">view project</button
							></a
						>
					</div>
				</div>
				<div
					class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<div class="flex flex-col">
						<div
							class="relative mx-0 mt-0 mb-4 h-64 overflow-hidden rounded-xl bg-gray-900 bg-clip-border text-white shadow-lg shadow-gray-900/20 xl:h-40"
						>
							<img
								src="/material-tailwind-dashboard-react/img/home-decor-2.jpeg"
								alt="Scandinavian"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="p-6 px-1 py-0">
							<p class=" block text-sm leading-normal font-normal">Project #2</p>
							<h5 class=" mt-1 mb-2 block text-xl leading-snug font-semibold tracking-normal">
								Scandinavian
							</h5>
							<p class=" block text-sm leading-normal font-normal">
								Music is something that every person has his or her own specific opinion about.
							</p>
						</div>
					</div>
					<div class="mt-6 flex grow items-end justify-between p-6 px-1 py-0">
						<a href="/"
							><button
								class="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button">view project</button
							></a
						>
					</div>
				</div>
				<div
					class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<div class="flex flex-col">
						<div
							class="relative mx-0 mt-0 mb-4 h-64 overflow-hidden rounded-xl bg-gray-900 bg-clip-border text-white shadow-lg shadow-gray-900/20 xl:h-40"
						>
							<img
								src="/material-tailwind-dashboard-react/img/home-decor-3.jpeg"
								alt="Minimalist"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="p-6 px-1 py-0">
							<p class=" block text-sm leading-normal font-normal">Project #3</p>
							<h5 class=" mt-1 mb-2 block text-xl leading-snug font-semibold tracking-normal">
								Minimalist
							</h5>
							<p class=" block text-sm leading-normal font-normal">
								Different people have different taste, and various types of music.
							</p>
						</div>
					</div>
					<div class="mt-6 flex grow items-end justify-between p-6 px-1 py-0">
						<a href="/"
							><button
								class="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button">view project</button
							></a
						>
					</div>
				</div>
				<div
					class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
				>
					<div class="flex flex-col">
						<div
							class="relative mx-0 mt-0 mb-4 h-64 overflow-hidden rounded-xl bg-gray-900 bg-clip-border text-white shadow-lg shadow-gray-900/20 xl:h-40"
						>
							<img
								src="/material-tailwind-dashboard-react/img/home-decor-4.jpeg"
								alt="Gothic"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="p-6 px-1 py-0">
							<p class=" block text-sm leading-normal font-normal">Project #4</p>
							<h5 class=" mt-1 mb-2 block text-xl leading-snug font-semibold tracking-normal">
								Gothic
							</h5>
							<p class=" block text-sm leading-normal font-normal">
								Why would anyone pick blue over pink? Pink is obviously a better color.
							</p>
						</div>
					</div>
					<div class="mt-6 flex grow items-end justify-between p-6 px-1 py-0">
						<a href="/"
							><button
								class="rounded-lg border border-gray-900 px-4 py-2 text-center align-middle text-xs font-bold text-gray-900 uppercase transition-all select-none hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button">view project</button
							></a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
