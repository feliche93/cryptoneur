<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;

	export { className as class };
</script>

<h1 class={cn('text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl', className)}>
	<slot />
</h1>
