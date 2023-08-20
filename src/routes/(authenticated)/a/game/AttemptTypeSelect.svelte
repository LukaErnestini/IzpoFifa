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
	<div class="join">
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			aria-label="Goal"
			value="0"
			class="btn btn-outline btn-success join-item checked:!bg-success checked:!border-success"
		/>
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			aria-label="On Target"
			value="1"
			class="btn btn-outline join-item"
			checked
		/>
		<input
			type="radio"
			name="options"
			bind:group={attempt}
			aria-label="Missed"
			value="2"
			class="btn btn-outline btn-error join-item checked:!bg-error checked:!border-error"
		/>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
	}
</style>
