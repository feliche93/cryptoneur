<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$ui/Button/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Profile</h1>
<div>
	<p>User id: {data.user.userId}</p>
	<p>Username: {data.user.email}</p>
</div>
<form use:enhance method="post">
	<Button type="submit" variant="primary">Logout</Button>
</form>
