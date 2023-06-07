<script lang="ts">
	import type { DfTeamOverall } from '$lib/types.js';
	import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import AgGridSvelte from 'ag-grid-svelte';

	export let dfTeamOverall: DfTeamOverall[];

	const columnDefs: ColDef<DfTeamOverall>[] = [
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

	let api: GridApi<DfTeamOverall>, columnApi: ColumnApi;

	function onGridReady() {
		// rowData
		api.setRowData(dfTeamOverall);
		columnApi.autoSizeAllColumns();
		//
	}
</script>

<!-- TODO: set table width max to be the content inside -->
<div class="flex">
	<div class="ag-theme-alpine-dark flex-auto max-h-[500px] p-4">
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
</div>
