<script lang="ts">
	import Features from '$lib/compoents/Features.svelte';
	import Hero from '$lib/compoents/hero/Hero.svelte';
	import { BarChart, Bell, Database, Filter, Folder, UserPlus } from 'lucide-svelte';

	let features = [
		{
			title: 'Customized Filters',
			description:
				'Easily find grants that align with your idea by using our advanced filtering options, including categories, blockchain ecosystem, funding amount, and use cases.',
			icon: Filter
		},
		{
			title: 'Up-to-Date and Comprehensive',
			description:
				'By collaborating with both grant programs and individual contributors, we are able to maintain an up-to-date and comprehensive dataset.',
			icon: Database
		},
		{
			title: 'Access to Previous Applications',
			description:
				'We provide access to a vast database of previous grant applications, both successful and unsuccessful, allowing you to learn from the experiences of others and improve your own grant application.',
			icon: Folder
		},
		{
			title: 'Data-Driven Insights',
			description:
				'Our data-driven approach provides valuable insights on the grant application process, successful grants, and average funding amounts. By analyzing data on past grants, you can make informed decisions and increase your chances of success.',
			icon: BarChart
		},
		{
			title: 'Customizable Grant Alerts',
			description:
				'Stay informed of new grant opportunities that align with your specific criteria by setting up customizable alerts on our platform.',
			icon: Bell
		},
		{
			title: 'Mentorship Program',
			description:
				'Connect with experienced grant writers or other experts through our mentorship program to receive guidance and feedback on your applications.',
			icon: UserPlus
		}
	];
</script>

<Hero let:Title let:Subtitle let:Button>
	<Title
		>Crunchbase for <span
			class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>Web3 Grants</span
		></Title
	>
	<Subtitle
		>We have a complete and up-to-date database of web3 grants. Filter and search for grants by
		category, amount, and more.</Subtitle
	>
	<div class="pt-4 flex gap-2 sm:flex-row justify-center flex-col">
		<Button size="lg" variant="primary" href="/web3-grants/search">Find a Grant</Button>
	</div>
</Hero>
<Features let:Title {features}>
	<Title class="lg:text-4xl"
		>Making Grants <span
			class="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
			>Great Again</span
		></Title
	>
</Features>
