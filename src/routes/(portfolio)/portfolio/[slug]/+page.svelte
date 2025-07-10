<script>
	import Nav from '$lib/components/Nav.svelte';

	let { data } = $props();
	let { user_profile, user } = $derived(data);
</script>

<Nav />

<div class="mx-auto max-w-7xl px-6">
	<div class="px-4 sm:px-0">
		<h3 class="text-2xl font-bold">User's portfolio</h3>
	</div>
	<div class="mt-6">
		<dl class="grid grid-cols-1 sm:grid-cols-2">
			<div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
				<dt class="text-sm/6 font-medium text-gray-900">Full name</dt>
				<dd class="mt-1 text-sm/6 text-gray-700 sm:mt-2">Margot Foster</dd>
			</div>
			<div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
				<dt class="text-sm/6 font-medium text-gray-900">Phone</dt>
				<dd class="mt-1 text-sm/6 text-gray-700 sm:mt-2">1 (422) 242-2233</dd>
			</div>
			<div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
				<dt class="text-sm/6 font-medium text-gray-900">Email address</dt>
				<dd class="mt-1 text-sm/6 text-gray-700 sm:mt-2">{user?.email}</dd>
			</div>
			<div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
				<dt class="text-sm/6 font-medium text-gray-900">Salary</dt>
				<dd class="mt-1 text-sm/6 text-gray-700 sm:mt-2">$120,000</dd>
			</div>
			<div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
				<dt class="text-sm/6 font-medium text-gray-900">About</dt>
				<dd class="mt-1 text-sm/6 text-gray-700 sm:mt-2">{user_profile[0]?.bio}</dd>
			</div>
		</dl>
	</div>
</div>
