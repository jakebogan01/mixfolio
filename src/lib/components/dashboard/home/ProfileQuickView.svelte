<script>
	import { PROFILE } from '$lib/utils/constants.js';
	import { toISODate } from '$lib/utils/date.js';
	import PortfolioSlugInput from '$lib/components/dashboard/PortfolioSlugInput.svelte';

	let { data } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900">Profile</h6>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<a
				href={PROFILE}
				class="inline-flex cursor-pointer items-center rounded-md bg-gray-900 px-2.5 py-1.5 text-sm font-normal text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white sm:transition-colors sm:hover:bg-gray-900/75"
				>View profile</a
			>
		</div>
	</div>
	<div class="mt-6 px-4 text-base/7 sm:px-6 lg:px-8">
		<PortfolioSlugInput {data} />
		<hr class="my-6 border-gray-300" />
		<div class="mx-auto max-w-5xl">
			<dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
				<div class="flex shrink-0 items-center sm:col-span-full">
					<div class="flex">
						{#if data?.userProfile?.avatar_url}
							<img
								src={data?.userProfile?.avatar_url}
								alt={data?.userProfile?.name || 'User avatar'}
								class="inline-block size-12 rounded-full"
							/>
						{:else}
							<span class="inline-block size-12 overflow-hidden rounded-full bg-gray-200">
								<svg viewBox="0 0 24 24" fill="currentColor" class="size-full text-gray-400"
									><path
										d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
									/></svg
								>
							</span>
						{/if}
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-700">
							{data?.userProfile?.name || 'My Name'}
						</p>
						<p class="text-xs font-medium text-gray-500">
							{data?.userProfile?.email || 'me@example.com'}
						</p>
					</div>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Phone</dt>
					<dd class="text-sm leading-normal font-normal">
						{data?.userProfile?.phone || '000-000-0000'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Location</dt>
					<dd class="text-sm leading-normal font-normal">
						{data?.userProfile?.address || 'Unknown location'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Role</dt>
					<dd class="text-sm leading-normal font-normal">
						{data?.userProfile?.role || 'Unknown role'}
					</dd>
				</div>
				<div class="sm:col-span-1">
					<dt class="text-sm leading-normal font-semibold">Joined</dt>
					<dd class="text-sm leading-normal font-normal">
						{toISODate(data?.userProfile?.created) || 'Date unavailable'}
					</dd>
				</div>
				<div class="sm:col-span-full">
					<dt class="text-sm leading-normal font-semibold">About me</dt>
					<dd class="mt-1 line-clamp-2 max-w-prose space-y-5 text-sm leading-normal font-normal">
						{@html data?.userProfile?.biography || '...'}
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>
