<script>
	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900">Preferences</h6>
		</div>
	</div>
	<div class="flex flex-col gap-12 p-6 px-4 pt-0 sm:px-6 lg:px-8">
		<div>
			<p class="mt-6 mb-4 block text-xs font-semibold text-gray-500 uppercase">account</p>
			<div class="flex flex-col gap-6">
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="Email me when someone follows me"
						>Email me when someone follows me
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="Email me when someone answers on my post"
					>
						Email me when someone answers on my post
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="Email me when someone mentions me"
					>
						Email me when someone mentions me
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" checked />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
			</div>
		</div>
		<div>
			<p class=" mb-4 block text-xs font-semibold text-gray-500 uppercase">application</p>
			<div class="flex flex-col gap-6">
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="New launches and projects"
					>
						New launches and projects
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="Monthly product updates"
					>
						Monthly product updates
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" checked />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="Subscribe to newsletter"
					>
						Subscribe to newsletter
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input type="checkbox" class="peer sr-only" />
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-300 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
			</div>
		</div>
	</div>
</div>
