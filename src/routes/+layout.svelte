<script lang="js">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		page.subscribe((value) => {
			if (
				!(value.route.id?.split('/').includes('projects') && value.route.id?.split('/').length > 2)
			) {
				// @ts-ignore
				document.head.querySelector("link[rel='icon']").href = '/favicon.png';
			}
		});
	});
</script>

<div class="app">
	<Header />

	<div class="info">
		This website is still in development. Features and design may be missing or not working properly
		just yet.
	</div>

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex-grow: 1;
	}

	.info {
		position: absolute;
		height: fit-content;
		width: 15vw;
		bottom: 15px;
		right: 15px;
		font-family: 'Roboto', sans-serif;
		font-weight: 900;
		background-color: #f6ff00;
		color: rgb(0, 0, 0);
		padding: 10px;
		border-radius: 5px;
		animation: in 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards,
			out 0.6s 5s cubic-bezier(0.33, 1, 0.68, 1) forwards;
	}

	@keyframes in {
		0% {
			transform: translateX(200%);
		}
		100% {
			transform: translateX(0%);
		}
	}
	@keyframes out {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(200%);
		}
	}
</style>
