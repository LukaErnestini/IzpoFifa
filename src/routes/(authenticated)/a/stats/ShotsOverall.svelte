<script lang="ts">
	import type { DfShot } from '$lib/types.js';
	import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import AgGridSvelte from 'ag-grid-svelte';

	export let dfShot: DfShot[];

	const columnDefs: ColDef<DfShot>[] = [
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

	let api: GridApi<DfShot>, columnApi: ColumnApi;

	function onGridReady() {
		// rowData
		api.setRowData(dfShot);
		columnApi.autoSizeAllColumns();
		//
	}
</script>

<div class="ag-theme-alpine-dark max-w-full max-h-[500px] p-4">
	<AgGridSvelte
		bind:api
		bind:columnApi
		{columnDefs}
		{onGridReady}
		suppressColumnVirtualisation={true}
		animateRows={true}
		domLayout="autoHeight"
	/>
</div>
