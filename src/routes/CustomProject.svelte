<script lang="ts">
	interface customProject {
		name: string;
		description: string;
		url: string;
		languages: string[];
		topics: string[];
	}

	export let data: customProject;

	const makeLangs = (x: string[]): string => {
		return x.join(' - ');
	};
</script>

<div class="project">
	<img src="/icons/terminal.svg" alt="copy git clone command" class="clone" />
	<h class="name">
		<a class="gradientText" href={data.url}>{data.name}</a>
		{#each data.topics as topic}
			<h class="topic language">{topic}</h>
		{/each}
	</h>
	<div class="languages">
		<h class="gradientText language">{makeLangs(data.languages)}</h>
	</div>

	<div class="line" />
	<h class="description">{data.description}</h>
</div>

<style>
	.project {
		width: 50vw;
		background-color: var(--invert-text);

		padding: 10px;
		margin-top: 10px;
		border-radius: 7px;
		display: grid;
		grid-template-columns: 20px auto auto;
		grid-template-rows: auto auto auto;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas:
			'clone name languages'
			'. line line'
			'. description description';
	}

	.clone {
		margin-right: 2px;
		color: var(--text);
		justify-self: center;
		align-self: center;
		grid-area: clone;
		transform: translateY(1px);
	}

	.name {
		justify-self: start;
		align-self: center;
		grid-area: name;
	}

	.languages {
		justify-self: end;
		align-self: center;
		grid-area: languages;
	}

	.line {
		margin-top: 10px;
		margin-bottom: 10px;
		opacity: 0.3;
		width: 90%;
		background-color: var(--text);
		height: 2px;
		border-radius: 2px;
		justify-self: center;
		align-self: center;
		grid-area: line;
	}

	.description {
		justify-self: start;
		align-self: start;
		grid-area: description;
	}
	.language {
		padding: 2px;
		padding-right: 4px;
		padding-left: 4px;
		border-radius: 3px;
		margin-left: 5px;
		background-color: var(--background);
	}
</style>
