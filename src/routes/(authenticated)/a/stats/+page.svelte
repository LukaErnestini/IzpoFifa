<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import GridTable from './GridTable.svelte';
	import type { ColDef } from 'ag-grid-community';
	import type { DfPlayerOverall, DfTeamOverall, DfShot } from '$lib/types.js';

	export let data;

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
</script>

{#if data.activeGameday}
	<a href={`/a/gameday/${data.activeGameday.id}`} class="alert alert-info">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-current shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>A gameday is in progress. Click this alert to see data for it.</span>
	</a>
{/if}
<div class="form-control gap-8 w-full">
	<h1 class="text-4xl text-center uppercase my-4">Stats</h1>
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

<!-- <style>
	:global(.ag-cell) {
		padding: 0 10px;
	}

	:global(.ag-header-cell) {
		padding: 0 10px;
	}
</style> -->
