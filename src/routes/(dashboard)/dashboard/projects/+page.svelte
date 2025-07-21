<script>
	import Projects from '$lib/components/dashboard/projects/Projects.svelte';
	let { data } = $props();
</script>

<Projects {data} />
