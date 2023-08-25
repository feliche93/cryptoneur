<script lang="ts">
	import Hero from '$components/hero/Hero.svelte';
	import PersonalNote from '$components/personal-note.svelte';
	import { BarChart, Bell, Database, Filter, Folder, UserPlus } from 'lucide-svelte';
	import avatarFelixVemmer from '$lib/images/avatarFelixVemmer.png';
	import Features from '$components/features.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import Title from '$ui/Title.svelte';

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

<div class="flex flex-col items-center py-8">
	<h3 class="lg:text-4xl font-bold pt-4 pb-8">Frequently Asked Questions</h3>

	<Accordion.Root class="w-full text-lg sm:max-w-[70%]">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>What is your web3 grant platform about?</Accordion.Trigger>
			<Accordion.Content
				>Our web3 grant platform is a comprehensive and constantly updated database of web3 grants,
				making it easy for users to find the perfect funding opportunity for their project. Our
				advanced filtering options allow users to quickly and easily search for grants by category,
				blockchain ecosystem, funding amount, or use cases. We also provide valuable data-driven
				insights on past and successful grant applications, giving users the knowledge they need to
				increase their chances of success. And with the ability for anyone to contribute and add
				information, our community is constantly growing and making our database even more complete.</Accordion.Content
			>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>What kind of grants can I find on your platform?</Accordion.Trigger>
			<Accordion.Content
				>Our platform offers a wide range of web3 grants that you can filter by category, blockchain
				ecosystem, funding amount, or use cases.</Accordion.Content
			>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>How do I apply for a grant on your platform?</Accordion.Trigger>
			<Accordion.Content
				>The process for applying for a grant on our platform varies depending on the grant. You can
				find the application instructions for each grant on the grant page.</Accordion.Content
			>
		</Accordion.Item>
		<Accordion.Item value="item-4">
			<Accordion.Trigger>Is there a cost to use your platform?</Accordion.Trigger>
			<Accordion.Content>No, our platform is free to use.</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-5">
			<Accordion.Trigger>Can I contribute to the database?</Accordion.Trigger>
			<Accordion.Content
				>Yes, anyone can contribute and add information to our database. This will help to make our
				database even more complete and accurate.</Accordion.Content
			>
		</Accordion.Item>
	</Accordion.Root>
</div>
