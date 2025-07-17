<script>
	let testimonialId = $state(1),
		moveSlidBy = $state(0);

	const testimonials = [
		{
			id: 1,
			name: 'Overview',
			role: 'Stay Organized with Task Lists.',
			sectionContent:
				'Clients can see all their tasks in a sortable list view, making it easy to track progress and prioritize work. Filter tasks by status, due date, or creator for a customized experience.',
			img: 'https://radiant.tailwindui.com/testimonials/tina-yards.jpg'
		},
		{
			id: 2,
			name: 'Visualize',
			role: 'Visualize Tasks with Ease.',
			sectionContent:
				'Clients can access a replica of the admin dashboard’s visual layout, providing a clear picture of task progress. Follow tasks updates in real-time with confidence.',
			img: 'https://radiant.tailwindui.com/testimonials/conor-neville.jpg'
		},
		{
			id: 3,
			name: 'Chat',
			role: 'Collaborate Through Comments.',
			sectionContent:
				'When viewing a task, clients can leave comments and replies to collaborate with their team and communicate directly with the admin.',
			img: 'https://radiant.tailwindui.com/testimonials/amy-chase.jpg'
		},
		{
			id: 4,
			name: 'Chat',
			role: 'Collaborate Through Comments.',
			sectionContent:
				'When viewing a task, clients can leave comments and replies to collaborate with their team and communicate directly with the admin.',
			img: 'https://radiant.tailwindui.com/testimonials/veronica-winton.jpg'
		},
		{
			id: 5,
			name: 'Chat',
			role: 'Collaborate Through Comments.',
			sectionContent:
				'When viewing a task, clients can leave comments and replies to collaborate with their team and communicate directly with the admin.',
			img: 'https://radiant.tailwindui.com/testimonials/harriet-arron.jpg'
		},
		{
			id: 6,
			name: 'Chat',
			role: 'Collaborate Through Comments.',
			sectionContent:
				'When viewing a task, clients can leave comments and replies to collaborate with their team and communicate directly with the admin.',
			img: 'https://radiant.tailwindui.com/testimonials/dillon-lenora.jpg'
		}
	];

	const activateTestimonial = (id, percentToMoveBy) => {
		console.log(percentToMoveBy);
		testimonialId = id;
		moveSlidBy = percentToMoveBy;
	};
</script>

<section class="overflow-hidden py-32">
	<div class="px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-7xl">
			<div>
				<h2
					class="font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase data-dark:text-gray-400"
				>
					Testimonials
				</h2>
				<h3
					class="mt-2 text-4xl font-medium tracking-tighter text-pretty text-gray-950 data-dark:text-white sm:text-6xl"
				>
					What everyone is saying
				</h3>
			</div>
		</div>
	</div>
	<div
		class="[&amp;::-webkit-scrollbar]:hidden mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-smooth px-(--scroll-padding) [--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] [scrollbar-width:none] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]"
	>
		{#each testimonials as item (item.id)}
			<div
				class="relative flex aspect-9/16 w-72 shrink-0 transform snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl transition duration-700 ease-in-out sm:aspect-3/4 sm:w-96"
				style="transform: translateX({-moveSlidBy}%);"
			>
				<img
					alt=""
					src={item.img}
					class="absolute inset-x-0 top-0 aspect-square w-full object-cover"
				/>
				<div
					aria-hidden="true"
					class="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-[calc(7/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
				></div>
				<figure class="relative p-10">
					<blockquote>
						<p class="relative text-xl/7 text-white">
							<span aria-hidden="true" class="absolute -translate-x-full">“</span>Thanks to Radiant,
							we’re finding new leads that we never would have found with legal methods.<span
								aria-hidden="true"
								class="absolute">”</span
							>
						</p>
					</blockquote>
					<figcaption class="mt-6 border-t border-white/20 pt-6">
						<p class="text-sm/6 font-medium text-white">Tina Yards</p>
						<p class="text-sm/6 font-medium">
							<span
								class="bg-linear-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent"
								>VP of Sales, Protocol</span
							>
						</p>
					</figcaption>
				</figure>
			</div>
		{/each}
		<div class="w-2xl shrink-0 sm:w-216"></div>
	</div>
	<div class="mt-4 px-6 sm:mt-16 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-7xl">
			<div class="flex flex-col-reverse justify-between sm:flex-row">
				<div>
					<p class="max-w-sm text-sm/6 text-gray-600">
						Join creators and professionals who trust MixFolio to showcase their work and share it
						effortlessly.
					</p>
					<div class="mt-2">
						<a
							class="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
							data-headlessui-state=""
							href="/"
							>Get started
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
								class="size-5"
							>
								<path
									fill-rule="evenodd"
									d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</div>
				</div>
				<div class="mb-4 sm:gap-2">
					<button
						onclick={() => activateTestimonial(1, 0)}
						data-active="true"
						aria-label="Scroll to testimonial from Tina Yards"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
					<button
						onclick={() => activateTestimonial(1, 108)}
						aria-label="Scroll to testimonial from Conor Neville"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
					<button
						onclick={() => activateTestimonial(1, 216)}
						aria-label="Scroll to testimonial from Amy Chase"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
					<button
						onclick={() => activateTestimonial(1, 324)}
						aria-label="Scroll to testimonial from Veronica Winton"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
					<button
						onclick={() => activateTestimonial(1, 432)}
						aria-label="Scroll to testimonial from Dillon Lenora"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
					<button
						onclick={() => activateTestimonial(1, 540)}
						aria-label="Scroll to testimonial from Harriet Arron"
						class="size-4 cursor-pointer rounded-full border border-transparent bg-gray-300 transition hover:bg-gray-400 data-active:bg-gray-400 sm:size-2.5 forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4"
						type="button"
					></button>
				</div>
			</div>
		</div>
	</div>
</section>
