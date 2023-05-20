<script lang="ts">
	export let name = 'unknown';
	export let width = '56px';
	export let selected = false;
	export let color = '';
	export let imageUri: string | null | undefined =
		'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';

	$: if (!imageUri) {
		imageUri = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
	}

	$: width = selected ? '72px' : '56px';
</script>

<div class="avatar block">
	<div
		style={`width: ${width}; --tw-ring-color: ${color}`}
		class="rounded-full mx-auto
			{color ? 'ring ring-offset-1' : ''}"
	>
		<img src={imageUri} alt="avatar" />
	</div>
</div>

<span class="uppercase text-xs flex justify-center">
	{name}
</span>
