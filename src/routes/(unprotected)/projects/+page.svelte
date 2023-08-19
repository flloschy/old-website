<script lang="ts">
	import { onMount } from 'svelte';
	import Project from './Project.svelte';
	import CustomProject from './CustomProject.svelte';

	let projects: any[] = [];
	let CustomProjects: any[] = [
		{
			name: 'Graph',
			description:
				'A simple graphing calculator thrown together in a jam. Due to how Svelte caches pages and how inefficient the code is, it is recommended to refresh the page after going back.',
			url: '/projects/graph',
			languages: ['TypeScript'],
			topics: ['math', 'graph', 'calculator', 'jam']
		},
		{
			name: 'Chat',
			description: 'A basic chat app made with SvelteKit with accounts, logins and live updates.',
			url: '/projects/chat',
			languages: ['SvelteKit', 'TypeScript'],
			topics: ['chat', 'app', 'sveltekit', 'chatapp', 'jam']
		},
		{
			name: 'Minesweeper',
			description: 'The classic game of minesweeper. With variable board size and mine count. Including a history of your games.',
			url: '/projects/minesweeper',
			languages: ['TypeScript'],
			topics: ['minesweeper', 'game', 'jam']
		}
	];

	onMount(async () => {
		projects = Array.from(
			await (await fetch('https://api.github.com/users/flloschy/repos')).json()
		);
	});
</script>

<div class="container">
	<div class="headline"><h class="gradientText">Github projects</h></div>

	{#each projects as pr}
		<Project data={pr} />
	{:else}
		<Project ghost={true} />
	{/each}

	<div class="headline"><h class="gradientText">Online projects</h></div>

	{#each CustomProjects as or}
		<CustomProject data={or} />
	{/each}
</div>

<style>
	.headline {
		margin-top: 50px;
		width: 100%;
		text-align: center;
		margin-bottom: 20px;
		font-size: 2rem;
		font-weight: 700;
		text-decoration: underline;
		text-decoration-color: var(--primary);
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	@media (max-width: 1000px) {
		.headline {
			font-size: 1.5rem;
		}
	}
	@media (max-width: 450px) {
		.headline {
			font-size: 1rem;
		}
	}
</style>
