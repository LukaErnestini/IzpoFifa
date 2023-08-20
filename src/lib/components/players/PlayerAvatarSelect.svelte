<script lang="ts">
	const placeholderImgUrl = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';

	export let name = 'unknown';
	export let width = '56px';
	export let selectedWidth = '72px';
	export let selected = false;
	export let color = '';
	export let imageUri: string | null | undefined = placeholderImgUrl;

	$: if (!imageUri) {
		imageUri = placeholderImgUrl;
	}

	let currentWidth = width;
	$: currentWidth = selected ? selectedWidth : width;
</script>

<div class="avatar block p-1 rounded-full {selected ? 'bg-red-600' : ''}">
	<div
		style={`width: ${currentWidth}; --tw-ring-color: ${color}`}
		class="rounded-full mx-auto
			{color ? 'ring ring-offset-1' : ''}"
	>
		<img src={imageUri} alt="avatar" />
	</div>
</div>

<span class="uppercase text-xs flex justify-center">
	{name}
</span>
