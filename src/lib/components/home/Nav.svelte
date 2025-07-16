<script>
	import { navLinks } from '$lib/data/home/navLinks.js';
	import { LOGIN } from '$lib/utils/constants.js';
</script>

<nav class="relative hidden lg:flex">
	{#each navLinks as item (item.id)}
		<div class="group/item relative flex">
			<svg
				viewBox="0 0 15 15"
				aria-hidden="true"
				class="absolute -top-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:block"
			>
				<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
			</svg>
			<svg
				viewBox="0 0 15 15"
				aria-hidden="true"
				class="absolute -top-2 -right-2 size-[15px] fill-black/10"
			>
				<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
			</svg>
			<svg
				viewBox="0 0 15 15"
				aria-hidden="true"
				class="absolute -bottom-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:group-last/row:block"
			>
				<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
			</svg>
			<svg
				viewBox="0 0 15 15"
				aria-hidden="true"
				class="absolute -right-2 -bottom-2 hidden size-[15px] fill-black/10 group-last/row:block"
			>
				<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
			</svg>
			<a
				class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
				href={item.link}>{item.text}</a
			>
		</div>
	{/each}
	<div class="group/item relative flex">
		<svg
			viewBox="0 0 15 15"
			aria-hidden="true"
			class="absolute -top-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:block"
		>
			<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
		</svg>
		<svg
			viewBox="0 0 15 15"
			aria-hidden="true"
			class="absolute -top-2 -right-2 size-[15px] fill-black/10"
		>
			<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
		</svg>
		<svg
			viewBox="0 0 15 15"
			aria-hidden="true"
			class="absolute -bottom-2 -left-2 hidden size-[15px] fill-black/10 group-first/item:group-last/row:block"
		>
			<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
		</svg>
		<svg
			viewBox="0 0 15 15"
			aria-hidden="true"
			class="absolute -right-2 -bottom-2 hidden size-[15px] fill-black/10 group-last/row:block"
		>
			<path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
		</svg>
		<a
			class="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply sm:transition-colors sm:hover:bg-black/2.5 sm:hover:text-[#6a17bb]"
			href={LOGIN}>Login</a
		>
	</div>
</nav>
