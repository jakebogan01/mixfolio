<script>
	let { data } = $props();
	let { notes } = $derived(data)
	console.log(notes)
</script>

<h1>Welcome to Supabase!</h1>
<ul>
	{#each notes as note}
		<li>{note.name}</li>
	{/each}
</ul>
