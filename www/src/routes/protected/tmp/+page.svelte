<script lang="ts">
	import { onMount } from 'svelte';
	onMount(() => {
		const iframe = document.getElementById('video');

		document.addEventListener('mousemove', (e) => {
			iframe?.style.setProperty('top', `${15 + Math.ceil(Math.random() * 70)}%`);
			iframe?.style.setProperty('left', `${15 + Math.ceil(Math.random() * 70)}%`);
		});

		setInterval(() => {
			iframe?.style.setProperty('top', `${15 + Math.ceil(Math.random() * 70)}%`);
			iframe?.style.setProperty('left', `${15 + Math.ceil(Math.random() * 70)}%`);
		}, 300);
	});
</script>

<iframe
	id="video"
	width="560"
	height="315"
	src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>

<form method="POST">
	<button>leave</button>
</form>

<style>
	form {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -400%);
	}
	iframe {
		border-radius: 10px;
		box-shadow: 10px 10px 15px 5px rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
