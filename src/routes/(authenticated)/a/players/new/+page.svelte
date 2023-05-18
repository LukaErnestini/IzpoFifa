<script lang="ts">
	import Icon from '@iconify/svelte';

	export let form;
</script>

<form method="post">
	{#if form?.exists}
		<div class="alert alert-warning shadow-lg">
			<div>
				<Icon icon="material-symbols:warning-outline-rounded" />
				<span>{form.message}</span>
			</div>
		</div>
	{/if}
	<label>
		Name:
		<input class="input input-bordered w-full max-w-xs" type="text" name="name" id="name" />
	</label>
	<button type="submit" class="btn btn-primary">ADD</button>
</form>
