<script lang="ts">
	export let data;
</script>

{#if !data.teams.length}
	<p>No teams yet.</p>
{/if}
<div class="flex flex-wrap justify-start p-4 gap-4">
	{#each data.teams as team, i}
		<a
			class="h-12 w-24 flex flex-col items-center rounded-2xl"
			href="teams/{team.id}"
			style="background-color: {team.color};"
		>
			<span class="btn btn-accent h-1 min-h-[1rem] mt-1">
				{team.name}
			</span>
		</a>
	{/each}
</div>
