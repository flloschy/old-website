<script lang="ts">
	import { onMount } from 'svelte';
	import Skill from '../Skill.svelte';

	interface skill {
		name: string;
		description: string;
		svg?: string;
		classX?: string;
		color: string;
		percent: number;
	}

	const skills: skill[] = [
		{
			name: 'Python',
			description:
				"I've been using Python since 2020 and am still using it regularly. I have made many things with Python already, like Discord Bots, games, and statistical Programs. I pretty much did everything I could think of with Python at least once.",
			classX: 'devicon-python-plain',
			color: '#ffd845',
			percent: 95
		},
		{
			name: 'Javascript',
			description:
				"I've been using Javascript more often than Python since about 2021. I have made primarily Discord Bots with it, but I am also using it for Websites.",
			classX: 'devicon-javascript-plain',
			color: '#f0db4f',
			percent: 80
		},
		{
			name: 'HTML',
			description:
				"In 2023, I found motivation to get into Web Development with the goal of making a personal or portfolio Website. I ended up using Svelte for it. It's your turn to judge if I did a good job; I personally think it turned out great!",
			classX: 'devicon-html5-plain',
			color: '#e54d26',
			percent: 70
		},
		{
			name: 'CSS',
			description:
				'Together with HTML, I learned CSS. I (go figure!) have used it for this Website too!',
			classX: 'devicon-css3-plain',
			color: '#3d8fc6',
			percent: 70
		},
		{
			name: 'Arduino',
			description:
				'In my school, we work with Arduinos. Currently we are only doing some basic stuff, but I think I got the principles down and could do more advanced stuff without much complications.',
			classX: 'devicon-arduino-plain',
			color: '#00979d',
			percent: 85
		},
		{
			name: 'Docker',
			description:
				"On my server, I use Docker (compose) to run codeserver, jellyfin, pihole, a YouTube downloader, and a Discord Bot in containers. But I need to admit that I didn't set it up, but I see the benefits of using Docker and will get into it more.",
			classX: 'devicon-docker-plain',
			color: '#019bc6',
			percent: 30
		},
		{
			name: 'Discord.js',
			description:
				"I use discord.js for my Discord Bots. I have made a few Bots with it already, with Jambo (github.com/Cowoding-Jams/Jambo) being the most advanced one, which I've done with a few others.",
			classX: 'devicon-discordjs-plain',
			color: '#5865F2',
			percent: 85
		},
		{
			name: 'git',
			description:
				"I don't use git itself in the console, but rather with the VSCode UI. And because I don't know all the functions, I can use those I know, which are push, pull, init, and clone.",
			classX: 'devicon-git-plain',
			color: '#f34f29',
			percent: 50
		},
		{
			name: 'Github',
			description:
				"Because I use Github for all my projects, I know how to use it. But to be honest, I don't know all the advanced features and am far from being a Github power user. Pushing, pulling, forking, creating issues, and pulling requests are all I can do, which is for now totally enough.",
			classX: 'devicon-github-original',
			color: '#fff',
			percent: 80
		},
		{
			name: 'Google',
			description:
				'Well, I use Google for everything. I know it. I also know how to use Google Docs and Google Sheets. Additionally, I completed a Google course about how to better use Google search.',
			classX: 'devicon-google-plain',
			color: '#587dbd',
			percent: 99
		},
		{
			name: 'Java',
			description:
				"Just like Arduino, I only know the basics of Java. I have used it for a few School projects. I hate it. I don't want to use it. But I can use it. Kinda, I guess. I never used it for anything else than school, where we didn't do much non-beginner stuff.",
			classX: 'devicon-java-plain',
			color: '#ea2d2e',
			percent: 45
		},
		{
			name: 'Linux',
			description:
				"Because I hate Windows, I like Linux, but other than on my server, I don't use it yet. Ok, well, In School we use an Ubuntu VM. With my next PC, I will probably switch to a Linux/Windows dual boot. I must add that I am not a Linux pro; I am still really bad and am only comfortable with the basics.",
			classX: 'devicon-linux-plain',
			color: '#fff',
			percent: 25
		},
		{
			name: 'Markdown',
			description:
				"Let's be honest: Markdown is not hard to learn, so there is not much skill to gain.",
			classX: 'devicon-markdown-original',
			color: '#fff',
			percent: 99
		},
		{
			name: 'Moodle',
			description:
				"My school runs on Moodle. Because of that, I only know how to use it as a user, not as an admin. And since it's made to be easy, I think I know everything one can do as a user. At least I hope so.",
			classX: 'devicon-moodle-plain',
			color: '#f7931e',
			percent: 99
		},
		{
			name: 'mysql',
			description:
				"I've tried it once, and we'll start using it in School soon. But I don't know much about it.",
			classX: 'devicon-mysql-plain',
			color: '#00618a',
			percent: 5
		},
		{
			name: 'nginx',
			description:
				"Nginx runs on my Server in combination with Docker. Sadly, I didn't set it up, and I don't know If I can use it on my own.",
			classX: 'devicon-nginx-original',
			color: '#090',
			percent: 10
		},
		{
			name: 'Node.js',
			description:
				"Im using Node.js to run my Discord bots; other than that, I don't use it and have zero experience with something like a Node Server with requests and stuff.",
			classX: 'devicon-nodejs-plain',
			color: '#83cd29',
			percent: 50
		},
		{
			name: 'npm',
			description:
				'I never created a npm package, and so I only use it to install packages and run Scripts, which is why I only ever interacted with one half of the whole thing.',
			classX: 'devicon-npm-original-wordmark',
			color: '#cb3837',
			percent: 50
		},
		{
			name: 'Raspberry Pi',
			description:
				'I use my Raspberry Pi as a server. I run it on Raspberry Pi OS Lite and use Docker to run a few containers (jellyfin, codeserver, and pihole), along with a 2TB external HDD to store stuff for jellyfin.',
			classX: 'devicon-raspberrypi-line',
			color: '#c51850',
			percent: 95
		},
		{
			name: 'Svelte',
			description:
				"This Website was made with Svelte. In your opinion, if Im proficient, I think I am, although I didn't touch server-side things. (This Website uses everything I know about Svelte, btw.)",
			classX: 'devicon-svelte-plain',
			color: '#ff3e00',
			percent: 85
		},
		{
			name: 'Trello',
			description:
				"I used Trello a few times, but Im bad at planning in advance and keeping myself motivated to track progress, which is why I'm not using it anymore. I also didn't use many features.",
			classX: 'devicon-trello-plain',
			color: '#23719f',
			percent: 20
		},
		{
			name: 'Typescript',
			description:
				"After using Javascript for a while, I started using Typescript. I use it now instead of JS. PS: This website's code is written in Typescript.",
			classX: 'devicon-typescript-plain',
			color: '#007acc',
			percent: 80
		},
		{
			name: 'Ubuntu',
			description:
				"Ubuntu is the OS we use in School for our VMs. But sadly, we haven't done much with it yet. I only did the basics of the terminal and setup Apache.",
			classX: 'devicon-ubuntu-plain',
			color: '#dd4814',
			percent: 35
		},
		{
			name: 'VSCode',
			description:
				'I use it as my main editor. I know it well, but I also should work more with shortcuts and use more extensions to improve my efficiency.',
			classX: 'devicon-vscode-plain',
			color: '#3c99d4',
			percent: 95
		},
		{
			name: 'Windows',
			description:
				"I currently use it as my main OS. I can go with it, but I would like to switch to Linux. I probably don't use it to its full potential.",
			classX: 'devicon-windows8-original',
			color: '#00adef',
			percent: 65
		},
		{
			name: 'English',
			description:
				'According to an efset.org test, I am a C1 Advanced in English with 66/100 points (67/100 for reading and 64/100 for listening). I can understand pretty much everything spoken and written, but I still have problems with pronunciation and fluency.',
			svg: '/icons/translate.svg',
			color: '#f25555',
			percent: 66
		}
	].sort((a, b) => b.percent - a.percent);

	onMount(() => {
		const skillCards = Array.from(document.querySelectorAll('.card'));

		skillCards.forEach((element) => {
			const description = element.getElementsByClassName('description')[0] as HTMLElement;
			element.addEventListener('mouseover', () => {
				element.getBoundingClientRect();
				description.style.top = `${element.getBoundingClientRect().top + window.scrollY}px`;
			});
			element.addEventListener('scroll', () => {
				description.style.top = `${element.getBoundingClientRect().top + window.scrollY}px`;
			});
		});
	});
</script>

<!-- https://devicon.dev/ -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
/>
<div class="a0 a1 a2" style="display: none;" />
<div class="container">
	{#each skills as skill}
		<Skill {...skill} />
	{/each}
</div>
<br /><br /><br /><br />

<style>
	.container {
		padding-top: 100px;
		width: calc(200px * 5 + 20px * 4);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 20px 20px;
		grid-template-areas: '. . . . .';

		margin: 0 auto;

		justify-items: center;
		align-items: center;
	}
	@media (max-width: 2000px) {
		.container {
			width: calc(200px * 4 + 20px * 3);
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-areas: '. . . .';
		}
	}

	@media (max-width: 1500px) {
		.container {
			width: calc(200px * 3 + 20px * 2);
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-areas: '. . .';
		}
	}
	@media (max-width: 750px) {
		.container {
			width: calc(200px * 2 + 20px);
			grid-template-columns: 1fr 1fr;
			grid-template-areas: '. .';
		}
	}
	@media (max-width: 500px) {
		.container {
			width: calc(200px);
			grid-template-columns: 1fr;
			grid-template-areas: '.';
			gap: 20px;
		}
	}
</style>
