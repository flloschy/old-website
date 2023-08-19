<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const header: HTMLElement = document.querySelector('header') as HTMLElement;
		const main: HTMLElement = document.querySelector('main') as HTMLElement;
		const footer: HTMLElement = document.querySelector('footer') as HTMLElement;

		const resize = () => {
			let height = window.innerHeight - 10;
			height -= header?.clientHeight ?? 0;
			height -= footer?.clientHeight ?? 0;

			main.style.minHeight = `${height}px`;
		};

		window.addEventListener('resize', () => resize());
		resize();
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
</style>
