<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/util.js';
	import type { Game } from '@prisma/client';
	import CreateGd from './CreateGD.svelte';
	import CreateGame from './CreateGame.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';

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
		<form action="?/end" method="post" use:enhance>
			<input type="hidden" name="id" value={data.activeGameday.id} />
			<div class="flex w-full justify-center">
				<!-- The button to open modal -->
				<label for="my-modal-4" class="btn btn-wide btn-warning m-4">End Gameday</label>
			</div>

			<input type="checkbox" id="my-modal-4" class="modal-toggle" />
			<label for="my-modal-4" class="modal cursor-pointer">
				<label class="modal-box relative" for="">
					<h3 class="text-lg font-bold">Are you sure you want to end the gameday?</h3>
					<div class="modal-action">
						<label for="my-modal-4" class="btn"> No </label>
						<button formaction="?/end">
							<label for="my-modal-4" class="btn btn-warning"> Yes </label>
						</button>
					</div>
				</label>
			</label>
		</form>
	{/if}
{:else}
	<CreateGd players={data.players} />
	{#if !data.finishedGamedays.length}
		<p>No gamedays yet. Start one</p>
	{/if}
	<ul>
		{#each data.finishedGamedays as gameday}
			<a href={'gameday/' + gameday.id}>
				<li>{formatDate(gameday.createdAt)}</li>
			</a>
		{/each}
	</ul>
{/if}
