<script lang="ts">
	import Features from '$lib/compoents/features.svelte';
	import Hero from '$lib/compoents/hero/Hero.svelte';
	import { Calculator, CheckCircle, Code, DollarSignIcon, FileDownIcon, Mail } from 'lucide-svelte';

	let features = [
		{
			title: 'Gas Fees Calculator',
			description:
				'Start calculating gas fees for the biggest networks at different transaction speeds in your own local currency for a variety of blockchain transactions.',
			icon: Calculator
		},
		{
			title: 'Web3 Grants',
			description:
				'Worried about HTML modifications? Fear not. Our robust scraper adjusts and continues to operate effectively, regardless of changes.',
			icon: DollarSignIcon
		}
	];
</script>

<Hero let:Title let:Subtitle let:Button>
	<Title
		>Welcome to Cryptoneur the site for <span
			class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>Web3 Entrepreneurs</span
		></Title
	>
	<Subtitle>Find the top grants and all resources around Web3.</Subtitle>
	<div class="pt-4 flex gap-2 sm:flex-row justify-center flex-col">
		<Button variant="primary" size="responsive" href="/web3-grants">Web3 Grants</Button>
		<Button variant="primaryOutline" href="/gas-fees-calculator" size="responsive"
			>Gas Fees Calculator</Button
		>
	</div>
</Hero>
<Features let:Title {features}>
	<Title class="lg:text-4xl"
		>Crunchbase for <span
			class="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>Web3 Grants</span
		></Title
	>
</Features>
