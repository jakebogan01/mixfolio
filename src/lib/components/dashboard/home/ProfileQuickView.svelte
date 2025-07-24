<script>
	import { toISODate } from '$lib/utils/date.js';
	import Icon from '$lib/components/Icon.svelte';

	let { userProfile } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900">Profile</h6>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				class="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-gray-900/75"
				>View</button
			>
		</div>
	</div>
	<div class="mt-6 px-4 text-base/7 font-semibold sm:px-6 lg:px-8">
		<div class="line-clamp-2 flex items-center space-x-2 text-sm leading-normal font-medium">
			<button
				type="button"
				class="inline-flex cursor-pointer items-center rounded-md bg-transparent text-gray-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent sm:hover:text-violet-400"
				aria-label="Open your portfolio link"
			>
				<span class="sr-only">Copy portfolio link</span>
				<Icon name="copy-link" class="size-6" stroke="none" />
			</button>
			<p class="text-gray-500">
				http://localhost:5173/portfolio/<span class="font-bold text-gray-900"
					>{userProfile?.slug || 'Slug unavailable'}</span
				>
			</p>
		</div>
		<hr class="my-4 border-gray-300" />
		<div class="mx-auto mt-6 max-w-5xl">
			<dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
				<div class="flex shrink-0 items-center sm:col-span-full">
					<div>
						<img
							src={userProfile?.avatar_url ||
								'https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg'}
							alt=""
							class="inline-block size-12 rounded-full"
						/>
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-700">
							{userProfile?.name || 'Name unavailable'}
						</p>
						<p class="text-xs font-medium text-gray-500">
							{userProfile?.email || 'Email unavailable'}
						</p>
					</div>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Phone</dt>
					<dd class="text-sm leading-normal font-normal">
						{userProfile?.phone || 'Phone number unavailable'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Location</dt>
					<dd class="text-sm leading-normal font-normal">
						{userProfile?.address || 'Address unavailable'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Role</dt>
					<dd class="text-sm leading-normal font-normal">
						{userProfile?.role || 'Role unavailable'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Joined</dt>
					<dd class="text-sm leading-normal font-normal">
						{toISODate(userProfile?.created) || 'Date unavailable'}
					</dd>
				</div>
				<div class="sm:col-span-full">
					<dt class="text-sm leading-normal font-semibold">About you</dt>
					<dd class="mt-1 line-clamp-2 max-w-prose space-y-5 text-sm leading-normal font-normal">
						{@html userProfile?.biography || 'Biography unavailable'}
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>
