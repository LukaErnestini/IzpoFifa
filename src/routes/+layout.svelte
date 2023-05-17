<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Izpo-Fifa</title>
</svelte:head>

{#if data.session?.user}
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
					<li><a href="/gameday">Gameday</a></li>
					<li><a href="/stats">Stats</a></li>
					<li><a href="/settings">Settings</a></li>
					<li>
						<form action="/?/signout" method="post">
							<button class="text-warning">Log Out</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</div>
{/if}

<slot />
