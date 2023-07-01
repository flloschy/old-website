<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../global.css';
	import { goto } from '$app/navigation';

	onMount(() => {
		const buttons = Array.from(document.querySelectorAll('h'));

		buttons.forEach((b) => {
			b.addEventListener('click', () => {
				goto(b.getAttribute('data-ref') ?? '/');
			});
		});

		page.subscribe((p) => {
			buttons.forEach((b) => {
				b.classList.remove('active');
			});
			buttons.find((b) => b.getAttribute('data-ref') === p.url.pathname)?.classList.add('active');
		});
	});
</script>

<header>
	<div class="container">
		<h data-ref="/links"
			>Links
			<div class="underline" /></h
		>
	</div>
	<div class="container">
		<h data-ref="/about"
			>About
			<div class="underline" /></h
		>
	</div>
	<div class="container">
		<h data-ref="/" class="active"
			>Home
			<div class="underline" /></h
		>
	</div>
	<div class="container">
		<h data-ref="/projects"
			>Projects
			<div class="underline" /></h
		>
	</div>
	<div class="container">
		<h data-ref="/skills"
			>Skills
			<div class="underline" /></h
		>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: fit-content;
		padding: 10px;
	}
	.container {
		width: calc(25% / 5);
		min-width: fit-content;
		text-align: center;
	}

	h {
		margin: 0 auto;
		display: block;
		width: fit-content;
		cursor: pointer;
		font-size: larger;
		font-size: xx-large;
	}
	.underline {
		margin: auto;
		width: 0%;
		height: 1.5px;
		background-color: var(--text);
		transition: width 0.5s 0.2s var(--ease);
	}
	h:hover .underline {
		transition: width 0.2s 0s var(--ease);
		width: 100%;
	}

	.active {
		color: var(--primary);
	}
	.active .underline {
		background-color: var(--primary);
	}
	@media (max-width: 600px) {
		h {
			font-size: 1rem;
		}
	}
	@media (max-width: 300px) {
		header {
			flex-direction: column;
		}
	} 





</style>
