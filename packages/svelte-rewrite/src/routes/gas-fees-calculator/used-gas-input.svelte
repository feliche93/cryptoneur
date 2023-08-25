<script>
	import FormCard from './form-card.svelte';
</script>

<FormCard
	title="Used Gas"
	description="Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used."
>
	<div class="col-span-1 sm:col-span-1">
		<label class="text-text-base-content/80 block text-sm font-medium">Transaction Type </label>
		<div class="relative mt-2">
			<select class="select select-bordered w-full">
				<option disabled selected>Who shot first?</option>
				<option>Han Solo</option>
				<option>Greedo</option>
			</select>
		</div>
	</div>
	<div class="col-span-1 sm:col-span-1">
		<label class="text-text-base-content/80 block text-sm font-medium">Used Gas Input </label>
		<div class="relative mt-2">
			<input class="input input-bordered w-full" />
		</div>
	</div>
</FormCard>
