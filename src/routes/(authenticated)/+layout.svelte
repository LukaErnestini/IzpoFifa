<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="navbar bg-base-300">
	<div class="flex-1">
		<span class="btn btn-ghost normal-case text-xl">daisyUI</span>
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

<slot />
