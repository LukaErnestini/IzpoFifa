<script lang="ts">
	import Icon from '@iconify/svelte';

	export let x: number | null = null;
	export let y: number | null = null;
	export let distance: number | null = null;

	const soccerPitchWidth = 65; //meters
	const soccerPitchTouchlineHalf = 50;
	const goalX = soccerPitchWidth / 2;
	const goalY = 0;

	const iconSize = 32;
	let iconDiv: HTMLDivElement;
	let img: HTMLImageElement;

	const handleClick = (event: MouseEvent) => {
		const { offsetX, offsetY } = event;

		x = (offsetX / img.width) * soccerPitchWidth;
		y = (offsetY / img.height) * soccerPitchTouchlineHalf;
		distance = Math.sqrt(Math.pow(goalX - x, 2) + Math.pow(goalY - y, 2));

		// Set the icon's position relative to the click coordinates
		iconDiv.style.left = `${offsetX - iconSize / 2 + 1}px`;
		iconDiv.style.top = `${offsetY - iconSize / 2 - 12}px`;
	};

	function clear() {
		distance = null;
		x = null;
		y = null;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="min-w-full py-1 relative" on:click={handleClick} on:dblclick={clear}>
	<img
		src="/img/half-soccer-pitch.png"
		alt="Half soccer pitch"
		bind:this={img}
		class="pointer-events-none"
	/>
	<div
		bind:this={iconDiv}
		class="absolute pointer-events-none w-min"
		hidden={distance ? false : true}
	>
		<span class="label-text text-xs flex justify-center"
			>{distance ? Math.round(distance) : 'NaN'}m</span
		>
		<Icon icon="basil:cross-solid" width={iconSize} />
	</div>
	<input type="hidden" name="distance" value={distance} />
	<input type="hidden" name="x" value={x} />
	<input type="hidden" name="y" value={y} />
</div>
