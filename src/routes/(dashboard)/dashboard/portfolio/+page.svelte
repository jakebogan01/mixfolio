<script>

	import UserProfile from '$lib/components/dashboard/user_profile/UserProfile.svelte';
	import UserProjects from '$lib/components/dashboard/user_projects/UserProjects.svelte';
	import Nav from '$lib/components/Nav.svelte';
	let { data } = $props();

</script>

<Nav slug={data.slug.slug} />

<UserProfile data={data}/>
<UserProjects data={data}/>