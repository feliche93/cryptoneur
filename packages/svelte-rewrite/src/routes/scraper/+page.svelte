<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import Button from '$ui/Button/Button.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: ActionData;

	export let websiteInfo: any;

	const getValue = (obj: any, key: any) => obj[key];

	// : TWebsiteInfoOutput
	// export let scrapedContent;

	const {
		form: scrapingForm,
		errors,
		enhance,
		delayed
	} = superForm(data.form, {
		dataType: 'json',
		onSubmit: async (data) => {
			websiteInfo = data.formData;
			console.log('data', data.formData);
		}
	});

	if (!$scrapingForm.fields || $scrapingForm.fields.length === 0) {
		$scrapingForm.fields = [{ name: '', description: '', dataType: '' }];
	}

	function addField(event: MouseEvent) {
		event.preventDefault();
		scrapingForm.set({
			...$scrapingForm,
			fields: [...$scrapingForm.fields, { name: '', description: '', dataType: '' }]
		});
	}

	function removeField(index: number, event: MouseEvent) {
		event.preventDefault();
		scrapingForm.set({
			...$scrapingForm,
			fields: $scrapingForm.fields.filter((_, i) => i !== index)
		});
	}

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<form method="POST" use:enhance class="mx-auto max-w-2xl py-12">
	<h2 class="text-lg pb-2 pt-12">Step 1: Enter the URL of the website you want to scrape</h2>

	<label for="url" class="label">
		<span class="label-text">Url</span>
	</label>
	<input
		name="url"
		class="input input-bordered input-primary w-full"
		type="url"
		data-invalid={$errors.url}
		bind:value={$scrapingForm.url}
	/>

	{#if $errors.url}
		<div class="text-error text-sm py-2">{$errors.url}</div>
	{/if}

	<h2 class="text-lg pb-2 pt-12">Step 2: What data do you want to extract</h2>

	<div class="space-y-12">
		{#each $scrapingForm.fields as field, i (i)}
			<div class="">
				<!-- Input field for 'name' -->
				<label for={`name${i}`} class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					name="fields"
					class="input input-bordered input-primary w-full"
					type="text"
					data-invalid={$errors.fields?.[i]?.name}
					bind:value={field.name}
				/>
				{#if $errors.fields?.[i]?.name}
					<div class="text-error text-sm py-2">{$errors.fields[i].name}</div>
				{/if}

				<!-- Input field for 'description' -->
				<label for={`description${i}`} class="label">
					<span class="label-text">Description</span>
				</label>
				<input
					name="fields"
					class="input input-bordered input-primary w-full"
					type="text"
					data-invalid={$errors.fields?.[i]?.description}
					bind:value={field.description}
				/>
				{#if $errors.fields?.[i]?.description}
					<div class="text-error text-sm py-2">{$errors.fields[i].description}</div>
				{/if}

				<!-- Select field for 'dataType' -->
				<label for={`dataType${i}`} class="label">
					<span class="label-text">Data Type</span>
				</label>
				<select
					name="fields"
					class="select select-bordered select-primary w-full"
					data-invalid={$errors.fields?.[i]?.dataType}
					bind:value={field.dataType}
				>
					<option value="">--Select Data Type--</option>
					<option value="text">String</option>
					<option value="number">Number</option>
					<option value="date">Date</option>
					<option value="date">Boolean</option>
				</select>
				{#if $errors.fields?.[i]?.dataType}
					<div class="text-error text-sm py-2">{$errors.fields[i].dataType}</div>
				{/if}

				{#if $scrapingForm.fields.length > 1 && i !== 0}
					<Button variant="errorOutline" class="mt-2" on:click={(event) => removeField(i, event)}
						>Remove Field</Button
					>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-8 flex gap-2">
		<Button on:click={addField}>Add Field</Button>
		<Button variant="primary">
			{#if $delayed}
				<span class="loading loading-spinner" />
			{/if}
			Extract Data</Button
		>
	</div>
</form>

<!-- {#if form?.websiteData}
	<div class="pt-20">
		{JSON.stringify(form.websiteData.bodyText)}
	</div>
{/if} -->

{#if form?.result && $scrapingForm.fields}
	<div class="px-4 sm:px-6 lg:px-8 py-20">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="text-base font-semibold leading-6 text-primary">Results</h1>
				<p class="mt-2 text-sm text-base-content">Result table of scraped data.</p>
			</div>
		</div>
		<div class="mt-8 flow-root">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table class="min-w-full divide-y divide-base-content">
						<thead>
							<tr>
								{#each $scrapingForm.fields as field, i (i)}
									<th
										scope="col"
										class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-accent"
										>{field.name}</th
									>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-base-content">
							{#each form.result as item, j (j)}
								<tr>
									{#each $scrapingForm.fields as field, i (i)}
										<td class="whitespace-nowrap px-2 py-2 text-sm text-base-content"
											>{getValue(item, field.name)}</td
										>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- <div class="pt-20">
	<SuperDebug data={$scrapingForm} />
</div> -->
