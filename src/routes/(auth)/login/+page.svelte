<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
	let { pb } = $derived(data);
</script>

<AuthLayout title="Login to your account" btnText="Login" register={false} {pb} />
