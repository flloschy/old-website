<script lang="ts">
	import '../global.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let links: HTMLElement[] = [];

	onMount(() => {
		let links = Array.from(document.getElementsByClassName('url'));
		links.forEach((element) => {
			element.addEventListener('click', (event) => {
				event.preventDefault();
				goto(element.getAttribute('data-redirect') ?? '/');
			});
		});

		page.subscribe((value) => {
			links.forEach((element) => {
				if (element.getAttribute('data-redirect') == value.route.id) {
					element.classList.remove('active');
				} else {
					element.classList.add('active');
				}
			});
		});
	});
</script>

<header class="container">
	<div class="logo element backgroundClip" style="align-items: start; margin-left: 10px">
		<h class="url active" data-redirect="/">
			Floschy.me
			<div class="underlined" />
		</h>
	</div>
	<div class="space element" />
	<div class="projects element backgroundClip">
		<h class="url" data-redirect="/projects">
			Projects
			<div class="underlined" />
		</h>
	</div>
	<div class="about element backgroundClip">
		<h class="url" data-redirect="/about">
			About
			<div class="underlined" />
		</h>
	</div>
	<div class="skills element backgroundClip">
		<h class="url" data-redirect="/skills">
			Skills
			<div class="underlined" />
		</h>
	</div>
	<div class="links element backgroundClip">
		<h class="url" data-redirect="/links">
			Links
			<div class="underlined" />
		</h>
	</div>
</header>

<style>
	header {
		height: fit-content;
		padding: 0px;
		background-color: var(--footer-header-color);
	}
	.container {
		display: grid;
		grid-auto-columns: 1fr;
		grid-template-columns: 2fr 6fr 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: 'logo space projects about skills links';
	}
	.element {
		height: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: end;
	}
	h {
		margin-right: 10px;
		font-size: 2vw;
	}
	.underlined {
		height: 0.01vw;
		width: 0%;
		background-color: var(--text);
		transition: width 1s cubic-bezier(0.75, 0.15, 0.75, 0.15);
		border-radius: 1px;
	}
	.element:hover .underlined {
		transition: width 0.5s cubic-bezier(0.53, 0.15, 0, 1.1);
		width: 100%;
	}
	.active {
		color: var(--dark-text);
	}
	.active .underlined {
		background-color: var(--dark-text);
	}
</style>
