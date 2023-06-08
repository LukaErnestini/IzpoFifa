<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data;
	export let form;
	// console.log(form);

	$: if (browser && data.session?.user) {
		goto('/stats');
	}
</script>

<form class="px-4 flex items-center justify-center min-h-screen" action="?/signin" method="post">
	<div class="form-control p-8 rounded-lg bg-neutral">
		<p class="uppercase self-center mb-8 text-4xl">IZPO-FIFA</p>
		<label class="label pt-0 pb-1" for="email">
			<span class="label-text">Username</span>
		</label>
		<input class="input" name="email" type="email" />
		<label class="label pb-1" for="password">
			<span class="label-text">Password</span>
		</label>
		<input class="input" name="password" type="password" />
		<button class="btn btn-primary my-6 mb-0">Log in</button>
		<button class="btn btn-warning hidden" formaction="?/signout">Log out</button>
		<p class="text-center mt-4 text-error">
			This is version 2.0, alpha release. Probably many bugs and security vulnerabilites. For best
			experience open on a mobile screen.
		</p>
	</div>
</form>

<style>
</style>
