<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon, { enableCache } from '@iconify/svelte';

	export let data;
</script>

{#if !data.players.length}
	<p>No players yet.</p>
{/if}
{#each data.players as player}
	<div class="flex justify-between px-4 py-1 mt-2">
		<a href="players/{player.id}">{player.name}</a>
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
