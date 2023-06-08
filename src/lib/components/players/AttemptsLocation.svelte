<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Attempt } from '@prisma/client';

	const soccerPitchWidth = 65; //meters
	const soccerPitchTouchlineHalf = 50; //meters

	export let attempts: Attempt[] | undefined;
	export let rotate180 = false;

	let showGoals = true;
	let showOnTarget = true;
	let showMisses = true;
</script>

<div class="relative">
	<div class={rotate180 ? 'transform rotate-180' : ''}>
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
								{#if showGoals}
									<Icon class="text-white" icon="codicon:circle" width="22px" />
								{/if}
							{:else if attempt.onTarget}
								{#if showOnTarget}
									<Icon class="text-purple-700" icon="codicon:circle" width="22px" />
								{/if}
							{:else if showMisses}
								<Icon class="text-black" icon="codicon:circle" width="22px" />
							{/if}
						</li>
					{/if}
				{/each}
			{/if}
		</ul>
	</div>
	<div class="absolute flex flex-col {rotate180 ? 'top-0 right-0' : 'bottom-0'}">
		<label class="cursor-pointer label w-22 py-0.5">
			<span class="label-text text-gray-800 text-xs">Goals</span>
			<input name="goal" type="checkbox" bind:checked={showGoals} class="hidden" />
			<Icon
				class={showGoals ? 'text-white' : 'text-transparent'}
				icon="codicon:circle"
				width="22px"
			/>
		</label>
		<label class="cursor-pointer label w-22 py-0.5">
			<span class="label-text text-gray-800 text-xs">OnTarget</span>
			<input name="onTarget" type="checkbox" bind:checked={showOnTarget} class="hidden" />
			<Icon
				class={showOnTarget ? 'text-purple-700' : 'text-transparent'}
				icon="codicon:circle"
				width="22px"
			/>
		</label>
		<label class="cursor-pointer label w-22 py-0.5">
			<span class="label-text text-gray-800 text-xs">Misses</span>
			<input name="misses" type="checkbox" bind:checked={showMisses} class="hidden" />
			<Icon
				class={showMisses ? 'text-black' : 'text-transparent'}
				icon="codicon:circle"
				width="22px"
			/>
		</label>
	</div>
</div>
