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

<div class="flex w-full justify-between items-center">
	<button type="button" class="btn btn-outline w-20 text-xl" on:mousedown={() => changeNum(-5)}>
		-5
	</button>
	<button type="button" class="btn btn-outline w-14 text-lg" on:mousedown={() => changeNum(-1)}>
		-1
	</button>
	<span class="text-3xl">{time}'</span>
	<input type="hidden" bind:value={time} name="time" class="" max="130" min="1" />
	<button type="button" class="btn btn-outline w-14 text-lg" on:mousedown={() => changeNum(1)}>
		+1
	</button>
	<button type="button" class="btn btn-outline w-20 text-xl" on:mousedown={() => changeNum(5)}>
		+5
	</button>
</div>
