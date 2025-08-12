<script>
	import Icon from '$lib/components/Icon.svelte';

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
			{#if !data?.socials || Object.keys(data.socials).length === 0}
				<ul class="flex items-center gap-8">
					<li>
						<a
							href="mailto:{data?.email}"
							class="text block font-sans text-base leading-normal font-normal hover:underline"
						>Contact {data?.name}</a
						>
					</li>
				</ul>
			{:else}
				<ul class="flex items-center gap-8">
					{#if data?.email}
						<a
							href="mailto:{data?.email}"
							target="_blank"
							class="flex items-center rounded"
						>	<Icon name="email" class="w-5 h-5" stroke="none" />
						</a>
					{/if}
					{#each ['linkedin', 'github', 'instagram', 'facebook'] as network}
						{#if data?.socials?.[network]}
							<div>
								<a
									href={data.socials?.[network]}
									target="_blank"
									class="flex items-center rounded"
								>	<Icon name={[network]} class="w-5 h-5" stroke="none" />
								</a>
							</div>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</footer>