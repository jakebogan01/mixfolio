<script>
	import ProjectsQuickView from '$lib/components/dashboard/home/ProjectsQuickView.svelte';
	import TestimonialsQuickView from '$lib/components/dashboard/home/TestimonialsQuickView.svelte';
	import ProfileQuickView from '$lib/components/dashboard/home/ProfileQuickView.svelte';
	import ClientsQuickView from '$lib/components/dashboard/home/ClientsQuickView.svelte';
	import PreferencesQuickView from '$lib/components/dashboard/home/PreferencesQuickView.svelte';
	import DashboardStats from '$lib/components/dashboard/home/DashboardStats.svelte';

	let { data } = $props();
</script>

<DashboardStats {data} />
<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
	<ProfileQuickView {data} />
	<PreferencesQuickView {data} />
	<ClientsQuickView userProfile={data?.userProfile} />
</div>
<div class="mb-4 grid grid-cols-1 gap-y-6 xl:grid-cols-3 xl:gap-6">
	<ProjectsQuickView userProfile={data?.userProfile} />
	<TestimonialsQuickView userProfile={data?.userProfile} />
</div>
