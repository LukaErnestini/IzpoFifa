<script lang="ts">
	export let data;
</script>

<a class="btn" href="players/new">NEW PLAYER</a>
{#each data.players as player}
	<div>
		<a href="players/{player.id}">{player.name}</a>
	</div>
{/each}
