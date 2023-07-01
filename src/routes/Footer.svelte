<script lang="ts">
	import { onMount } from 'svelte';

	let lastUpdated: string | null = null;

	onMount(async () => {
		const url = 'https://api.github.com/repos/flloschy/website';
		const fetched = await fetch(url);
		const data = await fetched.json();
		lastUpdated = new Date(data.updated_at).toLocaleDateString();
		lastUpdated =
			lastUpdated == 'Invalid Date' ? 'x/x/' + new Date().getFullYear().toString() : lastUpdated;
	});
</script>

<footer>
	Floschy &copy; {new Date().getFullYear()} - All rights reserved<br />
	Latest update:
	<a class={!lastUpdated ? 'loadingBlock' : ''} href="https://github.com/flloschy/website"
		>{lastUpdated ?? 'fetching...'}</a
	>
</footer>

<style>
	footer {
		height: fit-content;
		padding-top: 50px;
		padding-bottom: 10px;
		text-align: center;
	}

	@media (max-width: 600px) {
		footer {
			font-size:0.8rem;
		}
	}
	@media (max-width: 400px) {
		footer {
			font-size:0.5rem;
		}
	}

</style>
