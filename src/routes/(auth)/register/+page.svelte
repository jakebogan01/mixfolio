<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
	let { pb } = $derived(data);
</script>

<AuthLayout title="Sign up to create your account" btnText="Sign up" register={true} {pb} />
