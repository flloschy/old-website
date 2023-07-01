<script lang="ts">
	export let url: string | null = null;
	export let name: string;
	export let comment: string;
	export let svg: string | null = null;
	export let classX: string | null = null;
	export let color: string;
</script>

<div class="card">
	<h class="comment" style="border-color: {color}; box-shadow: 0 0 5px {color};">{comment}</h>
	{#if svg}
		<img class="icon" src={svg} alt={name} style="color: {color};" />
	{:else}
		<i class="{classX} icon" style="color: {color};" />
	{/if}

	{#if url}
		<a href={url} class="name" style="color: {color};">{name}</a>
	{:else}
		<h class="name" style="color: {color}; text-decoration:none;">{name}</h>
	{/if}
</div>

<style>
	.card {
		width: 200px;
		aspect-ratio: 1/1;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'icon'
			'name';
		background-color: var(--invert-text);
		border-radius: 7px;
	}

	.icon {
		justify-self: center;
		align-self: center;
		grid-area: icon;

		width: 80px;
		aspect-ratio: 1/1;

		font-size: 80px;
		filter: brightness(0) invert(1) brightness(0.6);
	}

	.name {
		justify-self: center;
		align-self: start;
		grid-area: name;
		filter: brightness(0) invert(1) brightness(0.6);
		text-decoration: underline;
	}

	.comment {
		position: absolute;
		text-align: center;
		padding: 5px;
		padding-left: 7px;
		padding-right: 7px;
		background-color: var(--invert-text);
		border-radius: 10px;
		transform: translate(calc(-50% + 100px), -115%);
		display: none;
		width: fit-content;
		max-width: 25vw;

		border-width: 1px;
		border-style: solid;
	}
	.card:hover .comment {
		display: block;
	}
	.card:hover .name {
		filter: none;
	}
	.card:hover .icon {
		filter: none;
	}
	@media (max-width: 1500px) {
		.comment {
			max-width: 40vw;
		}
	}
	@media (max-width: 600px) {
		.comment {
			max-width: 200px;
		}
	}
</style>
