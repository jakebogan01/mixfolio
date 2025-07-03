<script>
	import { page } from '$app/state';
</script>

<p>custom error page</p>
<h1>{page.status}: {page.error.message}</h1>
