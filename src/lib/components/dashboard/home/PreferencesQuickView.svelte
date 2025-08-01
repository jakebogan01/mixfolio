<script>
	import PreferencesForm from '$lib/components/dashboard/PreferencesForm.svelte';

	let { data } = $props();
</script>

<div
	class="border-light-border-theme-light dark:border-light-border-theme-dark text-dark-text-theme-light dark:text-dark-text-theme-dark dark:bg-primary-theme-dark relative flex flex-col rounded-xl border bg-white bg-clip-border pt-10 pb-5"
>
	<div class="px-4 text-base/7 font-semibold sm:flex sm:items-start sm:px-6 lg:px-8">
		<div class="pb-2 sm:flex-auto">
			<h6 class="text-base font-semibold text-gray-900 dark:text-white">Preferences</h6>
		</div>
	</div>
	<div class="flex flex-col px-4 pt-0 sm:px-6 lg:px-8">
		<PreferencesForm {data} />
	</div>
</div>
