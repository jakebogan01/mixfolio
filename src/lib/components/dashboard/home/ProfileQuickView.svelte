<script>
	import { page } from '$app/state';
	import { PROFILE } from '$lib/utils/constants.js';
	import { z } from 'zod';
	import { debounce } from '$lib/utils/misc.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
	import { toISODate } from '$lib/utils/date.js';
	import { toastMessage } from '$lib/utils/toast.js';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
	let showSlugWarning = $state('oklch(21% 0.034 264.665)');
	let formEl;

	const debouncedSubmit = debounce(() => {
		formEl?.requestSubmit();
	}, 1500);

	const schema = z.object({
		slug: z
			.string({ message: 'Field cannot be empty' })
			.min(5, { message: 'Must be 5 or more characters long' })
			.max(255, { message: 'No more than 255 characters long' })
	});

	const { form } = createForm({
		initialValues: { slug: data?.userProfile?.slug || null },
		extend: [validator({ schema }), reporterDom()],
		onSubmit: async (values) => {
			try {
				await data.pb.collection('profiles').update(data?.userProfile?.id, values);
				await invalidate('user_profile');
				showSlugWarning = 'green';
				toastMessage('success', 'Success, your profile URL is ready to use!');
			} catch (error) {
				console.dir(error, { depth: null });
				showSlugWarning = 'red';
				if (error?.response?.data?.slug?.code === 'validation_not_unique') {
					toastMessage('error', 'Sorry, that name has already been taken!');
				}
			}
		}
	});

	const copyToClipboard = async () => {
		if (!data?.userProfile?.slug) return;
		const fullUrl = `${page?.url?.origin}/portfolio/${data?.userProfile?.slug}`;
		try {
			await navigator.clipboard.writeText(fullUrl);
			toastMessage('success', 'Successfully copied link!');
		} catch (error) {
			console.dir(error?.message, { depth: null });
		}
	};
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
		<form bind:this={formEl} use:form>
			<label for="copy-link" class="sr-only">Personal portfolio link</label>
			<div class="flex">
				<button
					type="button"
					onclick={copyToClipboard}
					title="Copy portfolio link"
					class="shrink-0 cursor-pointer rounded-l-md border border-gray-300 border-r-transparent bg-white px-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 {data
						?.userProfile?.slug
						? ''
						: 'disabled:pointer-events-none disabled:text-gray-400'}"
					aria-label="Copy your portfolio link"
					disabled={!data?.userProfile?.slug}
				>
					<Icon
						name="copy-link"
						class="size-6 sm:transition-colors sm:hover:text-violet-400"
						stroke="none"
					/>
				</button>
				<div
					class="flex w-full items-center rounded-md rounded-l-none bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
				>
					<div
						class="shrink-0 text-base leading-normal font-medium text-gray-500 select-none sm:text-sm/6"
					>
						portfolio/
					</div>
					<input
						id="copy-link"
						type="text"
						oninput={debouncedSubmit}
						name="slug"
						placeholder="my-name"
						class="focus:ring-none block w-full min-w-0 border-none py-1.5 pr-3 pl-1 text-base leading-normal font-medium placeholder:!text-gray-400 focus:border-0 focus:border-none focus:ring-0 focus:outline-0 focus:outline-none sm:text-sm/6"
						style="color: {showSlugWarning}"
						aria-invalid="true"
						required
						minlength="5"
						maxlength="255"
						aria-label="Slug"
						aria-describedby="slug-validation"
					/>
				</div>
			</div>
			<div
				id="slug-validation"
				class="mt-1 text-sm text-red-500"
				data-felte-reporter-dom-for="slug"
				aria-live="polite"
				data-felte-reporter-dom-single-message
			></div>
		</form>
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
