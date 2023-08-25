<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Title from '$ui/Title.svelte';

	interface Feature {
		title: string;
		description: string;
		icon: new (...args: any[]) => SvelteComponent<any, any, any>; // General component type
	}

	// export let features: Feature[] = []; // default value, can be overridden by parent components

	export let features: Feature[];
</script>

<div class="py-12 sm:py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
		>
			<slot {Title} />
			<dl class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
				{#each features as feature (feature.title)}
					<div>
						<dt class="text-base font-semibold leading-7 text-accent">
							<div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
								<svelte:component this={feature.icon} class="h-6 w-6 text-primary-content" />
							</div>
							{feature.title}
						</dt>
						<dd class="mt-1 text-base leading-7 text-base-content/80">{feature.description}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</div>
