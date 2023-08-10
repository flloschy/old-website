<script lang="ts">
	import Header from '../../Elements/layouts/protected/Header.svelte';
	import Footer from '../../Elements/layouts/protected/Footer.svelte';
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

	Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe blanditiis ab sequi, earum
	veritatis maxime asperiores! Officia neque non atque aperiam qui, pariatur assumenda dolor quaerat
	inventore, doloribus, reiciendis ratione?
	<main>
		<slot />
	</main>

	<Footer />
</div>
