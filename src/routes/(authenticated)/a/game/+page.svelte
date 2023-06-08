<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Player } from '@prisma/client';
	import { AttemptType } from '$lib/types';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { SubmitFunction } from '$app/forms';
	import { getTeammates } from './util';
	import SelectPlayersInput from './SelectPlayersInput.svelte';
	import TimeInput from './TimeInput.svelte';
	import ToggleInput from './ToggleInput.svelte';
	import CardsSection from './CardsSection.svelte';
	import HalfSoccerPitchInput from './HalfSoccerPitchInput.svelte';
	import AttemptTypeSelect from './AttemptTypeSelect.svelte';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import EventsLog from './EventsLog.svelte';
	import ScoreBar from './ScoreBar.svelte';

	export let data;
	export let form;

	let attempts = data.attempts;
	let activeGame = data.activeGame;
	let latestTime = 1;
	let gamePlayers = [
		...activeGame.teamA.players.map((e) => e.player),
		...activeGame.teamB.players.map((e) => e.player)
	];
	let shooter: number | null;
	let assist: number | null;
	let goalie: number | null = null;
	let attempt = AttemptType.OnTarget;
	let goal = false;
	let onTarget = false;
	let autogoal = false;
	let penalty = false;
	let loading = false;
	let x: number | null;
	let y: number | null;
	let distance: number | null;
	let time = latestTime;
	let shooterTeammates: Player[] = [];
	let goaliePlayers: Player[] = [];
	let expanded = false;

	$: time = latestTime;
	$: if (attempts && attempts.length) {
		latestTime = attempts[0].time;
	} else {
		latestTime = 1;
	}
	$: if (autogoal) {
		goal = true;
		attempt = AttemptType.Goal;
	}
	$: if (shooter) {
		assist = null;
	}
	$: shooterTeammates = getTeammates(
		activeGame?.teamA.players.map((e) => e.player),
		activeGame?.teamB.players.map((e) => e.player),
		shooter
	);
	$: goaliePlayers = getTeammates(
		activeGame?.teamA.players.map((e) => e.player),
		activeGame?.teamB.players.map((e) => e.player),
		shooter,
		true
	);

	const addEvent: SubmitFunction = (input) => {
		// Before form submits
		loading = true;

		return async ({ update, result, form }) => {
			window.scrollTo({ top: 64, behavior: 'smooth' });
			if (result.type === 'failure') {
				loading = false;
				return await update();
			}
			// After form submits
			shooter = null;
			assist = null;
			goalie = null;
			penalty = false;
			attempt = AttemptType.OnTarget;
			autogoal = false;
			expanded = false;
			x = null;
			y = null;
			distance = null;
			await update({ reset: false });
			loading = false;
		};
	};

	onMount(async () => {
		window.scrollTo({ top: 64, behavior: 'smooth' });
	});
</script>

<ScoreBar
	scoreTeamA={data.activeGame.scoreTeamA}
	scoreTeamB={data.activeGame.scoreTeamB}
	teamA={data.activeGame.teamA}
	teamB={data.activeGame.teamB}
/>

{#if form?.error}
	<div class="px-1">
		<div class="alert alert-error shadow-lg">
			<div>
				<Icon icon="material-symbols:error-outline-rounded" color="red" />
				<span>{form.error}</span>
			</div>
		</div>
	</div>
{/if}
<form action="?/attempt" method="post" use:enhance={addEvent}>
	<div class="form-control m-4 gap-6">
		<TimeInput {time} />
		<!-- <div class={form?.tag === 'shooter' ? 'border border-warning rounded-lg' : ''}> -->
		<SelectPlayersInput inputName="shooter" players={gamePlayers} bind:selected={shooter} />
		<!-- </div> -->
		<SelectPlayersInput inputName="assisted" players={shooterTeammates} bind:selected={assist} />
		<HalfSoccerPitchInput bind:x bind:y bind:distance />
		<input type="checkbox" name="goal" bind:checked={goal} hidden />
		<input type="checkbox" name="onTarget" bind:checked={onTarget} hidden />
		<AttemptTypeSelect bind:goal bind:onTarget bind:attempt />
		<div hidden={!expanded} transition:slide={{ duration: 300, easing: quintOut }}>
			<div class="divider" />
			<ToggleInput bind:checked={penalty} label="Penalty" name="penalty" />
			{#if penalty}
				<SelectPlayersInput inputName="goalie" players={goaliePlayers} bind:selected={goalie} />
			{/if}
			<ToggleInput bind:checked={autogoal} label="Own Goal" name="autogoal" />
			<div class="divider" />
			<CardsSection />
		</div>
		<div class="flex w-full justify-center">
			<button type="button" class="btn btn-outline" on:click={() => (expanded = !expanded)}
				>{expanded ? 'HIDE' : 'EXPAND'}</button
			>
		</div>
		<input type="hidden" name="gameId" value={activeGame?.id} />
		<div class="flex w-full justify-center">
			<button class="btn btn-wide m-4" class:loading disabled={loading}>Submit Attempt</button>
		</div>
	</div>

	<EventsLog attempts={data.attempts} fouls={data.fouls} players={data.players} />

	<div class="flex w-full justify-center">
		<!-- TODO Add modal to confirm -->
		<button formaction="?/endGame" class="btn btn-wide btn-error btn-sm m-4">End Game</button>
	</div>
</form>
