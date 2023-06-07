<script lang="ts">
	import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
	import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
	import PlayersOverall from './PlayersOverall.svelte';
	import ShotsOverall from './ShotsOverall.svelte';
	import TeamsOverall from './TeamsOverall.svelte';

	export let data;
</script>

<TeamsOverall dfTeamOverall={data.dfTeamOverall} />
<PlayersOverall dfPlayerOverall={data.dfPlayerOverall} />
<ShotsOverall dfShot={data.dfShots} />

<!-- <style>
	:global(.ag-cell) {
		padding: 0 10px;
	}

	:global(.ag-header-cell) {
		padding: 0 10px;
	}
</style> -->
