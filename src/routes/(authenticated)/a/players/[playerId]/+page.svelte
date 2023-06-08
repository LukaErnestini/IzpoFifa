<script lang="ts">
	import { page } from '$app/stores';
	import AttemptsLocation from '$lib/components/players/AttemptsLocation.svelte';
	import PlayerAvatarSelect from '$lib/components/players/PlayerAvatarSelect.svelte';
	import Compressor from 'compressorjs';

	export let data;

	let fileInput: HTMLInputElement;
	let imageSrc: string | null | undefined = undefined;
	let form: HTMLFormElement;
	// const player = data.player as Player;
	const player = data.players.find((player) => {
		return player.id === +$page.params.playerId;
	});

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
			new Compressor(file, {
				quality: 0.6,
				maxWidth: 600, // Set the width of the output image.
				maxHeight: 600, // Set the height of the output image.
				success(result) {
					const reader = new FileReader();
					reader.onload = function () {
						// Set the image source to the base64-encoded data URL
						imageSrc = reader.result as string;
					};
					reader.readAsDataURL(result); // This will trigger reader.onload

					// Prepare form data for submission
					const formData = new FormData();
					formData.append('image', result);
					formData.append('id', player ? player.id.toString() : '');

					// Submit the form
					fetch(form.action, {
						method: 'POST',
						body: formData
					});
				},
				error(err) {
					console.log(err.message);
				}
			});
			// const reader = new FileReader();
			// reader.onload = function () {
			// 	// Set the image source to the base64-encoded data URL
			// 	imageSrc = reader.result as string;
			// };
			// reader.readAsDataURL(file);
		} else {
			alert('Please select an image file.');
		}
	}
</script>

{#if !player}
	<h1>404 - Player Not Found</h1>
{:else}
	<form action="?/save" method="post" enctype="multipart/form-data" bind:this={form}>
		<div
			class="py-2 cursor-pointer w-fit"
			on:click={triggerFileInput}
			on:keydown={triggerFileInput}
		>
			<PlayerAvatarSelect name={player?.name} width={'10rem'} imageUri={imageSrc} />
			<input type="file" name="image" bind:this={fileInput} hidden on:change={swapImage} />
		</div>

		<input type="hidden" name="id" value={player?.id} />
		<!-- <button formaction="?/delete" class="btn btn-warning">DELETE</button> -->
		<!-- <button class="btn">SAVE</button> -->
	</form>
	<AttemptsLocation attempts={data.attempts} />
{/if}
