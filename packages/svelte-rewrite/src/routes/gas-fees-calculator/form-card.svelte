<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="rounded-lg bg-base-200 px-8 py-5 shadow-md sm:p-6">
	<div class="md:grid md:grid-cols-2 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="text-lg font-medium leading-6">{title}</h3>
			<p class="mt-1 text-sm text-base-content/80">{description}</p>
		</div>
		<div class="mt-5 md:col-span-1 md:mt-0">
			<div class="space-y-6">
				<div class="grid grid-cols-1 gap-6">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
