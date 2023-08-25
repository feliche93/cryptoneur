<script>
	import Button from '$ui/Button/Button.svelte';
	import Subtitle from '$ui/Subtitle.svelte';
	import Title from '$ui/Title.svelte';
</script>

<div class="mx-auto max-w-2xl py-12 sm:py-12 lg:py-24">
	<!-- <div class="hidden sm:mb-8 sm:flex sm:justify-center">
		<div
			class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
		>
			Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"
				><span class="absolute inset-0" aria-hidden="true" />Read more
				<span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div> -->
	<div class="text-center">
		<slot {Title} {Subtitle} {Button} />
	</div>
</div>
