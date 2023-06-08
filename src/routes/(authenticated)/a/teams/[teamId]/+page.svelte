<script lang="ts">
	import { page } from '$app/stores';
	import ColorPicker from 'svelte-awesome-color-picker';

	export let data;

	const team = data.teams.find((team) => {
		return team.id === +$page.params.teamId;
	});

	let hex = team?.color ? team.color : undefined;
</script>

<!-- TODO design it prettier -->
{#if !team}
	<h1>404 - No Team Found</h1>
{:else}
	<form action="?/save" method="post">
		<input
			name="name"
			type="text"
			placeholder="Set team name here"
			value={team.name}
			class="input input-bordered w-full max-w-xs"
		/>

		<ColorPicker bind:hex />

		<input type="hidden" name="color" value={hex} />
		<input type="hidden" name="id" value={team.id} />

		<button class="btn btn-outline" type="submit">SAVE</button>
	</form>
{/if}
