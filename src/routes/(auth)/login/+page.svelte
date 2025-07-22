<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
</script>

<AuthLayout
	message="Welcome back"
	title="Sign in to your account to continue."
	btnText="Sign in"
	register={false}
	pb={data?.pb}
/>
