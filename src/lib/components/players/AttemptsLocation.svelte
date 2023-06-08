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
							<img src="/img/ball.bmp" alt="ball" width="12px" />
						{:else if attempt.onTarget}
							<Icon class="text-black" icon="carbon:dot-mark" width="20px" />
						{:else}
							<Icon class="text-black" icon="codicon:circle" width="20px" />
							<!-- else content here -->
						{/if}
					</li>
				{/if}
			{/each}
		{/if}
	</ul>
</div>
