<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	// let title = $page.data.title || 'unknown title';
	// let previous = $page.data.previous;
</script>

<div class="navbar bg-base-300">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost gap-2">
			<Icon icon="noto:soccer-ball" height="24" />
			<span class="uppercase">IzpoFifa</span>
		</a>
		<!-- {#if previous}
			<a href={previous} class="btn btn-ghost">
				<Icon width="24px" icon="material-symbols:arrow-back-ios-new-rounded" />
			</a>
		{/if} -->
		<!-- <span class="text-xl pb-1">{title}</span> -->
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button tabindex="0" class="btn btn-ghost rounded-btn">
				<Icon width="24" icon="material-symbols:menu-rounded" />
			</button>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-32 mt-4">
				<li><a href="/a/gameday">Gameday</a></li>
				<li><a href="/a/stats">Stats</a></li>
				<li><a href="/a/players">Players</a></li>
				<li><a href="/a/teams">Teams</a></li>
				<li>
					<form action="/?/signout" method="post">
						<button class="text-warning">Log Out</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>

<div class="flex items-center flex-col">
	<slot />
</div>
