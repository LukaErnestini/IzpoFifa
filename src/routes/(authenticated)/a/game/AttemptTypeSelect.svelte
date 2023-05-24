<script lang="ts">
	import { AttemptType } from '$lib/types';

	export let goal: boolean;
	export let onTarget: boolean;
	export let attempt: AttemptType | string = AttemptType.OnTarget;

	$: if (attempt === AttemptType.Goal) {
		goal = true;
		onTarget = true;
	} else if (attempt === AttemptType.OnTarget) {
		goal = false;
		onTarget = true;
	} else {
		goal = false;
		onTarget = false;
	}
</script>

<div class="main-container">
	<div class="btn-group">
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			data-title="Goal"
			value="0"
			class="btn btn-outline"
		/>
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			data-title="On Target"
			value="1"
			class="btn btn-outline"
			checked
		/>
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			data-title="Missed"
			value="2"
			class="btn btn-outline"
		/>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
	}
</style>
