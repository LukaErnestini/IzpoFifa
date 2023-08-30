<script lang="ts">
	import PreviousGames from '$lib/components/games/PreviousGames.svelte';
	import type { GamesTeamsWinner } from '$lib/types';
	import type { Player, Game, Team } from '@prisma/client';

	export let gamedayId: number;
	export let players: Player[];
	export let games: GamesTeamsWinner;

	const team1 = players.map((player) => {
		return { ...player, selected: false, hidden: false };
	});
	const team2 = players.map((player) => {
		return { ...player, selected: false, hidden: false };
	});
</script>

<h1 class="text-3xl my-4">Create game</h1>
<form action="?/createGame" method="post">
	<input type="hidden" name="gamedayId" value={gamedayId} />
	<div class="flex w-full">
		<div class="grid py-4 flex-grow card bg-base-300 rounded-box place-items-center">
			{#each players as player, i}
				<div class="form-control">
					<label class="label cursor-pointer">
						<span
							class="label-text {team1[i].selected ? 'text-accent' : ''} {team2[i].selected
								? 'line-through text-neutral'
								: ''}">{player.name}</span
						>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={team1[i].selected}
							value={player.id}
							name="team1"
							hidden
							disabled={team2[i].selected}
						/>
					</label>
				</div>
			{/each}
		</div>
		<div class="divider divider-horizontal">VS</div>
		<div class="grid py-4 flex-grow card bg-base-300 rounded-box place-items-center">
			{#each players as player, i}
				<div class="form-control">
					<label class="label cursor-pointer">
						<span
							class="label-text
                            {team2[i].selected ? 'text-accent' : ''}
                            {team1[i].selected ? 'line-through text-neutral' : ''}"
							>{player.name}
						</span>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={team2[i].selected}
							value={player.id}
							name="team2"
							hidden
							disabled={team1[i].selected}
						/>
					</label>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex w-full justify-center">
		<button class="btn btn-wide m-4">Start Game</button>
	</div>
</form>

<h2 class="text-2xl mt-12 mb-4">Previous games</h2>
<div>
	{#if games.length}
		<PreviousGames {games} />
	{:else}
		<p class="text-s">No games played. Start one!</p>
	{/if}
</div>
