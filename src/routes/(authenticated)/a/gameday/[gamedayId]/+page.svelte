<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/util.js';

	export let data;
	let gameday = data.finishedGamedays.find((gd) => gd.id === +$page.params.gamedayId);
	let games = gameday?.games;
</script>

<!-- TODO display stats -->

{#if games}
	{#each games as game}
		<a href="/a/game/{game.id}" class="block">
			<span class={game.winnerId === game.teamA.id ? 'text-lg text-success' : ''}
				>{game.teamA.name}</span
			>
			<span>VS</span>
			<span class={game.winnerId === game.teamB.id ? 'text-lg text-success' : ''}
				>{game.teamB.name}</span
			>
		</a>
	{/each}
{/if}
