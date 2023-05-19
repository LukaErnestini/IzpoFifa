<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon, { enableCache } from '@iconify/svelte';

	export let data;
</script>

<a class="btn" href="players/new">NEW PLAYER</a>
{#each data.players as player}
	<div>
		<a href="players/{player.id}">{player.name}</a>
		<form action="?/delete" method="post" use:enhance>
			<input type="hidden" name="id" value={player.id} />
			<button class="btn btn-warning btn-sm">
				<Icon width="24" icon="material-symbols:delete-forever-rounded" />
			</button>
		</form>
	</div>
{/each}
