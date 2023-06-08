<script lang="ts">
	import type { Team } from '@prisma/client';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { hexToRGBA } from '$lib/util';

	export let teamA: Team | undefined;
	export let teamB: Team | undefined;
	export let scoreTeamA: number | undefined;
	export let scoreTeamB: number | undefined;

	const maxScoreDiff = 5;
	let colorAhex: string,
		colorBhex: string,
		colorArgba: string,
		colorBrgba: string,
		scoreA: number,
		scoreB: number,
		scoreDifference: number;
	const percentage = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

	$: {
		colorAhex = teamA?.color ? teamA.color : '';
		colorBhex = teamB?.color ? teamB.color : '';
		colorArgba = colorAhex ? hexToRGBA(colorAhex, 0.6) : '';
		colorBrgba = colorBhex ? hexToRGBA(colorBhex, 0.6) : '';
		scoreA = scoreTeamA ? scoreTeamA : 0;
		scoreB = scoreTeamB ? scoreTeamB : 0;
		scoreDifference = Math.min(scoreA - scoreB);
		percentage.set((scoreDifference / maxScoreDiff) * 50);
	}
</script>

<div
	class="navbar bg-base-100"
	style="background: linear-gradient(to right, {colorArgba}, rgba(255,255,255,0) {50 +
		$percentage}%, {colorBrgba} 100%;"
>
	<div class="grid relative w-full">
		<a href="/settings/teams/{teamA?.id}" class="normal-case text-2xl ml-4">{teamA?.name}</a>
		<span class="justify-self-center">
			<span class="normal-case text-4xl">{scoreTeamA}</span>
			<span class="normal-case text-4xl">:</span>
			<span class="normal-case text-4xl">{scoreTeamB}</span>
		</span>
		<a href="/settings/teams/{teamB?.id}" class="normal-case text-2xl justify-self-end mr-4"
			>{teamB?.name}</a
		>
	</div>
</div>

<slot />

<style>
	div.grid {
		transition: background 1s ease-in-out;
		grid-template-columns: repeat(3, 1fr);
	}

	div.navbar {
		border-bottom: 1px solid #000;
	}

	span,
	a {
		text-shadow: #000 1px 1px 3px;
	}
</style>
