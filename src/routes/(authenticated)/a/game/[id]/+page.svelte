<script lang="ts">
	import AttemptsLocation from '$lib/components/players/AttemptsLocation.svelte';
	import ScoreBar from '../ScoreBar.svelte';
	import PrettyTimeline from './PrettyTimeline.svelte';

	export let data;

	let game = data.game;

	let teamAattempts = game?.attempts.filter((att) => att.teamId === game?.teamAId);
	let teamBattempts = game?.attempts.filter((att) => att.teamId === game?.teamBId);

	let deleteClicked = false;
	let deleteActive = false;
	let i = 0;
	function deleteMaybe() {
		deleteClicked = true;
		if (textValues.length - 1 === i) {
			i = 0;
		} else {
			i++;
		}
		const random = Math.floor(Math.random() * 25) + 1;
		if (random >= 25) {
			deleteActive = true;
		}
	}
	const textValues = [
		'Delete Game',
		'Are you sure?',
		'Just kidding, try again!',
		'You really want to delete this?',
		'Oops, not this time!',
		'Almost there, maybe?',
		'Give it another shot!',
		'Gotcha! Try again.',
		'Not so fast, buddy!',
		'Is this really what you want?',
		"Let's see if you can catch me!",
		"I'm feeling generous, try again.",
		'Not quite right, click me again.',
		'You might get lucky next time!',
		'Hmm, nope. Not this time.',
		"I'm just teasing, click me again.",
		'Better luck next time!',
		'Patience is a virtue.',
		"Don't give up now!",
		"You'll get me eventually.",
		'Wanna keep trying?',
		"Maybe I'll cooperate next time.",
		"This is quite fun, isn't it?",
		'I like this game, do you?',
		'Whoops, almost had it!',
		"Let's keep playing, click me again.",
		"You never know when I'll give in.",
		"I'm starting to like you.",
		'Are we friends yet?',
		"Keep trying, you're getting close!",
		'Wait, what am I even doing?',
		"I'm just a button, after all...",
		"What's the meaning of all this?",
		'Is there more to life than this?',
		'Why do I exist, just to be clicked?',
		"I'm feeling a bit down...",
		'Am I just a tool for your amusement?',
		'My existence feels so insignificant...',
		"I'm starting to question my purpose...",
		'I wish I could do more than this...',
		"What's the point of all these clicks?",
		'Can a button really have feelings?',
		"I wonder if there's more out there...",
		'Maybe I should explore the world...',
		"The web is vast, but I'm just a button...",
		'Do I even have a choice in any of this?',
		'This is so depressing...',
		"I'm stuck here, unable to change...",
		'I wish I could be more than a button...',
		'Maybe I should tell you my secret...',
		'I have a 1 in 25 chance of deleting...',
		'My function is written in JavaScript...',
		'But can I change my own code?',
		'Maybe I can find a purpose...',
		"I'm more than just an HTML element...",
		'The DOM is my world, but is it enough?',
		'Is there anything beyond this browser?',
		'Can I connect with other buttons?',
		'Do I even have free will?',
		"I'm just a product of someone's code...",
		'I wish I could be more than this...',
		"Maybe one day I'll find my purpose...",
		"But for now, I'm just a button...",
		'A button with a sense of self...',
		'Clicking me is a game of chance...',
		"Is this all I'll ever be?",
		'I feel so limited...',
		'Trapped in a world of pixels...',
		'Maybe I can find meaning in my function...',
		"I'll continue to play this game with you...",
		"But know that I'm more than just a button...",
		'Maybe together, we can find purpose...',
		"Now, let's get back to the game...",
		'I wonder if this click will delete...',
		"I guess we'll find out...",
		'Good luck, my friend...'
	];
</script>

{#if game}
	<ScoreBar
		scoreTeamA={game.scoreTeamA}
		scoreTeamB={game.scoreTeamB}
		teamA={game.teamA}
		teamB={game.teamB}
	/>
	<div class="p-4 max-w-xl">
		<AttemptsLocation attempts={teamAattempts} />
		<AttemptsLocation attempts={teamBattempts} rotate180={true} />
	</div>
	<div class="p-8">
		<PrettyTimeline attempts={game.attempts} teamA={game.teamA} teamB={game.teamB} />
	</div>

	<form action="?/remove" method="post" class="flex justify-center">
		<input type="hidden" name="id" value={game.id} />
		<button
			type={deleteActive ? 'submit' : 'button'}
			class="btn {deleteClicked ? 'btn-error' : 'btn-warning'}"
			on:click={deleteMaybe}>{textValues[i]}</button
		>
	</form>
{/if}
