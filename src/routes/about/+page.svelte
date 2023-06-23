<script lang="ts">
	interface FAQ {
		question: string;
		answer: string;
	}

	const FAQs: FAQ[] = [
		{ question: 'Who are you', answer: 'Florian aka. Floschy' },
		{ question: 'Where are you from', answer: 'Germany' },
		{ question: '...', answer: '...' }
	];
</script>

<div class="box">
	{#each FAQs as aq}
		<div class="element">
			<div class="name">
				<i class="icon question" />
				<h class="title">Q: {aq.question}?</h>
			</div>
			<div class="content">
				<h class="description">A: {aq.answer}</h>
			</div>
		</div>
	{/each}
</div>

<style>
	.icon {
		color: white;
	}

	.box {
		width: 50%;
		margin: auto;
	}

	.element {
		transition: all 1s cubic-bezier(0, 0.55, 0.45, 1);
		display: grid;
		grid-template-columns: 1fr 1fr 5px;
		grid-template-rows: auto auto auto;
		gap: 0px 0px;
		grid-template-areas:
			'name date dot1'
			'content content line'
			'. update dot2';

		width: 100%;
		background-color: rgb(50, 50, 50);
		padding: 3px;
		border-radius: 4px;
		margin-bottom: 10px;
		margin-top: 10px;
	}
	.name {
		margin-left: 3px;
		margin-top: 1px;
		justify-self: start;
		align-self: start;
		grid-area: name;
	}
	.content {
		margin-left: 3px;
		margin-bottom: 2px;
		justify-self: stretch;
		align-self: stretch;
		grid-area: content;
	}
	.element:hover {
		transition: all 0.1s cubic-bezier(0.55, 0, 1, 0.45);
		border-radius: 2px;
		border-width: 0;
		border-style: solid;
		border-color: #ffffff;
		border-left-width: 2px;
		margin-left: 15px;
		width: calc(100% - 2px);
	}
	.title {
		cursor: pointer;
	}
</style>
