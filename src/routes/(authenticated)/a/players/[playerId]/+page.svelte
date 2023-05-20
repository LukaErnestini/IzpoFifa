<script lang="ts">
	import PlayerAvatarSelect from '$lib/components/players/PlayerAvatarSelect.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let fileInput: HTMLInputElement;
	let imageSrc: string | undefined = undefined;

	const player = data.player;
	if (player?.imageUri) {
		imageSrc = player.imageUri;
	}

	function triggerFileInput() {
		fileInput.click();
	}

	function swapImage() {
		const file = fileInput.files ? fileInput.files[0] : null;
		// Check if file is an image
		if (file?.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = function () {
				// Set the image source to the base64-encoded data URL
				imageSrc = reader.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			alert('Please select an image file.');
		}
	}
</script>

<form action="?/delete" method="post" enctype="multipart/form-data">
	<div class="py-2 cursor-pointer w-fit" on:click={triggerFileInput} on:keydown={triggerFileInput}>
		<PlayerAvatarSelect name={player?.name} width={'10rem'} imageUri={imageSrc} />
		<input type="file" name="image" bind:this={fileInput} hidden on:change={swapImage} />
	</div>

	<input type="hidden" name="id" value={player?.id} />
	<!-- <button class="btn btn-warning">DELETE</button> -->
	<button formaction="?/save" class="btn">SAVE</button>
</form>
