<script lang="ts">
	import Hero from '$lib/compoents/hero/Hero.svelte';
	import type { PageData } from './$types';
	import Gitcoin from './Gitcoin.svelte';
	import ShareButtons from './ShareButtons.svelte';

	export let data: PageData;
</script>

<Hero let:Title let:Subtitle let:Button>
	<Title class="lg:text-4xl"
		>Sick of paying too <span
			class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>high gas fees</span
		> ?</Title
	>
	<Subtitle
		>Start calculating gas fees for the biggest networks at different transaction speeds in your own
		local currency for a variety of blockchain transactions.</Subtitle
	>
</Hero>
<Gitcoin />
<ShareButtons />
