<script>
	import AuthLayout from '$lib/components/auth/AuthLayout.svelte';

	let { data } = $props();
</script>

<AuthLayout
	message="Welcome"
	title="Sign up for an account to continue."
	btnText="Sign up"
	register={true}
	pb={data?.pb}
/>
