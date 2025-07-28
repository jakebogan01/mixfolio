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

<form bind:this={formEl} class="space-y-6" use:form>
	<div>
		<p class="text-light-text mb-4 block text-xs font-semibold">Portfolio Settings</p>
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
					></span>
					<span
						class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
					></span>
				</label>
			</div>
		</div>
	</div>
	<hr class="border-light-border" />
	<div>
		<p class="text-light-text mb-4 block text-xs font-semibold">Account Settings</p>
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
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
						class="peer-checked:bg-primary absolute h-4 w-9 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out"
					></span>
					<span
						class="absolute left-0 size-5 rounded-full border border-gray-400 bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
					></span>
				</label>
			</div>
		</div>
	</div>
</form>
