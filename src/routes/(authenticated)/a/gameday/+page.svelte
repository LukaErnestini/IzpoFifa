<script lang="ts">
	import { formatDate } from '$lib/util.js';
	import CreateGd from './CreateGD.svelte';

	export let data;
	// console.log(data.activeGameday);
	// console.log(data.teams);
</script>

{#if data.activeGameday}
	<!-- active gameday -->
{:else}
	<CreateGd players={data.players} />
	{#if !data.finishedGamedays.length}
		<p>No gamedays yet. Start one</p>
	{/if}
	{#each data.finishedGamedays as gameday}
		<li>{formatDate(gameday.createdAt)}</li>
	{/each}
{/if}
