<script lang="ts">
	import { page } from '$app/stores';
	import type { DfPlayerOverall, DfShot, DfTeamOverall, GamesTeamsWinner } from '$lib/types.js';
	import { formatDate } from '$lib/util.js';
	import type { ColDef } from 'ag-grid-community';
	import GridTable from '../../stats/GridTable.svelte';
	import PreviousGames from '$lib/components/games/PreviousGames.svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data;
	let gameday =
		data.finishedGamedays.find((gd) => gd.id === +$page.params.gamedayId) || data.activeGameday;
	// forcing type here - could cause issues?
	let games = gameday?.games as GamesTeamsWinner | undefined;

	const shotsOverallColumnDefs: ColDef<DfShot>[] = [
		{ headerName: 'Player', field: 'Player', pinned: 'left' },
		{ headerName: 'Rank', field: 'Rank', sortable: true },
		{ headerName: 'Goals', field: 'G', sortable: true },
		{ headerName: 'Goals/MP', field: 'G/MP', sortable: true },
		{ headerName: 'Shots', field: 'S', sortable: true },
		{ headerName: 'Shots/G', field: 'S/G', sortable: true },
		{ headerName: 'Shots/MP', field: 'S/MP', sortable: true },
		{ headerName: 'Shot Accuracy', field: 'Shot Accuracy', sortable: true },
		{ headerName: 'Shot On Target', field: 'SoT', sortable: true },
		{ headerName: 'Shot On Target/MP', field: 'SoT/MP', sortable: true },
		{ headerName: 'Average Shot Distance', field: 'AvgShotDistance', sortable: true },
		{ headerName: 'Assists', field: 'A', sortable: true },
		{ headerName: 'Assists/MP', field: 'A/MP', sortable: true },
		{ headerName: 'Assist to Goal Ratio', field: 'Assist to Goal Ratio', sortable: true },
		{ headerName: 'Clutch Goals', field: 'ClutchGoals', sortable: true },
		{ headerName: 'Conversion Rate', field: 'Conversion Rate', sortable: true },
		{
			headerName: 'Long Range Goal Ratio (16m+)',
			field: 'LongRangeGoalRatio(16m+)',
			sortable: true
		},
		{ headerName: 'Penalty Attempts', field: 'Penalty Attempts', sortable: true },
		{ headerName: 'Penalty Conversion Rate', field: 'Penalty Conversion Rate', sortable: true },
		{ headerName: 'Penalty Goals', field: 'Penalty Goals', sortable: true }
	];

	const teamsOverallColumnDefs: ColDef<DfTeamOverall>[] = [
		{ headerName: 'Team', field: 'Team', pinned: 'left' },
		{ headerName: 'Rank', field: 'Rank', sortable: true },
		{ headerName: 'Points', field: 'Pts', sortable: true },
		{ headerName: 'Points/MP', field: 'Pts/MP', sortable: true },
		{ headerName: 'Wins', field: 'W', sortable: true },
		{ headerName: 'Draws', field: 'D', sortable: true },
		{ headerName: 'Losses', field: 'L', sortable: true },
		{ headerName: 'MP', field: 'MP', sortable: true },
		{ headerName: 'GF', field: 'GF', sortable: true },
		{ headerName: 'GA', field: 'GA', sortable: true },
		{ headerName: 'GF/MP', field: 'GF/MP', sortable: true },
		{ headerName: 'GA/MP', field: 'GA/MP', sortable: true }
	];

	const playersOverallColumnDefs: ColDef<DfPlayerOverall>[] = [
		{ headerName: 'Player', field: 'Player', pinned: 'left' },
		{ headerName: 'Points', field: 'Pts', sortable: true },
		{ headerName: 'Points/MP', field: 'Pts/MP', sortable: true },
		{ headerName: 'Wins', field: 'W', sortable: true },
		{ headerName: 'Draws', field: 'D', sortable: true },
		{ headerName: 'Losses', field: 'L', sortable: true },
		{ headerName: 'MP', field: 'MP', sortable: true },
		{ headerName: 'GF', field: 'GF', sortable: true },
		{ headerName: 'GA', field: 'GA', sortable: true },
		{ headerName: 'GF/MP', field: 'GF/MP', sortable: true },
		{ headerName: 'GA/MP', field: 'GA/MP', sortable: true }
	];

	let showSaveTitle = false;
	let loadingSaveTitle = false;
</script>

{#if gameday}
	<form
		action="?/rename"
		method="post"
		class="flex flex-col items-end"
		use:enhance={() => {
			loadingSaveTitle = true;
			return async () => {
				loadingSaveTitle = false;
				showSaveTitle = false;
				invalidateAll();
			};
		}}
	>
		<input
			name="title"
			class="text-4xl text-center mt-12 mb-4 input input-ghost"
			value={gameday.title || formatDate(gameday.createdAt)}
			on:input={() => (showSaveTitle = true)}
		/>
		{#if showSaveTitle}
			<button type="submit" class="btn btn-primary w-min">
				{#if loadingSaveTitle}
					<span class="loading loading-spinner" />
				{:else}
					Save
				{/if}
			</button>
		{/if}
	</form>
{/if}
<h2 class="text-4xl mt-12 mb-4 uppercase">Games</h2>
{#if games && games.length}
	<PreviousGames {games} />

	<div class="form-control gap-8 w-full">
		<h1 class="text-4xl text-center uppercase mt-12 mb-4">Stats</h1>
		<div>
			<h2 class="text-2xl text-center">Teams Overall</h2>
			<GridTable rowData={data.dfTeamOverall} columnDefs={teamsOverallColumnDefs} />
		</div>
		<div>
			<h2 class="text-2xl text-center">Players Overall</h2>
			<GridTable rowData={data.dfPlayerOverall} columnDefs={playersOverallColumnDefs} />
		</div>
		<div>
			<h2 class="text-2xl text-center">Players Shooting</h2>
			<GridTable rowData={data.dfShots} columnDefs={shotsOverallColumnDefs} />
		</div>
	</div>
{:else}
	<p>No games yet</p>
{/if}
