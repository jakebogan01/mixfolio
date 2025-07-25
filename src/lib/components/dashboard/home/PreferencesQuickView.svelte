<script>
	import { createForm } from 'felte';
	import { invalidate } from '$app/navigation';
	import { toastMessage } from '$lib/utils/toast.js';

	let { data } = $props();
	let formEl;

	const { form } = createForm({
		initialValues: { slug: data?.userProfile?.slug || null },
		onSubmit: async (values) => {
			try {
				await data.pb
					.collection('preferences')
					.update(data?.userProfile?.expand?.preferences?.id, values);
				await invalidate('user_profile');
				toastMessage('success', 'Settings Updated!');
			} catch (error) {
				console.dir(error, { depth: null });
			}
		}
	});
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900">Preferences</h6>
		</div>
	</div>
	<form bind:this={formEl} class="flex flex-col space-y-6 px-4 pt-0 pt-6 sm:px-6 lg:px-8" use:form>
		<div>
			<p class="mb-4 block text-xs font-semibold text-gray-400">Portfolio Settings</p>
			<div class="flex flex-col gap-6">
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-projects"
					>
						Hide projects section from portfolio
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							name="hide_projects"
							id="hide-projects"
							class="peer sr-only"
							checked={data?.userProfile?.expand?.preferences?.hide_projects}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-testimonials"
					>
						Hide testimonials section from portfolio
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							name="hide_testimonials"
							id="hide-testimonials"
							class="peer sr-only"
							checked={data?.userProfile?.expand?.preferences?.hide_testimonials}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-clients"
					>
						Hide clients section from portfolio
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							name="hide_clients"
							class="peer sr-only"
							id="hide-clients"
							checked={data?.userProfile?.expand?.preferences?.hide_clients}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-portfolio"
					>
						Make portfolio public
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							class="peer sr-only"
							name="hide_portfolio"
							id="hide-portfolio"
							checked={data?.userProfile?.expand?.preferences?.hide_portfolio}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
			</div>
		</div>
		<hr class="border-gray-300" />
		<div>
			<p class="mb-4 block text-xs font-semibold text-gray-400">Account Settings</p>
			<div class="flex flex-col gap-6">
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-notifications"
						>Disable notifications
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							class="peer sr-only"
							name="hide_notifications"
							id="hide-notifications"
							checked={data?.userProfile?.expand?.preferences?.hide_notifications}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
				<div class="inline-flex items-center justify-between">
					<label
						class=" mt-px mb-0 cursor-pointer text-sm font-normal select-none"
						for="hide-analytics"
					>
						Disable dashboard stats
					</label>
					<label class="relative inline-flex h-5 w-10 cursor-pointer items-center">
						<input
							type="checkbox"
							onchange={() => formEl?.requestSubmit()}
							class="peer sr-only"
							name="hide_analytics"
							id="hide-analytics"
							checked={data?.userProfile?.expand?.preferences?.hide_analytics}
						/>
						<span
							class="absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-gray-900"
						></span>
						<span
							class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
						></span>
					</label>
				</div>
			</div>
		</div>
	</form>
</div>
