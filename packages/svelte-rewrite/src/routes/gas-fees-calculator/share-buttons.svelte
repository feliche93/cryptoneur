<script lang="ts">
	import {
		Email,
		Facebook,
		HackerNews,
		LinkedIn,
		Reddit,
		Telegram,
		Twitter,
		WhatsApp
		// @ts-ignore
	} from 'svelte-share-buttons-component';

	const url = 'https://www.cryptoneur.xyz/gas-fees-calculator';
	const title = 'Gas Fees Calculator (Multi Currency, Network & Txn Types)';
	const desc =
		'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony..';
</script>

<div class="flex flex-row gap-2 justify-center pt-8">
	<Email class="share-button rounded-xl" subject={title} body="{desc} {url}" />
	<HackerNews class="share-button rounded-xl" {title} {url} />
	<Reddit class="share-button rounded-xl" {title} {url} />
	<LinkedIn class="share-button rounded-xl" {url} />
	<Telegram class="share-button rounded-xl" text={title} {url} />
	<WhatsApp class="share-button rounded-xl" text="{title} {url}" />
	<Facebook class="share-button rounded-xl" quote={title} {url} />
	<Twitter
		class="share-button rounded-xl"
		text={title}
		{url}
		hashtags="github,svelte"
		via="username"
		related="other,users"
	/>
</div>
