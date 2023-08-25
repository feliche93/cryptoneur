<script lang="ts">
	import Features from '$components/features.svelte';
	import Hero from '$components/hero/Hero.svelte';
	import PersonalNote from '$components/personal-note.svelte';
	import { BarChart, Bell, Database, Filter, Folder, UserPlus } from 'lucide-svelte';
	import avatarFelixVemmer from '$lib/images/avatarFelixVemmer.png';

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
<PersonalNote
	title="As a web3 entrepreneur, finding the right funding opportunity for your project can be a daunting task."
	content={`With so many grants available, it can be difficult to navigate and find the ones that align with your specific project and use case. Additionally, a lack of data-driven insights on past and successful grant applications can make the application process even more challenging.

		We understand these challenges and have created a solution. Our web3 grant platform is a comprehensive and constantly updated database of web3 grants, equipped with advanced filtering options and valuable data-driven insights to make the search and application process easier for you.

		But our platform isn't just about providing resources - it's also about building a community. Anyone can contribute and add information to our database, making it even more complete and beneficial for all users.

		As a web3 entrepreneur, I understand the importance of funding and resources for the success of your project. That's why I'm committed to making Cryptoneur's web3 grant platform the go-to destination for anyone looking for funding opportunities in the web3 space.`}
	personAvatarUrl={avatarFelixVemmer}
	personName="Felix Vemmer"
	personTitle="CEO Cryptoneur.xyz"
/>
