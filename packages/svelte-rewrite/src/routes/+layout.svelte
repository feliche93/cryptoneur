<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$ui/Button/Button.svelte';
	import posthog from 'posthog-js';
	import '../app.css';
	import type { LayoutData } from './$types';

	if (browser) {
		console.log('posthog init');
		posthog.init('phc_EdGUbAUZyY3Xb0D7LTfe8yKUkFPhYfTB3fnNhSTEwRh', {
			api_host: 'https://eu.posthog.com'
		});
	}

	export let data: LayoutData;

	$: user = data?.user; // Keep user updated
	// $: console.log({ user });

	$: $page.url.pathname, browser && posthog.capture('$pageview');
	$: {
		if (browser) {
			if (user?.userId) {
				// console.log('posthog identify');
				posthog.identify(user.userId, { email: user.email });
			} else {
				// console.log('posthog reset');
				posthog.reset();
			}
		}
	}

	const pageTitle = 'Nocode Scraper';
	const title = 'Nocode Scraper: Data Scraping without code';
	const description =
		'Seamlessly extract data from any website with just a few simple inputs. No coding necessary.';
	const keywords = 'no code, data scraping, no-code tool, web scraping, ai, gpt';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://nocodescraper.com/" />
</svelte:head>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a>Item 1</a></li>
				<li>
					<a>Parent</a>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</li>
				<li><a>Item 3</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">Cryptoneur.xyz</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal text-base px-1">
			<li><a href="/" class="">Home</a></li>
			<li><a href="/web3-grants" class="">Web3 Grants</a></li>
			<li><a href="/gas-fees-calculator" class="">Gas Fees Calculator</a></li>

			<!-- <li tabindex="0">
				<details>
					<summary>Parent</summary>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</details>
			</li>
			<li><a>Item 3</a></li> -->
		</ul>
	</div>
	<div class="navbar-end mr-4 gap-2">
		<!-- <pre>
			{JSON.stringify(user, null, 2)}
		</pre> -->
		{#if user}
			<Button href="/sign-out" variant="primaryOutline">Sign Out</Button>
		{:else}
			<Button href="/sign-in" variant="primary">Sign In</Button>
			<Button href="/sign-up" variant="primaryOutline">Sign Up</Button>
		{/if}
	</div>
</div>
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
	<slot />
</div>
