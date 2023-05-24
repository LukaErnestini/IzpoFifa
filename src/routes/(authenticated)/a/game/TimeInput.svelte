<script lang="ts">
	export let time = 1;

	async function changeNum(n: number) {
		time += n;
		if (time > 130) {
			time = 130;
		} else if (time < 1) {
			time = 1;
		}
	}
</script>

<div class="time-input">
	<div class="controls">
		<button type="button" class="btn btn-outline w-16" on:mousedown={() => changeNum(-5)}>-5</button
		>
		<button type="button" class="btn btn-outline w-12" on:mousedown={() => changeNum(-1)}>-1</button
		>
		<span class="time">{time}'</span>
		<input type="hidden" bind:value={time} name="time" class="" max="130" min="1" />
		<button type="button" class="btn btn-outline w-12" on:mousedown={() => changeNum(1)}>+1</button>
		<button type="button" class="btn btn-outline w-16" on:mousedown={() => changeNum(5)}>+5</button>
	</div>
</div>

<style>
	.time-input {
		display: flex;
		margin: auto;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.time {
		font-size: 24px;
		width: 64px;
		text-align: center;
	}

	button {
		font-size: 16px;
		font-weight: 500;
	}
</style>
