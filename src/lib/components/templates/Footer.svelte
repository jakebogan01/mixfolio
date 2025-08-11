<script>
	let { data } = $props();
</script>

<footer class="mt-10 px-8 pt-20">
	<div class="container mx-auto">
		<div
			class="mt-16 flex flex-wrap items-center gap-y-4 border-t border-gray-200 py-6 justify-between"
		>
			<p
				class="! block text-center font-sans text-base leading-relaxed font-normal text-inherit antialiased"
			>
				© {new Date().getFullYear()} Made with
				<a href="/" target="_blank" class="hover:underline">MixFolio</a>
			</p>
			<ul class="flex items-center gap-8">
				<li>
					<a
						href="mailto:{data?.email}"
						class="text block font-sans text-base leading-normal font-normal hover:underline"
					>Contact {data?.name}</a
					>
				</li>
			</ul>
		</div>
	</div>
</footer>