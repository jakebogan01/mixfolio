<script>
	import Profile from '$lib/components/dashboard/profile/Profile.svelte';
	let { data } = $props();
</script>

<Profile {data} />
