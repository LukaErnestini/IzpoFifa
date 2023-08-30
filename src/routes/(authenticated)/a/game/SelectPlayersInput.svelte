<script lang="ts">
	import PlayerAvatarSelect from '$lib/components/players/PlayerAvatarSelect.svelte';
	import type { Player } from '@prisma/client';

	interface PlayerWithHidden extends Player {
		isHidden: boolean;
	}

	export let players: Player[];
	export let shown: Player[];
	export let inputName: string;
	export let selected: number | null;
	export let label: string;

	let playersMapped: PlayerWithHidden[] = [];

	$: {
		playersMapped = players.map((player) => {
			const isHidden = !shown.includes(player);
			return {
				...player,
				isHidden
			};
		});
	}

	function toggle(id: number) {
		if (id === selected) selected = null;
	}
</script>

<div class="flex flex-col w-full">
	<div class="self-center">{label}</div>
	<div
		class="flex items-center justify-evenly gap-4 min-h-[8rem] border rounded-xl border-neutral-content"
	>
		{#each playersMapped as { name, imageUri, id, isHidden }}
			<label
				class:grayscale={isHidden}
				class:cursor-pointer={!isHidden}
				class:opacity-25={isHidden}
			>
				<PlayerAvatarSelect {imageUri} {name} selected={id === selected ? true : false} />
				<input
					type="radio"
					name={inputName}
					bind:group={selected}
					value={id}
					hidden
					disabled={isHidden}
					on:click={() => toggle(id)}
				/>
			</label>
		{/each}
	</div>
</div>
