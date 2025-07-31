<script>
	let {
		children,
		class: className,
		link = false,
		url = '/',
		type = 'button',
		text = '',
		defaultStyles = 'block cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50  sm:transition-colors',
		callBack = () => {},
		...rest
	} = $props();
</script>

{#if link}
	<a href={url} class="{defaultStyles} {className}" {...rest}>
		{text}
		{#if children}{@render children()}{/if}
	</a>
{:else}
	<button {type} onclick={callBack} class="{defaultStyles} {className}" {...rest}>
		{#if children}{@render children()}{/if}
		{text}
	</button>
{/if}
