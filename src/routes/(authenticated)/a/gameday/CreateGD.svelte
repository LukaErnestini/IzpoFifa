<script lang="ts">
	import type { Player } from '@prisma/client';

	export let players: Player[] = [];
</script>

<form action="?/create" method="post">
	{#each players as player}
		<div class="form-control">
			<label class="label cursor-pointer max-w-xs">
				<span class="label-text">{player.name}</span>
				<input type="checkbox" name="players[]" class="checkbox" value={player.id} />
			</label>
		</div>
	{/each}
	<div class="flex w-full justify-center">
		<button class="btn btn-wide m-4">Create Game Day</button>
	</div>
</form>
