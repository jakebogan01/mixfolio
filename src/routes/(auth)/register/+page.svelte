<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
	let { pb } = $derived(data);
</script>

<AuthLayout
	message="Welcome back"
	title="Sign up for an account to continue."
	btnText="Sign up"
	register={true}
	{pb}
/>
