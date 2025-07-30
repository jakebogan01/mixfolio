<script>
	import { toISODate } from '$lib/utils/date.js';
	import ProfileForm from '$lib/components/dashboard/profile/ProfileForm.svelte';
	import PortfolioSlugInput from '$lib/components/dashboard/PortfolioSlugInput.svelte';
	import PreferencesForm from '$lib/components/dashboard/PreferencesForm.svelte';
	import Button from '$lib/components/global/Button.svelte';

	let { data } = $props();
	let menuOpen = $state(false);

	const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<div class="relative h-30 w-full overflow-hidden rounded-xl xl:h-50">
	<div
		class="from-primary-from to-secondary-to absolute inset-0 h-full w-full bg-gradient-to-tr"
	></div>
</div>
<div
	class="border-light-border text-dark-text relative mx-3 -mt-16 mb-6 flex flex-col rounded-xl border bg-white bg-clip-border shadow-md lg:mx-4"
>
	<div class="px-4 pt-4 pb-8">
		<div class="mb-10 flex flex-wrap items-start justify-between gap-6">
			<div class="flex items-center gap-6">
				{#if data?.userProfile?.avatar_url}
					<img
						src={data?.userProfile?.avatar_url}
						alt={data?.userProfile?.name || 'User avatar'}
						class="relative inline-block size-18 rounded-lg object-cover object-center shadow-md shadow-gray-500"
					/>
				{:else}
					<span
						class="relative inline-block size-18 rounded-lg bg-gray-200 object-cover object-center shadow-md shadow-gray-500"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="text-light-text size-full"
							><path
								d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
							/></svg
						>
					</span>
				{/if}
				<div>
					<h5 class=" mb-1 block text-xl leading-snug font-semibold tracking-normal">
						{data?.userProfile?.name || 'My Name'}
					</h5>
					<p class=" block text-sm leading-normal font-normal">
						{data?.userProfile?.role || 'Unknown job role'}
					</p>
				</div>
			</div>
			<Button
				callBack={toggleMenu}
				text="Edit profile"
				class="bg-primary-btn-bg sm:hover:bg-primary-btn-hover"
			/>
		</div>
		<div class="gird-cols-1 mb-12 grid gap-x-12 gap-y-12 px-4 lg:grid-cols-2 2xl:gap-x-60">
			<div
				class="text-dark-text relative flex flex-col rounded-xl bg-transparent bg-clip-border shadow-none"
			>
				<div
					class="text-dark-text relative mx-0 mt-0 mb-4 overflow-hidden rounded-xl bg-transparent bg-clip-border shadow-none"
				>
					<h6 class="block text-base leading-relaxed font-semibold tracking-normal">My Profile</h6>
				</div>
				<div class="p-0 text-sm leading-normal font-normal">
					<div class="sm:max-w-xs">
						<PortfolioSlugInput {data} />
					</div>
					<hr class="border-light-border my-8" />
					<div class="mx-auto max-w-5xl">
						<dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
							<div class="sm:col-span-1">
								<dt class="text-sm leading-normal font-semibold">Phone</dt>
								<dd class="text-sm leading-normal font-normal">
									{data?.userProfile?.phone || '000-000-0000'}
								</dd>
							</div>
							<div class="sm:col-span-1">
								<dt class="text-sm leading-normal font-semibold">Email</dt>
								<dd class="text-sm leading-normal font-normal">
									{data?.userProfile?.email || 'me@example.com'}
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
								<dd class="mt-1 max-w-prose space-y-5 text-sm leading-normal font-normal">
									{@html data?.userProfile?.biography || '...'}
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
			<div>
				<h6 class=" mb-3 block text-base leading-relaxed font-semibold tracking-normal">
					My Preferences
				</h6>
				<div class="mt-6 flex flex-col">
					<PreferencesForm {data} />
				</div>
			</div>
		</div>
	</div>
</div>

{#if menuOpen}
	<ProfileForm {data} {toggleMenu} />
{/if}
