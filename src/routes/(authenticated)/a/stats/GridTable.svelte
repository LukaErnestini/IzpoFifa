<script lang="ts">
	import type { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import AgGridSvelte from 'ag-grid-svelte';

	export let rowData: any[];
	export let columnDefs: ColDef<any>[];

	let api: GridApi<any>, columnApi: ColumnApi;

	function onGridReady() {
		// rowData
		api.setRowData(rowData);
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
