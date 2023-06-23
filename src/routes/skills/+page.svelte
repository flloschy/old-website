<script lang="ts">
	import { onMount } from 'svelte';

	interface skill {
		name: string;
		iconOverride?: string;
		percent: number;
		comment: string;
	}

	const skills: skill[] = [
		{
			name: 'window',
			percent: 80,
			iconOverride: 'devicon-windows8-original',
			comment:
				"Since I use windows as my primary OS (for now), im comfortable with using it. Although some things are not in my skill set and I definitely don't use all the features."
		},
		{
			name: 'ubuntu',
			percent: 40,
			comment:
				'In school we are using a Ubuntu VM, I know how to use it, install programs and how to set them up. But im far from a experienced user.'
		},
		{
			name: 'linux',
			percent: 40,
			comment:
				'I use my raspberrypi with (console only) Linux and Im conferrable when doing things on it. But I still need a lot of help when it comes to detailed or (for me) unusual things.'
		},

		{
			name: 'raspberry pi',
			percent: 80,
			iconOverride: 'devicon-raspberrypi-line',
			comment: 'I use a raspberry pi as my own Streaming- Coding- DNS- and Home-Server.'
		},

		{
			name: 'vscode',
			percent: 90,
			comment:
				'VScode it my main editor, which means Im very used to it. But I probably should get more into shortcut usage and boost my efficiently with more extensions.'
		},

		{
			name: 'sveltekit',
			percent: 60,
			iconOverride: 'devicon-svelte-plain',
			comment:
				'I made this side with sveltekit, and so, everything you see is what I can to with it right now.'
		},
		{
			name: 'html',
			percent: 60,
			iconOverride: 'devicon-html5-plain',
			comment: 'Since sveltekit also uses normal html, this site speaks for my skill.'
		},
		{
			name: 'css',
			percent: 60,
			iconOverride: 'devicon-css3-plain',
			comment:
				'I can position things, but I also need a lot of try and error to get things how I want them to be.'
		},
		{
			name: 'javascript',
			percent: 60,
			comment:
				'I use JS mostly with nodejs with which i create virtually exclusively discord bots. For websites I use Svelte + TS'
		},
		{
			name: 'typescript',
			percent: 60,
			comment:
				'I use TS combined with Svelte kit for websites, but also for a discord bot called jambo. See /projects'
		},

		{
			name: 'python',
			percent: 95,
			comment:
				'Im using python since around 2020 and did a lot of projects with it. Im experienced and most of the time know what im doing.'
		},
		{
			name: 'nodejs',
			percent: 70,
			comment:
				"I use Nodejs for everything not website, and I got the general things sorted out. There is still a lag of 'pro strats' tho."
		},
		{
			name: 'java',
			percent: 30,
			comment:
				'I use java in school. I hate it. But because of the experience ive gathered with other languages I can work with it...'
		},

		{ name: 'git', percent: 50, comment: 'I can push, I can pull' },
		{
			name: 'github',
			percent: 60,
			comment:
				'I can push, I can pull, I can pull request, I can fork, and thats all i need for now.'
		},
		{
			name: 'markdown',
			percent: 90,
			comment: 'Not much one cant do easily, but there is still space for improvements '
		}
	].sort((a, b) => b.percent - a.percent);

	onMount(() => {
		const comment = document.getElementById('comment');
		comment.innerHTML = 'hover over a skill to see a comment about it';
		const boxes = Array.from(document.getElementsByClassName('box'));
		boxes.forEach((element) => {
			const image = element.getElementsByTagName('i')[0];
			const style = getComputedStyle(image);
			const color = style.color;

			const bar = element.getElementsByClassName('bar')[0];
			bar.style.backgroundColor = color;

			const label = element.getElementsByClassName('label')[0];
			label.style.color = color;

			element.addEventListener('mouseenter', (element) => {
				comment.innerHTML = element.target.getAttribute('data-comment');
				comment.classList.remove('passive');
			});
			element.addEventListener('mouseleave', (element) => {
				comment.innerHTML = 'hover over a skill to see a comment about it';
				comment.classList.add('passive');
			});
		});
	});
</script>

<!-- https://devicon.dev/ -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
/>

<div class="container">
	{#each skills as skill}
		<div class="box" data-comment={skill.comment}>
			<i class="colored {skill.iconOverride ?? `devicon-${skill.name}-plain`}" /><br />
			<h class="label">{skill.name}</h>
			<div class="bar">
				<div class="unused" style="width:{100 - skill.percent}%;" />
			</div>
		</div>
	{/each}
	<div class="comment" id="comment" />
</div>

<style>
	.devicon-github-plain.colored {
		color: #adadad;
	}
	.devicon-linux-plain.colored {
		color: #0094ff;
	}
	.devicon-markdown-plain.colored {
		color: #1aa0e7;
	}

	.comment {
		grid-row: 5;
		grid-column: 1 / 5;
		background-color: rgb(50, 50, 50);
		border-radius: 5px;
		padding: 10px;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.passive {
		color: rgba(255, 255, 255, 0.25);
	}

	.container {
		width: 30%;
		aspect-ratio: 1/1;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 0.5fr;
		gap: 10px 10px;
		grid-auto-flow: row;
		justify-content: center;
		align-content: center;
		justify-items: stretch;
		align-items: stretch;
		margin: auto;

		/* center */
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.box {
		border-radius: 5px;
		background-color: rgb(50, 50, 50);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr auto 3px 10%;
		gap: 10px 0px;
		grid-template-areas:
			'. icon .'
			'label label label'
			'bar bar bar'
			'. . .';
		margin: 5px;
		padding: 0;
		transition: all 1s cubic-bezier(0.81, 0.05, 0.81, 0.05);
	}
	.bar {
		filter: brightness(0) invert(1);
		transition: all 1s cubic-bezier(0.81, 0.05, 0.81, 0.05);

		justify-self: stretch;
		align-self: stretch;
		grid-area: bar;
		margin-top: 10px;
		margin-left: 10%;
		width: 80%;
		height: 4px;
		background-color: var(--text);
		border-radius: 2px;
	}

	i {
		filter: brightness(0) invert(1);
		transition: all 1s cubic-bezier(0.81, 0.05, 0.81, 0.05);

		font-size: 250%;
		justify-self: center;
		align-self: center;
		grid-area: icon;
	}
	.label {
		filter: brightness(0) invert(1);
		transition: all 1s cubic-bezier(0.81, 0.05, 0.81, 0.05);

		justify-self: center;
		align-self: center;
		grid-area: label;
	}

	.box:hover i {
		transition: all 0.1s cubic-bezier(0.65, 0.21, 0.65, 0.21);
		filter: brightness(1);
	}
	.box:hover .label {
		transition: all 0.1s cubic-bezier(0.65, 0.21, 0.65, 0.21);
		filter: brightness(1);
	}
	.box:hover .bar {
		transition: all 0.1s cubic-bezier(0.65, 0.21, 0.65, 0.21);
		filter: brightness(1);
	}
	.box:hover {
		transition: all 0.1s cubic-bezier(1, 0, 1, 0);
		background-color: rgb(60, 60, 60);
		margin: 0;
		padding: 5px;
	}

	.unused {
		filter: none;
		width: 50%;
		height: 100%;
		background-color: rgb(100, 100, 100);
		float: right;
		border-radius: 0 2px 2px 0;
	}
</style>
