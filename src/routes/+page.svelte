<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data;

	$: if (browser && data.session?.user) {
		goto('/stats');
	}
</script>

<form class="px-4 flex items-center justify-center min-h-screen" action="?/signin" method="post">
	<div class="form-control p-8 rounded-lg bg-neutral">
		<p class="uppercase self-center mb-8 text-4xl">IZPOFIFA</p>
		<label class="label pt-0 pb-1" for="email">
			<span class="label-text">Username</span>
		</label>
		<input class="input" name="email" type="email" />
		<label class="label pb-1" for="password">
			<span class="label-text">Password</span>
		</label>
		<input class="input" name="password" type="password" />
		<button class="btn btn-primary mt-6">Log in</button>
		<button class="btn btn-warning hidden" formaction="?/signout">Log out</button>
		<p class="text-center mt-4 text-error">
			This is version 2.2, alpha release. Probably many bugs and security vulnerabilites. For best
			experience open on a mobile screen.
		</p>
	</div>
</form>

<style>
</style>
