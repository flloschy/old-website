<script lang="ts">
	import { onMount } from 'svelte';

	interface Letter {
		i: number;
		l: string;
	}

	const original: Letter[] = 'Welcome'.split('').map((letter, index) => {
		return { i: index, l: letter };
	});
	let text: Letter[] = original.reverse();

	onMount(() => {
		const id = setInterval(() => {
			let swapped = false;
			for (let i = 0; i < text.length - 1; i++) {
				if (text[i].i > text[i + 1].i) {
					const temp = text[i];
					text[i] = text[i + 1];
					text[i + 1] = temp;
					swapped = true;
				}
			}

			if (!swapped) {
				clearInterval(id);
			}
		}, 750 / text.length + 2);
	});
</script>

<span class="gradientText blur">{text.map((l) => l.l).join('')}</span>
<span class="gradientText">{text.map((l) => l.l).join('')}</span>

<style>
	span {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		font-size: 10rem;
	}
	@media (max-width: 1000px) {
		span {
			font-size: 8rem;
		}
	}
	@media (max-width: 600px) {
		span {
			font-size: 6rem;
		}
	}
	@media (max-width: 400px) {
		span {
			font-size: 4rem;
		}
	}
	@media (max-width: 300px) {
		span {
			font-size: 2rem;
		}
	}
</style>
