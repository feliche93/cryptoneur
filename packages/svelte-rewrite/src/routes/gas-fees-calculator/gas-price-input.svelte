<script>
	import FormCard from './form-card.svelte';
</script>

<FormCard title="Gas Price" description="Gas fees are paid in each network's native currency.">
	<div class="col-span-1 sm:col-span-1">
		<label class="text-text-base-content/80 block text-sm font-medium">Transaction Speed </label>
		<fieldset class="mt-4">
			<legend class="sr-only">Transaction Speed</legend>
			<div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
				<div class="flex items-center">
					<input id="standard" name="notification-method" type="radio" checked class="radio" />
					<label for="standard" class="ml-3 block text-sm font-medium leading-6">Standard</label>
				</div>
				<div class="flex items-center">
					<input id="fast" name="notification-method" type="radio" class="radio" />
					<label for="fast" class="ml-3 block text-sm font-medium leading-6">Fast</label>
				</div>
				<div class="flex items-center">
					<input id="instant" name="notification-method" type="radio" class="radio" />
					<label for="instant" class="ml-3 block text-sm font-medium leading-6">Instant</label>
				</div>
			</div>
		</fieldset>
	</div>
</FormCard>
