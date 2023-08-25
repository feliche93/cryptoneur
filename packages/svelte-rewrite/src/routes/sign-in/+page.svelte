<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$ui/Button/Button.svelte';
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<!-- <img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
			alt="Your Company"
		/> -->
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" action="#" method="POST">
			<div class="form-control">
				<label for="email" class="label">Email address</label>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="input input-primary w-full"
					/>
				</div>
			</div>

			<div class="form-control">
				<label for="password" class="label">
					<span class="label-text"> Password </span>
					<span class="label-text-alt link link-hover">Forgot Password?</span>
				</label>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="input input-primary w-full"
					/>
				</div>
			</div>

			<div>
				<Button type="submit" variant="primary" class="w-full">Sign in</Button>
			</div>
		</form>

		<!-- <p class="mt-10 text-center text-sm text-gray-400">
			Not a member?
			<a href="#" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
				>Start a 14 day free trial</a
			>
		</p> -->
	</div>
</div>
