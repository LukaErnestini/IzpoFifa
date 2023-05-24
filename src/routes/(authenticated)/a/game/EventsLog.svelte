<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import type { Attempt, Foul, Player } from '@prisma/client';

	export let attempts: Attempt[];
	export let fouls: Foul[];
	export let players: Player[];
</script>

{#if fouls.length}
	<div class="divider" />
	{#each fouls as foul}
		<div class="flex px-1">
			<span class="min-w-[2rem]">{foul.time}'</span>
			<span class="min-w-[2rem]">
				{#if foul.card === 'yellow'}
					<Icon icon="tabler:rectangle-vertical-filled" color="yellow" width="24" />
				{:else if foul.card === 'red'}
					<Icon icon="tabler:rectangle-vertical-filled" color="red" width="24" />
				{:else}
					no card
				{/if}
			</span>
			<span class="min-w-[4rem]">{players.find((p) => p.id === foul.playerId)?.name}</span>
			<span class="min-w-[4rem]">
				<form action="?/removeFoul" method="post" use:enhance>
					<input type="hidden" name="foulId" value={foul.id} />
					<button>
						<Icon icon="system-uicons:cross-circle" class="text-error" width="24" />
					</button>
				</form>
			</span>
		</div>
	{/each}
	<div class="divider" />
{/if}

<div class="">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th>T</th>
				<th>Goal</th>
				<th>OnT</th>
				<th>Pen</th>
				<th>Sho</th>
				<th>Ass</th>
				<th>Keep</th>
				<th class="w-4 p-0" />
			</tr>
		</thead>
		<tbody>
			{#if attempts}
				{#each attempts as a}
					<tr>
						<td>
							{a.time ? a.time + "'" : ''}
						</td>
						<td class={a.goal ? 'text-success' : ''}>
							{#if a.goal}
								<Icon width="16" icon="charm:tick" />
							{/if}
						</td>
						<td>
							{#if a.onTarget}
								<Icon width="16" icon="charm:tick" />
							{/if}
						</td>
						<td>
							{#if a.penalty}
								<Icon width="16" icon="charm:tick" />
							{/if}
						</td>
						<td>
							{players.find((p) => p.id === a.shooterId)?.name}
						</td>
						<td>
							{#if a.assistedId}
								{players.find((p) => p.id === a.assistedId)?.name}
							{/if}
						</td>
						<td>
							{#if a.goalieId}
								{players.find((p) => p.id === a.goalieId)?.name}
							{/if}
						</td>
						<td class="px-0 pr-2">
							<form action="?/removeAttempt" method="post" use:enhance>
								<input type="hidden" name="id" value={a.id} />
								<button>
									<Icon icon="system-uicons:cross-circle" class="text-error" width="24" />
								</button>
							</form>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
</style>
