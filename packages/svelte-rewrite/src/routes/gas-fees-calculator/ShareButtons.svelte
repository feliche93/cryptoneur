<script>
	import { Email, HackerNews } from 'svelte-share-buttons-component';

	const url = 'https://pchynoweth.github.io/svelte-share-buttons-component/';
	const title = 'Svelte Share Buttons Component';
	const desc = 'Svelte based social media share buttons component with no tracking.';
</script>

<Email subject={title} body="{desc} {url}" />
<HackerNews class="share-button" {title} {url} />
