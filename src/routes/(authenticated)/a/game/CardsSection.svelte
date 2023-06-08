<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex items-center justify-between px-1">
	<span class="label-text">Cards</span>
	<span class="flex">
		<button formaction="?/yellow">
			<Icon icon="tabler:rectangle-vertical-filled" color="yellow" width="48" />
		</button>
		<button formaction="?/red">
			<Icon icon="tabler:rectangle-vertical-filled" color="red" width="48" />
		</button>
	</span>
</div>
