<script lang="ts">
	import PlayerAvatarSelect from '$lib/components/players/PlayerAvatarSelect.svelte';
	import type { Player } from '@prisma/client';

	export let players: Player[];
	export let inputName: string;
	export let selected: number | null;

	function toggle(id: number) {
		if (id === selected) selected = null;
	}
</script>

<div class="flex items-center justify-evenly gap-4 h-20">
	{#each players as { name, imageUri, id }}
		<label class="cursor-pointer">
			<PlayerAvatarSelect {imageUri} {name} selected={id === selected ? true : false} />
			<input
				type="radio"
				name={inputName}
				bind:group={selected}
				value={id}
				hidden
				on:click={() => toggle(id)}
			/>
		</label>
	{/each}
</div>
