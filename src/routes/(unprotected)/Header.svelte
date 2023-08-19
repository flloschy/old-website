<script lang="ts">
	import { page } from '$app/stores';
	import './global.css';
	import { goto } from '$app/navigation';
</script>

<header>
	<div class="container" on:click={() => goto("/links")} on:keyup={null} aria-hidden="true">
		<h data-ref="/links" class="{$page.route.id?.includes('/links') ? 'active' : ''}"
			>Links
			<div class="underline" /></h
		>
	</div>
	<div class="container" on:click={() => goto("/about")} on:keyup={null} aria-hidden="true">
		<h data-ref="/about" class="{$page.route.id?.includes('/about') ? 'active' : ''}"
			>About
			<div class="underline" /></h
		>
	</div>
	<div class="container"  on:click={() => goto("/")} on:keyup={null} aria-hidden="true">
		<h data-ref="/" class="{$page.route.id == '/(unprotected)' ? 'active' : ''}"
			>Home
			<div class="underline" /></h
		>
	</div>
	<div class="container"  on:click={() => goto("/projects")} on:keyup={null} aria-hidden="true">
		<h data-ref="/projects" class="{$page.route.id?.includes('/projects') ? 'active' : ''}"
			>{$page.route.id?.endsWith("(unprotected)") ? 'Projects' : $page.route.id?.split("/").at(-1)}
			<div class="underline" /></h
		>
	</div>
	<div class="container"  on:click={() => goto("/skills")} on:keyup={null} aria-hidden="true">
		<h data-ref="/skills" class="{$page.route.id?.includes('/skills') ? 'active' : ''}"
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
		width: calc(100% / 5);
		min-width: fit-content;
		text-align: center;
	}

	h {
		text-transform: capitalize;
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
