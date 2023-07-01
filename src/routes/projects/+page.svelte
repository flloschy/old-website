<script lang="ts">
	import { onMount } from 'svelte';
	import Project from '../Project.svelte';
	import CustomProject from '../CustomProject.svelte';

	/*
		name: string;
		description: string;
		url: string;
		languages: string[];
		topics: string[];
	*/

	let projects: any[] = [];
	let CustomProjects: any[] = [
		{
			name: 'Graph',
			description:
				'A simple graphing calculator thrown together in a Jam. Due to how Svelte caches pages and how inefficient the code is, it is recommended to refresh the page after going back.',
			url: '/projects/graph',
			languages: ['TypeScript'],
			topics: ['math', 'graph', 'calculator', 'jam']
		}
	];

	onMount(async () => {
		projects = Array.from(
			await (await fetch('https://api.github.com/users/flloschy/repos')).json()
		);
		console.log(projects);
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
