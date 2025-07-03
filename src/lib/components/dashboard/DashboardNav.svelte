<script>
	import { page } from '$app/state';
	import { DASHBOARD, FORM } from '$lib/utils/constants.js';
</script>

<div class="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
	<div class="flex w-full flex-col items-center py-6">
		<div class="flex shrink-0 items-center">
			<img
				class="h-8 w-auto"
				src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
				alt="Your Company"
			/>
		</div>
		<div class="mt-6 w-full flex-1 space-y-1 px-2">
			<!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-800 hover:text-white" -->
			<a
				href="#"
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
			>
				<!-- Current: "text-white", Default: "text-indigo-300 group-hover:text-white" -->
				<svg
					class="size-6 text-indigo-300 group-hover:text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
				<span class="mt-2">Home</span>
			</a>
			<a
				href="#"
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
			>
				<svg
					class="size-6 text-indigo-300 group-hover:text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
					/>
				</svg>
				<span class="mt-2">All Files</span>
			</a>
			<a
				href={DASHBOARD}
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium {page.url
					.pathname === DASHBOARD
					? 'bg-indigo-800 text-white'
					: 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}"
				aria-current="page"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 {page.url.pathname === DASHBOARD
						? 'text-white'
						: 'text-indigo-300 group-hover:text-white'}"
					aria-hidden="true"
					data-slot="icon"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
					/></svg
				>
				<span class="mt-2">Dashboard</span>
			</a>
			<a
				href={FORM}
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium {page.url
					.pathname === FORM
					? 'bg-indigo-800 text-white'
					: 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 {page.url.pathname === FORM
						? 'text-white'
						: 'text-indigo-300 group-hover:text-white'}"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
				<span class="mt-2">Form</span>
			</a>
			<a
				href="#"
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
			>
				<svg
					class="size-6 text-indigo-300 group-hover:text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
					/>
				</svg>
				<span class="mt-2">Albums</span>
			</a>
			<a
				href="#"
				class="group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium text-indigo-100 hover:bg-indigo-800 hover:text-white"
			>
				<svg
					class="size-6 text-indigo-300 group-hover:text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
					/>
				</svg>
				<span class="mt-2">Settings</span>
			</a>
		</div>
	</div>
</div>
