<script lang="ts">
	interface githubAPIjsonData {
		id: number;
		node_id: string;
		name: string;
		full_name: string;
		private: boolean;
		owner: {
			login: string;
			id: number;
			node_id: string;
			avatar_url: string;
			gravatar_id: string;
			url: string;
			html_url: string;
			followers_url: string;
			following_url: string;
			gists_url: string;
			starred_url: string;
			subscriptions_url: string;
			organizations_url: string;
			repos_url: string;
			events_url: string;
			received_events_url: string;
			type: string;
			site_admin: boolean;
		};
		html_url: string;
		description: string;
		fork: boolean;
		url: string;
		forks_url: string;
		keys_url: string;
		collaborators_url: string;
		teams_url: string;
		hooks_url: string;
		issue_events_url: string;
		events_url: string;
		assignees_url: string;
		branches_url: string;
		tags_url: string;
		blobs_url: string;
		git_tags_url: string;
		git_refs_url: string;
		trees_url: string;
		statuses_url: string;
		languages_url: string;
		stargazers_url: string;
		contributors_url: string;
		subscribers_url: string;
		subscription_url: string;
		commits_url: string;
		git_commits_url: string;
		comments_url: string;
		issue_comment_url: string;
		contents_url: string;
		compare_url: string;
		merges_url: string;
		archive_url: string;
		downloads_url: string;
		issues_url: string;
		pulls_url: string;
		milestones_url: string;
		notifications_url: string;
		labels_url: string;
		releases_url: string;
		deployments_url: string;
		created_at: string;
		updated_at: string;
		pushed_at: string;
		git_url: string;
		ssh_url: string;
		clone_url: string;
		svn_url: string;
		homepage: string;
		size: number;
		stargazers_count: number;
		watchers_count: number;
		language: string;
		has_issues: boolean;
		has_projects: boolean;
		has_downloads: boolean;
		has_wiki: boolean;
		has_pages: boolean;
		forks_count: number;
		mirror_url: string | null;
		archived: boolean;
		disabled: boolean;
		open_issues_count: number;
		license: string | null;
		allow_forking: boolean;
		is_template: boolean;
		we_commit_signoff_required: boolean;
		topics: string[];
		visibility: string;
		forks: number;
		open_issues: number;
		watchers: number;
		default_branch: string;
	}
	export let data: githubAPIjsonData | null = null;
	export let ghost = false;

	let total = 0;

	interface languages_urlResponse {
		[key: string]: number;
	}

	const makeLangs = (x: languages_urlResponse): string => {
		total = Object.values(x).reduce((a, b) => a + b, 0);
		return Object.entries(x)
			.filter(([, value]) => value / total > 0.01)
			.map(([key, value]) => `${Math.round((value / total) * 100)}% ${key}`)
			.join(' - ');
	};

	let isFork = 'loading';
	let isName = 'loading';
	let isTopic = 'loading';
	let isLang = 'loading';

	if (ghost) {
		const ForkNames = [
			'fork or not fork',
			'maybe forking this repo',
			'flipping a coin to see if i should fork this repo',
			'fetching if forked or not'
		];
		const repoNames = [
			'choosing a name',
			'asking my friends for my name',
			'googling for a good name',
			'deciding on a name'
		];
		const topicNames = [
			'fetching topics',
			'finding topics',
			'gathering topics',
			'getting some topics',
			'finding out some topics'
		];
		const languageNames = [
			'javascript?',
			'python?',
			'html?',
			'css?',
			'typescript?',
			'c++?',
			'c#?',
			'java?'
		];

		const random = () => {
			isFork = ForkNames[Math.floor(Math.random() * ForkNames.length)];
			isName = repoNames[Math.floor(Math.random() * repoNames.length)];
			isTopic = topicNames[Math.floor(Math.random() * topicNames.length)];
			isLang = languageNames[Math.floor(Math.random() * languageNames.length)];
		};

		setInterval(() => {
			random();
		}, 5000);
		random();
	}
</script>

<div class="project">
	{#if data}
		<img src="/icons/terminal.svg" alt="terminal" class="clone" />
		<h class="name">
			<a class="gradientText" href={data.html_url}>{data.name}</a>
			<div class="forkcontainer">
				<div class="fork language" style="display: {data.fork ? 'inline-flex' : 'none'}">Fork</div>
			</div>
			{#each data.topics as topic}
				<h class="topic language">{topic}</h>
			{/each}
		</h>
		<div class="languages">
			{#await fetch(data.languages_url)}
				<h style="width 30%;" class="loadingBlock">"Loading</h>
			{:then fetched}
				{#await fetched.json()}
					{#each Array(3) as _}
						<h class="language gradientText loadingBlock">Loading</h>
					{/each}
				{:then json}
					<h class="gradientText language">{makeLangs(json)}</h>
				{/await}
			{/await}
		</div>

		<div class="line" />
		<h class="description">{data.description}</h>
	{:else if ghost}
		<img src="/icons/terminal.svg" alt="terminal" class="clone loading" />
		<h class="name">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="loading">{isName}</a>
			<div class="fork language loading" style="display: 'inline-flex' ">{isFork}</div>
			<h class="topic language loading">{isTopic}</h>
		</h>
		<div class="languages">
			<h style="width 30%;" class="loading">{isLang}</h>
		</div>

		<div class="line" />
		<h
			class="description loadingBlock"
			style="width: {Math.random() * 100 ?? isFork}%; height: {10 + Math.random() * 60 ?? isFork}px"
		/>
	{/if}
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
	@media (max-width: 2000px) {
		.project {
			width: 70vw;
		}
	}
	@media (max-width: 1500px) {
		.project {
			width: 80vw;
		}
	}
	@media (max-width: 1000px) {
		.project {
			width: 90vw;
		}
	}
	@media (max-width: 600px) {
		.project {
			width: 95vw;
			grid-template-columns: auto auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'name languages'
				'description description';
		}
		.line {
			display: none;
		}
		.clone {
			display: none;
		}
	}
	@media (max-width: 400px) {
		.project {
			width: calc(100vw - 4px);
		}
	}
	@media (max-width: 600px) {
		.languages {
			display: none;
		}
	}
	@media (max-width: 500px) {
		.topic {
			display: none;
		}
	}
	@media (max-width: 350px) {
		.forkcontainer {
			display: none;
			width: 0px;
			overflow: hidden;
			height: 0px;
			margin: 0;
			padding: 0;
		}
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
	.forkcontainer {
		display: inline-flex;
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
	.fork {
		border-color: var(--secondary);
		border-width: 1px;
		border-style: solid;
		display: inline-flex;
		margin-right: 20px;
	}
</style>
