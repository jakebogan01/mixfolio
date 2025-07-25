<script>
	import PreferencesForm from '$lib/components/dashboard/PreferencesForm.svelte';

	let { data } = $props();
</script>

<div
	class="relative flex flex-col rounded-xl border border-gray-300 bg-white bg-clip-border py-10 text-gray-700"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900">Preferences</h6>
		</div>
	</div>
	<div class="flex flex-col px-4 pt-0 pt-6 sm:px-6 lg:px-8">
		<PreferencesForm {data} />
	</div>
</div>
