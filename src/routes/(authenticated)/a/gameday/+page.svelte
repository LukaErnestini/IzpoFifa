<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/util.js';
	import type { Game } from '@prisma/client';
	import CreateGd from './CreateGD.svelte';
	import CreateGame from './CreateGame.svelte';
	import Icon from '@iconify/svelte';

	export let data;
	export let form;

	// console.log(data.activeGameday);
	// console.log(data.teams);
	// console.log(data.activeGameday);
</script>

{#if form?.error}
	<div class="px-1">
		<div class="alert alert-error shadow-lg">
			<div>
				<Icon icon="material-symbols:error-outline-rounded" color="red" />
				<span>{form.error}</span>
			</div>
		</div>
	</div>
{/if}
{#if data.activeGameday}
	{#if data.activeGame}
		<p>A game is active. You should have been redirected and not be shown this message.</p>
	{:else}
		<!-- TODO design -->
		<CreateGame
			games={data.activeGameday.games}
			players={data.activeGameday.players.map((el) => el.player)}
			gamedayId={data.activeGameday.id}
		/>
		<!-- TODO display stats -->
		<form action="?/end" method="post">
			<div class="flex w-full justify-center">
				<input type="hidden" name="id" value={data.activeGameday.id} />
				<button formaction="?/end" class="btn btn-wide btn-warning m-4">End Gameday</button>
			</div>
		</form>
	{/if}
{:else}
	<CreateGd players={data.players} />
	{#if !data.finishedGamedays.length}
		<p>No gamedays yet. Start one</p>
	{/if}
	<ul>
		{#each data.finishedGamedays as gameday}
			<li>{formatDate(gameday.createdAt)}</li>
		{/each}
	</ul>
{/if}
