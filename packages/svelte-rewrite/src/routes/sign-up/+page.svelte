<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import Button from '$ui/Button/Button.svelte';

	export let data: PageData;
</script>

<div>
	<h1>Create an account</h1>
	<form method="POST" use:enhance>
		<label for="email">Email</label><br />
		<input class="input input-primary" id="email" name="email" /><br />
		<label for="password">Password</label><br />
		<input class="input input-primary" type="password" id="password" name="password" /><br />
		<Button type="submit" variant={'primary'}>Sign up</Button>
	</form>
</div>
