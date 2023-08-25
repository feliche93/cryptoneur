<script lang="ts">
	import Hero from '$components/hero/Hero.svelte';
	import CurrencyInput from './currency-input.svelte';
	import GasPriceInput from './gas-price-input.svelte';
	import Gitcoin from './gitcoin.svelte';
	import ShareButtons from './share-buttons.svelte';
	import UsedGasInput from './used-gas-input.svelte';
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

<div class="pt-24 space-y-6">
	<CurrencyInput />
	<UsedGasInput />
	<GasPriceInput />
</div>
