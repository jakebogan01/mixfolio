<script>
	import { page } from '$app/state';
	import { z } from 'zod';
	import { debounce } from '$lib/utils/misc.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import reporterDom from '@felte/reporter-dom';
	import { invalidate } from '$app/navigation';
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

<form bind:this={formEl} use:form>
	<label for="copy-link" class="sr-only">Personal portfolio link</label>
	<div class="flex">
		<button
			type="button"
			onclick={copyToClipboard}
			title="Copy portfolio link"
			class="border-light-border-theme-light dark:border-light-border-theme-dark group shrink-0 cursor-pointer rounded-l-md border border-r-transparent bg-white px-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:bg-transparent dark:text-white dark:hover:bg-gray-700 {data
				?.userProfile?.slug
				? ''
				: 'disabled:text-light-text-theme-light dark:disabled:text-light-text-theme-dark disabled:pointer-events-none'}"
			aria-label="Copy your portfolio link"
			disabled={!data?.userProfile?.slug}
		>
			<Icon
				name="copy-link"
				class="size-6 sm:transition-colors sm:group-hover:text-violet-400 sm:dark:group-hover:text-white"
				stroke="none"
			/>
		</button>
		<div
			class="dark:outline-light-border-theme-dark flex w-full items-center rounded-md rounded-l-none bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 dark:bg-transparent"
		>
			<div
				class="shrink-0 text-base leading-normal font-medium text-gray-500 select-none sm:text-sm/6 dark:text-gray-400"
			>
				portfolio/
			</div>
			<input
				id="copy-link"
				type="text"
				oninput={debouncedSubmit}
				name="slug"
				placeholder="my-name"
				class="focus:ring-none placeholder:!text-light-text-theme-light dark:placeholder:!text-light-text-theme-dark block w-full min-w-0 border-none py-1.5 pr-3 pl-1 text-base leading-normal font-medium focus:border-0 focus:border-none focus:ring-0 focus:outline-0 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white!"
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
