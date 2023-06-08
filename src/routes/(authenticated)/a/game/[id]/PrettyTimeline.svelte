<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Attempt, Player, Team, PlayersInTeam } from '@prisma/client';

	export let attempts: Attempt[];
	export let teamA:
		| Team & {
				players: (PlayersInTeam & {
					player: Player;
				})[];
		  };
	export let teamB:
		| Team & {
				players: (PlayersInTeam & {
					player: Player;
				})[];
		  };

	let players = [...teamA.players.map((e) => e.player), ...teamB.players.map((e) => e.player)];

	// Determine to which team the attempt belongs
	// AttemptTeam[3] = 0 would mean the fourth attempt belongs to teamA
	var attemptsTeam = attempts.map((att) => {
		if (teamA.players.map((e) => e.player).find((p) => p.id === att.shooterId)) return 0;
		else return 1;
	});
</script>

<!-- TODO Display fouls as well, ideally in the same timeline -->

{#each attempts as { time, goal, assistedId, shooterId }, i}
	{#if goal}
		<div>
			<span
				id="attempt"
				class="flex items-center gap-2 text-lg {attemptsTeam[i] ? 'flex-row-reverse' : ''}"
			>
				<p class="text-sm">{time}'</p>
				{#if goal}
					<span> <Icon icon="game-icons:soccer-ball" /></span>
				{/if}
				<span class="flex items-center y">
					<!-- <div class="avatar">
			<div class="w-6 rounded-full">
				<img alt="avatar" src={players.find((p) => p.id === shooterId)?.imageUri} />
			</div>
		</div> -->
					{players.find((p) => p.id === shooterId)?.name}
				</span>
				{#if assistedId}
					<!-- <PlayerAvatarSelect name={assisted.name} imageUri={assisted.imageUri} width="2rem" /> -->
					<p class="text-sm">ass: {players.find((p) => p.id === assistedId)?.name}</p>
				{/if}
			</span>
		</div>
	{/if}
{/each}
