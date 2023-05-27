<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	export let data;
	export let form;
</script>

<!-- TODO componentize the alert message below. It appears many times in the app. -->
{#if form?.error}
	<div class="px-1">
		<div class="alert alert-error shadow-lg">
			<div>
				<Icon width="32px" icon="material-symbols:error-outline-rounded" color="red" />
				<span>{form.error}</span>
			</div>
		</div>
	</div>
{/if}
{#if !data.players.length}
	<p>No players yet.</p>
{/if}
{#each data.players as player}
	<div class="flex justify-between px-4 py-1 mt-2">
		<a href="players/{player.id}">{player.name}</a>
		<!-- TODO add a loading spinner while waiting for the delete to appear on the page. -->
		<form action="?/delete" method="post" use:enhance>
			<input type="hidden" name="id" value={player.id} />
			<button class="btn btn-warning btn-sm">
				<Icon width="24" icon="material-symbols:delete-forever-rounded" />
			</button>
		</form>
	</div>
{/each}

<div class="flex flex-row-reverse p-4">
	<a class="btn" href="players/new">NEW PLAYER</a>
</div>
