<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const url = 'https://api.github.com/users/flloschy/repos';

	interface proje {
		time: number;
		name: string;
		description: string;
		url: string;
		language: string;
		updated: string;
		created: string;
	}

	interface onlineProje {
		name: string;
		description: string;
		url: string;
		language: string;
		time: string;
	}

	let projects: proje[] = []; 
    let loadings = 8;

	let onlineProjects: onlineProje[] = [
		{
			name: 'graph',
			description:
				'A graphing calculator. (you might need to reload the site after using it)',
			url: 'graph',
			language: 'javascript',
			time: '2023-06-13'
		}
	].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

	onMount(async () => {
		const fetched = await fetch(url);
        projects = await fetched.json();

		projects = projects
			.filter((element) => !element.fork)
			.map((element) => {
				return {
					time: new Date(element.updated_at).getTime(),
					name: element.name,
					description: element.description,
					url: element.html_url,
					language: element.language,
					updated: new Date(element.updated_at).toDateString(),
					created: new Date(element.created_at).toDateString()
				};
			})
			.sort((a, b) => b.time - a.time);
            sleep(1000).then(loadLinks);
	});

	const loadLinks = () => {
		const links = Array.from(document.getElementsByClassName('title'));
		links.forEach((element) => {
			element.addEventListener('click', (event) => {
				event.preventDefault();
				goto(element.getAttribute('data-link') ?? '/');
			});
		});
	};

	const sleep = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const getLogo = (name: string) => {
		return `devicon-${(name ?? 'markdown').toLowerCase()}-plain`;
	};
	const makeDate = (datestr: string) => {
		const date = new Date(datestr);
		const year = date.getUTCFullYear();
		const day = date.getUTCDate();
		const month = date.getUTCMonth() + 1;
		// month as text
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dec'
		];
		const monthText = months[month - 1];
		return `${day} ${monthText} ${year}`;
	};
</script>

<!-- https://devicon.dev/ -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
/>

<br />
<div id="dynamic">
	<h class="headline">Github Repositories</h>
	{#each projects as project}
		<div class="element">
			<div class="name">
				<i class="icon {getLogo(project.language)}" />
				<h class="title" data-link={project.url}>{project.name}</h>
			</div>
			<div class="date">
				<h class="created">Updated: {makeDate(project.updated)}</h>
			</div>
			<div class="content">
				<h class="description">{project.description ?? '[no description]'}</h>
			</div>
			<div class="update">
				<h class="updated">Created: {makeDate(project.created)}</h>
			</div>
			<div class="line" />
			<div class="dot dot1" />
			<div class="dot dot2" />
		</div>

    {:else}
        <!-- number to array of length of the number-->

        {#each Array(loadings) as _}
            <div class="element">
                <div class="name">
                    <i class="icon " />
                    <h class="title" data-link="https://floschy.me">Loading...</h>
                </div>
                <div class="date">
                    <h class="created">Updated: Loading...</h>
                </div>
                <div class="content">
                    <h class="description">Loading</h>
                </div>
                <div class="update">
                    <h class="updated">Created: Loading</h>
                </div>
                <div class="line" />
                <div class="dot dot1" />
                <div class="dot dot2" />
            </div>
        {/each}
    {/each}
</div>
<br />
<div id="static">
	<h class="headline">Online Projects</h>
	{#each onlineProjects as project}
		<div class="element">
			<div class="name">
				<i class="icon {getLogo(project.language)}" />
				<h class="title" data-link={'/projects/' + project.url}>{project.name}</h>
			</div>
			<div class="date">
				<h class="created">Created: {makeDate(project.time)}</h>
			</div>
			<div class="content">
				<h class="description">{project.description ?? '[no description]'}</h>
			</div>
			<div class="dot dot1" />
		</div>
	{/each}
</div>
<br />

<style>
	.icon {
		color: white;
	}

	#dynamic,
	#static {
		width: 50vw;
		margin: auto;
	}

	.element {
		transition: all 1s cubic-bezier(0, 0.55, 0.45, 1);
		display: grid;
		grid-template-columns: 1fr 1fr 5px;
		grid-template-rows: auto auto auto;
		gap: 0px 0px;
		grid-template-areas:
			'name date dot1'
			'content content line'
			'. update dot2';

		width: 100%;
		background-color: rgb(50, 50, 50);
		padding: 3px;
		border-radius: 4px;
		margin-bottom: 10px;
		margin-top: 10px;
	}
	.name {
		justify-self: start;
		align-self: start;
		grid-area: name;
	}
	.date {
		margin-right: 5px;
		justify-self: end;
		align-self: start;
		grid-area: date;
	}
	.content {
		justify-self: stretch;
		align-self: stretch;
		grid-area: content;
	}
	.update {
		margin-right: 5px;
		justify-self: end;
		align-self: start;
		grid-area: update;
	}
	.line {
		width: 2.5px;
		justify-self: center;
		align-self: stretch;
		grid-area: line;
		background-image: linear-gradient(0deg, #aaaaaa, #ffffff);
		border-radius: 5px;
	}
	.dot1 {
		background-color: white;
		justify-self: center;
		align-self: center;
		grid-area: dot1;
	}
	.dot2 {
		background-color: #aaaaaa;
		justify-self: center;
		align-self: center;
		grid-area: dot2;
	}
	.element:hover {
		transition: all 0.1s cubic-bezier(0.55, 0, 1, 0.45);
		border-radius: 2px;
		border-width: 0;
		border-style: solid;
		border-color: #ffffff;
		border-left-width: 2px;
		margin-left: 15px;
		width: calc(100% - 2px);
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 5px;
	}

	.title {
		cursor: pointer;
		text-decoration: underline;
	}

	.updated {
		color: #aaaaaa;
	}

	.headline {
		text-decoration: underline;
		font-size: 1.7vw;
		font-weight: 600;
		width: 100%;
		margin: auto;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
