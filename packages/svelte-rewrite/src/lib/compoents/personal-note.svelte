<script lang="ts">
	export let personAvatarUrl: string;
	export let personName: string;
	export let title: string;
	export let content: string;
	export let personTitle: string;
</script>

<div class="mx-auto my-12 max-w-2xl overflow-hidden rounded-none shadow sm:rounded-lg">
	<div class="space-y-8 bg-base-300 px-4 py-5 text-2xl sm:p-6">
		<h3
			class="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent"
		>
			{title}
		</h3>
		<div class="prose text-lg">
			{@html content.replace(/\n/g, '<br>')}
		</div>
	</div>
	<div class="bg-base-200 px-4 py-4 sm:px-6">
		<div class="flex items-center justify-start">
			<img src={personAvatarUrl} alt={personName} loading="lazy" class="h-20 w-20 rounded-full" />
			<div class="ml-4 inline-block">
				<div class="text-xl font-bold text-base-content">{personName}</div>
				<div class="text-base font-thin text-base-content">{personTitle}</div>
			</div>
		</div>
	</div>
</div>
