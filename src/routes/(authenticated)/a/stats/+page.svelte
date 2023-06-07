<script lang="ts">
	import type { DfTeamOverall } from '$lib/types.js';
	import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import AgGridSvelte from 'ag-grid-svelte';

	export let data;

	const columnDefs: ColDef<DfTeamOverall>[] = [
		{ headerName: 'Rank', field: 'Rank' },
		{ headerName: 'Team', field: 'Team' },
		{ headerName: 'Points', field: 'Pts' },
		{ headerName: 'Points/MP', field: 'Pts/MP' },
		{ headerName: 'Wins', field: 'W' },
		{ headerName: 'Draws', field: 'D' },
		{ headerName: 'Losses', field: 'L' },
		{ headerName: 'MP', field: 'MP' },
		{ headerName: 'GF', field: 'GF' },
		{ headerName: 'GA', field: 'GA' },
		{ headerName: 'GF/MP', field: 'GF/MP' },
		{ headerName: 'GA/MP', field: 'GA/MP' }
	];
	// let rowData = [];

	let api: GridApi<DfTeamOverall>, columnApi: ColumnApi;

	function onGridReady() {
		// rowData
		api.setRowData(data.dfTeamOverall);
		// columnApi.autoSizeAllColumns();
		//
	}
</script>

<div class="ag-theme-alpine-dark w-full h-96">
	<AgGridSvelte bind:api bind:columnApi {columnDefs} {onGridReady} />
</div>
