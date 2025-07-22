<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
</script>

<AuthLayout
	message="Welcome back"
	title="Sign up for an account to continue."
	btnText="Sign up"
	register={true}
	pb={data?.pb}
/>
