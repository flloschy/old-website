<script lang="ts">
	import { onMount } from 'svelte';
	import '../global.css';
	let updated = 'loading...';

	onMount(async () => {
		const fetched = await fetch('https://api.github.com/repos/flloschy/website');
		const json = await fetched.json();
		const date = new Date(json.updated_at);
		const year = date.getUTCFullYear();
		const day = date.getUTCDate();
		const month = date.getUTCMonth() + 1;
		// month as text
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dec'
		];
		const monthText = months[month - 1];
		updated = `${day} ${monthText} ${year}`;
	});
</script>

<footer>
	<div class="text">
		<h>Copyright © Floschy 2023</h><br />
		<h>Last update: {updated}</h>
	</div>
</footer>

<style>
	footer {
		background-color: var(--footer-header-color);
	}

	.text {
		margin: auto 0;
		text-align: center;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	h {
		font-weight: 100;
		font-size: 0.5vw;
		color: var(--dark-text);
	}
</style>
