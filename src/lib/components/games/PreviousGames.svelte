<script lang="ts">
	import type { GamesTeamsWinner } from '$lib/types';

	export let games: GamesTeamsWinner;
</script>

<div class="flex flex-col gap-1">
	{#each games as game}
		<a
			href="/a/game/{game.id}"
			class="w-full flex justify-between gap-8"
			class:opacity-75={!game.finished}
		>
			<span>
				{game.scoreTeamA}
			</span>
			<span>
				<span class:text-success={game.winnerId === game.teamA.id}>
					{game.teamA.name}
				</span>
				{#if !game.finished}
					<span class="loading loading-spinner loading-xs" />
				{:else}
					<span>VS</span>
				{/if}
				<span class:text-success={game.winnerId === game.teamB.id}>
					{game.teamB.name}
				</span>
			</span>
			<span>
				{game.scoreTeamB}
			</span>
		</a>
	{/each}
</div>
