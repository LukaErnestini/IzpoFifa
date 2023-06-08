<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Attempt } from '@prisma/client';

	const soccerPitchWidth = 65; //meters
	const soccerPitchTouchlineHalf = 50; //meters

	export let attempts: Attempt[] | undefined;
	export let rotate180 = false;
</script>

<div class="relative {rotate180 ? 'transform rotate-180' : ''}">
	<img src="/img/half-soccer-pitch.png" alt="Half soccer field" class="w-full h-auto" />
	<ul class="absolute top-0 left-0 w-full h-full">
		{#if attempts}
			{#each attempts as attempt (attempt.id)}
				{#if attempt.x !== null && attempt.y !== null}
					<li
						class="absolute transform -translate-x-1/2 -translate-y-1/2"
						style="left: {(attempt.x / soccerPitchWidth) * 100}%; top: {(attempt.y /
							soccerPitchTouchlineHalf) *
							100}%;"
					>
						{#if attempt.goal}
							<Icon class="text-white" icon="codicon:circle" width="22px" />
						{:else if attempt.onTarget}
							<Icon class="text-purple-700" icon="codicon:circle" width="22px" />
						{:else}
							<Icon class="text-black" icon="codicon:circle" width="22px" />
							<!-- else content here -->
						{/if}
					</li>
				{/if}
			{/each}
		{/if}
	</ul>
</div>
