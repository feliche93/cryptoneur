<script lang="ts">
	import Features from '$lib/compoents/Features.svelte';
	import Hero from '$lib/compoents/hero/Hero.svelte';
	import { CheckCircle, Code, FileDownIcon, Mail } from 'lucide-svelte';

	let features = [
		{
			title: 'Zero Coding Experience Required',
			description:
				'Dive right in, no coding experience necessary. Just supply the website URL and specify the data you need. Leave the HTML, CSS, and JavaScript to us.',
			icon: Code
		},
		{
			title: 'Unbreakable Resilience',
			description:
				'Worried about HTML modifications? Fear not. Our robust scraper adjusts and continues to operate effectively, regardless of changes.',
			icon: CheckCircle
		},
		{
			title: 'Universally Compatible',
			description:
				'Say goodbye to constant scraper adjustments. Our technology is equipped to work seamlessly with any new website.',
			icon: Mail
		},
		{
			title: 'Hassle-Free Data Export',
			description:
				'Simple and flexible data export options at your fingertips. Choose from CSV, JSON, or Excel formats for your convenience.',
			icon: FileDownIcon
		}
		// More features...
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
