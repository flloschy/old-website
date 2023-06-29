<script lang="ts">
	export let name: string;
	export let description: string;
	export let svg: string | undefined = undefined;
	export let classX: string | undefined = undefined;
	export let color: string;
	export let percent: number;
</script>

<div class="card">
	<h class="description" style="border-color: {color}; box-shadow: 0 0 5px {color};"
		>{description}<br />'I would give myself <h class="gradientText">{percent / 10}/10</h>
	</h>
	{#if svg}
		<img class="icon" src={svg} alt={name} style="color: {color};" />
	{:else}
		<i class="{classX} icon" style="color: {color};" />
	{/if}
	<h class="name" style="color: {color};">{name}</h>
	<div class="bar">
		<div class="container" style="width: {percent}%;">
			<div class="used" style="background-color: {color}; box-shadow: 0 0 5px {color};" />
		</div>
	</div>
</div>

<style>
	.card {
		width: 200px;
		aspect-ratio: 1/1;
		background-color: var(--invert-text);

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 0px 0px;
		grid-template-areas:
			'icon'
			'name'
			'bar';

		border-radius: 7px;
	}
	i {
		font-size: 80px;
	}

	.icon {
		user-select: none;
		margin-top: 10px;
		width: 80px;
		aspect-ratio: 1/1;
		justify-self: center;
		align-self: center;
		grid-area: icon;
		color: var(--text);
		filter: brightness(0) invert(1) brightness(0.6);
	}
	.name {
		justify-self: center;
		align-self: center;
		grid-area: name;
		filter: brightness(0) invert(1) brightness(0.6);
	}
	.bar {
		background-color: var(--background);

		height: 10px;
		width: 90%;
		justify-self: center;
		align-self: center;
		grid-area: bar;
		border-radius: 5px;
		margin-bottom: 20px;
	}
	.container {
		border-radius: 5px;
		height: 100%;
		min-width: 15px;
	}
	.used {
		border-radius: 5px;
		height: 100%;
		width: 100%;
		animation: in 1s ease-in-out;
		filter: brightness(0) invert(1) brightness(0.6);
	}
	@keyframes in {
		0% {
			width: 5%;
		}
		100% {
			width: 100%;
		}
	}
	.description {
		z-index: 1;
		text-align: center;
		padding: 5px;
		padding-left: 7px;
		padding-right: 7px;
		position: absolute;
		background-color: var(--invert-text);
		border-radius: 10px;
		transform: translate(calc(-50% + 100px), -115%);
		display: none;
		width: fit-content;
		max-width: 25vw;

		border-width: 1px;
		border-style: solid;
	}
	.card:hover .description {
		display: block;
	}
	.gradientText {
		font-weight: 900;
	}
	.point {
		z-index: -999;
		border-radius: 2px;
		display: block;
		width: 15px;
		aspect-ratio: 1/1;
		margin: 0;
		position: absolute;
		top: calc(100% - 9px);
		left: 50%;
		background-color: var(--invert-text);
		rotate: 45deg;
	}

	.card:hover .icon {
		filter: none;
	}
	.card:hover .used {
		filter: none;
	}
	.card:hover .name {
		filter: none;
	}
</style>
